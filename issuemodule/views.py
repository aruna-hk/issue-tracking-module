from django.http import HttpResponse
from django.views import View
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render
from base.models import Issue, IssueAssgnmt

class HomeView(LoginRequiredMixin, View):

    def get(self, request):
        ctx = {}
        issues = IssueAssgnmt.objects.select_related('issue').all()
        ctx['issues'] = issues
        print(issues[0].__dict__)
        return render(request, "dashboard.html", ctx)
