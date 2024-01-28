from django.test import TestCase, override_settings
from django.urls import reverse
from django.core.cache import cache
from django.core.management import call_command
from apps.appointment.models import Patient, Doctor
from apps.authentication.models import Role


# class TimeSliceViewTest(TestCase):
#     @classmethod
#     def setUpTestData(cls):
#         call_command(command_name='create_roles')
#
#     @override_settings(CACHES={'default': {'BACKEND': 'django.core.cache.backends.locmem.LocMemCache'}})
#     def test_set_doctor_time_slices(self):
#         Doctor.objects.get_or_create(first_name='ahmad', last_name='ahmadi', national_id='9898989898',
#                                      phone_no='9898989898', birthdate='2002-12-23', gender='m',
#                                      role=Role.objects.get(name='doctor'), slice=40, description='',
#                                      medical_system_number=123487)
#
#         response = self.client.post('/api/v1/login', data={'national_id': '9898989898'})
#         self.assertEqual(response.status_code, 200)
#         response = self.client.post('/api/v1/get_token',
#                                     data={'national_id': '9898989898', 'otp': cache.get('9898989898')})
#
#         self.assertEqual(response.status_code, 200)
#
#         response = self.client.post('/api/v1/timeslices', headers={
#             'Authorization': response.json['access_token']
#         }, data={
#             "available_time_slices": [
#                 {
#                     "date": "2023-12-26",
#                     "start": "9:0:0",
#                     "end": "13:0:0"
#                 },
#                 {
#                     "date": "2023-12-26",
#                     "start": "17:30:0",
#                     "end": "20:45:0"
#                 },
#             ]
#         })
#
#         self.assertEqual(response.status_code, 200)


class DoctorListView(TestCase):
    @classmethod
    def setUpTestData(cls):
        call_command(command_name='create_roles')
        Doctor.objects.create(first_name='محمد', last_name='محمدی', national_id='4314314312', username='4314314312',
                              phone_no='4314314312', birthdate='2002-12-23', gender='m',
                              role=Role.objects.get(name='doctor'), slice=40, description='',
                              medical_system_number=585989).save()

        Doctor.objects.create(first_name='مهدی', last_name='عقیلی', national_id='1235621324', username='1235621324',
                              phone_no='1235621324', birthdate='2002-12-23', gender='m',
                              role=Role.objects.get(name='doctor'), slice=40, description='',
                              medical_system_number=978457).save()

        Doctor.objects.create(first_name='علی', last_name='علوی', national_id='4690012345', username='4690012345',
                              phone_no='4690012345', birthdate='2002-12-23', gender='m',
                              role=Role.objects.get(name='doctor'), slice=40, description='',
                              medical_system_number=754874).save()

    def test_get_doctor_list(self):
        response = self.client.get('/api/v1/doctors')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)

    def test_get_doctor_list_by_first_name(self):
        response = self.client.get('/api/v1/doctors?first_name=م')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)

    def test_get_doctor_list_by_last_name(self):
        response = self.client.get('/api/v1/doctors?first_name=ع')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)

    def test_get_doctor_limit_offset(self):
        response = self.client.get('/api/v1/doctors?limit=2&offset=1')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)

    def test_get_doctor_offset(self):
        response = self.client.get('/api/v1/doctors?limit=2&offset=0')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)
