from django.db import models
from apps.authentication.models import User


class Speciality(models.Model):
    name = models.CharField(max_length=30)


class Doctor(User):
    description = models.TextField(null=True, blank=True)
    medical_system_number = models.IntegerField()
    fees = models.FloatField()
    slice = models.IntegerField(default=30)
    speciality = models.ManyToManyField(Speciality)


class TimeSlice(models.Model):
    date = models.DateField(null=True)
    start = models.TimeField(null=True)
    end = models.TimeField(null=True)
    TIME_STATUS = [
        ('available', 'available'),
        ('unavailable', 'unavailable')
    ]

    status = models.CharField(choices=TIME_STATUS, default='unavailable')


#
#
# class Medicine(models.Model):
#     generic_name = models.CharField(max_length=20)
#     infant_safe = models.BooleanField(default=False)
#     quantity_available = models.IntegerField(default=0)
#     price = models.FloatField()
#
#
class Assurance(models.Model):
    name = models.CharField(max_length=32)
