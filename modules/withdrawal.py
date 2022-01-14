import datetime
import json
import uuid
from datetime import datetime

import config
from modules.database import db
from modules.models import Model
from modules.investment import Investment
from modules.validations import Validation


class Withdrawal:

    def __init__(self):
        self.cursor = db.cursor(buffered=True)
        self.model = Model()
        self.invest = Investment()
        self.validate = Validation()

    def createWithdrawal(self, ID, amount, wallet, wallet_name):

        withdrawal_id = str(datetime.now()).replace(" ", "").split(".")[0].replace("-", "").replace(":", "")
        time = str(datetime.now()).split(".")[0]

        if sql := "select withdrawals from withdrawal where user_id=%s":
            val = (ID,)
            self.cursor.execute(sql, val)
            res_ = self.cursor.fetchall()
            if len(res_) <= 0:
                sql = "insert into withdrawal(user_id,withdrawals) values (%s,%s)"
                data_ = json.dumps({"withdrawal": [
                    {"id": withdrawal_id,
                     "amount": amount,
                     "wallet_address": wallet, "wallet_name": wallet_name, "time": time, "status": "pending"}]
                })
                val = (ID, data_)
                self.cursor.execute(sql, val)
                db.commit()
                if self.cursor.rowcount == 1:
                    return True
            else:
                result = res_[0]
                unwrapData = json.loads(result[0])
                data_ = {"id": withdrawal_id,
                         "amount": amount,
                         "wallet_address": wallet, "wallet_name": wallet_name, "time": time, "status": "pending"}

                unwrapData["withdrawal"].append(data_)
                wrapData = json.dumps({"withdrawal": unwrapData["withdrawal"]})
                sql = "update withdrawal set withdrawals = %s where user_id=%s"
                val = (wrapData, ID)
                self.cursor.execute(sql, val)
                db.commit()
                if self.cursor.rowcount == 1:
                    return True

    def check_if_UserIsWithdrawban(self, ID):
        result = self.model.selectOneData("select withdraw_ban from users where id=%s", value=(ID,))
        email = self.get_Email_withID(ID)
        if result == "No":
            res = self.model.selectMultipleData(sql="select user_id,referrals from referral")
            for x in res:
                conv_data = json.loads(x[1])
                refs = conv_data["refs"]  # getting all referrals
                for q in refs:
                    if email == q["email"]:
                        ref_user = x[0]  # getting the owner of referral
                        r = self.model.selectOneData("select withdraw_ban from users where id=%s", value=(ref_user,))
                        if r == "No":
                            return "No"
                        elif r == "Yes":
                            return "Yes"
                    else:
                        return "No"
        elif result == "Yes":
            return "Yes"

    def check_IsWalletAddressMatch(self, ID, w_name, w_address):
        result = self.model.selectMultipleData("select wallet_address,wallet_name from users where id=%s", value=(ID,))
        r = result[0]
        if r[0] == '' and r[1] == '':
            rand = uuid.uuid4().hex
            self.model.updateData("update users set wallet_address=%s, rand=%s, wallet_name=%s where id=%s",
                                  value=(w_address, rand, w_name, ID))
            return True
        else:
            s_name = str(r[1]).lower()
            s_address = str(r[0]).lower()
            w_name = str(w_name).lower()
            w_address = str(w_address).lower()

            if s_name == w_name and s_address == w_address:
                return True
            else:
                rand = uuid.uuid4().hex
                if self.model.updateData("update users set withdraw_ban=%s, rand=%s where id=%s",
                                         value=("Yes", rand, ID)):
                    return "banned"
                else:
                    return True

    def requestWithdrawal(self, ID, amount):
        result = self.model.selectOneData("select balance from users where id=%s", value=(ID,))
        if result == "" or result is None or result == False:
            return "insufficient fund"
        else:
            if int(amount) > int(result):
                return "insufficient fund"
            else:
                return "success"

    def CodeVerification(self, email, code):
        result = self.model.selectOneData(sql="select verification from users where email=%s", value=(email,))
        if str(result) == str(code):
            return True
        else:
            return False

    def get_Email_withID(self, ID):
        result = self.model.selectOneData(sql="select email from users where id=%s", value=(ID,))
        return result

    def check_UserHasWithdrawal(self, ID):
        result = self.model.selectOneData(sql="select withdrawals from withdrawal where user_id=%s", value=(ID,))
        if result == False or result is None:
            return True
        else:
            return False

    def get_userAddress(self, ID):
        result = self.model.selectMultipleData("select wallet_name,wallet_address from users where id=%s", value=(ID,))
        if result[0][0] == '' or result[0][1] == '':
            return "empty"
        else:
            return {
                "wallet_name": result[0][0],
                "wallet_address": result[0][1]
            }

    def get_UserWithdrawal(self, ID):
        if self.check_UserHasWithdrawal(ID):
            return "no_withdrawal"
        else:
            result = self.model.selectOneData("select withdrawals from withdrawal where user_id=%s", value=(ID,))
            data = json.loads(result)
            message = data["withdrawal"]
            wrapper = []
            for x in message:
                details = {
                    "id": x['id'],
                    "time": x["time"],
                    "amount": f'{int(x["amount"]):,}',
                    "status": x["status"],
                }
                wrapper.append(details)
            return wrapper

    def get_Withdrawals(self):
        result = self.model.selectMultipleData(sql="select * from withdrawal")
        trans_ = []
        for x in result:
            invest = json.loads(x[2])
            for b in invest["withdrawal"]:
                pf = self.model.get_userProfilePhoto(x[1], "profile")
                email = self.get_Email_withID(x[1])
                b.update({"pf": pf})
                b.update({"email": email})
                trans_.append(b)
        return trans_

    def OnloadWithdrawalDetails(self):
        result = self.model.selectMultipleData(sql="select * from withdrawal")
        total_approved = []
        total_pending = []
        total_amount = []
        for x in result:
            withdraw = json.loads(x[2])
            for b in withdraw["withdrawal"]:
                if b["status"] == "approved":
                    total_approved.append(b)
                    total_amount.append(int(b["amount"]))
                elif b["status"] == "pending":
                    total_pending.append(b)
        return {
            "approved": len(total_approved),
            "pending": len(total_pending),
            "total_amount": f"{sum(total_amount):,}"}

    def change_WithdrawalStatus(self, ID, status):
        print(status)
        result = self.model.selectMultipleData(sql="select * from withdrawal")
        for x in result:
            withdraw = json.loads(x[2])
            for b in withdraw["withdrawal"]:
                if b["id"] == str(ID):
                    b["status"] = status
                    user_id = x[1]
                    if status == "decline":
                        return "True"
                    elif status == "approved":
                        self.invest.updateBalance(user_id, b["amount"], "minus")
                    res = json.dumps(withdraw)
                    if self.model.updateData(sql="update withdrawal set withdrawals = %s where user_id=%s",
                                             value=(res, user_id)):
                        config.sendMail(self.validate.get_Email_withID(user_id), f"Investment Status",
                                        f"Your Withdrawal status has been changed to {status}")
                        return True



