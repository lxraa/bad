try{
	navigator.serviceWorker.register(url).then(function(registration) {		//找一个可以反射的url，注册service worker
		console.log(registration);
	});
}
catch(e){
	console.log(e.message);
}