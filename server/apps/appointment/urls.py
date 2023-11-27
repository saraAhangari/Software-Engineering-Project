from django.urls import path
from .views import AssuranceView


urlpatterns = [
    path('assurance', AssuranceView.as_view()),
]