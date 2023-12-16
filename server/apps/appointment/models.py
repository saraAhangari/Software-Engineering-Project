import datetime

import django
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from apps.authentication.models import User


class Speciality(models.Model):
    name = models.CharField(max_length=30)

    class Meta:
        verbose_name = 'Speciality'
        verbose_name_plural = 'Specialities'

    def __str__(self):
        return f'{self.name}'


class Doctor(User):
    description = models.TextField(null=True, blank=True)
    medical_system_number = models.IntegerField(unique=True)
    fees = models.FloatField()
    slice = models.IntegerField(default=30)
    speciality = models.ManyToManyField(Speciality)

    class Meta:
        verbose_name = 'doctor'
        verbose_name_plural = 'doctors'

    def __str__(self):
        return f'{self.id} - {self.last_name}'


class TimeSlice(models.Model):
    date = models.DateField(default=datetime.date.today)
    start = models.IntegerField(default=-1)
    end = models.IntegerField(default=-1)
    TIME_STATUS = [
        ('available', 'available'),
        ('unavailable', 'unavailable')
    ]

    status = models.CharField(choices=TIME_STATUS, default='unavailable')
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='available_time_slices')


class Assurance(models.Model):
    name = models.CharField(max_length=32, unique=True)

    def __str__(self):
        return f'{self.name}'


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

    height = models.FloatField(blank=True, null=True)
    weight = models.FloatField(blank=True, null=True)
    blood_group = models.CharField(max_length=3, choices=BLOOD_GROUP_CHOICES, default="A+", blank=True, null=True)
    blood_pressure = models.IntegerField(blank=True, null=True)

    class Meta:
        verbose_name = 'medical history'
        verbose_name_plural = 'medical histories'

    def __str__(self):
        return f'{self.id}'


class Patient(User):
    assurance = models.ForeignKey(Assurance, on_delete=models.PROTECT, null=True)
    medical_history = models.OneToOneField(PatientMedicalHistory, on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        verbose_name = 'patient'
        verbose_name_plural = 'patients'

    def __str__(self):
        return f'{self.national_id}'


class Medicine(models.Model):
    generic_name = models.CharField(null=True, blank=True)
    infant_safe = models.BooleanField(default=True)
    price = models.FloatField()


class Appointment(models.Model):
    APPOINTMENT_STATUS = [
        ('reserved', 'reserved'),
        ('completed', 'completed'),
        ('canceled', 'canceled'),
    ]

    APPOINTMENT_TYPE = [
        ('face to face', 'face to face'),
        ('online', 'online')
    ]
    patient_id = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='appointments')
    doctor_id = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    description = models.TextField(null=True, blank=True, default='-')
    status = models.CharField(choices=APPOINTMENT_STATUS, default='reserved')
    type = models.CharField(choices=APPOINTMENT_TYPE, default='face to face')
    appointment_time = models.OneToOneField(TimeSlice, on_delete=models.CASCADE, related_name='appointment')

    def __str__(self):
        return f'{self.id} - {self.type}'


class Prescription(models.Model):
    appointment_id = models.OneToOneField(Appointment, on_delete=models.CASCADE, related_name='prescription')
    description = models.TextField(null=True, blank=True)
    is_expired = models.BooleanField(default=False)
    date = models.DateField(auto_now_add=False)

    def __str__(self):
        return f'{self.appointment_id} - {self.date}'


class Comment(models.Model):
    doctor_id = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name="comments")
    patient_id = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="comments")
    treatment_experience = models.TextField(blank=True, null=True)
    point = models.IntegerField(default=1, validators=[MaxValueValidator(5), MinValueValidator(1)])
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created']
        indexes = [
            models.Index(fields=['created']),
        ]

    def __str__(self):
        return f'Comment by {self.patient_id} on {self.doctor_id}'

