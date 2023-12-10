from django.urls import path
from .views import AssuranceView, DoctorView, CommentView

urlpatterns = [
    path('assurance', AssuranceView.as_view()),
    path('doctor', DoctorView.as_view()),
    path('comment/<int:doctor_id>/', CommentView.as_view(), name='save_comment'),
]