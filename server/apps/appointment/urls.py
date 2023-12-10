from django.urls import path
from .views import AssuranceView, DoctorView, CommentView

urlpatterns = [
    path('assurance', AssuranceView.as_view()),
    path('doctors/<int:doctor_id>/', DoctorView.as_view(), name='doctor-detail'),
    path('doctors', DoctorView.as_view(), name='doctor-list'),
    path('comment/<int:doctor_id>/', CommentView.as_view(), name='save_comment'),
]