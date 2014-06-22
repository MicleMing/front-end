/**
 * Created by ming on 14-5-11.
 */
function createXHR(){
    var xhr = null;
    try{
        xhr = new XMLHttpRequest();
    }catch (e){
        try{
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        }catch (e){
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return xhr;
}
//跨浏览器的CORS
function createCORSRequest(method,url){
    var xhr = createXHR();
    if("withCredentials" in xhr){
        xhr.open(method,url);
    }else if(typeof XDomainRequest != "undefined"){
        xhr = new XDomainRequest();
    }else{
        xhr = null;
    }
    return xhr;
}
//html5 跨域
function sendRequest(){
    var xhr = createCORSRequest('GET','http://localhost/ajax/cors.php');
    xhr.withCredentials = true; //请求应该发送凭据，放到open后面执行，兼容个别浏览器
    xhr.onload = function(){
        alert(xhr.response);
    };
    xhr.send(null);
}

window.onload = function(){
    var corsBotton = document.getElementsByTagName("input")[0];
    corsBotton.onclick =  sendRequest;
}