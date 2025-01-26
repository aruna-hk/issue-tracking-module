from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
#from .views import redis_client
#from issuemodule.views import redis_client
import redis

redis_client = redis.Redis()

class Project(models.Model):
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

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        #create a channel for issues
        #developers will subscribe on page load for notification
        self.channel = "module_" + str(self.id) + "_channel"

    def __str__(self):
        return self.assoc_project.project_title + " " +self.title


class Issue(models.Model):
    type_options = [('bug', 'bug'), ('FR', 'feature requuest'), ('IM', 'improvement')]
    #id self incrementing
    created_at = models.DateTimeField(auto_now=True)
    #related_project = models.ForeignKey(Project, on_delete=models.SET_NULL, nullable=True)
    module = models.ForeignKey(Module, on_delete=models.CASCADE)
    Type = models.CharField(choices=type_options, max_length=20)
    description = models.TextField()
    #can_esc = models.BooleanField(default=False)
    #associated user defaults to module leader
    assoc_user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    raised_by = models.EmailField(null=True, blank=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        #print(self.module)
        #redis_client.publish(self.module.channel, self.Type)

    def __str__(self):
        return "Issue Type {} on module {} of project {}".format(self.Type, self.module, self.module.assoc_project)


    def alert_dev(self):
        redis_client.publish(self.module.channel, self.Type)

class IssueAssgnmt(models.Model):
    priority_options = [
                         ("High", "High"),
                         ("Medium", "Medium"),
                         ("Low", "Low"),
                       ]

    status_choices = [
                      ("Open", "open"),
                      ("Pending", "pending"),
                      ("In progress", "In progress"),
                      ("Closed", "closed"),
                     ]

    #default staff assigned == module leader
    #module leader can assign issue to some other users/escalate to project manager

    staff = models.ForeignKey(User, on_delete=models.CASCADE)
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE)
    issued_at = models.DateTimeField(auto_now=True)
    expected_resolution_date = models.DateTimeField(blank=True, null=True)
    status = models.TextField(max_length=12, choices=status_choices, default="Open")
    priority = models.TextField(max_length=6, choices=priority_options, default="Low")
    resolution_date = models.DateTimeField(blank=True, null=True)
    escalated = models.BooleanField(default=False)
    #parent_issue = models.ForeignKey(Issue, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return "Issue {} assigned to {}".format(self.id, self.staff.username)

    def escalate(self):
        if self.escalated is False:
            self.escalated = True
            self.save()
            _reassignment = {}
            #escalate to manager
            _reassignment['staff'] = self.issue.module.assoc_project.project_manager
            _reassignment['issue'] = self.issue
            _reassignment['issued_at'] = timezone.now()
            #expected resolution data can be empty
            #_reassignment['expected_resolution_date'] = None
            #status default to open
            _reassignment['priority'] = 'H' #change priority to high
            #resolution_date = Null
            #escalated default to false
            #_reassignment['escalated'] = True

            issue_reassignment = IssueAssgnmt.objects.create(**_reassignment)
            print(issue_reassignment)
            return issue_reassignment 

    def solve(self):
        self.status = 'Closed'

class Comment(models.Model):
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE)
    comment_text = models.TextField(blank=False)

