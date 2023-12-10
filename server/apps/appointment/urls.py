from django.urls import path
from .views import AssuranceView, CommentView,  DoctorDetailView, DoctorListView, PatientDetailView

urlpatterns = [
    # assurance
    path('assurance', AssuranceView.as_view()),

    # doctor
    path('doctors/<int:doctor_id>/', DoctorDetailView.as_view(), name='doctor-detail'),
    path('doctors', DoctorListView.as_view(), name='doctor-list'),

    # comment
    path('comment/<int:doctor_id>/', CommentView.as_view(), name='save_comment'),
    path('comments', CommentView.as_view(), name='get_comment'),

    # patient
    path('patient/profile', PatientDetailView.as_view(), name='patient-profile')
]