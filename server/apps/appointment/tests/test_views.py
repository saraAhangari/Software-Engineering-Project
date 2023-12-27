# from django.test import TestCase, override_settings
# from django.urls import reverse
# from django.core.cache import cache
# from django.core.management import call_command
# from apps.appointment.models import Patient, Doctor
# from apps.authentication.models import Role
#
#
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