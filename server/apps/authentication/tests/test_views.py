from django.test import TestCase
from django.urls import reverse

from apps.authentication.models import Role


class RoleViewTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Role.objects.create(name='admin')
        Role.objects.create(name='doctor')
        Role.objects.create(name='patient')

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
