from django.core.management import call_command
from django.test import TestCase
from apps.authentication.models import Role, User


class RoleModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        call_command(command_name='create_roles')

    def test_name_label(self):
        admin_role = Role.objects.get(name='admin')
        field_label = admin_role._meta.get_field('name').verbose_name
        self.assertEqual(field_label, 'name')

    def test_name_value(self):
        admin_role = Role.objects.get(name='admin')
        self.assertEqual(admin_role.name, 'admin')

    def test_name_max_length(self):
        role = Role.objects.get(name='admin')
        max_length = role._meta.get_field('name').max_length
        self.assertEqual(max_length, 10)


class UserModelSerializer(TestCase):
    user_json = None

    @classmethod
    def setUpTestData(cls):
        call_command(command_name='create_roles')

    def test_field_label(self):
        User.objects.create(first_name='saeed', last_name='zare', national_id='4480158693',
                            phone_no='9140887539', birthdate='2002-12-6',
                            role=Role.objects.get(name='patient'),
                            gender='m')

        user = User.objects.get(national_id='4480158693')
        national_id_label = user._meta.get_field('national_id').verbose_name
        phone_no_label = user._meta.get_field('phone_no').verbose_name
        gender_label = user._meta.get_field('gender').verbose_name

        self.assertEqual(national_id_label, 'national_id')
        self.assertEqual(phone_no_label, 'phone_no')
        self.assertEqual(gender_label, 'gender')

    def test_field_value(self):
        user_json = User.objects.create(first_name='saeed', last_name='zare', national_id='4480158693',
                                        phone_no='9140887539', birthdate='2002-12-6',
                                        role=Role.objects.get(name='patient'),
                                        gender='m')
        user_json.save()

        user = User.objects.get(national_id='4480158693')

        self.assertEqual(user.first_name, user_json.first_name)
        self.assertEqual(user.last_name, user_json.last_name)
        self.assertEqual(user.national_id, user_json.national_id)
        self.assertEqual(user.phone_no, user_json.phone_no)
        self.assertEqual(user.gender, user_json.gender)
