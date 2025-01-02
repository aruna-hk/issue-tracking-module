from django.shortcuts import render, redirect
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import View
from django.http import HttpResponse
# Create your views here.
from .models import Project, Module, Issue, IssueAssgnmt
from django.views.decorators.csrf import csrf_exempt
from .forms import IssueForm
from django.http import HttpResponse
import redis
from .models import Module

#redis_client = redis.Redis()

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
            issue.alert_dev()
        return redirect('log')
