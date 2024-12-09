from django.http import HttpResponse
from django.views import View
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render


class HomeView(LoginRequiredMixin, View):

    def get(self, request):
        return render(request, "dashboard.html", {})
