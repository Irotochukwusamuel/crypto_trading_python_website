# pylint: disable=no-member
import math
import os
import time

import bleach
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

basedir = os.path.abspath(os.path.dirname(__file__))

# THE APP NAME
admin_id = "admin"
admin_email = "ocowry@gmail.com"

# THE DATABASE NAME
database_name = 'vestnance'
db_host = 'localhost'
db_username = 'root'
db_password = ''

# database_name = 'prorocke_logistics'
# db_host = 'localhost_sasaj'
# db_username = 'prorocke_root'
# db_password = '-%f5jPAfcJ&H'

user_cookie = "crz_"

image_save_location = "static/upload/"
chat_save_location = "static/chat/"


def sendMail(to, subject, content):
    message = Mail(
        from_email='ocowry@gmail.com',
        to_emails=f'{to}',
        subject=f'{subject}',
        html_content=f'<div style="width: 90%;margin: auto;border: 1px solid lightgray; background: white;height: '
                     f'55vh;"><div style="height: 90px;background: #424242;color: '
                     f'white;font-size: 23px;'
                     f'font-family: sans-serif;letter-spacing: 0.5px;text-align: '
                     f'center;display:table-cell;vertical-align: middle;width:100vw;"> '
                     f'{subject}</div><p style="padding: 20px;font-family: sans-serif;letter-spacing: '
                     f'0.5px;color: #464141; font-size:15px;">Hello,</p><div style="padding: 0 20px 20px 20px;"><p '
                     f'style="font-family: sans-serif;letter-spacing: 0.5px;color: #464141; font-size: '
                     f'15px;margin-bottom: 10px;"> {content}</p></div'
                     f'></div>')
    try:
        sg = SendGridAPIClient("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")
        response = sg.send(message)
        print(response.status_code)
    except Exception as e:
        return True


def WelcomeMail(to, subject, name):
    message = Mail(
        from_email='ocowry@gmail.com',
        to_emails=f'{to}',
        subject=f'{subject}',
        html_content=f'<div style="width: 90%;margin: auto;border: 1px solid lightgray; background: white;height: '
                     f'55vh;"><div style="height: 90px;background: linear-gradient(to right, purple , blue);color: '
                     f'white;font-size: 23px;'
                     f'font-family: sans-serif;letter-spacing: 0.5px;text-align: '
                     f'center;display:table-cell;vertical-align: middle;width:100vw;"> '
                     f'Welcome to Ocowry</div><p style="padding: 20px;font-family: sans-serif;letter-spacing: '
                     f'0.5px;color: #464141; font-size:15px;">Hi {name},</p><div style="padding: 0 20px 20px 20px;"><p '
                     f'style="font-family: sans-serif;letter-spacing: 0.5px;color: #464141; font-size: '
                     f'15px;margin-bottom: 10px;">Thanks for signing up with Ocowry! <br> Click on the link below '
                     f' to get started on amazing Investment plans with Ocowry! </p> <a href = '
                     f'"https://www.ocowry.com/user-investment"style="color: inherit;text-decoration: '
                     f'underline;letter-spacing: 0.5px;font-size:15px;">https://ocowry.com/user-investment</a></div'
                     f'></div>')

    try:
        sg = SendGridAPIClient("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")
        response = sg.send(message)
        print(response.status_code)
    except Exception as e:
        return True


def GettingStartedMail(to, subject, name):
    message = Mail(
        from_email='ocowry@gmail.com',
        to_emails=f'{to}',
        subject=f'{subject}',
        html_content=f'<div style="width: 90%;margin: auto;border: 1px solid lightgray; background: white;height: '
                     f'100%;"><div style="height: 90px;background:#424242;color: '
                     f'white;font-size: 23px;'
                     f'font-family: sans-serif;letter-spacing: 0.5px;text-align: '
                     f'center;display:table-cell;vertical-align: middle;width:100vw;"> '
                     f'Getting Started</div><p style="padding: 20px;font-family: sans-serif;letter-spacing: '
                     f'0.5px;color: #464141; font-size:15px;">Hi {name},</p><div style="padding: 0 20px 20px 20px;"><p '
                     f'style="font-family: sans-serif;letter-spacing: 0.5px;color: #464141; font-size: '
                     f'15px;margin-bottom: 10px;">We are here to help you invest wisely in crypto and stock from '
                     f'anywhere in the world. All you have to do is '
                     f'choose from any of our amazing invesment plan below</p>'
                     f'<ul><li style="list-style: disc;font-size: 15px;font-family: sans-serif;font-weight: '
                     f'bold;margin: 10px 0;"><a href="https://www.ocowry.com/user-investment" style="text-decoration: '
                     f'none;color: black;letter-spacing: 0.5px;font-family: sans-serif">Starter Plan (3 days '
                     f'Plan)</a></li><li style="list-style: disc;font-size: 15px;font-family: sans-serif;font-weight: '
                     f'bold;margin: 10px 0;"><a href="https://www.ocowry.com/user-investment" style="text-decoration: '
                     f'none;color: black;letter-spacing: 0.5px;font-family: sans-serif">Super promo Plan (3 days '
                     f'Plan)</a></li><li style="list-style: disc;font-size: 15px;font-family: sans-serif;font-weight: '
                     f'bold;margin: 10px 0;"><a href="https://www.ocowry.com/user-investment" style="text-decoration: '
                     f'none;color: black;letter-spacing: 0.5px;font-family: sans-serif">Advanced Plan (5 days '
                     f'Plan)</a></li><li style="list-style: disc;font-size: 15px;font-family: sans-serif;font-weight: '
                     f'bold;margin: 10px 0;"><a href="https://www.ocowry.com/user-investment" style="text-decoration: '
                     f'none;color: black;letter-spacing: 0.5px;font-family: sans-serif">Classic Plan (6 days '
                     f'Plan)</a></li><li style="list-style: disc;font-size: 15px;font-family: sans-serif;font-weight: '
                     f'bold;margin: 10px 0;"><a href="https://www.ocowry.com/user-investment" style="text-decoration: '
                     f'none;color: black;letter-spacing: 0.5px;font-family: sans-serif">Professional Plan (10 days '
                     f'Plan)</a></li></ul> '
                     f' <a href = '
                     f'"https://www.ocowry.com/user-investment"style="color: inherit;text-decoration: '
                     f'underline;letter-spacing: 0.5px;font-size:15px;">https://ocowry.com/user-investment</a>'
                     f'<p style="font-family: sans-serif;letter-spacing: 0.5px;color: #464141;font-size: 14px;margin: '
                     f'40px 0;">Thanks for choosing Ocowry!</p> '
                     f'</div'
                     f'></div>')

    try:
        sg = SendGridAPIClient("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")
        response = sg.send(message)
        print(response.status_code)
    except Exception as e:
        return True


# CLEANING USER INPUT
def sanitize_Html(value):
    value = bleach.clean(value)
    return value


def TimeConverter(delta, **kw):
    halfstr = u'\u00BD'
    nohalf = u''
    # Now
    if delta < 0.5:
        return u'now'

    # < 1 hour
    mins = delta / 60.
    if mins < 1.5:
        return u'1m'
    if mins < 60:
        return u'%dm' % math.ceil(mins)

    # < 1 day
    if mins < 75:
        return u'1h'
    hours, mins = divmod(mins, 60)
    if 15 <= mins <= 45:
        half = halfstr
    else:
        half = nohalf
        if mins > 45:
            hours += 1
    if hours < 24:
        return u'%dh' % math.ceil(hours)

    # < 7 days
    if hours < 30:
        return u'1d'
    days, hours = divmod(hours, 24)
    if 6 <= hours <= 18:
        half = halfstr
    else:
        half = nohalf
        if hours > 18:
            days += 1
    if days < 7:
        return u'%dd' % math.ceil(days)

    # < 4 weeks
    if days < 9:
        return u'1w'
    weeks, wdays = divmod(days, 7)
    if 2 <= wdays <= 4:
        half = halfstr
    else:
        half = nohalf
        if wdays > 4:
            weeks += 1
    if weeks < 4:  # So we don't get 4 weeks
        return u'%dw' % math.ceil(weeks)

    # < year
    if days < 40:
        return u'1mn'
    months, days = divmod(days, 30.4)
    if 10 <= days <= 20:
        half = halfstr
    else:
        half = nohalf
        if days > 20:
            months += 1
    if months < 12:
        return u'%dmn' % math.ceil(months)

    # Don't go further
    if months < 16:
        return u'1y'
    years, months = divmod(months, 12)
    if 4 <= months <= 8:
        half = halfstr
    else:
        half = nohalf
        if months > 8:
            years += 1
    return u'%dy' % math.ceil(years)


# GETTING CURRENT TIME
def get_current_time():
    get_time = str(time.time())
    current_time = get_time.rsplit('.')[0]
    return int(current_time)
