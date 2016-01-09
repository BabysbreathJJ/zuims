/**
 * Created by jimliu on 2015/12/31.
 */
//是否已登录
var hasLogin = function () {
    if (!$.cookie('login')) {
        window.location.href = "reg.html";
    }
}();
//取cookie中的phone加载用户信息
var getUser = function () {
    var userUrl = "http://202.120.40.175:21101/users";
    var phone = $.cookie('phone');
    $.ajax({
        url: userUrl,
        data: {phone: phone},
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
            $(".vipLevel").html(data.vipLevel);
            if (data.firstname == null)
                $(".name").html(data.lastname);
            else
                $(".name").html(data.firstname);
            $(".phone").html(data.phone);
            $(".post").html(data.position);
            //$(".post"),html(data.position);
            $('.phone').attr('href', 'tel:' + data.phone);
        }


    });

    //获取用户头像
    $("#avatar").attr('src', 'http://202.120.40.175:21101/users/images?phone=' + phone);


}();

function showMoreOrders(orderInfo, start, len) {

    var showOrder = '';
    for (var i = 0; i < len; i++) {
        showOrder += '<tr>' +
            '<input type="hidden" class="orderNum" value="' + orderInfo[start + i].orderId + '">' +
            '<td class="resName">' + orderInfo[start + i].restaurantName + '</td>' +
            '<td class="tc"><small class="orderTime">' + orderInfo[start + i].orderTime + '</small></td>' +
            '<td class="tc state orderState">' + orderInfo[start + i].state + '</td>' +
            '</tr>';
    }
    $("#orderInfo").append(showOrder);

    $(".state").each(function () {
        var state = $(this).text();
        if (state == '未完成')
            $(this).addClass('font-green');
        else if (state == "已拒绝" || state == "已完成")
            $(this).addClass('font-default');
        else if (state == "未确认")
            $(this).addClass('font-red');
    });
}

$(function () {

    var orderUrl = 'http://202.120.40.175:21104/order/infoByphoneid?phoneId=' + $.cookie('phone');

    $.ajax({
        url: orderUrl,
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
            var orderInfos = data;

            //按照订单创建时间排序
            orderInfos.sort(function (a, b) {  //自定义函数排序,新的订单放在最前面
                var createTime1 = b.createTime;
                var createTime2 = a.createTime;
                var dateTime1 = createTime1.split(" ");
                var dateTime2 = createTime2.split(" ");
                if (dateTime1[0] == dateTime2[0]) {
                    var time1 = dateTime1[1].split(":");
                    var time2 = dateTime2[1].split(":");
                    if (time1[0] == time2[0]) {
                        if (time1[1] == time2[1])
                            return time1[2] < time2[2] ? -1 : 1;
                        else
                            return time1[1] < time2[1] ? -1 : 1;
                    }
                    else {
                        return time1[0] < time2[0] ? -1 : 1;
                    }
                }
                else {
                    var date1 = dateTime1[0].split('-');
                    var date2 = dateTime2[0].split('-');
                    if (date1[0] == date2[0]) {
                        if (date1[1] == date2[1]) {
                            return date1[2] < date2[2] ? -1 : 1;
                        }
                        else
                            return date[1] < date2[1] ? -1 : 1;
                    }
                    else
                        return date1[0] < date2[0] ? -1 : 1;
                }

            });

            if (orderInfos.length >= 3)
                showMoreOrders(orderInfos, 0, 3);
            else
                showMoreOrders(orderInfos, 0, orderInfos.length)

            var index = 3;


            $(".user-info").on('click', 'tr', function () {
                var orderNum = $(this).find('.orderNum').val();
                var name = $(this).find('.resName').html();
                var orderTime = $(this).find('.orderTime').html();
                var orderState = $(this).find('.orderState').html();
                $("#orderNum").html(orderNum);
                $("#resName").html(name);
                $("#orderTime").html(orderTime);
                $("#orderState").html(orderState);
                $('#orderDetails').modal('show');
            });


            $("#operation").on('click', '.hideOrders', function () {
                index = 3;
                $("#orderInfo").html('<tr><th class="per40 tc">餐厅名称</th><th class="per40 tc">预定时间</th> <th class="per20 tc">状态</th> </tr>');
                if (orderInfos.length >= 3)
                    showMoreOrders(orderInfos, 0, 3);
                else
                    showMoreOrders(orderInfos, 0, orderInfos.length)
                $('#operation').html('<div class="tc mt10 moreOrders" style="margin-bottom: 5px"> <span class="font-c-35">更多 <span class="glyphicon glyphicon-menu-down"></span></span></div>');
            });

            $("#operation").on('click', '.moreOrders', function () {
                var remain = orderInfos.length - index;
                if (remain >= 3) {
                    showMoreOrders(orderInfos, index, 3);
                    index += 3;
                    console.log($('#orderInfo').prop("scrollHeight"));
                    $('#orderInfo').animate({scrollTop: $('#orderInfo').prop("scrollHeight")}, 1000);
                }
                else {
                    showMoreOrders(orderInfos, index, remain);
                    $('#orderInfo').animate({scrollTop: $('#orderInfo').prop("scrollHeight")}, 1000);
                    $('#operation').html('');
                    $('#operation').append('<div class="tc mt10 hideOrders" style="margin-bottom: 5px"> <span class="font-c-35">收起 <span class="glyphicon glyphicon-menu-up"></span></span></div>');
                    index = 3;
                }

            });


        }
    });

});
