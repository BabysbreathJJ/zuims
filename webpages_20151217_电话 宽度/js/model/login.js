/**
 * Created by jimliu on 2015/12/31.
 */
//图片滑动
$('.carousel').carousel({
    interval: 2000 //两秒自动轮播
}).carousel('cycle');
$("#myCarousel").swipe({
    swipeStatus: function (event, phase, direction, distance, duration, fingers) {
        if (direction == "left") {
            $('.carousel').carousel('next');
        }
        else if (direction == "right") {
            $('.carousel').carousel('prev');
        }
    },
    threshold: 200,
    maxTimeThreshold: 5000,
    fingers: 'all'
});


//获取url参数
function getUrlParam() {
    var args = new Object();
    var query = decodeURI(location.search.substring(1));//获取查询串

    var pairs = query.split("&");//在逗号处断开

    for (var i = 0; i < pairs.length; i++) {

        var pos = pairs[i].indexOf('=');//查找name=value

        if (pos == -1)   continue;//如果没有找到就跳过

        var argname = pairs[i].substring(0, pos);//提取name

        var value = pairs[i].substring(pos + 1);//提取value

        args[argname] = unescape(value);//存为属性

    }

    return args;
}


//登录
var loginUrl = "http://202.120.40.175:21101/users/login";
$("#login").click(function () {
    var user = $("#user").val();
    var pass = $("#pass").val();
    if (user == "" || pass == "") {
        $(".font-red").removeClass("display-n");
        $(".wrongMessage").html("用户名或密码不能为空。");
        return false;
    }
    else {
        var userInfo = {
            'phone': user,
            'password': pass
        };
        console.log(JSON.stringify(userInfo))
        $.ajax({
            url: loginUrl,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(userInfo),
            success: function (msg) {
                $(".font-red").addClass("display-n");
                var args = getUrlParam();
                if ($("#remember").is(':checked')) {
                    $.cookie('login', 'true', {expires: 60000000});
                    $.cookie('phone', msg.phone, {expires: 60000000});
                    if (args['id'] == null)
                        window.location.href = "index.html";
                    else {
                        var url = "order.html?myDate=" + args.myDate + "&myTime=" + args.myTime + "&dinerNum=" + args.dinerNum + "&pay=" + args.pay + "&originPrice=" + args.originPrice + "&more=" + args.more + "&id=" + args.id;
                        location.href = encodeURI(url);
                    }
                }
                else {
                    $.cookie('login', 'true');
                    $.cookie('phone', msg.phone);
                    if (args['id'] == null)
                        window.location.href = "index.html";
                    else {
                        var url = "order.html?myDate=" + args.myDate + "&myTime=" + args.myTime + "&dinerNum=" + args.dinerNum + "&pay=" + args.pay + "&originPrice=" + args.originPrice + "&more=" + args.more + "&id=" + args.id;
                        location.href = encodeURI(url);
                    }
                }

            },
            error: function () {
                $(".font-red").removeClass("display-n");
                $(".wrongMessage").html("用户名或密码错误。");
            }
        })
    }
});
