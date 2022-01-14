import functools
import json
import os
import uuid
from datetime import date
from hashlib import sha256

import bcrypt
from flask import request, render_template, redirect, make_response, url_for

import config
from modules.database import db
from modules.investment import Investment
from modules.models import Model
from modules.referral import Referral


class Validation:

    def __init__(self):
        self.cursor = db.cursor(buffered=True)
        self.model = Model()
        self.invest = Investment()
        self.referral = Referral()

    @staticmethod
    def generate_cookie():
        gen_ID = uuid.uuid4().hex
        return gen_ID

    @staticmethod
    def generate_referral_code():
        gen_id = uuid.uuid4().hex
        return gen_id

    @staticmethod
    def generate_verification_code():
        gen_id = uuid.uuid4().node
        return str(gen_id)[1:8]

    @staticmethod
    def hash_key(value):
        hash_key = bcrypt.hashpw(value.encode(), bcrypt.gensalt())
        return hash_key.decode()

    @staticmethod
    def check_hash_key(key, hashed):
        if bcrypt.checkpw(key.encode(), hashed.encode()):
            return True
        else:
            return False

    @staticmethod
    def get_cookie_id(data):
        data = str(data)
        if get := request.cookies.get(data):
            return str(get)
        else:
            return False

    def isLoggedIn(self):
        if browser_cookie := self.get_cookie_id(config.user_cookie):
            if self.model.selectOneData(sql="select email from users where login_hash=%s",
                                        value=(browser_cookie,)):
                return True
            else:
                return False
        else:
            return False

    # def isDisabled(self, func):
    #     @functools.wraps(func)
    #     def wrapper():
    #         if browser_cookie := self.get_cookie_id(config.user_cookie):
    #             if isdisabled := self.model.selectOneData(sql="select disabled from users where login_hash=%s",
    #                                                       value=(browser_cookie,)):
    #                 if isdisabled == "No":
    #                     return func()
    #                 else:
    #                     res = make_response(redirect("/login"))
    #                     res.set_cookie(config.user_cookie, "", expires=0)
    #                     return res
    #             else:
    #                 res = make_response(redirect("/login"))
    #                 res.set_cookie(config.user_cookie, "", expires=0)
    #                 return res
    #         else:
    #             res = make_response(redirect("/login"))
    #             res.set_cookie(config.user_cookie, "", expires=0)
    #             return res
    #
    #     return wrapper

    def isAdmin(self):
        if browser_cookie := self.get_cookie_id(config.user_cookie):
            if res := self.model.selectOneData(sql="select isAdmin from users where login_hash=%s",
                                               value=(browser_cookie,)):
                if res == "Yes":
                    return True
                else:
                    return False

    def get_userID_withCookie(self, cookie):
        if result := self.model.selectOneData(sql="select id from users where login_hash=%s", value=(cookie,)):
            return result
        else:
            return False

    def get_userWalletAddress_withCookie(self, cookie):
        if result := self.model.selectOneData(sql="select wallet_address from users where login_hash=%s",
                                              value=(cookie,)):
            return result
        else:
            return False

    def get_userID_withReferral(self, ref):
        if result := self.model.selectOneData(sql="select id from users where referral_code=%s", value=(ref,)):
            return result
        else:
            return False

    def get_refferal_withID(self, ID):
        if result := self.model.selectOneData(sql="select referral_code from users where id=%s", value=(ID,)):
            return result
        else:
            return False

    def get_Email_withCookie(self, cookie):
        if result := self.model.selectOneData(sql="select email from users where login_hash=%s", value=(cookie,)):
            return result
        return False

    def get_Email_withID(self, ID):
        if result := self.model.selectOneData(sql="select email from users where id=%s", value=(ID,)):
            return result
        else:
            return False

    def get_datename(self, data):
        bd = data.split("-")
        date_ = date(int(bd[0]), int(bd[1]), int(bd[2]))
        return f"{date_.strftime('%A')}, {date_.strftime('%d %B %Y')}"

    def get_userKin(self, ID):
        result = self.model.selectMultipleData(
            "select kin_name,kin_email,kin_relation,kin_phone from users where id=%s", value=(ID,))
        x = result[0]
        return {
            "kin_name": x[0],
            "kin_email": x[1],
            "kin_relation": x[2],
            "kin_phone": x[3],
            "kin_pf": self.get_userProfilePhoto(ID, "kin")
        }

    def get_UserRefs(self, ID):
        result = self.model.selectOneData(sql="select referrals from referral where user_id=%s", value=(ID,))
        if result == False or result is None:
            return "empty"
        else:
            data = json.loads(result)["refs"]
            dd = []
            for x in data:
                dd.append(
                    x["email"]
                )
            return str(dd)

    def get_myRef(self, email):
        result = self.model.selectMultipleData(sql="select user_id,referrals from referral")
        for x in result:
            res = json.loads(x[1])["refs"]
            for b in res:
                if b["email"] == email:
                    return self.get_Email_withID(x[0])

    def get_userDetails(self, ID):
        result = self.model.selectMultipleData(
            "select firstname,lastname, email, gender, wallet_address, contact_address, referral_code, phone,investments,wallet_name from users where id=%s",
            value=(ID,))
        x = result[0]
        if x[8] == '' or len(x[8]) <= 0:
            return {
                "firstname": x[0],
                "lastname": x[1],
                "email": x[2],
                "gender": x[3],
                "wallet": x[4],
                "contact_address": x[5],
                "referral": x[6],
                "phone": x[7],
                "total_investements": 0,
                "total_referral": self.referral.get_TotalReferral(ID),
                "pf": self.get_userProfilePhoto(ID, "profile"),
                "wallet_name": x[9]
            }
        else:
            res_ = json.loads(x[8])["invest"]
            total_investment = len(res_)
            return {
                "firstname": x[0],
                "lastname": x[1],
                "email": x[2],
                "gender": x[3],
                "wallet": x[4],
                "contact_address": x[5],
                "referral": x[6],
                "phone": x[7],
                'total_investements': total_investment,
                "total_referral": self.referral.get_TotalReferral(ID),
                "pf": self.get_userProfilePhoto(ID, "profile"),
                "wallet_name": x[9]
            }

    def get_dashboard_details(self, ID):
        result = self.model.selectMultipleData(
            "select firstname,lastname, isAdmin,investments,balance from users where id=%s",
            value=(ID,))
        x = result[0]
        if x[3] == '' or len(x[3]) <= 0:
            return {
                "firstname": x[0],
                "lastname": x[1],
                "isAdmin": x[2],
                "investments": {
                    "investment": 0,
                    "active": 0,
                    "invest_made": 0,
                    "balance": f'{int(x[4]):,}',
                    "referral": self.referral.get_TotalReferral(ID)
                }
            }
        else:
            res_ = json.loads(x[3])["invest"]
            total_investment = len(res_)
            active_investment = len([x for x in res_ if x["status"] == "approved"])
            invest_made = []
            for invest in res_:
                if invest["status"] == "approved":
                    invest_made.append(int(invest["amount"]))
            return {

                "firstname": x[0],
                "lastname": x[1],
                "isAdmin": x[2],
                "investments": {
                    "investment": total_investment,
                    "active": active_investment,
                    "invest_made": f'{int(sum(invest_made)):,}',
                    "balance": f'{int(x[4]):,}',
                    "referral": self.referral.get_TotalReferral(ID)
                }
            }

    def general_details(self, ID):
        result = self.model.selectMultipleData(
            "select firstname,lastname, isAdmin from users where id=%s",
            value=(ID,))
        x = result[0]
        return {
            "firstname": x[0],
            "lastname": x[1],
            "isAdmin": x[2],
        }

    def referal_details(self, ID):
        result = self.model.selectMultipleData(
            "select firstname,lastname, referral_code, isAdmin from users where id=%s",
            value=(ID,))
        x = result[0]
        return {
            "firstname": x[0],
            "lastname": x[1],
            "isAdmin": x[3],
            "my_ref": request.host_url + f"register?referral={x[2]}",
            "total_ref": self.referral.get_TotalReferral(ID)
        }

    def withdrawal_details(self, ID):
        result = self.model.selectMultipleData(
            "select firstname,lastname, isAdmin, balance from users where id=%s",
            value=(ID,))
        x = result[0]
        return {
            "firstname": x[0],
            "lastname": x[1],
            "isAdmin": x[2],
            "balance": f'{int(x[3]):,}'
        }

    def profile_details(self, ID):
        result = self.model.selectMultipleData(
            "select firstname,lastname, email, gender, nationality, wallet_address, dob, contact_address, referral_code, phone, isAdmin,investments from users where id=%s",
            value=(ID,))
        x = result[0]
        if x[11] == '' or len(x[11]) <= 0:
            return {
                "firstname": x[0],
                "lastname": x[1],
                "email": x[2],
                "gender": x[3],
                "country": x[4],
                "wallet": x[5],
                "dob": x[6],
                "contact_address": x[7],
                "referral": x[8],
                "phone": x[9],
                "isAdmin": x[10],
                "total_investements": 0
            }
        else:
            res_ = json.loads(x[11])["invest"]
            total_investment = len(res_)
            return {
                "firstname": x[0],
                "lastname": x[1],
                "email": x[2],
                "gender": x[3],
                "country": x[4],
                "wallet": x[5],
                "dob": x[6],
                "contact_address": x[7],
                "referral": x[8],
                "phone": x[9],
                "isAdmin": x[10],
                'total_investements': total_investment,
                "total_referral": self.referral.get_TotalReferral(ID)
            }

    @staticmethod
    def get_userProfilePhoto(ID, name):
        if name == "profile":
            if os.path.exists(os.path.join(config.basedir, config.image_save_location + str(ID), "profile.png")):
                return os.path.join(config.image_save_location + str(ID) + "/profile.png")
            else:
                return "/static/private/dist/images/profile.jpg"
        elif name == "kin":
            if os.path.exists(os.path.join(config.basedir, config.image_save_location + str(ID), "kin.png")):
                return os.path.join(config.image_save_location + str(ID) + "/kin.png")
            else:
                return "/static/private/dist/images/profile.jpg"

    def check_authIsSet(self, email):
        result = self.model.selectOneData(sql="select auth from users where email=%s", value=(email,))
        return result

    def check_UserIsDisabled(self, email):
        result = self.model.selectOneData(sql="select disabled from users where email=%s", value=(email,))
        return result

    def check_UserIsAdmin(self, email):
        result = self.model.selectOneData(sql="select isAdmin from users where email=%s", value=(email,))
        return result

    def get_AllUsersLastTen(self):
        result = self.model.selectMultipleData(
            "select id,firstname,lastname,email,balance from users order by id desc limit 10")
        res = []
        for x in result:
            data = {
                "id": x[0],
                "firstname": x[1],
                "lastname": x[2],
                "email": x[3],
                "pf": self.get_userProfilePhoto(x[0], "profile"),
                "balance": f'{int(x[4]):,}'
            }
            res.append(data)
        return res

    def get_AllUsers(self):
        result = self.model.selectMultipleData(
            "select id,firstname,lastname,email,balance,disabled,isAdmin,withdraw_ban from users")
        res = []
        for x in result:
            data = {
                "id": x[0],
                "firstname": x[1],
                "lastname": x[2],
                "email": x[3],
                "balance": f'{int(x[4]):,}',
                "disabled": x[5],
                "IsAdmin": x[6],
                "withdraw_ban": x[7],
                "pf": self.get_userProfilePhoto(x[0], "profile")
            }
            res.append(data)
        return res


