from django.shortcuts import render, redirect
from django.http import HttpResponseBadRequest, HttpResponse, JsonResponse
from .forms import ProjectForm, IssueForm
import json
from django.views.decorators.csrf import csrf_exempt
from .models import Project, Issue
from datetime import datetime

def project_info(request, *args, **kwargs):
  return HttpResponse("project info")

def get_issue_info(request, *args, **kwargs):
  print(args, kwargs)
  issue = Issue.objects.filter(**kwargs)[0].__dict__
  issue.pop('_state')
  issue['cdueDate'] = datetime.isoformat(issue['cdueDate'])
  return HttpResponse(json.dumps(issue))

@csrf_exempt
def issues(request):
  if request.method == 'POST':
    data = json.loads(request.body)
    data['cproject'] = Project.objects.filter(projectID='PRJ-001')[0]
    if data['cassignee'] == '':
       data['cassignee'] = None
    else:
       data['cassignee'] = User.objects.filter(username=data['cassignee'])
    data['cdueDate'] =   datetime.fromisoformat(data['cdueDate'])
    print(data)
    issue = IssueForm(data)
    if issue.is_valid():
      print(issue.data)
      issue = Issue.objects.create(**data)
    return HttpResponse("issue created")

@csrf_exempt
def projects(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        project = ProjectForm(data)
      
        if project.is_valid():
            if data['projectLeader'] == '':
                data['projectLeader'] = request.user
            else:
                user = User.objects.filter(username=data.projectLeader)
                data['projectLeader'] = user
            project = Project.objects.create(**data)
            return HttpResponse(project.id, status=201)
        print(project.errors)
        return HttpResponseBadRequest('invalid form')
    if request.method == 'GET':
       projects = Project.objects.all()
       _projects = []
       for project in projects:
         __project = {}
         __project = dict(project.__dict__)
         __project.pop('_state')
         __project['startDate'] = datetime.isoformat(project.startDate)
         _projects.append(__project)
       print("***")
       print(_projects)
       print(type(_projects))
       print(type(_projects[0]))
       return HttpResponse(json.dumps(_projects))
