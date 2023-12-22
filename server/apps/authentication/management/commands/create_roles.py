from django.core.management.base import BaseCommand
from apps.authentication.models import Role


class Command(BaseCommand):
    help = 'create essential roles'

    def handle(self, *args, **kwargs):
        Role.objects.get_or_create(name='admin')
        Role.objects.get_or_create(name='doctor')
        Role.objects.get_or_create(name='patient')

        self.stdout.write('roles created')
