from django.urls import path, include
from .views import Projects, Log, IssueSummary, Lprojects

urlpatterns = [
    path('projects/', Projects.as_view(), name='projects'),
    path('log/', Log.as_view(), name='log'),
    path('IssueSummary/', IssueSummary.as_view()),
    path('lprojects/', Lprojects.as_view()),
]
