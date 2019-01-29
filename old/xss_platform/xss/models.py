from django.db import models

# Create your models here.

class XssReceiver(models.Model):
	href = models.TextField(u'href',default = '')
	cookie = models.TextField(u'cookie',default = '')
	ua = models.TextField(u'ua',default = '')
	referer = models.TextField(u'referer',default = '')
	Origin = models.TextField(u'Origin',default = '')

