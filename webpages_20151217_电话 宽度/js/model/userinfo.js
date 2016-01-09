/**
 * Created by jimliu on 2016/1/5.
 */
//切换页面
$(function(){
    $(".goto-initial").click(function(){
        $(".step").find('li').removeClass('b-active');
        $(".initial-li").addClass("b-active");
        $(".info").hide();
        $(".initial").show();
    });
    $(".goto-basic").click(function(){
        $(".step").find('li').removeClass('b-active');
        $(".basic-li").addClass("b-active");
        $(".info").hide();
        $(".basic").show();
    });
    $(".goto-connect").click(function(){
        $(".step").find('li').removeClass('b-active');
        $(".connect-li").addClass("b-active");
        $(".info").hide();
        $(".connect").show();
    });
    $(".goto-job").click(function(){
        $(".step").find('li').removeClass('b-active');
        $(".job-li").addClass("b-active");
        $(".info").hide();
        $(".job").show();
    });
    $(".goto-hobby").click(function(){
        $(".step").find('li').removeClass('b-active');
        $(".hobby-li").addClass("b-active");
        $(".info").hide();
        $(".hobby").show();
    });

})
//清除错误信息
$("input").focus(function(){
    var name = $(this).attr('name');
    $("."+name+"Err").addClass("display-n");
});
//保存
var phone = $.cookie('phone');
$("span[name='save']").click(function(){
    var email = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    var isCor = true;
    if($("input[name='email']").val() != ""){
        if(email.test($("input[name='email']").val())){
            isCor = true;
        }
        else{
            $(".step").find('li').removeClass('b-active');
            $(".connect-li").addClass("b-active");
            $(".info").hide();
            $(".connect").show();
            $(".emailErr").removeClass("display-n");
            isCor = false;
        }
    }
    else{
        isCor = true;
    }
    if(isCor){
        var userInfoUrl = "http://202.120.40.175:21101/users/userinfocomplete?phone="+$("input[name='phoneid']").val();
        var userdata = $("form[name='userinfo']").serializeObject();
        $.ajax({
            url : userInfoUrl,
            type : "POST",
            data : JSON.stringify(userdata),
            contentType: 'application/json',
            success : function(data){
                if(data.success){
                    //alert("保存成功");
                    //window.location.href = "usercenter.html";

                }
            }
        })
        //头像上传
        var uploadImg = function(){
            var uploadUrl = "http://202.120.40.175:21101/users/uploadImage";
            var uploadData = {
                'phoneId' : phone,
                'imageValue' : $("#imgUrl").val()
            }
            $.ajax({
                url : uploadUrl,
                type : "POST",
                data : JSON.stringify(uploadData),
                contentType: 'application/json',
                success : function(data){
                    if(data.success){
                        alert("保存成功");
                        window.location.href = "usercenter.html";
                    }
                }
            })

        }();
    }


})
//基本信息加载

var loadBas = function(){
    var userURL = "http://202.120.40.175:21101/users";

    $.ajax({
        url : userURL,
        type : "GET",
        data : {phone : phone},
        success : function(data){
            $("input[name='lastname']").val(data.lastname).attr('readonly','readonly');
            $("input[name='gender'][value="+data.gender+"]").attr("checked",true).attr('readonly','readonly');
            $("input[name='phone']").val(data.phone).attr('readonly','readonly');
            $("input[name='phoneid']").val(data.phone);
        }
    })

}();
//初始化用户信息加载
var loadUserInfo = function(){
    var getInfoUrl = "http://202.120.40.175:21101/users/userInfo";
    $.ajax({
        url : getInfoUrl,
        type : "GET",
        data : {phone : phone},
        success : function(data){
            addData(data);
            //获取用户头像
            //var img = $('<img class="img-responsive" style="width : 80px;">');
            //img.attr("src",'http://202.120.40.175:21101/users/images?phone=' + phone);

            $(".displayImg").html("修改头像");
        }
    })

}();
//图片展示
function displayImg(result) {
    var file = document.getElementById('head-logo');
    console.log(file)
    if (typeof FileReader === 'undefined') {
        result.innerHTML = "抱歉，你的浏览器不支持 FileReader";
        input.setAttribute('disabled', 'disabled');
    } else {
        file.addEventListener('change', readFile, false);
    }
    function readFile() {
        console.log(this.files[0])
        var file = this.files[0];
        if (!/image\/\w+/.test(file.type)) {
            alert("文件必须为图片！");
            return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            $("#imgsrc").css('width','80px');
            var base64 = this.result.replace(/^data:image\/(png|jpg);base64,/, "");
            $("#imgUrl").val(base64);
            result.html("");
            result.html('<img id="imgsrc" class="img-responsive" src="' + this.result + '" alt=""/>')
        }
    }
}
displayImg($(".displayImg"));


//序列化对象
$.fn.serializeObject = function() {
var o = {};
var a = this.serializeArray();
$.each(a, function() {
    if (o[this.name] !== undefined) {
        if (!o[this.name].push) {
            o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
    } else {
        o[this.name] = this.value || '';
    }
});
return o;
};
//循环获取userinfo
function addData(r){
    var d={};
    for(var n in r)
    {
        var key = n;
        d[key] = r[n];
    }
    $(".afterInfo").find('input').each(function() {
        var key = $(this).attr('name');
        $(this).val(d[key]);
    }).end().find('select').each(function() {
        var key = $(this).attr('name');
        $(this).val(d[key]);
    }).end().find('textarea').each(function(){
        var key = $(this).attr('name');
        if (key && d[key])
            $(this).val(d[key]);
    }).end();
}
//获取图片base64
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}