/**
 * Created by jimliu on 2016/1/1.
 */


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
            if (data.images[0] == 'http://202.120.40.175:21100/restaurants/images?relativePath=NonePicture.jpg')
                data.images[0] = 'http://202.120.40.175:21100/restaurants/images?relativePath=NonePicture2.jpg';
            $("#d-img").attr("src", data.images[0]);
            $("input[name='resId']").val(data.restaurantId);
            $(".resName").html(data.restaurantName);
            var averagePrice = data.averagePrice;
            $("#averagePrice").val(averagePrice);
            var discount = data.discountType;
            var originPrice = 0;
            var pay = 0;
            if (discount[0] !== 'discount') {
                $("#discountPay").hide();
                $("#payType").val('originPay');
                originPrice = Number(averagePrice) * 3;
                $("#payMore").text(originPrice);
                $(".smy").hide();
            }
            else {
                $("#originPay").hide();
                $("#payType").val('discountPay');
                originPrice = Number(averagePrice) * 3;
                pay = originPrice - 3 / 3 * averagePrice;//默认是预定数是三个人
                $("#payLess").text(pay);
            }


            if (args['myDate'] == undefined) {
                $("#originPrice").text("￥" + originPrice);
                $("#orderDate").text(formatDate(new Date()));
                $("#hiddenDate").val(orderDate(new Date()));
                $("#orderTime").val("11:00:00");
                $("#dinerNum").val(3);

            }
            else {
                $("#orderDate").text(args['myDate']);
                $("#hiddenDate").val((args['orderDate']));
                $("#orderTime").val(args['myTime']);
                $("#dinerNum").val(args['dinerNum']);
                $("#remark").val(args['more']);
                originPrice = Number(averagePrice) * parseInt(args['dinerNum']);
                $("#originPrice").text("￥" + originPrice);
                pay = args['pay'];
                $("#payLess").text(pay);
            }

            $("#address").text(data.restaurantAddress);
            $("#openTime").text(data.restaurantOpenTime);

        }
    })

}();

$(function () {

    //var content = getUrlParam();
    //$("#orderDate").text(content['myDate']);
    //$("#orderTime").val(content['myTime']);
    //$("#dinerNum").val(content['dinerNum']);
    //$("#remark").val(content['more']);
    //$(".pay").text(content['pay']);
    //if ($("#payType").val() == 'discountPay') {
    //
    //    $("#originPrice").text(content['originPrice']);
    //}


    $('.dropdown-toggle').dropdown();
    $('#selectDate').datetimepicker({
        inline: true,
        viewMode: 'days',
        format: 'yyyy-MM-dd',
        locale: 'zh-cn'
    });

    var selectDate = $('#selectDate').data("DateTimePicker");

    selectDate.hide();
    $('#selectDate').click(function () {
        selectDate.toggle();
    });

    $('#selectDate').datetimepicker()
        .on('dp.change', function (e) {
            var eventDate = e.date._d;

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
            pay = originPrice - parseInt(dinerNum / 3) * averagePrice;
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
            $.ajax({
                url: "http://202.120.40.175:21104/order/makeorder",
                data: JSON.stringify(orderInfo),
                type: "post",
                contentType: "application/json",
                crossDomain: true,
                async: true,
                success: function (data) {
                    $('#confirmModal').modal('show');
                    $('#feedbackConfirm').click(function () {
                        location.href = 'usercenter.html';
                    });

                }
            });
        }

    });

});

