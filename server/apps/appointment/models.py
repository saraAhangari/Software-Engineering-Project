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
    medical_system_number = models.IntegerField()
    fees = models.FloatField()
    slice = models.IntegerField(default=30)
    speciality = models.ManyToManyField(Speciality)

    class Meta:
        verbose_name = 'doctor'
        verbose_name_plural = 'doctors'

    def __str__(self):
        return f'{self.id} - {self.last_name}'


class TimeSlice(models.Model):
    date = models.DateField(null=True)
    start = models.TimeField(null=True)
    end = models.TimeField(null=True)
    TIME_STATUS = [
        ('available', 'available'),
        ('unavailable', 'unavailable')
    ]

    status = models.CharField(choices=TIME_STATUS, default='unavailable')


class Assurance(models.Model):
    name = models.CharField(max_length=32)

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

    height = models.FloatField()
    weight = models.FloatField()
    blood_group = models.CharField(max_length=3, choices=BLOOD_GROUP_CHOICES)
    blood_pressure = models.IntegerField()

    class Meta:
        verbose_name = 'medical history'
        verbose_name_plural = 'medical histories'

    def __str__(self):
        return f'{self.id}'


class Patient(User):
    assurance = models.ForeignKey(Assurance, on_delete=models.PROTECT, null=True)
    medical_history = models.OneToOneField(PatientMedicalHistory, on_delete=models.CASCADE, null=True)

    class Meta:
        verbose_name = 'patient'
        verbose_name_plural = 'patients'

    def __str__(self):
        return f'{self.id} - {self.last_name}'


class Medicine(models.Model):
    generic_name = models.CharField(null=True, blank=True)
    infant_safe = models.BooleanField(default=True)
    price = models.FloatField()


class Appointment(models.Model):
    APPOINTMENT_STATUS = [
        ('completed', 'completed'),
        ('canceled', 'canceled'),
        ('reserved', 'reserved')
    ]

    APPOINTMENT_TYPE = [
        ('face to face', 'face to face'),
        ('online', 'online')
    ]
    patient_id = models.ForeignKey(Patient, on_delete=models.PROTECT)
    doctor_id = models.ForeignKey(Doctor, on_delete=models.PROTECT)
    date = models.DateTimeField(auto_now_add=False)
    description = models.TextField(null=True, blank=True)
    status = models.CharField(choices=APPOINTMENT_STATUS, default='canceled')
    type = models.CharField(choices=APPOINTMENT_TYPE, default='online')

    def __str__(self):
        return f'{self.id} - {self.type}'


class Prescription(models.Model):
    appointment_id = models.ForeignKey(Appointment, on_delete=models.PROTECT)
    description = models.TextField(null=True, blank=True)
    is_expired = models.BooleanField(default=False)
    date = models.DateField(auto_now_add=False)

    def __str__(self):
        return f'{self.appointment_id} - {self.date}'


class Comment(models.Model):
    doctor_id = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    patient_id = models.ForeignKey(Patient, on_delete=models.CASCADE)
    treatment_experience = models.TextField(blank=True, null=True)
    recommend_to_other = models.BooleanField(blank=False)
    point = models.IntegerField()


class DoctorTime(TimeSlice):
    doctor_id = models.ForeignKey(Doctor, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = 'doctor times'

    def __str__(self):
        return f'{self.id}'


class AppointmentTime(TimeSlice):
    appointment_id = models.ForeignKey(Appointment, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = 'appointment times'

    def __str__(self):
        return f'{self.id}'
