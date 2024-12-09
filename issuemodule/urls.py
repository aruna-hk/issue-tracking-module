from django.contrib import admin
from django.urls import path, include
from .views import HomeView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include("django.contrib.auth.urls")),
    path('', HomeView.as_view(), name='home'),
#    path('ticket/login/', Ticket.as_view(), name='login_issue'),
]
