
from django.contrib import admin
from django.urls import path, include
from .views import Index
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('apps.authentication.urls')),
    path('', Index.as_view()),
]
