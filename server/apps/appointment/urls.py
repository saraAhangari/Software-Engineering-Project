from django.urls import path
from .views import AssuranceView, DoctorDetailView, DoctorListView, PatientDetailView, AddCommentView, \
    GetCommentView, CommentPermissionView, MedicalHistoryView, AppointmentDetailView, DoctorTimeSliceView, TimeSliceView, AppointmentView

urlpatterns = [
    # assurance
    path('assurance', AssuranceView.as_view()),

    # doctor
    path('doctors/<int:doctor_id>/', DoctorDetailView.as_view(), name='doctor-detail'),
    path('doctors', DoctorListView.as_view(), name='doctor-list'),

    # comment
    path('comment/<int:doctor_id>/', AddCommentView.as_view(), name='save_comment'),
    path('comments', GetCommentView.as_view(), name='get_comment'),
    path('comment/<int:doctor_id>/permission', CommentPermissionView.as_view(), name='comment_add_permission'),

    # patient
    path('patient/profile', PatientDetailView.as_view(), name='patient-profile'),
    path('patient/medical_history', MedicalHistoryView.as_view(), name='patient-medical-history'),

    # appointment
    path('patient/appointment', AppointmentDetailView.as_view(), name='patient-appointment'),

    # timeSlice
    path('timeslices', DoctorTimeSliceView.as_view()),
    path('timeslices/<int:doctor_id>', TimeSliceView.as_view(http_method_names=['get'])),

    # appointment
    path('appointments', AppointmentView.as_view()),
    path('appointments/<int:appointment_id>', AppointmentView.as_view())
]
