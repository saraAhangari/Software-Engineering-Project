
from django.contrib import admin
from django.urls import path, include
from .views import Index


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('apps.authentication.urls')),
    path('', Index.as_view()),
]
