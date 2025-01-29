from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect
from django.views import View
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render
from base.models import Issue, IssueAssgnmt, Project, Module
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User, Group
#import redis
from base.models import Module
from django.core import serializers
#redis_client = redis.Redis()

class HomeView(View):

    def get(self, request):
        if request.user.is_authenticated:
            ctx = {}
            issues = IssueAssgnmt.objects.select_related('issue').all()
            if request.user.groups.filter(name='admins').exists():
                return redirect('admin/')
            if request.user.groups.filter(name='managers').exists():
                if request.headers.get('Accept') == 'Application/json':
                    projects = Project.objects.filter(project_manager=request.user)
                    modules = Module.objects.filter(assoc_project__in=projects)
                    issuesa = Issue.objects.filter(module__in=modules)
                    issues = IssueAssgnmt.objects.filter(issue__in=issuesa)
                    _issues = []
                    for issue in issues:
                        __issue = {}
                        __issue['id'] = issue.issue.id
                        __issue['Type'] = issue.issue.Type
                        __issue['priority'] = issue.priority
                        __issue['status'] = issue.status
                        __issue['AssignedTo'] = issue.issue.assoc_user.username
                        __issue['IssuedAt'] = issue.issued_at
                        __issue['esc'] = issue.escalated
                        _issues.append(__issue)
                    return JsonResponse(_issues, safe=False)
                return render(request, "manager.html", ctx)
            if request.user.groups.filter(name='developers').exists(): 
                ctx['issues'] = issues.filter(staff=request.user)
                if request.headers.get('Accept') == 'Application/json':
                    _issues = []
                    for issue in issues.filter(staff=request.user):
                        __issue = {}
                        __issue['id'] = issue.issue.id
                        __issue['Type'] = issue.issue.Type
                        __issue['priority'] = issue.priority
                        __issue['status'] = issue.status
                        __issue['AssignedTo'] = issue.issue.assoc_user.username
                        __issue['IssuedAt'] = issue.issued_at
                        __issue['esc'] = issue.escalated
                        _issues.append(__issue)
                    return JsonResponse(_issues, safe=False)
                return render(request, "0-index.html", ctx)
        #print(request.user)
        #print(User.objects.get(username="kephisprocurementmoduleleader@gmail.com") == request.user)
        #if request.user == User.objects.get(username="kephisprocurementmoduleleader@gmail.com"):
        #print(issues[0].issue.assoc_user)
        #return render(request, "dashboard.html", ctx)
        #return redirect('log')
        return render(request, 'index.html')

    #post an issue
    @method_decorator(csrf_exempt)
    def post(self, request):
        user = request.user
        return request.POST
