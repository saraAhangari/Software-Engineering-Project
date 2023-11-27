from django.urls import path
from .views import RegisterView, LogoutView, OtpGenerator, GetToken, RoleView


urlpatterns = [
    path('register', RegisterView.as_view()),
    path('otp/generate', OtpGenerator.as_view()),
    path('get_token', GetToken.as_view()),
    path('logout', LogoutView.as_view()),
    path('role', RoleView.as_view())
]