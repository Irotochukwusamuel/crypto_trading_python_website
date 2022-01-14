# pylint: disable=no-member
import math
import os
import time
import bleach


basedir = os.path.abspath(os.path.dirname(__file__))

# THE APP NAME
admin_id = "admin"
admin_email = "admin_email"

# THE DATABASE NAME
database_name = 'your_database_name'
db_host = 'localhost'
db_username = 'your_database_username'
db_password = 'your_database_password'



user_cookie = "crz_"

image_save_location = "static/upload/"
chat_save_location = "static/chat/"




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
