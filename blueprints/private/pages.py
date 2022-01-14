from flask import Blueprint, render_template, request, redirect

import config
from modules.investment import Investment
from modules.referral import Referral
from modules.validations import Validation

Private_page_bp = Blueprint("Private_page_bp", __name__)
validate = Validation()
invest = Investment()
referral = Referral()


@Private_page_bp.route('/dashboard')
def dashboard():
    if validate.isLoggedIn():
        if cookie_id := validate.get_userID_withCookie(validate.get_cookie_id(config.user_cookie)):
            dashboard_details = validate.get_dashboard_details(cookie_id)
            pf = validate.get_userProfilePhoto(cookie_id, "profile")
            invest.is_InvestmentExpired(cookie_id)
            return render_template("private/dashboard.html", dashboard_details=dashboard_details, pf=pf)
        else:
            return redirect("/login")
    else:
        return redirect("/login")


@Private_page_bp.route('/user-investment')
def user_investment():
    if validate.isLoggedIn():
        if cookie_id := validate.get_userID_withCookie(validate.get_cookie_id(config.user_cookie)):
            general_details = validate.general_details(cookie_id)
            pf = validate.get_userProfilePhoto(cookie_id, "profile")
            invest.is_InvestmentExpired(cookie_id)
            return render_template("private/investment.html", dashboard_details=general_details, pf=pf)
        else:
            return redirect("/login")
    else:
        return redirect("/login")


@Private_page_bp.route('/referral')
def referrals():
    if validate.isLoggedIn():
        if cookie_id := validate.get_userID_withCookie(validate.get_cookie_id(config.user_cookie)):
            referal_details = validate.referal_details(cookie_id)
            user_referal = referral.get_UserRefferals(cookie_id)
            pf = validate.get_userProfilePhoto(cookie_id, "profile")
            return render_template("private/referral.html", dashboard_details=referal_details, pf=pf, ref=user_referal)

        else:
            return redirect("/login")
    else:
        return redirect("/login")


@Private_page_bp.route('/withdrawal-request')
def withdrawal_request():
    if validate.isLoggedIn():
        if cookie_id := validate.get_userID_withCookie(validate.get_cookie_id(config.user_cookie)):
            pf = validate.get_userProfilePhoto(cookie_id, "profile")
            withdraw_details = validate.withdrawal_details(cookie_id)
            invest.is_InvestmentExpired(cookie_id)
            return render_template("private/withdrawalrequest.html", dashboard_details=withdraw_details, pf=pf)
        else:
            return redirect("/login")
    else:
        return redirect("/login")


@Private_page_bp.route('/profile')
def profile():
    if validate.isLoggedIn():
        if cookie_id := validate.get_userID_withCookie(validate.get_cookie_id(config.user_cookie)):
            profile_details = validate.profile_details(cookie_id)
            pf = validate.get_userProfilePhoto(cookie_id, "profile")
            return render_template("private/profile.html", dashboard_details=profile_details, pf=pf)
        else:
            return redirect("/login")
    else:
        return redirect("/login")
