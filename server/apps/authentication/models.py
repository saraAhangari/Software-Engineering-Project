from django.db import models
from django.contrib.auth.models import AbstractUser


class Role(models.Model):
    name = models.CharField(max_length=10, null=False)

    def __str__(self):
        return f'{self.name}'


class User(AbstractUser):
    GENDER_CHOICES = [
        ('m', 'male'),
        ('f', 'female')
    ]

    national_id = models.CharField(max_length=10, unique=True)
    phone_no = models.CharField(max_length=11, unique=True, validators=[])
    birthdate = models.DateTimeField(null=True)
    role = models.ForeignKey(Role, on_delete=models.PROTECT, default=1)
    gender = models.CharField(choices=GENDER_CHOICES, default='m')
