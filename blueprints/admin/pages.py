from flask import Blueprint, render_template, request, redirect

import config
from modules.investment import Investment
from modules.referral import Referral
from modules.validations import Validation
from modules.withdrawal import Withdrawal

Admin_page_bp = Blueprint("Admin_page_bp", __name__)
validate = Validation()
invest = Investment()
referral = Referral()
withdraw = Withdrawal()


@Admin_page_bp.route('/AppAdmin')
def AppAdmin():
    if validate.isAdmin():
        data = validate.get_AllUsersLastTen()
        return render_template("admin/index.html", data=data, onload=invest.OnloadIndexDetails())
    else:
        return redirect("/login")


@Admin_page_bp.route('/AppAdmin/users')
def users_():
    if validate.isAdmin():
        data = validate.get_AllUsers()
        return render_template("admin/users.html", data=data)
    else:
        return redirect("/login")


@Admin_page_bp.route('/AppAdmin/transactions')
def transactions():
    if validate.isAdmin():
        data = invest.get_Transactions()
        return render_template("admin/transaction.html", data=data, onload=invest.OnloadTransactionDetails())
    else:
        return redirect("/login")


@Admin_page_bp.route('/AppAdmin/packages')
def packages():
    if validate.isAdmin():
        data = invest.GetPackages()
        return render_template("admin/packages.html", data=data)
    else:
        return redirect("/login")


@Admin_page_bp.route('/AppAdmin/withdrawal')
def withdrawal_cash():
    if validate.isAdmin():
        data = withdraw.get_Withdrawals()
        return render_template("admin/withdrawal.html", data=data, onload=withdraw.OnloadWithdrawalDetails())
    else:
        return redirect("/login")
