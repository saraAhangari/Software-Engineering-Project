from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    national_id = models.CharField(max_length=10, unique=True)

    phone_no = models.CharField(max_length=11, unique=True)

    age = models.IntegerField(default=1)

    ROLE_CHOICES = [
        ('admin', 'admin'),
        ('hospital', 'hospital'),
        ('patient', 'patient')
    ]

    role = models.CharField(
        max_length=10,
        choices=ROLE_CHOICES,
        default='patient')

    GENDER_CHOICES = [
        ('m', 'male'),
        ('f', 'female')
    ]

    gender = models.CharField(
        choices=GENDER_CHOICES,
        default='m'
    )



