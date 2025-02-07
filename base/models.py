from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Project(models.Model):
    status_choices = [
      ('P', 'planning'),
      ('IN', 'Initiated'),
      ('inProgress', 'inProgress'),
      ('OH', 'On Hold')
    ]
    type_choices = [
      ('SW', 'Software Project'),
      ('RSCH', 'Research Project')
    ]
    projectID = models.CharField(max_length=15)
    projectLeader = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    projectName = models.CharField(max_length=30, blank=False)
    description = models.TextField()
    startDate = models.DateTimeField(auto_now=True)
    estimatedDuration = models.IntegerField()
    projectType = models.TextField(choices=type_choices, null=True)
    status = models.TextField(choices=status_choices, null=True)
    project_url = models.URLField(null=True)

    def __str__(self):
        return self.projectName

class Issue(models.Model):
  cproject = models.ForeignKey(Project, on_delete=models.CASCADE, null=False, blank=False)
  ctitle = models.CharField(max_length=45, null=False, blank=False, default="sample issue")
  ctype = models.CharField(max_length=30, null=False, blank=False, default="software project")
  cpriority = models.CharField(max_length=20, null=False, default="low")
  cassignee = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)
  ctags = models.CharField(max_length=256, null=True)
  cdueDate = models.DateTimeField(auto_now=False, null=True)
