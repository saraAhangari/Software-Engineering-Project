from django.urls import path
from .views import AssuranceView, DoctorView


urlpatterns = [
    path('assurance', AssuranceView.as_view()),
    path('doctor', DoctorView.as_view()),
]