from django.core.validators import MaxLengthValidator, MinLengthValidator
from django.db import models
from django.contrib.auth.models import AbstractUser


class Role(models.Model):
    name = models.CharField(max_length=10, null=False, unique=True)

    def __str__(self):
        return f'{self.name}'


class User(AbstractUser):
    GENDER_CHOICES = [
        ('m', 'male'),
        ('f', 'female'),
        ('n', 'known')
    ]
    national_id = models.CharField(max_length=10, unique=True, validators=[
        MaxLengthValidator(limit_value=10, message="National ID should be exactly 10 characters."),
        MinLengthValidator(limit_value=10, message="National ID should be exactly 10 characters.")
    ])
    phone_no = models.CharField(max_length=11, unique=True, validators=[
        MaxLengthValidator(limit_value=11, message="Phone Number should be exactly 10 or 11 characters."),
        MinLengthValidator(limit_value=10, message="Phone Number should be exactly 10 or 11 characters.")
    ])
    birthdate = models.DateField(null=True)
    role = models.ForeignKey(Role, on_delete=models.PROTECT, default=-1)
    gender = models.CharField(choices=GENDER_CHOICES, default='n')
