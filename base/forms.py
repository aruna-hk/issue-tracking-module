#!/usr/bin/python3

from django import forms
from .models import Project, Issue, Module

class IssueForm(forms.Form):
    project = forms.ModelChoiceField(queryset=Project.objects.all(), required=True, empty_label="select project")
    module = forms.ModelChoiceField(queryset=Module.objects.all(), required=True, empty_label='project module')
    Type = forms.ChoiceField(choices=[('bug', 'bug'), ('FR','feature request'), ('IM', 'Improvement')])
    #for user field capture request.user
    description = forms.CharField(widget=forms.Textarea)
