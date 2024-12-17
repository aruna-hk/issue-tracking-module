from django.http import HttpResponse
from django.views import View
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render
from base.models import Issue, IssueAssgnmt
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

class HomeView(LoginRequiredMixin, View):

    def get(self, request):
        ctx = {}
        issues = IssueAssgnmt.objects.select_related('issue').all()
        ctx['issues'] = issues
        return render(request, "dashboard.html", ctx)

    #post an issue
    @method_decorator(csrf_exempt)
    def post(self, request):
        user = request.user
        return request.POST
