/**
 * Created by ming on 14-5-11.
 */
function sendRequest(url){
    var img = new Image();
    img.src = url;
}
window.onload = function(){
    alert("hello");
    var PingBotton = document.getElementsByTagName("input")[1];
    PingBotton.onclick =  function(){sendRequest("http://localhost/ajax/ImagePing.php");};
}