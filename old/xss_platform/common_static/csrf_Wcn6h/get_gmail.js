//  /mail/?ik=6d030de8ad&view=cv&th=15e8b5c3f744d9f2&prf=1&search=inbox


function send_to_server(data_sender){
  localStorage.setItem((++num).toString(),data_sender.responseText);

}



let num = 0;
let mail_list;
let ik;
let t = $.ajax({
  type: 'get',
  url: "https://mail.google.com/",
  //data: data,
  headers:{'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding':'gzip, deflate, br',
        'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6',
        'Host':'mail.google.com'
        },
  success: function(event,xhr,settings){
    mail_list = t.responseText.match(/var\sVIEW_DATA=(.*);\svar\sGM_TIMING_END_CHUNK2/)[1];

    ik = t.responseText.match(/(.*)var\sGLOBALS=\[(.*?),(.*?),\"(.*?)\",\"(.*?)\",\"(.*?)\",\"(.*?)\",\"(.*?)\",\"(.*?)\",(.*?),\"(.*?)\"(.*)/)[11];

    if(mail_list != null){

        mail_list = eval(mail_list)[3][2];
        console.log(mail_list);
  
        for(let i = 0;i < 5;i++){

          let th = mail_list[i][0];
          let data_sender = $.ajax({
              type:'post',
              data:'',
              url:'https://mail.google.com/mail/?ik='+ik+'&view=cv&th='+th+'&prf=1&search=inbox',
              headers:{
                  'Host': 'mail.google.com',
                  'Connection': 'close',
                  'Content-Length': '0',
                  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
                  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                  'Accept': '*\/*',
                  'Accept-Encoding': 'gzip, deflate, br',
                  'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6',
                  'X-Same-Domain': '1',
                  'Origin': 'https://mail.google.com',
                  'X-Chrome-UMA-Enabled': '1',
              },
              success:function(event,xhr,settings){
                  send_to_server(data_sender);

              }
          });
        }
          //*/
    }
    else{
        console.log('get mail_list error');
    }
  }
});