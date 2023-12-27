import time

from ippanel import Client, HTTPError, Error, ResponseCode
import random

from apps.appointment.models import Patient
from hospitalAppointment.settings import PANEL_API_KEY
from django.core.cache import cache
from hospitalAppointment.celery import app


def generate_confirmation_number():
    return random.randint(100000, 999999)


@app.task
def send_message(confirmation_code, receiver_phone_number):
    sms = Client(PANEL_API_KEY)
    try:
        message_id = sms.send("+989981801484", ['+98' + receiver_phone_number],
                              f" به سامانه مدیریت نوبت دهی بیمارستان شهید بهشتی خوش آمدید. کد یکبار مصرف: {confirmation_code}",
                              f'${confirmation_code}')
    except Error as e:  # ippanel sms error
        # print(f"Error handled => code: {e.code}, message: {e.message}")
        if e.code == ResponseCode.ErrUnprocessableEntity.value:
            for field in e.message:
                print(f"Field: {field} , Errors: {e.message[field]}")
    except HTTPError as e:  # http error like network error, not found, ...
        print(f"Error handled => code: {e}")


def send_otp(phone_no):
    try:
        confirmation_code = generate_confirmation_number()

        print(phone_no)
        print(f'otp code is {confirmation_code}')  # TODO

        send_message.delay(confirmation_code, phone_no)
        cache.set(phone_no, confirmation_code, 120)
        return True

    except:
        return False
