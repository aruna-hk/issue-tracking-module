# Generated by Django 4.1.7 on 2025-01-01 07:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0015_remove_issue_assoc_user_issue_assoc_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='issue',
            name='assoc_user',
        ),
        migrations.RemoveField(
            model_name='module',
            name='assigned_to',
        ),
        migrations.AddField(
            model_name='issue',
            name='assoc_user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='module',
            name='assigned_to',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]
