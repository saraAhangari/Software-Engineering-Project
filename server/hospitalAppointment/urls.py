from django.contrib import admin
from django.urls import path, include
from .views import Index
from schema_graph.views import Schema

urlpatterns = [
    path("schema/", Schema.as_view()),
    path('admin/', admin.site.urls),
    path('api/v1/', include('apps.authentication.urls')),
    path('api/v1/', include('apps.appointment.urls')),
    path('', Index.as_view()),
]
