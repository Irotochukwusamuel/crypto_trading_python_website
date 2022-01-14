import base64
import io
import os
import uuid

import geocoder
from PIL import Image

import config
from modules.database import db
from modules.models import Model
from modules.validations import Validation


class Setting:

    def __init__(self):
        self.cursor = db.cursor(buffered=True)
        self.model = Model()
        self.validate = Validation()

    @staticmethod
    def allowed_image(filename):
        if "." not in filename:
            return False

        ext = filename.rsplit(".", 1)[1]
        if ext.upper() in ["JPEG", "JPG", "PNG", "GIF"]:
            return True
        else:
            return "Unsupported Image Type"

    @staticmethod
    def compress_Image(ID, name):
        profile = Image.open(config.basedir + "/static/upload/" + ID + "/" + name)
        profile = profile.resize((300, 300), Image.ANTIALIAS)
        profile.save(config.basedir + "/static/upload/" + ID + "/" + name, optimize=True, quality=75)

    @staticmethod
    def validate_photo(ID, image_data, name):
        im = Image.open(io.BytesIO(base64.b64decode(str(image_data))))
        im = im.resize((300, 300), Image.ANTIALIAS)

        image_name = ""
        if name == "profile":
            image_name += str("profile" + ".png")
        elif name == "kin":
            image_name += str("kin" + ".png")

        if not os.path.exists(os.path.join(config.basedir, config.image_save_location + str(ID))):
            os.mkdir(os.path.join(config.basedir, config.image_save_location + str(ID)))

        if im.mode in ["RGBA", "P", "RGB"]:
            im.convert('RGB')
            loc = os.path.join(config.basedir, config.image_save_location, str(ID), image_name)
            im.save(loc, optimize=True, quality=75)
        return True

    def Changepassword(self, email, password, newpassword):
        db_password = self.model.selectOneData(sql="select password from users where email=%s", value=(email,))
        if self.validate.check_hash_key(password, db_password):
            if self.validate.check_hash_key(newpassword, db_password):
                return "password-exist"
            newpass = self.validate.hash_key(newpassword)
            if self.model.updateData(sql="update users set password=%s where email=%s", value=(newpass, email)):
                return "success"
        else:
            return "incorrect-password"

    def ChangeForgotPassword(self, email, password1, password2):
        if password1 == password2:
            newpass = self.validate.hash_key(password1)
            rand = uuid.uuid4().hex
            if self.model.updateData(sql="update users set rand=%s, password=%s where email=%s",
                                     value=(rand, newpass, email)):
                return "success"
        else:
            return "incorrect-password"

    def Changeemail(self, ID, new_email):
        email = self.validate.get_Email_withID(ID)
        print(email, new_email)
        if new_email == email:
            return "email-exist"
        else:
            self.model.updateData(sql="update users set email=%s where id=%s", value=(new_email, ID))
            return "success"

    def UpdateBio(self, ID, fname, lname, gender, wallet, contact, phone, wallet_name):
        rand = uuid.uuid4().hex
        if self.model.updateData(
                sql="update users set firstname=%s,lastname=%s,gender=%s,wallet_address=%s,contact_address=%s,"
                    "phone=%s,rand=%s,wallet_name=%s where id=%s",
                value=(fname, lname, gender, wallet, contact, phone, rand, wallet_name, ID,)):
            return "success"

    def UpdateKin(self, ID, name, email, relationship, phone):
        rand = uuid.uuid4().hex
        if self.model.updateData(
                sql="update users set rand=%s,kin_name=%s,kin_email=%s,kin_relation=%s,kin_phone=%s where id=%s",
                value=(rand, name, email, relationship, phone, ID,)):
            return "success"

    def UpdateAuth(self, ID, result):
        rand = uuid.uuid4().hex
        if self.model.updateData(sql="update users set rand=%s,auth=%s where id=%s", value=(rand, result, ID,)):
            return "success"

    def ChangeDisabledStatus(self, ID, value):
        rand = uuid.uuid4().hex
        if self.model.updateData(sql="update users set rand=%s, disabled=%s where id=%s", value=(rand, value, ID,)):
            return "success"

    def change_withdraw_ban_status(self, ID, value):
        rand = uuid.uuid4().hex
        if self.model.updateData(sql="update users set rand=%s, withdraw_ban=%s where id=%s", value=(rand, value, ID,)):
            return "success"

    def edit_userBalance(self, ID, value):
        rand = uuid.uuid4().hex
        if self.model.updateData(sql="update users set rand=%s, balance=%s where id=%s", value=(rand, value, ID,)):
            return "success"

    def ChangeIsAdminStatus(self, ID, value):
        rand = uuid.uuid4().hex
        if self.model.updateData(sql="update users set rand=%s, isAdmin=%s where id=%s", value=(rand, value, ID,)):
            return "success"

    def EmptyVerifyCodeIfSuccess(self, ID, value):
        rand = uuid.uuid4().hex
        if self.model.updateData(sql="update users set rand=%s, verification=%s where email=%s",
                                 value=(rand, value, ID,)):
            return "success"

    def UpdateLastLoginLocation(self, ID):
        pass
