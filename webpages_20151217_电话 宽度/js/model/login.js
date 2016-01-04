/**
 * Created by jimliu on 2015/12/31.
 */
//图片滑动
$('.carousel').carousel({
    interval: 2000 //两秒自动轮播
}).carousel('cycle');
$("#myCarousel").swipe({
    swipeStatus:function(event, phase, direction, distance, duration, fingers)
    {
        if(direction=="left"){
            $('.carousel').carousel('next');
        }
        else if(direction=="right"){
            $('.carousel').carousel('prev');
        }
    },
    threshold:200,
    maxTimeThreshold:5000,
    fingers:'all'
});
//登录
var loginUrl = "http://202.120.40.175:21101/users/login";
$("#login").click(function(){
    var user = $("#user").val();
    var pass = $("#pass").val();
    if(user == ""|| pass == ""){
        $(".font-red").removeClass("display-n");
        $(".wrongMessage").html("用户名或密码不能为空。");
        return false;
    }
    else{
        var userInfo = {
            'phone' : user,
            'password' : pass
        };
        $.ajax({
            url : loginUrl,
            type:'POST',
            contentType : 'application/json',
            data:JSON.stringify(userInfo),
            success : function(msg){
                $(".font-red").addClass("display-n");
                if($("#remember").is(':checked')){
                    $.cookie('login', 'true',{ expires: 14});
                    $.cookie('phone', msg.phone,{ expires: 14});
                }
                else{
                    $.cookie('login', 'true');
                    $.cookie('phone', msg.phone);
                }
                window.location.href = "index.html";
            },
            error : function(){
                $(".font-red").removeClass("display-n");
                $(".wrongMessage").html("用户名或密码错误。");
            }
        })
    }
})