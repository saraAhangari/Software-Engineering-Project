from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    class Meta:
        permissions = [
            ("doctor", "permission to see their patients"),
            ("patient", "permission to take appointments"),
        ]

    GENDER_CHOICES = [
        ('m', 'male'),
        ('f', 'female')
    ]

    national_id = models.CharField(max_length=10, unique=True)
    phone_no = models.CharField(max_length=11, unique=True, validators=[])
    age = models.IntegerField(null=True)

    gender = models.CharField(
        choices=GENDER_CHOICES,
        default='m'
    )





