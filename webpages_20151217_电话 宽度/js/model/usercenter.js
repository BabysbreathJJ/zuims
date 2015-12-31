/**
 * Created by jimliu on 2015/12/31.
 */
//是否已登录
var hasLogin = function(){
    if(!$.cookie('login'))
    {
        window.location.href = "login.html";
    }
}();
//取cookie中的phone加载用户信息
var getUser = function(){
    var userUrl = "http://202.120.40.175:21101/users";
    var phone = $.cookie('phone');
    $.ajax({
        url : userUrl,
        data : {phone : phone},
        type : 'GET',
        dataType : 'JSON',
        success : function(data){
            $(".vipLevel").html(data.vipLevel);
            $(".name").html(data.lastname);
            $(".phone").html(data.phone);
            $('.phone').attr('href','tel:'+data.phone);
        }


    });
//    //获取用户头像
//    $.ajax({
//        url : userUrl+'/images',
//        type : 'GET',
//        dataType : 'JSON',
//        success : function(data){
//            console.log(data);
//        }
//    });

}();
//滑动轮播
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
})