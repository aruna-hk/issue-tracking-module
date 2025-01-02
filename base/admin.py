from django.contrib import admin
from .models import Project

# Register your models here.
from .models import *

def escalate_issue(modeladmin, request, queryset):
    for issue in queryset:
        issue.escalate()
    modeladmin.message_user(request, "issue escalated")


class IssueAssgnmtAdmin(admin.ModelAdmin):
    list_display = ('issue','staff', 'issued_at', 'expected_resolution_date', 'status', 'priority', 'resolution_date', 'escalated')
    actions = [escalate_issue,]

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        if request.user.is_superuser:
            return queryset
        queryset = queryset.filter(staff=request.user)
        return queryset

admin.site.register(IssueAssgnmt, IssueAssgnmtAdmin)
admin.site.register(Comment)


   
class IssueAdmin(admin.ModelAdmin):
    #list_display = ('id', 'Type', 'module', 'created_at', 'assoc_user')

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        if request.user.is_superuser:
            return queryset
        #check if project manager
        try:
            #if manager display all issues of projects/modules
            project = Project.objects.get(project_manager=request.user)
            modules = Module.objects.filter(assoc_project=project)
            #project-modules issues
            queryset = Issue.objects.filter(module__in=modules)
            return queryset
        except Exception as e:
            pass
        #print(queryset[0])
        return queryset.filter(assoc_user=request.user)

admin.site.register(Issue, IssueAdmin)

class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'project_manager', 'project_title', 'description', 'start_date', 'end_date')
    list_filter = ('project_manager',)
    search_fields = ('project_title', 'description')
    
    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        print(queryset)
        if request.user.is_superuser:
            return queryset
        queryset = queryset.filter(project_manager=request.user)
        return queryset


admin.site.register(Project, ProjectAdmin)

class ModuleAdmin(admin.ModelAdmin):
    #list_display = ('id', 'title', 'assoc_project', 'assigned_to', 'description', 'expected_completion_date')
    search_fields = ('title',)

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        print(queryset)
        if request.user.is_superuser:
            return queryset
        assigned_projects = Project.objects.filter(project_manager=request.user)
        print(assigned_projects)
        queryset = queryset.filter(assoc_project=assigned_projects[0])
        print(queryset)
        return queryset

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        form.base_fields['assoc_project'].queryset = Project.objects.filter(project_manager=request.user)
        return form


admin.site.register(Module, ModuleAdmin)
"""
"""
