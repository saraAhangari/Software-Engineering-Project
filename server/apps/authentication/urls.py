from django.urls import path
from .views import RegisterView, LogoutView, OtpGenerator, GetToken


urlpatterns = [
    path('otp/generate', OtpGenerator.as_view()),
    path('get_token', GetToken.as_view()),
    path('logout', LogoutView.as_view())
]