/**
 * Created by ming on 14-5-11.
 */
function getKeyword(){
    var keyword = document.getElementsByTagName("input")[2].value;
    return keyword;
}
function createJsonp(){
    var script = document.createElement("script");
    var keyword = getKeyword();
    script.src = "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q="+keyword+"&callback=handleResponse";
    document.body.insertBefore(script,document.body.firstChild);
}
function handleResponse(response){
    var fragment = "";
    for(key in response.responseData.results[1]){
        //console.log(response.responseData.results[1][key]);
        fragment+=response.responseData.results[1][key]+"<br/>"
    }
    document.getElementById("msg").innerHTML=fragment;
}
window.onload = function(){
    document.getElementsByTagName("input")[3].onclick = function(){
        createJsonp();
    }
}
