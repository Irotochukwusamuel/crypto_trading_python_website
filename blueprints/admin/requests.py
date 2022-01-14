from flask import Blueprint, request

import config
from modules.investment import Investment
from modules.models import Model
from modules.referral import Referral
from modules.settings import Setting
from modules.validations import Validation
from modules.withdrawal import Withdrawal

AdminRequests_page_bp = Blueprint("AdminRequests_page_bp", __name__)
validate = Validation()
invest = Investment()
referral = Referral()
setting = Setting()
model = Model()
withdraw = Withdrawal()


def responseData(data):
    return {"data": data}


@AdminRequests_page_bp.post('/transaction-view-more')
def transaction_view():
    if data := request.get_json():
        res = invest.get_TransactionById(data["id"])
        return responseData(res)


@AdminRequests_page_bp.post('/change-approve-status')
def change_status():
    if data := request.get_json():
        invest.change_TransactionStatus(data["id"], data["status"])
        return "success"


@AdminRequests_page_bp.post('/change-withdraw-status')
def change_withdraw_status():
    if data := request.get_json():
        withdraw.change_WithdrawalStatus(data["id"], data["status"])
        return "success"


@AdminRequests_page_bp.post('/change-disabled-status')
def disabled_status():
    if data := request.get_json():
        setting.ChangeDisabledStatus(data["id"], data["status"])
        return "success"


@AdminRequests_page_bp.post('/change-withdraw_ban-status')
def change_withdraw_ban_status():
    if data := request.get_json():
        setting.change_withdraw_ban_status(data["id"], data["status"])
        return "success"


@AdminRequests_page_bp.post('/change-IsAdmin-status')
def IsAdmin_status():
    if data := request.get_json():
        setting.ChangeIsAdminStatus(data["id"], data["status"])
        return "success"


@AdminRequests_page_bp.post('/individual-details')
def individual_details():
    if data := request.get_json():
        res = validate.get_userDetails(data["id"])
        email = validate.get_Email_withID(data["id"])
        my_ref = validate.get_myRef(email)
        refs = validate.get_UserRefs(data["id"])
        return responseData([res, my_ref, refs])


@AdminRequests_page_bp.post('/delete-package')
def delete_package():
    if data := request.get_json():
        invest.RemovePackage(data["id"])
        return responseData("success")


@AdminRequests_page_bp.post('/create-new-package')
def create_new_package():
    plan_name = config.sanitize_Html(request.form["plan"])
    duration = config.sanitize_Html(request.form["duration"])
    min_ = config.sanitize_Html(request.form["min"])
    percent = config.sanitize_Html(request.form["percent"])
    max_ = config.sanitize_Html(request.form["max"])
    invest_cate = config.sanitize_Html(request.form["invest_cate"])
    desc = f"{plan_name} ({duration} days plan)"
    if invest.UpdatePackages(invest_cate, desc, min_, max_, percent):
        return responseData("success")


@AdminRequests_page_bp.post('/edit-user-balance')
def edit_user_balance():
    balance = config.sanitize_Html(request.form["balance"])
    id = config.sanitize_Html(request.form["id"])
    if setting.edit_userBalance(id, balance):
        return responseData("success")
