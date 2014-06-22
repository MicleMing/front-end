/**
 * Created by ming on 14-3-17.
 */
var util ={
    removeTagNameToIcon:function(tagName,index,icon){
        var oTag = document.getElementsByTagName(tagName)[index];
        var iCon = document.createElement("img");
        var ohref = document.createElement("a");
        ohref.href="index.html";
        ohref.appendChild(iCon);
        iCon.src = "images/"+icon;
        //iCon.setAttribute("width","20%");
        iCon.className="icon";
        var tagParent = oTag.parentNode;
        tagParent.replaceChild(ohref,oTag);
    }
};
window.onload = function(){
    util.removeTagNameToIcon("strong",0,"back.gif");
}