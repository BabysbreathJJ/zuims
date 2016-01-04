/**
 * Created by jimliu on 2015/12/28.
 */
$(function () {
//餐厅交互地址
    var restaurantBaseUrl = 'http://202.120.40.175:21100';

//地理位置
    var getLocation = function () {
        var cname = "";
        var geolocation = new BMap.Geolocation();
        var point = "";
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                //根据经纬度获取地理位置，不太准确，获取城市区域还是可以的
                var map = new BMap.Map("allmap");
                point = new BMap.Point(r.point.lng, r.point.lat);
                var gc = new BMap.Geocoder();

                if ($.cookie('locateCity')) {
                    $("#current-city").html($.cookie('locateCity'));
                    loadRes($.cookie('locateCity'), point, map);
                }

                gc.getLocation(point, function (rs) {
                    debugger;
                    var addComp = rs.addressComponents;
                    //alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
                    var localName = addComp.city;
                    localName = localName.substring(0, localName.length - 1);
                    if (localName != "北京" && localName != "上海" && localName && "广州" && localName != "杭州") {
                        cname = "北京";
                    }
                    else {
                        cname = localName;
                    }
                    $.cookie('locateCity', cname, {expires: 0.2});

                    $("#current-city").html($.cookie('locateCity'));
                    loadRes($.cookie('locateCity'), point, map);
                });

            }
            else {
                cname = "北京";
                $.cookie('locateCity', cname, {expires: 0.2});
                $("#current-city").html($.cookie('locateCity'));
                //默认加载

                //定位失败,point为"",距离设为*
                loadRes($.cookie('locateCity'), point, map);
            }

        }, {enableHighAccuracy: true});
    }();
    //第一次加载
    $("#myModal").modal('hide');

    //具体格式化
    function formatDistance(distance) {
        return (parseFloat(distance) / 1000).toFixed(2);
    }

    //餐厅加载+
    function loadRes(location, point, map) {
        $.ajax({
            method: 'GET',
            url: restaurantBaseUrl + '/restaurants/recommand/city?cname=' + location,
            crossDomain: true,
            success: function (data) {
                //给每一项添加距离信息
                for (var i = 0; i < data.length; i++) {
                    var restaurantPoint = new BMap.Point(data[i].longitude, data[i].latitude);
                    //console.log(point);
                    if (point == "")
                        data[i].distance = '*';
                    else
                        data[i].distance = formatDistance(map.getDistance(point, restaurantPoint));
                }


                var updateInfo = "";
                //console.log(data[data.length-1].restaurantId)
                var firstLi =
                    '<li class="fl ml5 mr5">' +
                    '<div class="w-300 r-single">' +
                    '<div class="pos-r overflow-h">' +
                    '<a class="display-ib pos-a per100 ht300" href="details.html?id=' + data[data.length - 1].restaurantId + '">' +
                    '</a>' +
                    '<img src="' + data[data.length - 1].image + ' "class="img-responsive">' +
                    '<div class="pos-a font-white bg-orange transform45 smy">三免一</div>' +
                    '<div class="pos-a tc per100 bottom20">' +
                    '<p class="bg-t display-ib per100 l-ht30 font-white">' + data[data.length - 1].title + '</p>' +
                    '</div>' +
                    '</div>' +
                    '<div class="introduce">' +
                    '<p class="tc mt16"><b class="font16">' + data[data.length - 1].title + '</b><i class="font-c-f8 ml10">hot</i></p>' +
                    '<p class="tc">' +
                        //'<span>95</span> 次预订 <span>5921</span>次浏览' +
                    '</p>' +
                    '<p>' +
                    '<span class="font-c-8f">每位：</span>' +
                    '<span class="font-c-40">￥' + data[data.length - 1].price + '<span class="font-c-8f text-d-lt">￥200</span>（含15%服务费）</span>' +
                    '</p>' +
                    '<p>' +
                    '<span class="font-c-8f">地址 ：</span>' +
                    '<span class="font-c-40">' + data[data.length - 1].address + ' | 约' + data[data.length - 1].distance + 'km</span>' +
                    '</p>' +
                    '<p>' +
                    '<span class="font-c-8f">电话 ：</span>' +
                    '<span class="font-c-40"><a class="font-c-40" href="tel:010-52190227">010-52190227</a></span>' +
                    '</p>' +
                    '</div>' +
                    '</div>' +
                    '</li>';
                var lastLi =
                    '<li class="fl ml5 mr5">' +
                    '<div class="w-300 r-single">' +
                    '<div class="pos-r overflow-h">' +
                    '<a class="display-ib pos-a per100 ht300" href="details.html?id=' + data[0].restaurantId + '">' +
                    '</a>' +
                    '<img src="' + data[0].image + ' "class="img-responsive">' +
                    '<div class="pos-a font-white bg-orange transform45 smy">三免一</div>' +
                    '<div class="pos-a tc per100 bottom20">' +
                    '<p class="bg-t display-ib per100 l-ht30 font-white">' + data[0].title + '</p>' +
                    '</div>' +
                    '</div>' +
                    '<div class="introduce">' +
                    '<p class="tc mt16"><b class="font16">' + data[0].title + '</b><i class="font-c-f8 ml10">hot</i></p>' +
                    '<p class="tc">' +
                    '<span>95</span> 次预订 <span>5921</span>次浏览' +
                    '</p>' +
                    '<p>' +
                    '<span class="font-c-8f">每位：</span>' +
                    '<span class="font-c-40">￥' + data[0].price + '<span class="font-c-8f text-d-lt">￥200</span>（含15%服务费）</span>' +
                    '</p>' +
                    '<p>' +
                    '<span class="font-c-8f">地址 ：</span>' +
                    '<span class="font-c-40">' + data[0].address + ' | 约' + data[0].distance + 'km</span>' +
                    '</p>' +
                    '<p>' +
                    '<span class="font-c-8f">电话 ：</span>' +
                    '<span class="font-c-40"><a class="font-c-40" href="tel:010-52190227">010-52190227</a></span>' +
                    '</p>' +
                    '</div>' +
                    '</div>' +
                    '</li>';
                for (var i = 0; i < data.length; i++) {
                    if (i == 0) {

                        var restaurantInfo =
                            '<li class="fl ml5 mr5">' +
                            '<div class="w-300 r-single r-active">' +
                            '<div class="pos-r overflow-h">' +
                            '<a class="display-ib pos-a per100 ht300" href="details.html?id=' + data[i].restaurantId + '">' +
                            '</a>' +
                            '<input type="hidden" value="' + data[i].restaurantId + '">' +
                            '<img src="' + data[i].image + ' "class="img-responsive">' +
                            '<div class="pos-a font-white bg-orange transform45 smy">三免一</div>' +
                            '<div class="pos-a tc per100 bottom20">' +
                            '<p class="bg-t display-ib per100 l-ht30 font-white">' + data[i].title + '</p>' +
                            '</div>' +
                            '</div>' +
                            '<div class="introduce">' +
                            '<p class="tc mt16"><b class="font16">' + data[i].title + '</b><i class="font-c-f8 ml10">hot</i></p>' +
                            '<p class="tc">' +
                            '<span>95</span> 次预订 <span>5921</span>次浏览' +
                            '</p>' +
                            '<p>' +
                            '<span class="font-c-8f">每位：</span>' +
                            '<span class="font-c-40">￥' + data[i].price + '<span class="font-c-8f text-d-lt">￥200</span>（含15%服务费）</span>' +
                            '</p>' +
                            '<p>' +
                            '<span class="font-c-8f">地址 ：</span>' +
                            '<span class="font-c-40">' + data[i].address + ' | 约' + data[i].distance + 'km</span>' +
                            '</p>' +
                            '<p>' +
                            '<span class="font-c-8f">电话 ：</span>' +
                            '<span class="font-c-40"><a class="font-c-40" href="tel:010-52190227">010-52190227</a></span>' +
                            '</p>' +
                            '</div>' +
                            '</div>' +
                            '</li>';
                    }
                    else {

                        var restaurantInfo =
                            '<li class="fl ml5 mr5">' +
                            '<div class="w-300 r-single">' +
                            '<div class="pos-r overflow-h">' +
                            '<a class="display-ib pos-a per100 ht300" href="details.html?id=' + data[i].restaurantId + '">' +
                            '</a>' +
                            '<input type="hidden" value="' + data[i].restaurantId + '">' +
                            '<img src="' + data[i].image + ' "class="img-responsive">' +
                            '<div class="pos-a font-white bg-orange transform45 smy">三免一</div>' +
                            '<div class="pos-a tc per100 bottom20">' +
                            '<p class="bg-t display-ib per100 l-ht30 font-white">' + data[i].title + '</p>' +
                            '</div>' +
                            '</div>' +
                            '<div class="introduce">' +
                            '<p class="tc mt16"><b class="font16">' + data[i].title + '</b><i class="font-c-f8 ml10">hot</i></p>' +
                            '<p class="tc">' +
                            '<span>95</span> 次预订 <span>5921</span>次浏览' +
                            '</p>' +
                            '<p>' +
                            '<span class="font-c-8f">每位：</span>' +
                            '<span class="font-c-40">￥' + data[i].price + '<span class="font-c-8f text-d-lt">￥200</span>（含15%服务费）</span>' +
                            '</p>' +
                            '<p>' +
                            '<span class="font-c-8f">地址 ：</span>' +
                            '<span class="font-c-40">' + data[i].address + ' | 约' + data[i].distance + 'km</span>' +
                            '</p>' +
                            '<p>' +
                            '<span class="font-c-8f">电话 ：</span>' +
                            '<span class="font-c-40"><a class="font-c-40" href="tel:010-52190227">010-52190227</a></span>' +
                            '</p>' +
                            '</div>' +
                            '</div>' +
                            '</li>';

                    }


                    updateInfo += restaurantInfo;
                }

                updateInfo = firstLi + updateInfo + lastLi;
                $("#restaurant-list").empty();
                $("#restaurant-list").append(updateInfo);
                var length = $(".r-single").length;
                var width = $(".r-list").find('li').length * 290 + 'px';
                var initialleft = (document.body.clientWidth - 3 * 290) / 2 + "px";
                $(".r-list").css("width", width);
                $(".r-list").css("left", initialleft);
                var i = 1;

                function goright() {
                    var left = $(".r-list").css("left");
                    if (parseInt(left) <= -(length - 2) * 270 - 50) {
                        $(".r-list").animate({'left': initialleft});
                        $(".r-list").css("left", initialleft);
                        i = 1;
                        $(".r-single").removeClass('r-active');
                        $($(".r-single")[i]).addClass('r-active');
                        //$($(".r-single")[length-1]).addClass('r-active');


                    }
                    else {
                        $(".r-list").animate({'left': parseInt(left) - 290 + 'px'});
                        $(".r-single").removeClass('r-active');
                        $($(".r-single")[i + 1]).addClass('r-active');
                        i = i + 1;
                    }
                }

                function goleft() {
                    var left = $(".r-list").css("left");

                    if (parseInt(left) >= (parseInt(initialleft) - 30)) {
                        $(".r-list").animate({'left': (-((length - 2) * 290) + ((document.body.clientWidth - 290) / 2)) + 'px'});
                        //$(".r-list").css("left","-850px");
                        i = length - 2;
                        $(".r-single").removeClass('r-active');

                        $($(".r-single")[i]).addClass('r-active');


                    }
                    else {
                        $(".r-single").removeClass('r-active');
                        $($(".r-single")[i - 1]).addClass('r-active');
                        $(".r-list").animate({'left': parseInt(left) + 290 + 'px'});
                        i = i - 1;
                    }
                }

                /*滑动*/
                $(".r-list").swipe({
                    swipeStatus: function (event, phase, direction, distance, duration, fingers) {
                        if (direction == "left") {
                            goright();
                        }
                        else if (direction == "right") {
                            goleft();
                        }
                        else if (direction == "up") {
                            $('html,body').animate({scrollTop: '800px'}, 300);
                        }
                        else if (direction == "down") {
                            $('html,body').animate({scrollTop: '0px'}, 300);
                        }
                    },
                    threshold: 200,
                    maxTimeThreshold: 5000,
                    fingers: 'all'
                });

            }
        });
    }


    //模态框
    $("#city").swipe({
        swipeStatus: function (event, phase, direction, distance, duration, fingers) {
            if (phase == 'cancel' && duration != '0') {
                $('#myModal').modal('show')
            }
        },
        threshold: 200,
        maxTimeThreshold: 5000,
        fingers: 'all'
    })
    $("#close").swipe({
        swipeStatus: function (event, phase, direction, distance, duration, fingers) {
            if (phase == 'cancel' && duration != '0') {
                $('#myModal').modal('hide')
            }
        },
        threshold: 200,
        maxTimeThreshold: 5000,
        fingers: 'all'
    })
    //选择城市下拉列表触发事件
    $(".city-item").click(function () {
        $("#current-city").text($(this).text());
        $("#myModal").modal('hide');
        loadRes($(this).text());
        $.cookie('locateCity', $(this).text());
    })
})
//一键定点击事件
$("#orderClick").click(function () {
    var href = $(".r-active").find('a').attr('href');
    var id = $(".r-active").find('input').val();
    window.location.href = "order.html?id=" + id;
});


