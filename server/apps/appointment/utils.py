from datetime import datetime, time


def time_to_minutes(dt):
    if type(dt) == str:
        dt = datetime.strptime(dt, "%H:%M:%S")
    elif type(dt) == int:
        return dt
    return dt.hour * 60 + dt.minute


def minutes_to_time(minutes: int):
    hour = minutes // 60
    minutes = minutes % 60

    return time(hour=hour, minute=minutes)
