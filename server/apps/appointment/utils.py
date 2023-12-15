from datetime import datetime, time


def split_datetime(dt: str):
    dt = datetime.strptime(dt, "%Y-%m-%d %H:%M:%S")
    return dt.date(), dt.time()


def time_to_minutes(dt: datetime):
    return dt.hour * 60 + dt.minute


def minutes_to_time(minutes: int):
    hour = minutes // 60
    minutes = minutes % 60

    return time(hour=hour, minute=minutes)
