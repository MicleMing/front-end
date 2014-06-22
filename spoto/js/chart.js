/**
 * Created by ming on 14-4-10.
 */
$(document).ready(function(){
    var chartDiv  = $("<div id='chart'></div>");
    var title = $("<p class='qqChart'>在线咨询</p>");
    var pic1 = $("<p class='qq'><span><img src='./images/char.jpg' alt='qq'/><a href='http://ali14.looyu.com/chat/chat/p.do?n=zhangax&md=2&c=12602&v=788a7b35b1dc899a80fdb6dc2060b62cd0&u=788a7b35b1dc899a80fdb6dc2060b62cd0&f=38272&site=0&ct=1&lang=sc&refer=&loc=http%3A%2F%2Fwww.spoto.net%2F&_d=1399817389105&_token=f3f9e2cb9816f188e64736c57669d57c6171e13d2cfa5527b42c7f5b3c3ea1ec3e0de5ae1d54c82a013f4fd1d7cb4e4d '>上海咨询</a></span> </p>");
    var pic2 = $("<p class='qq'><span><img src='./images/char.jpg' alt='qq'/><a href='http://ali14.looyu.com/chat/chat/p.do?n=spotofz&md=2&c=12602&v=788a7b35b1dc899a80fdb6dc2060b62cd0&u=788a7b35b1dc899a80fdb6dc2060b62cd0&f=38272&site=0&ct=1&lang=sc&refer=&loc=http%3A%2F%2Fwww.spoto.net%2F&_d=1399817322612&_token=f3f9e2cb9816f188d2952bd74a2893896ce433c314d69453c8bc0ca11c566fdd66d45b3ce68a287df41fbff01e7b532d'> 福州咨询</a></span></p>");
    var del = $("<b class='float_right'><img id='delete' src='./images/dele.png' alt='delete'/></b>");
    title.append(del);
    chartDiv.append(title,pic1,pic2);
    $("body").append(chartDiv);
    $("#delete").bind('click',function(){
        $(chartDiv).fadeOut();
    });
});
