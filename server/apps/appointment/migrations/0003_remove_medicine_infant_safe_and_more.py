# Generated by Django 4.2.7 on 2024-01-28 10:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointment', '0002_remove_prescription_is_expired'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='medicine',
            name='infant_safe',
        ),
        migrations.AlterField(
            model_name='medicine',
            name='generic_name',
            field=models.CharField(blank=True, null=True, unique=True),
        ),
    ]
