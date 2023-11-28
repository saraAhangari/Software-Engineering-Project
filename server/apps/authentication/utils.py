from ippanel import Client, HTTPError, Error, ResponseCode
import random
from hospitalAppointment.settings import PANEL_API_KEY


def generate_confirmation_number():
    return random.randint(100000, 999999)


def send_message(confirmation_code, receiver_phone_number):
    api_key = PANEL_API_KEY
    sms = Client(api_key)
    try:
        message_id = sms.send("+9850002040000", ['+98' + receiver_phone_number],
                              f" به سامانه مدیریت نوبت دهی بیمارستان شهید بهشتی خوش آمدید. کد یکبار مصرف: ${confirmation_code}",
                              f'${confirmation_code}')
    except Error as e:  # ippanel sms error
        print(f"Error handled => code: {e.code}, message: {e.message}")
        if e.code == ResponseCode.ErrUnprocessableEntity.value:
            for field in e.message:
                print(f"Field: {field} , Errors: {e.message[field]}")
    except HTTPError as e:  # http error like network error, not found, ...
        print(f"Error handled => code: {e}")
