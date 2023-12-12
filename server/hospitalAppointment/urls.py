from django.contrib import admin
from django.urls import path, include
from .views import Index
from schema_graph.views import Schema
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView

urlpatterns = [
    path("schema/", Schema.as_view()),
    path('admin/', admin.site.urls),
    path('api/v1/', include('apps.authentication.urls')),
    path('api/v1/', include('apps.appointment.urls')),
    path('', Index.as_view()),
    # Swagger
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
