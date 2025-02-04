from django.shortcuts import render, redirect
from django.http import HttpResponseBadRequest, HttpResponse
from .forms import ProjectForm
import json


def projects(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        project = ProjectForm(data)
        if project.is_valid():
            print(project.data)
            return HttpResponse(status=201)
        print(project.errors)
        return HttpResponseBadRequest('invalid form')

