from django.core.management import call_command
from django.test import TestCase
from apps.appointment.models import Patient, Assurance, Doctor, Speciality
from apps.authentication.models import Role


class PatientModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        call_command(command_name='create_roles')
        Assurance.objects.create(name='tst').save()
        Patient.objects.create(first_name='aaa', last_name='bbb',
                               national_id='1234567890', phone_no='1234567890',
                               role=Role.objects.get(name='patient'),
                               gender='m', assurance=Assurance.objects.get(name='tst'), birthdate='2002-12-10')

    def test_name_label(self):
        patient = Patient.objects.get(national_id='1234567890')
        field_label = patient._meta.get_field('assurance').verbose_name
        self.assertEqual(field_label, 'assurance')

    def test_name_value(self):
        patient = Patient.objects.get(national_id='1234567890')
        self.assertEqual(patient.first_name, 'aaa')
        self.assertEqual(patient.last_name, 'bbb')
        self.assertEqual(patient.national_id, '1234567890')
        self.assertEqual(patient.phone_no, '1234567890')


class DoctorModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        call_command(command_name='create_roles')
        Assurance.objects.create(name='tst').save()
        Speciality.objects.create(name='tst2').save()
        Doctor.objects.create(first_name='aaa', last_name='bbb', description='salam',
                              medical_system_number=123456, slice=30,
                              national_id='1234567811', phone_no='1234567811', role=Role.objects.get(name='doctor'),
                              gender='m', birthdate='2002-12-10')

    def test_name_value(self):
        doctor = Doctor.objects.get(national_id='1234567811')
        self.assertEqual(doctor.first_name, 'aaa')
        self.assertEqual(doctor.last_name, 'bbb')
        self.assertEqual(doctor.national_id, '1234567811')
        self.assertEqual(doctor.phone_no, '1234567811')
