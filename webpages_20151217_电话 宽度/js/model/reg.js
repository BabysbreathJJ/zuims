/**
 * Created by jimliu on 2016/1/4.
 */
var regUrl = "http://202.120.40.175:21101/users/register";
$("input").focus(function(){
   var name = $(this).attr('name');
   $("."+name+"Err").addClass("display-n");
});

$("#submit").click(function(){
    if($("input[name='lastName']").val() == ""){
        $(".lastNameErr").removeClass('display-n')
        return false;
    }
    else if($("input[type='radio'][name='gender']:checked").length == "0"){
        $(".genderErr").removeClass('display-n')
        return false;
    }
    else if($("input[name='tel']").val() == ""){
        $(".telErr").removeClass('display-n')
        return false;
    }
    else if($("input[name='pass']").val() == ""){
        $(".passErr").removeClass('display-n')
        return false;
    }
    else{
        var pass = $("input[name='pass']").val();
        var passAgain = $("input[name='passAgain']").val();
        if(pass == passAgain){
            var telTest = /^1[3|4|5|8][0-9]\d{4,8}$/;
            var lastName = $("input[name='lastName']").val();
            var gender = parseInt($("input[name='gender']:checked").val());
            var tel = $("input[name='tel']").val();
            var pass = $("input[name='pass']").val();
            if(telTest.test(tel)){
                var user = {
                    'lastname' : lastName,
                    'phone' : tel,
                    'password' : pass,
                    'man' : gender
                }
                $.ajax({
                    url : regUrl,
                    type : "POST",
                    data : JSON.stringify(user),
                    contentType : 'application/json',
                    success : function(data){
                        $.cookie('login', 'true');
                        $.cookie('phone', tel);
                        window.location.href = "usercenter.html";
                    },
                    error : function(data){
                        $(".telErr").find(".msg").html(data.responseJSON.message);
                        $(".telErr").removeClass("display-n");
                    }
                })
            }
            else{
                $(".telErr").removeClass("display-n");
                return false;
            }

        }
        else{
            $(".passAgainErr").removeClass("display-n");
            return false;
        }
    }


})