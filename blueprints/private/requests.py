from flask import Blueprint, request

import config
from blueprints.public.form import register
from modules.investment import Investment
from modules.models import Model
from modules.referral import Referral
from modules.settings import Setting
from modules.validations import Validation
from modules.withdrawal import Withdrawal

Requests_page_bp = Blueprint("Requests_page_bp", __name__)
validate = Validation()
invest = Investment()
referral = Referral()
setting = Setting()
model = Model()
withdraw = Withdrawal()


def responseData(data):
    return {"data": data}


@Requests_page_bp.get('/invests')
def invests():
    cookie_id = validate.get_userID_withCookie(validate.get_cookie_id(config.user_cookie))
    if data := invest.get_UserInvestment(cookie_id):
        return responseData(data)


@Requests_page_bp.post('/reinvestment')
def reinvestment():
    if data := request.get_json():
        cookie_id = validate.get_userID_withCookie(validate.get_cookie_id(config.user_cookie))
        if invest.Reinvestment(data["id"], cookie_id):
            return "success"


@Requests_page_bp.post('/MoveToWallet')
def movemowallet():
    if data := request.get_json():
        cookie_id = validate.get_userID_withCookie(validate.get_cookie_id(config.user_cookie))
        if invest.MoveToWallet(data["id"], cookie_id):
            return "success"


@Requests_page_bp.post('/loadplan')
def loadplan():
    if data := request.get_json():
        if data := invest.get_InvestmentPlan(data["category"]):
            return responseData(data)


@Requests_page_bp.post('/loadplaninfo')
def loadplaninfo():
    if data := request.get_json():
        if data := invest.get_InvestmentPlanInfo(data["category"]):
            return responseData(data)


@Requests_page_bp.post('/CreateInvestment')
def CreateInvestment():
    cookie_id = validate.get_userID_withCookie(validate.get_cookie_id(config.user_cookie))
    category = config.sanitize_Html(request.form["category"])
    investment_plan = config.sanitize_Html(request.form["plan"])
    currency = config.sanitize_Html(request.form["select_currency"])
    amount = config.sanitize_Html(request.form["amount"])
    wallet = config.sanitize_Html(request.form["wallet"])

    if wallet == "yes":
        if invest.PayInvestmentWithWallet(cookie_id, amount) is False:
            return responseData("insufficient balance")
        else:
            if invest.createInvestment(cookie_id, category, investment_plan, currency, amount, wallet):
                config.sendMail(validate.get_Email_withCookie(validate.get_cookie_id(config.user_cookie)),
                                "Investment Status",
                                "You have successfully created an investment. The status is still pending as our team verify your investment.")
                return responseData("created")
    else:
        if invest.createInvestment(cookie_id, category, investment_plan, currency, amount, wallet):
            config.sendMail(validate.get_Email_withCookie(validate.get_cookie_id(config.user_cookie)),
                            "Investment Status",
                            "You have successfully created an investment. The status is still pending as our team verify your investment.")

            return responseData("created")


@Requests_page_bp.post('/verify-payment')
def verify_payment():
    if data := request.get_json():
        cookie_id = validate.get_userID_withCookie(validate.get_cookie_id(config.user_cookie))
        package_id = data["id"]
        payment_address = data["payment_address"]
        email = validate.get_Email_withCookie(validate.get_cookie_id(config.user_cookie))

        if invest.upadateInvestmentPayment(cookie_id, package_id, payment_address) is True:
            config.sendMail(validate.get_Email_withCookie(validate.get_cookie_id(config.user_cookie)),
                            "Investment Payment",
                            "We have received your payment request, we are now processing the investment.")
            add_content = f"{email} has requested for a payment verification. please login as Admin to verify the user payment"

            config.sendMail(config.admin_email, "Payment Verification", add_content)

            return responseData("success")
        else:
            return responseData("incorrect")


@Requests_page_bp.post('/request-withdrawal')
def request_withdrawal():
    amount = config.sanitize_Html(request.form["amount"])
    amount = config.sanitize_Html(request.form['amount'])
    wallet = config.sanitize_Html(request.form['wallet_address'])
    wallet_name = config.sanitize_Html(request.form["wallet_name"])
    cookie_id = validate.get_userID_withCookie(validate.get_cookie_id(config.user_cookie))
    email = validate.get_Email_withCookie(validate.get_cookie_id(config.user_cookie))

    if withdraw.check_IsWalletAddressMatch(cookie_id, wallet_name, wallet) == "banned":
        content = "Your account has been suspended because we notice you used a different wallet address that does not match your account wallet address.\n please reply this mail so that our team can  work you through on how to enable your account withdrawal"
        config.sendMail(validate.get_Email_withCookie(validate.get_cookie_id(config.user_cookie)),
                        "Withdrawal Suspension", content)
        return responseData("wallet_does_not_match")
    else:
        if withdraw.check_if_UserIsWithdrawban(cookie_id) == "No":
            if result := withdraw.requestWithdrawal(cookie_id, amount):
                if result == "success":
                    code = validate.generate_verification_code()
                    model.updateData("update users set verification=%s where email=%s",
                                     value=(code, email,))
                    config.sendMail(email, "Withdrawal Verification", code)
                    return responseData("success")
                else:
                    return responseData("insufficient fund")
        else:
            return responseData("Banned")


@Requests_page_bp.post('/profile-info')
def profile_info():
    cookie_id = validate.get_userID_withCookie(validate.get_cookie_id(config.user_cookie))
    user_details = validate.get_userDetails(cookie_id)
    return user_details


@Requests_page_bp.post('/kin-info')
def kin_info():
    cookie_id = validate.get_userID_withCookie(validate.get_cookie_id(config.user_cookie))
    user_details = validate.get_userKin(cookie_id)
    return user_details


@Requests_page_bp.post('/verify-withdrawal')
def verify_withdrawal():
    email = validate.get_Email_withCookie(validate.get_cookie_id(config.user_cookie))
    cookie_id = validate.get_userID_withCookie(validate.get_cookie_id(config.user_cookie))
    code = config.sanitize_Html(request.form['verification'])
    amount = config.sanitize_Html(request.form['amount'])
    wallet = config.sanitize_Html(request.form['wallet_address'])
    wallet_name = config.sanitize_Html(request.form['wallet_name'])
    if withdraw.CodeVerification(email, code):
        setting.EmptyVerifyCodeIfSuccess(email, " ")
        withdraw.createWithdrawal(cookie_id, amount, wallet, wallet_name)
        config.sendMail(validate.get_Email_withCookie(validate.get_cookie_id(config.user_cookie)), "Withdrawal Request",
                        f"You have successfully sent a request to withdraw {int(amount):,} ")
        add_content = f"{email} has requested for a withdrawal of ${int(amount):,}"

        config.sendMail(config.admin_email, "Request For Withdrawal", add_content)
        return "success"
    else:
        return "failed"


@Requests_page_bp.get('/withdraw')
def withdraw_cash():
    cookie_id = validate.get_userID_withCookie(validate.get_cookie_id(config.user_cookie))
    if data := withdraw.get_UserWithdrawal(cookie_id):
        return responseData(data)


@Requests_page_bp.post('/fetch_address')
def fetch_address():
    cookie_id = validate.get_userID_withCookie(validate.get_cookie_id(config.user_cookie))
    if data := withdraw.get_userAddress(cookie_id):
        return responseData(data)


@Requests_page_bp.post('/contact-team')
def contact_team():
    email = validate.get_Email_withCookie(validate.get_cookie_id(config.user_cookie))
    content = request.form["message"]
    admin_email = config.admin_email
    add_content = f"{content}\n\n Sent by : \t{email}"
    if config.sendMail(admin_email, "Support", add_content):
        return responseData("success")
