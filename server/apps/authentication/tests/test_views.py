from django.test import TestCase, override_settings
from django.urls import reverse
from django.core.cache import cache
from django.core.management import call_command
from apps.appointment.models import Patient
from apps.authentication.models import Role


class RoleViewTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        call_command(command_name='create_roles')

    def test_view_url_exists_at_desired_location(self):
        response = self.client.get('/api/v1/roles')
        self.assertEqual(response.status_code, 200)

    def test_view_url_accessible_by_name(self):
        response = self.client.get(reverse('roles'))
        self.assertEqual(response.status_code, 200)

    def test_lists_all_roles(self):
        response = self.client.get('/api/v1/roles')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()['roles']), 3)


class AuthenticationViewTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        call_command(command_name='create_roles')

    @override_settings(CACHES={'default': {'BACKEND': 'django.core.cache.backends.locmem.LocMemCache'}})
    def setUp(self):
        super().setUp()
        cache.clear()

    @override_settings(CACHES={'default': {'BACKEND': 'django.core.cache.backends.locmem.LocMemCache'}})
    def test_success_patient_validate(self):
        person = {
            "first_name": "ali",
            "last_name": "alavi",
            "national_id": "4480158693",
            "phone_no": "09140887539",
            "birthdate": "2023-12-21",
            "gender": "m",
        }

        response = self.client.post('/api/v1/validate', data=person)

        self.assertEqual(response.json(), {'ok': True, 'message': 'otp sent to the user'})
        self.assertEqual(response.status_code, 200)

    @override_settings(CACHES={'default': {'BACKEND': 'django.core.cache.backends.locmem.LocMemCache'}})
    def test_success_patient_register_process(self):
        person = {
            "first_name": "saeed",
            "last_name": "zare",
            "national_id": "4480158693",
            "phone_no": "09140887539",
            "birthdate": "2023-12-21",
            "gender": "m",
        }

        response = self.client.post('/api/v1/validate', data=person)

        self.assertEqual(response.json(), {'ok': True, 'message': 'otp sent to the user'})
        self.assertEqual(response.status_code, 200)

        person['otp'] = cache.get(person['phone_no'])
        response = self.client.post('/api/v1/register', data=person)

        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.json())
        self.assertIsNotNone(response.json()['id'])
        self.assertEqual(response.json()['first_name'], person['first_name'])
        self.assertEqual(response.json()['last_name'], person['last_name'])
        self.assertEqual(response.json()['national_id'], person['national_id'])
        self.assertEqual(response.json()['birthdate'], person['birthdate'])
        self.assertEqual(response.json()['gender'], person['gender'])

    @override_settings(CACHES={'default': {'BACKEND': 'django.core.cache.backends.locmem.LocMemCache'}})
    def test_success_patient_login_process(self):
        Patient.objects.get_or_create(first_name='akbar', last_name='akbari', national_id='1234567899',
                                      phone_no='1234567899', birthdate='2002-12-23', gender='m',
                                      role=Role.objects.get(name='patient'))

        response = self.client.post('/api/v1/login', data={'national_id': '1234567899'})

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'ok': True, 'message': 'otp sent to the user'})

        response = self.client.post('/api/v1/get_token',
                                    data={'national_id': '1234567899', 'otp': cache.get('1234567899')})

        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.json()['access_token'])
