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


class PatientMedicalHistory(models.Model):
    BLOOD_GROUP_CHOICES = (
        ('A+', 'A Positive'),
        ('A-', 'A Negative'),
        ('B-', 'B Negative'),
        ('B+', 'B Positive'),
        ('O+', 'O Positive'),
        ('O-', 'O Negative'),
        ('AB-', 'AB Negative'),
        ('AB+', 'AB Positive'),
    )

    height = models.FloatField(),
    weight = models.FloatField(),
    blood_group = models.CharField(max_length=3, choices=BLOOD_GROUP_CHOICES)
    blood_pressure = models.IntegerField()


class Patient(User):
    assurance = models.ForeignKey(Assurance, on_delete=models.PROTECT, null=True)
    medical_history = models.OneToOneField(PatientMedicalHistory, on_delete=models.CASCADE)



