# Generated by Django 4.1.7 on 2024-12-31 21:21

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0014_alter_issue_raised_by'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='issue',
            name='assoc_user',
        ),
        migrations.AddField(
            model_name='issue',
            name='assoc_user',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
    ]