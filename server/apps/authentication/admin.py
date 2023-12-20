from django.contrib import admin
from .models import User, Role
from import_export.admin import ImportExportModelAdmin


@admin.register(User)
class UserAdmin(ImportExportModelAdmin):
    list_display = ('id', 'username', 'national_id', 'phone_no', 'birthdate', 'role', 'gender')
    list_filter = ('role', 'gender')
    search_fields = ('national_id', 'phone_no', 'birthdate', 'role', 'gender')

    class Meta:
        model = User


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('id', 'name')

    class Meta:
        model = Role
