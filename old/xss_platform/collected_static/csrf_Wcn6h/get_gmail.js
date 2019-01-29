
function getIk(){

}

let mail_list
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
    if(mail_list != null){

        mail_list = eval(mail_list)[3][2];
        console.log(mail_list);



    }
    else{
        console.log('get mail_list error');
    }
  }
});