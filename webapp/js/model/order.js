/**
 * Created by jimliu on 2016/1/1.
 */
var imgUrl = 'http://202.120.40.175:21100';

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


function formatDate(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var week = date.getDay();

    switch (week) {
        case 0 :
            week = '周日';
            break;
        case 1:
            week = '周一';
            break;
        case 2:
            week = '周二';
            break;
        case 3:
            week = '周三';
            break;
        case 4:
            week = '周四';
            break;
        case 5:
            week = '周五';
            break;
        case 6:
            week = '周六';
            break;
    }
    return year + "年" + month + "月" + day + "日  " + week;
}

function orderDate(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    if (month < 10)
        month = '0' + month;
    if (day < 10)
        day = '0' + day;
    return year + '-' + month + '-' + day;
}

function stringToDate(s) {
    s = s.split(/[-: ]/);
    return new Date(s[0], s[1] - 1, s[2], s[3], s[4], s[5]);
}

function compareTime(myDate, orderTime) {//myDate(YYYY-MM-DD),orderTime(HH:mm:ss)

    var date = new Date(stringToDate(myDate + ' ' + orderTime));
    var myTime = date.getTime();
    var now = new Date();
    var time = now.getTime();
    if (myTime - time < 0)
        return false;
    else
        return true;

}


//加载餐厅
var loadRes = function () {
    var args = getUrlParam();
    var id = args['id'];
    var resUrl = 'http://202.120.40.175:21100/restaurants/info?id=' + id;
    $.ajax({
        url: resUrl,
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            if (data.images[0] == '/restaurants/images?relativePath=NonePicture.jpg')
                data.images[0] = '/restaurants/images?relativePath=NonePicture2.jpg';
            $("#d-img").attr("src", imgUrl + data.images[0]);
            $("input[name='resId']").val(data.restaurantId);
            $(".hotelName").html(data.hotelName);
            $(".resName").html(data.restaurantName);
            var averagePrice = data.averagePrice;
            $("#averagePrice").val(averagePrice);
            var discount = data.discountType;
            var originPrice = 0;
            var pay = 0;

            //根据优惠类型判断是不是三免一优惠
            if (discount[0] !== 'discount') {//不是三免一优惠,只显示原价,不显示优惠后的信息
                $("#discountPay").hide();
                $("#payType").val('originPay');
                originPrice = Number(averagePrice) * 3;
                $("#payMore").text(originPrice);
                $(".smy").hide();
            }
            else {//三免一优惠类型,初始时,人数默认为3
                $("#originPay").hide();
                $("#payType").val('discountPay');
                originPrice = Number(averagePrice) * 3;
                pay = Math.round(originPrice * 2 / 3);
                $("#payLess").text(pay);
            }

            //判断是否是从登陆界面跳转过来
            if (args['myDate'] == undefined) {//不是从登陆界面跳转过来
                $("#originPrice").text("￥" + originPrice);
                $("#orderDate").text(formatDate(new Date()));
                $("#hiddenDate").val(orderDate(new Date()));
                //$("#orderTime").val("11:00:00");
                $("#dinerNum").val(3);


            }
            else {//从登陆界面跳转过来,恢复之前填写的信息
                $("#orderDate").text(args['myDate']);
                $("#hiddenDate").val((args['orderDate']));
                $("#orderTime").val(args['myTime']);
                $("#dinerNum").val(args['dinerNum']);
                $("#remark").val(args['more']);
                if (args['originPrice'] == undefined)
                    $("#payMore").text(pay);
                else {
                    $("#originPrice").text(args['originPrice']);
                    pay = args['pay'];
                    $("#payLess").text(pay);
                }

            }

            $("#address").text(data.restaurantAddress);
            $("#openTime").text(data.restaurantOpenTime);

        }
    })

}();

function getAllOrderTime() {
    var content = '<option value="11:00:00"> 午餐 11:00</option>' +
        '<option value="11:30:00"> 午餐 11:30</option>' +
        '<option value="12:00:00"> 午餐 12:00</option>' +
        '<option value="12:30:00"> 午餐 12:30</option>' +
        '<option value="13:00:00"> 午餐 13:00</option>' +
        '<option value="17:00:00"> 晚餐 17:00</option>' +
        '<option value="17:30:00"> 晚餐 17:30</option>' +
        '<option value="18:00:00"> 晚餐 18:00</option>' +
        '<option value="18:30:00"> 晚餐 18:30</option>' +
        '<option value="19:00:00"> 晚餐 19:00</option>' +
        '<option value="19:30:00"> 晚餐 19:30</option>';
    $("#orderTime").append(content);
}
function getSuitableTime(now_hour, now_minutes) {
    if (now_minutes < 30) {
        $userOrderTime.val(now_hour + ':' + '30' + ':' + '00');
    }

    else {
        $userOrderTime.val((now_hour + 1) + ':' + '00' + ':' + '00');
    }
}

function getTodayOrderTime() {
    var now = new Date();
    var now_hour = now.getHours();
    var now_minutes = now.getMinutes();
    var $userOrderTime = $("#orderTime");
    var selectContent = "";
    if (now_hour < 11) {
        getAllOrderTime();
        $userOrderTime.val("11:00:00");

    }
    else if (now_hour >= 19) {
        if (now_hour == 19 && now_hour < 30) {
            var content =
                '<option value="19:30:00"> 晚餐 19:30</option>';
            $userOrderTime.append(content);
        }
        else
            $userOrderTime.append('<option value="-1">当前日期没有可预约时间</option>')

    }
    else if (now_hour >= 11 && now_hour < 13) {
        if (now_hour == 11) {
            if (now_minutes < 30) {
                var content =
                    '<option value="11:30:00"> 午餐 11:30</option>' +
                    '<option value="12:00:00"> 午餐 12:00</option>' +
                    '<option value="12:30:00"> 午餐 12:30</option>' +
                    '<option value="13:00:00"> 午餐 13:00</option>' +
                    '<option value="17:00:00"> 晚餐 17:00</option>' +
                    '<option value="17:30:00"> 晚餐 17:30</option>' +
                    '<option value="18:00:00"> 晚餐 18:00</option>' +
                    '<option value="18:30:00"> 晚餐 18:30</option>' +
                    '<option value="19:00:00"> 晚餐 19:00</option>' +
                    '<option value="19:30:00"> 晚餐 19:30</option>';
                $userOrderTime.append(content);
            }
            else {
                var content =
                    '<option value="12:00:00"> 午餐 12:00</option>' +
                    '<option value="12:30:00"> 午餐 12:30</option>' +
                    '<option value="13:00:00"> 午餐 13:00</option>' +
                    '<option value="17:00:00"> 晚餐 17:00</option>' +
                    '<option value="17:30:00"> 晚餐 17:30</option>' +
                    '<option value="18:00:00"> 晚餐 18:00</option>' +
                    '<option value="18:30:00"> 晚餐 18:30</option>' +
                    '<option value="19:00:00"> 晚餐 19:00</option>' +
                    '<option value="19:30:00"> 晚餐 19:30</option>';
                $userOrderTime.append(content);
            }

        }
        else {
            if (now_minutes < 30) {
                var content =
                    '<option value="12:30:00"> 午餐 12:30</option>' +
                    '<option value="13:00:00"> 午餐 13:00</option>' +
                    '<option value="17:00:00"> 晚餐 17:00</option>' +
                    '<option value="17:30:00"> 晚餐 17:30</option>' +
                    '<option value="18:00:00"> 晚餐 18:00</option>' +
                    '<option value="18:30:00"> 晚餐 18:30</option>' +
                    '<option value="19:00:00"> 晚餐 19:00</option>' +
                    '<option value="19:30:00"> 晚餐 19:30</option>';
                $userOrderTime.append(content);
            }
            else {
                var content =
                    '<option value="13:00:00"> 午餐 13:00</option>' +
                    '<option value="17:00:00"> 晚餐 17:00</option>' +
                    '<option value="17:30:00"> 晚餐 17:30</option>' +
                    '<option value="18:00:00"> 晚餐 18:00</option>' +
                    '<option value="18:30:00"> 晚餐 18:30</option>' +
                    '<option value="19:00:00"> 晚餐 19:00</option>' +
                    '<option value="19:30:00"> 晚餐 19:30</option>';
                $userOrderTime.append(content);
            }

        }
        getSuitableTime(now_hour, now_minutes);

    }
    else if (now_hour >= 17 && now_hour < 19) {
        if (now_hour == 17) {
            if (now_minutes < 30) {
                var content =
                    '<option value="17:30:00"> 晚餐 17:30</option>' +
                    '<option value="18:00:00"> 晚餐 18:00</option>' +
                    '<option value="18:30:00"> 晚餐 18:30</option>' +
                    '<option value="19:00:00"> 晚餐 19:00</option>' +
                    '<option value="19:30:00"> 晚餐 19:30</option>';
                $userOrderTime.append(content);
            }
            else {
                var content =
                    '<option value="18:00:00"> 晚餐 18:00</option>' +
                    '<option value="18:30:00"> 晚餐 18:30</option>' +
                    '<option value="19:00:00"> 晚餐 19:00</option>' +
                    '<option value="19:30:00"> 晚餐 19:30</option>';
                $userOrderTime.append(content);
            }

        }
        if (now_hour == 18) {
            if (now_minutes < 30) {
                var content =
                    '<option value="18:30:00"> 晚餐 18:30</option>' +
                    '<option value="19:00:00"> 晚餐 19:00</option>' +
                    '<option value="19:30:00"> 晚餐 19:30</option>';
                $userOrderTime.append(content);
            }
            else {
                var content =
                    '<option value="19:00:00"> 晚餐 19:00</option>' +
                    '<option value="19:30:00"> 晚餐 19:30</option>';
                $userOrderTime.append(content);
            }

        }
        getSuitableTime(now_hour, now_minutes);
    }
    else if (now_hour >= 13 && now_hour < 17) {
        var content =
            '<option value="17:00:00"> 晚餐 17:00</option>' +
            '<option value="17:30:00"> 晚餐 17:30</option>' +
            '<option value="18:00:00"> 晚餐 18:00</option>' +
            '<option value="18:30:00"> 晚餐 18:30</option>' +
            '<option value="19:00:00"> 晚餐 19:00</option>' +
            '<option value="19:30:00"> 晚餐 19:30</option>';
        $userOrderTime.append(content);
        $userOrderTime.val('17' + ':' + '00' + ':' + '00');
    }
}

$(function () {

    getTodayOrderTime();

    $('.dropdown-toggle').dropdown();
    var $selectDate = $(".selectDate");
    $selectDate.datetimepicker({
        inline: true,
        viewMode: 'days',
        format: 'yyyy-MM-dd',
        locale: 'zh-cn',
        minDate: new Date()
    });

    var selectDate = $selectDate.data("DateTimePicker");

    selectDate.hide();
    $selectDate.click(function () {
        selectDate.toggle();
    });


    //点击空白区域日期选择器消失
    $(document).click(function (e) {
        var target = $(e.target);
        if (target.parents('.bootstrap-datetimepicker-widget').length < 1 && !target.hasClass('selectDate')) {
            if ($('.bootstrap-datetimepicker-widget').length > 0) {
                selectDate.hide();
            }
        }
    });

    $selectDate.datetimepicker()
        .on('dp.change', function (e) {

            var eventDate = e.date._d;
            var e_year = eventDate.getFullYear();
            var e_month = eventDate.getMonth();
            var e_day = eventDate.getDay();
            console.log(e_year + '-' + e_month + '-' + e_day);
            var today = new Date;
            var t_year = today.getFullYear();
            var t_month = today.getMonth();
            var t_day = today.getDay();
            if (e_year == t_year && e_month == t_month && e_day == t_day) {
                $("#orderTime").empty();
                getTodayOrderTime();
            }

            else {
                $("#orderTime").empty();
                getAllOrderTime();
            }


            $("#orderDate").text(formatDate(eventDate));
            $("#hiddenDate").val(orderDate(eventDate));
            selectDate.hide();
        });


    $("#dinerNum").change(function () {
        var dinerNum = parseInt(this.value);
        var averagePrice = Number($("#averagePrice").val());
        var originPrice = averagePrice * dinerNum;
        var pay;
        if ($("#payType").val() == 'discountPay') {
            pay = Math.round(originPrice * 2 / 3);
            $("#originPrice").text("￥" + originPrice);
            $("#payLess").text(pay);
        }
        else {
            pay = originPrice;
            $("#payMore").text(pay);
        }


    });

    $("#completeOrder").click(function () {

        var phoneId = $.cookie("phone");
        var args = getUrlParam();
        var restaurantId = parseInt(args['id']);
        var more = $("#remark").val();
        var dinerNum = $("#dinerNum").val();
        var reg = /^\d+$/;
        if (!dinerNum.match(reg)) {
            alert('订单人数应为不小于1的数字');
            return;
        }
        dinerNum = parseInt(dinerNum);
        if (dinerNum < 1) {
            alert("订单人数最少为1!");
            return;
        }
        var pay;
        if ($("#payType").val() == 'discountPay') {
            pay = $("#payLess").text();
        }
        else
            pay = $("#payMore").text();
        var orderTime = $("#orderTime").val();
        var orderDate = $("#hiddenDate").val();
        var orderDateTime = orderDate + " " + orderTime;


        //if (!compareTime(orderDate, orderTime)) {
        //    alert('请选择正确的订餐时间!');
        //    return;
        //}

        var orderInfo = {
            phoneId: phoneId,
            restaurantId: restaurantId,
            more: more,
            dinerNum: dinerNum,
            orderTime: orderDateTime,
            dorderSum: parseInt(pay)
        };

        if (phoneId == "" || phoneId == undefined || phoneId == null) {
            var myOrderInfo = {};
            var myDate = $("#orderDate").text();
            var myTime = orderTime;
            var url;
            var args = getUrlParam();
            var id = parseInt(args['id']);
            //console.log($("#hiddenDate").val());
            if ($("#payType").val() == 'discountPay') {
                var originPrice = $("#originPrice").text();
                url = "login.html?myDate=" + myDate + "&myTime=" + myTime + '&orderDate=' + orderDate + "&dinerNum=" + dinerNum + "&pay=" + pay + "&originPrice=" + originPrice + "&more=" + more + "&id=" + id;
            }
            else
                url = "login.html?myDate=" + myDate + "&myTime=" + myTime + '&orderDate=' + orderDate + "&dinerNum=" + dinerNum + "&pay=" + pay + "&more=" + more + "&id=" + id;


            location.href = encodeURI(url);
        }
        else {

            $("#hotelName").html($(".hotelName").text());
            $("#resName").html($(".resName").text());
            $("#orderTimeConfirm").html(orderDateTime);
            $("#dinerNumConfirm").html(dinerNum + " 人");
            $("#dorderSum").html(pay + " 元");
            $("#remarkConfirm").html(more);
            $('#confirmModal').modal('show');
            $("#cancelOrder").click(function () {
                $('#confirmModal').modal('hide');
            });

            $('#feedbackConfirm').click(function () {
                $.ajax({
                    url: "http://202.120.40.175:21104/order/makeorder",
                    data: JSON.stringify(orderInfo),
                    type: "post",
                    contentType: "application/json",
                    crossDomain: true,
                    async: true,
                    success: function (data) {
                        location.href = 'usercenter.html';
                    }
                });
            });

        }

    });

});

