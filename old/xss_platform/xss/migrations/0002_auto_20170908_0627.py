# Generated by Django 2.0 on 2017-09-08 06:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('xss', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='XssReceiver',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cookie', models.TextField(verbose_name='cookie')),
                ('ua', models.TextField(verbose_name='ua')),
                ('referer', models.TextField(verbose_name='referer')),
            ],
        ),
        migrations.DeleteModel(
            name='XssReciver',
        ),
    ]
