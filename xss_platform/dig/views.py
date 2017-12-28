from django.shortcuts import render
from django.http import HttpResponse

import os
# Create your views here.
def getSourceDir():
	BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
	source_dir = os.path.join(BASE_DIR, 'source')
	return source_dir

def dig_common(request):
'''

'''
	source_dir = getSourceDir()								
	f = open('%s/dig.js' % (source_dir),'rb')
	code = f.read().decode()
	f.close()

	response = HttpResponse(code)
	response['Access-Control-Allow-Origin'] = '*'
	return response