import requests
import re
def compress(data):
	url_compress = 'http://tool.oschina.net/action/jscompress/js_compress?munge=0&linebreakpos=50000'
	res = requests.post(url = url_compress,data = data)
	result = re.match("\{\"result\":\"(.*)\"\}",res.text)
	return result[1].encode('utf-8').decode('unicode_escape').encode()

f = open('./miner.js','rb')
data = f.read()
f.close()
f2 = open('./miner_release.js','wb')
f2.write(compress(data))
f2.close()