from django.http import HttpResponse
from django.shortcuts import redirect
from django.views import View
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render
from base.models import Issue, IssueAssgnmt
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User, Group
#import redis

#redis_client = redis.Redis()

class HomeView(LoginRequiredMixin, View):

    def get(self, request):
        ctx = {}
        issues = IssueAssgnmt.objects.select_related('issue').all()
        ctx['issues'] = issues
        if request.user.groups.filter(name='admins').exists():
            return redirect('admin/')
        if request.user.groups.filter(name='managers').exists():
            return render(request, "dashboard.html", ctx)
        if request.user.groups.filter(name='developers').exists():
            return render(request, "developer.html", ctx)
        #print(request.user)
        #print(User.objects.get(username="kephisprocurementmoduleleader@gmail.com") == request.user)
        #if request.user == User.objects.get(username="kephisprocurementmoduleleader@gmail.com"):
        #print(issues[0].issue.assoc_user)
        #return render(request, "dashboard.html", ctx)
        return redirect('log')

    #post an issue
    @method_decorator(csrf_exempt)
    def post(self, request):
        user = request.user
        return request.POST
