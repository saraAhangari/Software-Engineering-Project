from django.urls import path
from .views import RegisterView, LogoutView, GetTokenView, RoleView, PatientValidationView, LoginView


urlpatterns = [
    path('validate', PatientValidationView.as_view()),
    path('register', RegisterView.as_view()),
    path('get_token', GetTokenView.as_view()),
    path('login', LoginView.as_view()),
    path('logout', LogoutView.as_view()),
    path('roles', RoleView.as_view(http_method_names=['get', 'post']), name='roles'),
    path('roles/<int:pk>/', RoleView.as_view(http_method_names=['get', 'put', 'delete'])),
]