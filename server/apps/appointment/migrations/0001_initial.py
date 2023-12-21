# Generated by Django 4.2.7 on 2023-12-21 13:08

import datetime
from django.conf import settings
import django.contrib.auth.models
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField(blank=True, default='-', null=True)),
                ('status', models.CharField(choices=[('reserved', 'reserved'), ('completed', 'completed'), ('canceled', 'canceled')], default='reserved')),
                ('type', models.CharField(choices=[('face to face', 'face to face'), ('online', 'online')], default='face to face')),
            ],
        ),
        migrations.CreateModel(
            name='Assurance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=32, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Doctor',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('description', models.TextField(blank=True, null=True)),
                ('medical_system_number', models.IntegerField(unique=True)),
                ('slice', models.IntegerField(default=30)),
            ],
            options={
                'verbose_name': 'doctor',
                'verbose_name_plural': 'doctors',
            },
            bases=('authentication.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Medicine',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('generic_name', models.CharField(blank=True, null=True)),
                ('infant_safe', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='PatientMedicalHistory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('height', models.FloatField(blank=True, null=True)),
                ('weight', models.FloatField(blank=True, null=True)),
                ('blood_group', models.CharField(blank=True, choices=[('A+', 'A Positive'), ('A-', 'A Negative'), ('B-', 'B Negative'), ('B+', 'B Positive'), ('O+', 'O Positive'), ('O-', 'O Negative'), ('AB-', 'AB Negative'), ('AB+', 'AB Positive')], default='A+', max_length=3, null=True)),
                ('blood_pressure', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'verbose_name': 'medical history',
                'verbose_name_plural': 'medical histories',
            },
        ),
        migrations.CreateModel(
            name='Speciality',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
            ],
            options={
                'verbose_name': 'Speciality',
                'verbose_name_plural': 'Specialities',
            },
        ),
        migrations.CreateModel(
            name='TimeSlice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(default=datetime.date.today)),
                ('start', models.IntegerField(default=-1)),
                ('end', models.IntegerField(default=-1)),
                ('status', models.CharField(choices=[('available', 'available'), ('unavailable', 'unavailable')], default='unavailable')),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='available_time_slices', to='appointment.doctor')),
            ],
        ),
        migrations.CreateModel(
            name='Prescription',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField(blank=True, null=True)),
                ('is_expired', models.BooleanField(default=False)),
                ('date', models.DateField()),
                ('appointment_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='prescription', to='appointment.appointment')),
                ('medicines', models.ManyToManyField(to='appointment.medicine')),
            ],
        ),
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('assurance', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='appointment.assurance')),
                ('medical_history', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='appointment.patientmedicalhistory')),
            ],
            options={
                'verbose_name': 'patient',
                'verbose_name_plural': 'patients',
            },
            bases=('authentication.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.AddField(
            model_name='doctor',
            name='speciality',
            field=models.ManyToManyField(to='appointment.speciality'),
        ),
        migrations.AddField(
            model_name='appointment',
            name='appointment_time',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='appointment', to='appointment.timeslice'),
        ),
        migrations.AddField(
            model_name='appointment',
            name='doctor_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appointment.doctor'),
        ),
        migrations.AddField(
            model_name='appointment',
            name='patient_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='appointments', to='appointment.patient'),
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('treatment_experience', models.TextField(blank=True, null=True)),
                ('point', models.IntegerField(default=1, validators=[django.core.validators.MaxValueValidator(5), django.core.validators.MinValueValidator(1)])),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('doctor_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='appointment.doctor')),
                ('patient_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='appointment.patient')),
            ],
            options={
                'ordering': ['created'],
                'indexes': [models.Index(fields=['created'], name='appointment_created_26ca88_idx')],
            },
        ),
    ]
