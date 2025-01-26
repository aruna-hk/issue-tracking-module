from django.shortcuts import render, redirect
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import View
from django.http import HttpResponse, JsonResponse
# Create your views here.
from .models import Project, Module, Issue, IssueAssgnmt
from django.views.decorators.csrf import csrf_exempt
from .forms import IssueForm
from django.http import HttpResponse
import redis
from .models import Module
import json

redis_client = redis.Redis()

class Lprojects(LoginRequiredMixin, View):
    def get(self, request):
        projects = Project.objects.filter(project_manager=request.user)
        issuesP = []
        for prj in projects:
            _prj = {}
            _prj['id'] = prj.id
            _prj['name']  = prj.project_title
            modules = Module.objects.filter(assoc_project=prj)
            Issues = Issue.objects.filter(module__in=modules) 
            issues = IssueAssgnmt.objects.filter(issue__in=Issues)
            high = issues.filter(priority='High').order_by('issued_at')
            _prj['pending'] = issues.count()
            _prj['High'] = high.count()
            _prj['lastupdate'] = "24.02.2001"
            _prj['status'] ='ACTIVE'
            issuesP.append(_prj)
        return JsonResponse(issuesP, safe=False)

class IssueSummary(LoginRequiredMixin, View):
    def get(self, request):
        summary = {}
        summary['issues'] = IssueAssgnmt.objects.filter(staff=request.user).count()
        summary['open'] = IssueAssgnmt.objects.filter(staff=request.user, status='Open').count()
        summary['closed'] = IssueAssgnmt.objects.filter(staff=request.user, status='Closed').count()
        summary['escalated'] = IssueAssgnmt.objects.filter(staff=request.user, escalated=True).count()
        return JsonResponse(summary)

class Projects(LoginRequiredMixin, View):
    #get existing projects + module + issues
    def get(self, request):
        all_projects = Project.objects.filter(project_manager=request.user)
        for project in all_projects:
            project.__setattr__('modules', Module.objects.filter(assoc_project=project).count())
            project.__setattr__('issues', Issue.objects.filter(module__in=Module.objects.filter(assoc_project=project)).count())
        modules = Module.objects.filter(assoc_project__in=all_projects)
        for module in modules:
            module.__setattr__("issues", Issue.objects.filter(module=module).count())
        return render(request, 'projects.html', {'projects': all_projects, "modules": modules})

    @csrf_exempt        
    def post(self, request, *args, **kwargs):
        return HttpResponse("kiptoo haron")

class Log(LoginRequiredMixin, View):
    def get(self, request):
        form = IssueForm()
        return render(request, 'issue.html', {'form':form})    

    def post(self, request):
        form = IssueForm(request.POST)
        if form.is_valid():
            project = form.cleaned_data.pop('project')
            module = form.cleaned_data['module']
            form.cleaned_data['assoc_user'] = module.assigned_to
            issue = Issue.objects.create(**(form.cleaned_data))
            #issue.alert_dev()
            #redis_client.publish(module.channel, json.dumps(issue.__dict__))
            #issue_assignement dict
            issueassignment = {}
            issueassignment['staff'] = form.cleaned_data['assoc_user']#default user
            issueassignment['issue'] = issue
            issueAssignment = IssueAssgnmt.objects.create(**issueassignment)
            issue_dict = {}
            issue_dict['id'] = issueAssignment.id
            issue_dict['Type'] = issueAssignment.issue.Type
            issue_dict['created_at'] = issueAssignment.issue.created_at.strftime("%Y%M%D %H:%m")
            issue_dict['project'] = issueAssignment.issue.module.assoc_project.project_title
            issue_dict['status'] = issueAssignment.status
            issue_dict['priority'] = issueAssignment.priority
            issue_dict['assigned_to'] = issueAssignment.staff.username
            redis_client.publish(module.channel, json.dumps(issue_dict))

        return redirect('log')
