# Generated by Django 4.2.7 on 2023-12-20 12:44

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("appointment", "0009_alter_appointment_doctor_id"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="doctor",
            name="fees",
        ),
        migrations.RemoveField(
            model_name="medicine",
            name="price",
        ),
        migrations.AddField(
            model_name="prescription",
            name="medicines",
            field=models.ManyToManyField(to="appointment.medicine"),
        ),
    ]
