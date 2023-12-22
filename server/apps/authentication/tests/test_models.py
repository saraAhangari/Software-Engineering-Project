from django.test import TestCase
from apps.authentication.models import Role


class RoleModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Role.objects.create(name='admin')
        Role.objects.create(name='doctor')
        Role.objects.create(name='patient')

    def test_name_label(self):
        admin_role = Role.objects.get(id=1)
        field_label = admin_role._meta.get_field('name').verbose_name
        self.assertEqual(field_label, 'name')

    def test_name_value(self):
        admin_role = Role.objects.get(id=1)
        self.assertEqual(admin_role.name, 'admin')

    def test_name_max_length(self):
        role = Role.objects.get(id=1)
        max_length = role._meta.get_field('name').max_length
        self.assertEqual(max_length, 10)

