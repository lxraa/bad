# Generated by Django 2.0 on 2017-09-08 06:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('xss', '0002_auto_20170908_0627'),
    ]

    operations = [
        migrations.AddField(
            model_name='xssreceiver',
            name='href',
            field=models.TextField(default='', verbose_name='href'),
        ),
    ]
