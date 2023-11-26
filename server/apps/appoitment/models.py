from django.db import models
from apps.authentication.models import User


# class Speciality(models.Model):
#     name = models.CharField(max_length=30)
#     about_me = models.TextField(null=True, blank=True)
#
#
# class Doctor(User):
#     medical_system_number = models.IntegerField()
#     fees = models.FloatField(default=100)
#     speciality = models.OneToOneField(Speciality, on_delete=models.CASCADE, blank=True, null=True)
#     satisfaction_percentage = models.FloatField(default=10)
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



