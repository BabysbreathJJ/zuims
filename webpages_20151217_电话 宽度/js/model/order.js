/**
 * Created by jimliu on 2016/1/1.
 */





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
            $("#d-img").attr("src", data.images[0]);
            $("input[name='resId']").val(data.restaurantId);
            $(".resName").html(data.restaurantName);
            var averagePrice = data.averagePrice;
            $("#averagePrice").val(averagePrice);
            var originPrice = Number(averagePrice) * 3;
            var pay = originPrice - 3 / 3 * averagePrice;
            $("#pay").text(pay);
            $("#originPrice").text("￥" + originPrice);
            $("#address").text(data.restaurantAddress);
            $("#openTime").text(data.restaurantOpenTime);
            $("#orderDate").text(formatDate(new Date()));
            $("#hiddenDate").val(orderDate(new Date()));
            $("#orderTime").val("11:00:00");
            $("#dinerNum").val(3);

        }
    })

}();

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

$(function () {

    var content = getUrlParam();
    console.log(content);
    $("#orderDate").text(content['myDate']);
    $("#orderTime").val(content['myTime']);
    $("#dinerNum").val(content['dinerNum']);
    $("#remark").val(content['more']);
    $("#pay").text(content['pay']);
    $("#originPrice").text(content['originPrice']);

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
        var pay = originPrice - parseInt(dinerNum / 3) * averagePrice;
        $("#pay").text(pay);
        $("#originPrice").text("￥" + originPrice);
    });


    $("#completeOrder").click(function () {
        var phoneId = $.cookie("phone");
        var args = getUrlParam();
        var restaurantId = parseInt(args['id']);
        var more = $("#remark").val();
        var dinerNum = parseInt($("#dinerNum").val());
        var pay = Number($("#pay").text());
        var orderTime = $("#orderTime").val();
        var orderDate = $("#hiddenDate").val();
        var orderDateTime = orderDate + " " + orderTime;
        var orderInfo = {
            phoneId: phoneId,
            restaurantId: restaurantId,
            more: more,
            dinerNum: dinerNum,
            orderTime: orderDateTime,
            dorderSum: pay
        };

        if (phoneId == "" || phoneId == undefined || phoneId == null) {
            var myOrderInfo = {};
            var myDate = $("#orderDate").text();
            var myTime = orderTime;
            var originPrice = $("#originPrice").text();
            var args = getUrlParam();
            var id = parseInt(args['id']);
            var url = "login.html?myDate=" + myDate + "&myTime=" + myTime + "&dinerNum=" + dinerNum + "&pay=" + pay + "&originPrice=" + originPrice + "&more=" + more + "&id=" + id;
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

})
;

