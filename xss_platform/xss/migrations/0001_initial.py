# Generated by Django 2.0 on 2017-09-08 01:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='XssReciver',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cookie', models.TextField(verbose_name='cookie')),
                ('ua', models.TextField(verbose_name='ua')),
            ],
        ),
    ]