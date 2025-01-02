# Generated by Django 4.1.7 on 2024-12-10 12:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='IssueAssgnmt',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('issued_at', models.DateTimeField(auto_now=True)),
                ('expected_resolution_date', models.DateTimeField()),
                ('status', models.TextField(choices=[('O', 'open'), ('P', 'pending'), ('I', 'In progress'), ('C', 'closed')], default='O', max_length=1)),
                ('priority', models.TextField(choices=[('H', 'High'), ('M', 'Medium'), ('L', 'Low')], default='L', max_length=1)),
                ('resolution_date', models.DateTimeField(auto_now=True)),
                ('issue', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.issue')),
                ('staff', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment_text', models.TextField()),
                ('issue', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.issue')),
            ],
        ),
    ]
