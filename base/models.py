from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Project(models.Model):
    type_choices = [
      ('SW', 'Software Project'),
      ('RSCH', 'Research Project')
    ]
    projectID = models.CharField(max_length=15, primary_key=True)
    projectLeader = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    projectName = models.CharField(max_length=30, blank=False)
    description = models.TextField()
    startdate = models.DateTimeField(auto_now=True)
    estimatedDuration = models.IntegerField()
    projectType = models.TextField(choices=type_choices, null=True)

    def __str__(self):
        return self.project_title

