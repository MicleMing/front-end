/**
 * Created by ming on 14-4-26.
 */

(function($){
    //回到顶部
    $.fn.backToTop=function(options){
        var defaults ={
             top:100
        }
        var options = $.extend(defaults,options);
        $("#back-to-top").hide();
        $(window).scroll(function(){
            if($(window).scrollTop()>options.top){
                $("#back-to-top").fadeIn(1000);
            }else{
                $("#back-to-top").fadeOut(1000);
            }
        });
        $("#back-to-top").bind("click",function(){
            $("body,html").animate({scrollTop:0},500);
            return false;
        });
    };

    //建议
    $.fn.suggestion = function(options){
        var defaults = {
            title:'福州大学',
            suggestionWords :"谢谢"
        }
        var option = $.extend(defaults,options);
        $("#dialog").hide();
        $(".spanStyle").hide();
        $("#suggestion").bind("click",function(){
            $(".spanStyle").fadeToggle();
            $("#dialog").fadeToggle()
                .children()
                .each(function(index){
                    $(this).html(options[index]);
                    alert(options[index]);
                });
            return false;
        })
    }
    $(document).ready(function(){
        $.fn.backToTop({top:100});
        $.fn.suggestion({title:"fzu",suggestionWords:"福州大学就业中心，福建人才联合网,福州大学数计学院"})
    });
})(jQuery);
