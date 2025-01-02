from django.urls import path, include
from .views import Projects, Log

urlpatterns = [
    path('projects/', Projects.as_view(), name='projects'),
    path('log/', Log.as_view(), name='log'),
]
