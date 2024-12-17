from django.urls import path, include
from .views import Projects

urlpatterns = [
    path('projects/', Projects.as_view(), name='projects'),
]
