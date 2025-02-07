#!/usr/bin/python3

from django import forms

from .models import Project, Issue


class IssueForm(forms.ModelForm):
  class Meta:
    model = Issue
    fields = '__all__'

class ProjectForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = '__all__'

