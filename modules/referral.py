import json
from datetime import datetime

from modules.database import db
from modules.models import Model


class Referral:

    def __init__(self):
        self.cursor = db.cursor(buffered=True)
        self.model = Model()

    def get_TotalReferral(self, ID):
        result = self.model.selectOneData(sql="select referrals from referral where user_id=%s", value=(ID,))
        if result == False or result is None:
            return "0"
        else:
            return len(json.loads(result)["refs"])

    def get_name_withEmail(self, email):
        if result := self.model.selectMultipleData(sql="select lastname,firstname from users where email=%s",
                                                   value=(email,)):
            return result[0]
        else:
            return False

    def get_UserRefferals(self, ID):
        result = self.model.selectOneData(sql="select referrals from referral where user_id=%s", value=(ID,))
        if result == False or result is None:
            return "empty"
        else:
            data = json.loads(result)["refs"]
            dd = []
            for x in data:
                name = self.get_name_withEmail(x["email"])
                dd.append(
                    {
                        "email": x["email"],
                        "name": f"{name[0]} {name[1]}"
                    }
                )
            return dd

    def Addreferrals(self, ID, email, refferal):
        if refferal != "empty":
            time = str(datetime.now()).split(".")[0]
            if sql := "select referrals from referral where user_id=%s":
                val = (ID,)
                self.cursor.execute(sql, val)
                res_ = self.cursor.fetchall()
                if len(res_) <= 0:
                    sql = "insert into referral(user_id,referrals) values (%s,%s)"
                    data_ = json.dumps({"refs": [{"email": email, "time": time}]})
                    val = (ID, data_)
                    self.cursor.execute(sql, val)
                    db.commit()
                    if self.cursor.rowcount == 1:
                        return True
                else:
                    result = res_[0]
                    unwrapData = json.loads(result[0])
                    if data_ := {"email": email, "time": time}:
                        unwrapData["refs"].append(data_)
                        wrapData = json.dumps({"refs": unwrapData["refs"]})
                        sql = "update referral set referrals = %s where user_id=%s"
                        val = (wrapData, ID)
                        self.cursor.execute(sql, val)
                        db.commit()
                        if self.cursor.rowcount == 1:
                            return True
        else:
            return True

    def RefferalBonus(self, ID):
        result = self.model.selectOneData(sql="select balance from users where id=%s", value=(ID,))
        bonus = 10
        if result == False or result is None or len(result) <= 0:
            self.model.updateData(sql="update users set balance=%s where id=%s", value=(bonus, ID))
            return True
        else:
            bonus += int(result)
            self.model.updateData(sql="update users set balance=%s where id=%s", value=(bonus, ID))
            return True
