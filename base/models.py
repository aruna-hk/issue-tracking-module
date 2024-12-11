from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Project(models.Model):
    """pass"""
    project_manager = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    project_title = models.CharField(max_length=30, blank=False)
    description = models.TextField()
    start_date = models.DateTimeField(auto_now=True)
    end_date = models.DateTimeField(blank=True,null=True)

    def __str__(self):
        return self.project_title

class Module(models.Model):
    assoc_project = models.ForeignKey(Project, on_delete=models.CASCADE)
    assigned_to = models.OneToOneField(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=30, blank=False)
    description = models.TextField(blank=False)
    expected_completion_date = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.assoc_project.project_title + " " +self.title


class Issue(models.Model):
    #id self incrementing
    created_at = models.DateTimeField(auto_now=True)
    #related_project = models.ForeignKey(Project, on_delete=models.SET_NULL, nullable=True)
    module = models.ForeignKey(Module, on_delete=models.CASCADE)
    Type = models.CharField(max_length=20)
    description = models.TextField()
    can_esc = models.BooleanField(default=False)
    assoc_user = models.ForeignKey(User, on_delete=models.CASCADE)
    parent_issue = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return "Issue Type {} on module {} of project {}".format(self.Type, self.module, self.module.assoc_project)

    def escalate(self):
        _issue = {}
        _issue['Type'] = self.Type
        _issue['module'] = self.module
        _issue['description'] = self.description
        _issue['assoc_user'] = self.assoc_user
        _issue['parent_issue'] = self.id

        issue = Issue.objects.create(_issue)
        issue.save()
        escalate_to = Issue.module.assoc_project.project_manager
        _issue_assignment = {}
        _issue_assignmemnt['staff'] = escalate_to
        _issue_assignmemnt['issue'] = issue 
        _issue_assignmemnt['expected_resolution'] = timezone.now()
        _issue_assignment['priority'] = 'H'

        issue_assignment = IssueAssgnmt.objects.create(_issue_assignment)
        print(issue_assignment)
        return issue_assignment 

class IssueAssgnmt(models.Model):
    priority_options = [
                         ("H", "High"),
                         ("M", "Medium"),
                         ("L", "Low"),
                       ]

    status_choices = [
                      ("O", "open"),
                      ("P", "pending"),
                      ("I", "In progress"),
                      ("C", "closed"),
                     ]

    staff = models.ForeignKey(User, on_delete=models.CASCADE)
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE)
    issued_at = models.DateTimeField(auto_now=True)
    expected_resolution_date = models.DateTimeField()
    status = models.TextField(max_length=1, choices=status_choices, default="O")
    priority = models.TextField(max_length=1, choices=priority_options, default="L")
    resolution_date = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return "Issue {} assigned to {}".format(self.id, self.staff.username)

class Comment(models.Model):
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE)
    comment_text = models.TextField(blank=False)

