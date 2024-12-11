from django.contrib import admin
from .models import Project

# Register your models here.
from .models import *


admin.site.register(IssueAssgnmt)
admin.site.register(Comment)

def escalate_issue(modeladmin, request, queryset):
    for issue in queryset:
        issue.escalate()
    modeladmin.message_user(request, "issue escalated")

   
class IssueAdmin(admin.ModelAdmin):
    list_display = ('Type', 'module', 'created_at', 'assoc_user')
    actions = [escalate_issue]

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        print(queryset)
        if request.user.is_superuser:
            return queryset
        queryset = queryset.filter(assoc_user=request.user)
        print(queryset)
        return queryset

admin.site.register(Issue, IssueAdmin)

class ProjectAdmin(admin.ModelAdmin):
    list_display = ('project_manager', 'project_title', 'description', 'start_date', 'end_date')
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
    list_display = ('assoc_project', 'assigned_to', 'title', 'description', 'expected_completion_date')
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
