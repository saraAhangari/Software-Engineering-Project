from django.urls import path
from .views import RegisterView, LogoutView, GetTokenView, RoleView, PatientValidationView, LoginView


urlpatterns = [
    path('validate', PatientValidationView.as_view(), name='validate'),
    path('register', RegisterView.as_view(), name='register'),
    path('get_token', GetTokenView.as_view(), name='get_token'),
    path('login', LoginView.as_view(), name='login'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('roles', RoleView.as_view(http_method_names=['get', 'post']), name='roles'),
    path('roles/<int:pk>', RoleView.as_view(http_method_names=['get', 'put', 'delete']), name='role'),
]