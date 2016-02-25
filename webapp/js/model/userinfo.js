/**
 * Created by jimliu on 2016/1/5.
 */
//切换页面
$(function () {
    $(".goto-initial").click(function () {
        $(".step").find('li').removeClass('b-active');
        $(".initial-li").addClass("b-active");
        $(".info").hide();
        $(".initial").show();
    });
    $(".goto-basic").click(function () {
        $(".step").find('li').removeClass('b-active');
        $(".basic-li").addClass("b-active");
        $(".info").hide();
        $(".basic").show();
    });
    $(".goto-connect").click(function () {
        $(".step").find('li').removeClass('b-active');
        $(".connect-li").addClass("b-active");
        $(".info").hide();
        $(".connect").show();
    });
    $(".goto-job").click(function () {
        $(".step").find('li').removeClass('b-active');
        $(".job-li").addClass("b-active");
        $(".info").hide();
        $(".job").show();
    });
    $(".goto-hobby").click(function () {
        $(".step").find('li').removeClass('b-active');
        $(".hobby-li").addClass("b-active");
        $(".info").hide();
        $(".hobby").show();
    });

    $('#avatar').croppie({
        exif: true,
        viewport: {
            
            width: 150,
            height: 200
        },
        boundary: {
            width: 300,
            height: 300
        }
    });

    $('#imageCrop').hide();

});
//清除错误信息
$("input").focus(function () {
    var name = $(this).attr('name');
    $("." + name + "Err").addClass("display-n");
});
//保存
var phone = $.cookie('phone');
$("span[name='save']").click(function () {
    var email = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    var isCor = true;
    if ($("input[name='email']").val() != "") {
        if (email.test($("input[name='email']").val())) {
            isCor = true;
        }
        else {
            $(".step").find('li').removeClass('b-active');
            $(".connect-li").addClass("b-active");
            $(".info").hide();
            $(".connect").show();
            $(".emailErr").removeClass("display-n");
            isCor = false;
        }
    }
    else {
        isCor = true;
    }
    if (isCor) {
        $("span[name='save']").attr("disabled", true);
        var userInfoUrl = "http://202.120.40.175:21101/users/userinfocomplete?phone=" + $("input[name='phoneid']").val();
        if ($('.name').val().substring(0, 1) == $("input[name='lastname']").val()) {
            var name = $('.name').val().substring(1);
        }
        else {
            var name = $('.name').val();
        }
        $("input[name='name']").val(name)
        var userdata = $("form[name='userinfo']").serializeObject();
        $.ajax({
            url: userInfoUrl,
            type: "POST",
            async: false,
            data: JSON.stringify(userdata),
            contentType: 'application/json',
            success: function (data) {
                if (data.success) {

                    //alert("保存成功");
                    //window.location.href = "usercenter.html";

                }
            }
        })
        //头像上传
        var uploadImg = function () {
            var uploadUrl = "http://202.120.40.175:21101/users/uploadImage";
            var uploadData = {
                'phoneId': phone,
                'imageValue': $("#imgUrl").val()
            }
            if ($("#imgUrl").val() == "") {
                alert("保存成功");
                window.location.href = "usercenter.html";
                return false;
            }
            else {
                $.ajax({
                    url: uploadUrl,
                    type: "POST",
                    data: JSON.stringify(uploadData),
                    contentType: 'application/json',
                    success: function (data) {
                        if (data.success) {
                            alert("保存成功");
                            window.location.href = "usercenter.html";
                        }
                    }
                })
            }


        }();
    }


});
//基本信息加载

var loadBas = function () {
    var userURL = "http://202.120.40.175:21101/users";

    $.ajax({
        url: userURL,
        type: "GET",
        data: {phone: phone},
        success: function (data) {
            var gender = "";
            if (data.gender == '1') {
                gender = "男"
            }
            else {
                gender = "女"
            }
            $("input[name='lastname']").val(data.lastname).attr('readonly', 'readonly');
            $("input[name='gender']").val(data.gender);
            $(".gender").val(gender).attr('readonly', 'readonly');
            $("input[name='phone']").val(data.phone).attr('readonly', 'readonly');
            $("input[name='phoneid']").val(data.phone);
        }
    })

}();
//初始化用户信息加载
var loadUserInfo = function () {
    var getInfoUrl = "http://202.120.40.175:21101/users/userInfo";
    $.ajax({
        url: getInfoUrl,
        type: "GET",
        data: {phone: phone},
        success: function (data) {
            addData(data);
            $(".name").val(data.lastname + data.name);
            //获取用户头像
            var img = $('<img  id="imgsrc" width="80" height="80">');
            img.attr("src", 'http://202.120.40.175:21101/users/images?phone=' + phone);

            $(".displayImg").html(img);
        }
    })

}();
////图片展示
function displayImg(result) {
    var file = document.getElementById('head-logo');
    if (typeof FileReader === 'undefined') {
        result.innerHTML = "抱歉，你的浏览器不支持 FileReader";
        input.setAttribute('disabled', 'disabled');
    } else {
        file.addEventListener('change', readFile, false);
    }
}
function readFile() {
    var file = this.files[0];

    if (file) {
        //验证图片文件类型
        if (file.type && !/image/i.test(file.type)) {
            alert("文件必须为图片！");
            return false;
        }
        //EXIF.getData(file, function () {
        //    //获取照片本身的Orientation
        //    var orientation = EXIF.getTag(this, "Orientation");
        //    console.log(orientation);
        //});


        var reader = new FileReader();
        reader.onload = function (e) {
            //readAsDataURL后执行onload，进入图片压缩逻辑
            //e.target.result得到的就是图片文件的base64 string
            render(file, e.target.result);

            var result = this.result;
            var img = new Image();
            img.src = result;
            img.width = 80;
            img.height = 80;
            //$(".displayImg").html(img);

            $('.displayImg').hide();
            $('#imageCrop').show();

            $("#avatar").croppie('bind', {
                url: e.target.result
            });


        };
        //以dataurl的形式读取图片文件
        reader.readAsDataURL(file);
    }

}


$('.upload-result').click(function (ev) {
    $("#avatar").croppie('result', 'canvas').then(function (resp) {
        popupResult({
            src: resp
        });
    });
});

function popupResult(result) {
    var html;
    if (result.html) {
        html = result.html;
    }
    if (result.src) {
        data = result.src.split(",")[1];
        html = '<img src="' + result.src + '" />';
        $("#imgUrl").val(data);
    }
    $(".displayImg").html(html);
    $("#imageCrop").hide();
    $('.displayImg').show();
}

//定义照片的最大高度
var MAX_HEIGHT = 480;
var render = function (file, src) {
    EXIF.getData(file, function () {
        //获取照片本身的Orientation
        var orientation = EXIF.getTag(this, "Orientation");
        var image = new Image();
        image.onload = function () {
            var cvs = document.getElementById("cvs");
            var w = image.width;
            var h = image.height;
            //计算压缩后的图片长和宽
            if (h > MAX_HEIGHT) {
                w *= MAX_HEIGHT / h;
                h = MAX_HEIGHT;
            }
            //使用MegaPixImage封装照片数据
            var mpImg = new MegaPixImage(file);
            //按照Orientation来写入图片数据，回调函数是上传图片到服务器
            mpImg.render(cvs, {maxWidth: w, maxHeight: h, orientation: orientation}, sendImg);
        };
        image.src = src;
    });
};
var sendImg = function () {
    var cvs = document.getElementById("cvs");
    //调用Canvas的toDataURL接口，得到的是照片文件的base64编码string
    var data = cvs.toDataURL("image/jpeg");
    //base64 string过短显然就不是正常的图片数据了，过滤。
    if (data.length < 48) {
        console.log("data error.");
        return;
    }
    //图片的base64 string格式是data:/image/jpeg;base64,xxxxxxxxxxx
    //是以data:/image/jpeg;base64,开头的，我们在服务端写入图片数据的时候不需要这个头！
    //所以在这里只拿头后面的string
    //当然这一步可以在服务端做，但让闲着蛋疼的客户端帮着做一点吧~~~（稍微减轻一点服务器压力）
    data = data.split(",")[1];
    $("#imgUrl").val(data);
};

displayImg($(".displayImg"));


//序列化对象
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
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
function addData(r) {
    var d = {};
    for (var n in r) {
        var key = n;
        d[key] = r[n];
    }
    $(".afterInfo").find('input').each(function () {
        var key = $(this).attr('name');
        $(this).val(d[key]);
    }).end().find('select').each(function () {
        var key = $(this).attr('name');
        $(this).val(d[key]);
    }).end().find('textarea').each(function () {
        var key = $(this).attr('name');
        if (key && d[key])
            $(this).val(d[key]);
    }).end();
}
