import datetime
import json
import time
from datetime import date, datetime, timedelta

import config
from modules.database import db
from modules.models import Model
from modules.referral import Referral


class Investment:

    def __init__(self):
        self.cursor = db.cursor(buffered=True)
        self.model = Model()
        self.referral = Referral()

    def get_AllInvestment(self, ID):
        result = self.model.selectOneData(sql="select investments from users where id=%s", value=(ID,))
        if result == False or result is None:
            return {
                "investment": 0,
                "active": 0,
                "invest_made": 0,
                "balance": f'{int(self.get_UserBalance(ID)):,}',
                "referral": self.referral.get_TotalReferral(ID)
            }
        else:
            res_ = json.loads(result)["invest"]
            total_investment = len(res_)
            active_investment = len([x for x in res_ if x["status"] == "approved"])
            invest_made = []
            for x in res_:
                if x["status"] == "approved":
                    invest_made.append(int(x["amount"]))
            return {
                "investment": total_investment,
                "active": active_investment,
                "invest_made": f'{int(sum(invest_made)):,}',
                "balance": f'{int(self.get_UserBalance(ID)):,}',
                "referral": self.referral.get_TotalReferral(ID)
            }

    def check_UserHasInvestment(self, ID):
        result = self.model.selectOneData(sql="select investments from users where id=%s", value=(ID,))
        if result == False or result is None:
            return True
        else:
            return False

    def get_UserBalance(self, ID):
        result = self.model.selectOneData(sql="select balance from users where id=%s", value=(ID,))
        if result == False or result is None or len(result) <= 0:
            return "0"
        else:
            return result

    def get_InvestmentPlan(self, ID):
        if result := self.model.selectMultipleData(sql="select plan from packages where plan_id=%s", value=(ID,)):
            res = []
            for x in result:
                res.append(x[0])
            return res

    def get_InvestmentPlanInfo(self, ID):
        if result := self.model.selectMultipleData(sql="select amount,percent,max from packages where plan=%s",
                                                   value=(ID,)):
            for x in result:
                return {
                    "amount": x[0],
                    "percent": x[1],
                    "max": x[2]
                }

    def get_ROI(self, plan):
        if result := self.model.selectOneData(sql="select percent from packages where plan=%s", value=(plan,)):
            res = str(result).replace("%", "")
            if "." in res:
                return float(res)
            else:
                return int(res)

    def get_UserInvestment(self, ID):
        result = self.model.selectOneData("select investments from users where id=%s", value=(ID,))
        if result == False or result is None or len(result) <= 0 or result == "":
            return "no_investment"
        else:
            data = json.loads(result)
            message = data["invest"]
            wrapper = []
            for x in message:
                details = {
                    "id": x['id'],
                    "category": x['category'],
                    "plan": x["plan"].split("(")[0],
                    "currency": x["currency"],
                    "wallet": x["wallet"],
                    "time": x["time"],
                    "amount": f'{int(x["amount"]):,}',
                    "status": x["status"],
                    "roi": f'{int(x["roi"]):,}',
                    "expiration": x["expiration"]
                }
                wrapper.append(details)
            return wrapper

    @staticmethod
    def get_expirationDate(data, duration):
        a = data.split(" ")[0]
        bd = a.split("-")
        date_ = date(int(bd[0]), int(bd[1]), int(bd[2]))
        expire_day = date_ + timedelta(days=duration)
        day_name = expire_day.strftime("%a")
        expire_full_name = f'{day_name}, {expire_day.strftime("%d %b %Y")}'
        return expire_full_name

    def createInvestment(self, ID, category, plan, currency, amount, wallet):
        investment_id = str(datetime.now()).replace(" ", "").split(".")[0].replace("-", "").replace(":", "")
        time = str(datetime.now()).split(".")[0]
        roi = str(int(int(amount) * self.get_ROI(plan) / 100) + int(amount))

        if sql := "select investments from users where id=%s":
            val = (ID,)
            self.cursor.execute(sql, val)
            res_ = self.cursor.fetchall()[0]
            if res_[0] == False or res_[0] is None or len(res_[0]) <= 0 or res_[0] == "":
                sql = "update users set investments = %s where id=%s"
                if wallet == "yes":
                    time = str(datetime.now()).split(".")[0]
                    duration = int(plan.split("(")[1].split(" ")[0])
                    expire_date = self.get_expirationDate(time, duration)
                    data_ = json.dumps({"invest": [
                        {"id": investment_id, "category": category, "plan": plan, "currency": currency,
                         "amount": amount,
                         "wallet": wallet, "time": time, "roi": roi, "status": "approved", "expiration": expire_date}]
                    })
                else:
                    data_ = json.dumps({"invest": [
                        {"id": investment_id, "category": category, "plan": plan, "currency": currency,
                         "amount": amount,
                         "wallet": wallet, "time": time, "roi": roi, "status": "waiting", "expiration": "not set"}]
                    })

                val = (data_, ID)
                self.cursor.execute(sql, val)
                db.commit()
                if self.cursor.rowcount == 1:
                    return True
            else:
                result = res_[0]
                unwrapData = json.loads(result)
                if wallet == "yes":
                    time = str(datetime.now()).split(".")[0]
                    duration = int(plan.split("(")[1].split(" ")[0])
                    expire_date = self.get_expirationDate(time, duration)
                    data_ = {"id": investment_id, "category": category, "plan": plan, "currency": currency,
                             "amount": amount,
                             "wallet": wallet, "time": time, "roi": roi, "status": "approved",
                             "expiration": expire_date}
                else:
                    data_ = {"id": investment_id, "category": category, "plan": plan, "currency": currency,
                             "amount": amount,
                             "wallet": wallet, "time": time, "roi": roi, "status": "waiting", "expiration": "not set"}

                unwrapData["invest"].append(data_)
                wrapData = json.dumps({"invest": unwrapData["invest"]})
                sql = "update users set investments = %s where id=%s"
                val = (wrapData, ID)
                self.cursor.execute(sql, val)
                db.commit()
                if self.cursor.rowcount == 1:
                    return True

    def PayInvestmentWithWallet(self, ID, amount):
        if int(self.get_UserBalance(ID)) >= int(amount):
            balance = int(self.get_UserBalance(ID)) - int(amount)
            self.model.updateData(sql="update users set balance=%s where id=%s", value=(balance, ID))
            return True
        else:
            return False

    def upadateInvestmentPayment(self, ID, package_id, wallet_address):
        if result := self.model.selectOneData(sql="select investments from users where id=%s",
                                              value=(ID,)):
            unwrapData = json.loads(result)
            for x in unwrapData["invest"]:
                if x["id"] == package_id:
                    x["status"] = "pending"
                    x["wallet_address"] = wallet_address
            res = json.dumps(unwrapData)
            if self.model.updateData(sql="update users set investments = %s where id=%s",
                                     value=(res, ID)):
                return True

    def updateBalance(self, ID, amount, type):
        amount = int(amount)
        result = self.model.selectOneData(sql="select balance from users where id=%s", value=(ID,))
        if result == False or result is None or len(result) <= 0:
            if type == "add":
                self.model.updateData(sql="update users set balance=%s where id=%s", value=(amount, ID))
                return True
        else:
            if type == "add":
                amount = int(result) + amount
                self.model.updateData(sql="update users set balance=%s where id=%s", value=(amount, ID))
                return True
            elif type == "minus":
                amount = int(result) - amount
                if amount < 0:
                    amount = 0
                self.model.updateData(sql="update users set balance=%s where id=%s", value=(amount, ID))
                return True

    def is_InvestmentExpired(self, user_id):
        result = self.model.selectOneData(sql="select investments from users where id=%s", value=(user_id,))
        if result is not False and len(result) > 0:
            result = json.loads(result)
            for x in result["invest"]:
                if x["status"] == "approved":
                    expire = x["expiration"]
                    investment_date = expire.replace(",", "")
                    converted_InvestDate = time.strptime(
                        datetime.strptime(investment_date, "%a %d %b %Y").strftime("%d/%m/%Y"), "%d/%m/%Y")
                    curr_date = time.strptime(datetime.now().strftime("%d/%m/%Y"), "%d/%m/%Y")
                    if curr_date >= converted_InvestDate:
                        pass
                        x["status"] = "closed"
            res = json.dumps(result)
            if self.model.updateData(sql="update users set investments = %s where id=%s",
                                     value=(res, user_id)):
                return True

    def get_Email_withID(self, ID):
        result = self.model.selectOneData(sql="select email from users where id=%s", value=(ID,))
        return result

    def get_Transactions(self):
        result = self.model.selectMultipleData(sql="select id,investments from users")
        trans_ = []
        for x in result:
            if len(x[1]) > 0 or x[1] != '':
                invest = json.loads(x[1])
                for b in invest["invest"]:
                    pf = self.model.get_userProfilePhoto(x[0], "profile")
                    email = self.get_Email_withID(x[0])
                    b.update({"pf": pf})
                    b.update({"email": email})
                    trans_.append(b)
        return trans_

    def get_TransactionById(self, ID):
        result = self.model.selectMultipleData(sql="select id,investments from users")
        for x in result:
            if len(x[1]) > 0 or x[1] != '':
                invest = json.loads(x[1])
                for b in invest["invest"]:
                    if b["id"] == str(ID):
                        email = self.get_Email_withID(x[0])
                        b.update({"email": email})
                        return b

    def change_TransactionStatus(self, ID, status):
        result = self.model.selectMultipleData(sql="select id,investments from users")
        final = []
        for x in result:
            if len(x[1]) > 0 or x[1] != '':
                invest = json.loads(x[1])
                for b in invest["invest"]:
                    if b["id"] == str(ID):
                        b["status"] = status
                        user_id = x[0]
                        if status == "approved":
                            time = str(datetime.now()).split(".")[0]
                            duration = int(b["plan"].split("(")[1].split(" ")[0])
                            expire_date = self.get_expirationDate(time, duration)
                            b.update({"expiration": expire_date})
                            self.updateBalance(user_id, b["roi"], "minus")
                        elif status == "waiting" or status == "pending":
                            b.update({"expiration": "not set"})
                            self.updateBalance(user_id, b["roi"], "minus")
                        elif status == "closed":
                            self.updateBalance(user_id, b["roi"], "add")
                        else:
                            return True
                        res = json.dumps(invest)
                        final.append(res)
                        final.append(user_id)
        if self.model.updateData(sql="update users set investments = %s where id=%s",
                                 value=(final[0], final[1])):
            config.sendMail(self.get_Email_withID(final[1]), f"Investment Status",
                            f"Your Investment status has been changed to {status}")
            return True

    def OnloadTransactionDetails(self):
        result = self.model.selectMultipleData(sql="select investments from users")
        total_approved = []
        total_pending = []
        total_amount = []
        for x in result:
            if len(x[0]) > 0 or x[0] != '':
                invest = json.loads(x[0])
                for b in invest["invest"]:
                    if b["status"] == "approved":
                        total_approved.append(b)
                        total_amount.append(int(b["amount"]))
                    elif b["status"] == "pending":
                        total_pending.append(b)
        return {
            "approved": len(total_approved),
            "pending": len(total_pending),
            "total_amount": f"{sum(total_amount):,}"
        }

    def OnloadIndexDetails(self):
        users = self.model.selectMultipleData(sql="select count(*) from users")
        trans = self.model.selectMultipleData(sql="select investments from users")
        total_trans = []
        total_amount = []
        total_users = users[0][0]
        for x in trans:
            if len(x[0]) > 0 or x[0] != '':
                invest = json.loads(x[0])
                for b in invest["invest"]:
                    total_trans.append(b)
                    if b["status"] == "approved":
                        total_amount.append(int(b["amount"]))
        return {
            "total_users": total_users,
            "total_trans": len(total_trans),
            "total_amount": f"{sum(total_amount):,}"
        }

    def UpdatePackages(self, plan_type, plan_name, min_amount, max_amount, roi_percent):
        if str(plan_type).lower() == "retirement":
            plan_type = 2
        elif str(plan_type).lower() == "energy":
            plan_type = 1
        result = self.model.insertData(
            sql="insert into packages (plan_id, plan, amount, percent, max) values (%s,%s,%s,%s,%s)",
            values=(plan_type, plan_name, min_amount, f"{roi_percent}%", max_amount))
        return result

    def RemovePackage(self, ID):
        if self.model.delete_row("packages", ID, "id"):
            return True
        else:
            return False

    def GetPackages(self):
        result = self.model.selectMultipleData(sql="select * from packages")
        data = []
        for x in result:
            data.append({
                "id": x[0],
                "plan_name": x[2],
                "min": x[3],
                "roi": x[4],
                "max": x[5]
            })
        return data

    def Reinvestment(self, ID, user_id):
        result = self.model.selectMultipleData(sql="select id,investments from users where id=%s", value=(user_id,))
        final = []
        for x in result:
            if len(x[1]) > 0 or x[1] != '':
                invest = json.loads(x[1])
                for b in invest["invest"]:
                    if b["id"] == str(ID):
                        user_id = x[0]
                        time = str(datetime.now()).split(".")[0]
                        duration = int(b["plan"].split("(")[1].split(" ")[0])
                        expire_date = self.get_expirationDate(time, duration)
                        roi = str(int(int(b["roi"]) * self.get_ROI(b["plan"]) / 100) + int(b["roi"]))
                        b.update({"amount": b["roi"]})
                        b.update({"expiration": expire_date})
                        b.update({"roi": roi})
                        b.update({"status": "approved"})
                        res = json.dumps(invest)
                        final.append(res)
                        final.append(user_id)
        if self.model.updateData(sql="update users set investments = %s where id=%s",
                                 value=(final[0], final[1])):
            config.sendMail(self.get_Email_withID(final[1]), f"Investment Status",
                            f"You have successfully reinvested your ROI")
            return True

    def MoveToWallet(self, ID, user_id):
        result = self.model.selectMultipleData(sql="select id,investments from users where id=%s", value=(user_id,))
        final = []
        for x in result:
            if len(x[1]) > 0 or x[1] != '':
                invest = json.loads(x[1])
                for b in invest["invest"]:
                    if b["id"] == str(ID):
                        b["status"] = "finalized"
                        user_id = x[0]
                        self.updateBalance(user_id, b["roi"], "add")
                        res = json.dumps(invest)
                        final.append(res)
                        final.append(user_id)
        if self.model.updateData(sql="update users set investments = %s where id=%s",
                                 value=(final[0], final[1])):
            return True


