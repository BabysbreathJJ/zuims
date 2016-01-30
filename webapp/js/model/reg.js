/**
 * Created by jimliu on 2016/1/4.
 */
var regUrl = "http://202.120.40.175:21101/users/register";
$("input").focus(function () {
    var name = $(this).attr('name');
    $("." + name + "Err").addClass("display-n");
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

$("#submit").click(function () {
    if ($("input[name='lastName']").val() == "") {
        $(".lastNameErr").removeClass('display-n')
        return false;
    }
    else if ($("input[type='radio'][name='gender']:checked").length == "0") {
        $(".genderErr").removeClass('display-n')
        return false;
    }
    //else if($("input[name='tel']").val() == ""){
    //    $(".telErr").removeClass('display-n')
    //    return false;
    //}
    else if ($("input[name='pass']").val() == "") {
        $(".passErr").removeClass('display-n')
        return false;
    }
    else {
        var pass = $("input[name='pass']").val();
        var passAgain = $("input[name='passAgain']").val();
        if (pass == passAgain) {
            //var telTest = /^1[3|4|5|8][0-9]\d{4,8}$/;
            var lastName = $("input[name='lastName']").val();
            var gender = parseInt($("input[name='gender']:checked").val());
            var pass = $("input[name='pass']").val();
            var args = getUrlParam();
            var tel = args['tel'];
            var user = {
                'lastname': lastName,
                'phone': tel,
                'password': pass,
                'man': gender
            }
            $.ajax({
                url: regUrl,
                type: "POST",
                data: JSON.stringify(user),
                contentType: 'application/json',
                success: function (data) {
                    $.cookie('login', 'true');
                    $.cookie('phone', tel);
                    window.location.href = "usercenter.html";
                },
                error: function (data) {
                    console.log(data.responseJSON.message);
                    $(".serverErr").find(".msg").html(data.responseJSON.message);
                    $(".serverErr").removeClass("display-n");
                }
            })
        }


        else {
            $(".passAgainErr").removeClass("display-n");
            return false;
        }
    }


})