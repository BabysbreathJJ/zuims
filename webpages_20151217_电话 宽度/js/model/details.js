/**
 * Created by jimliu on 2016/1/1.
 */

//页面加载
var load = function () {
    var id = getUrlParam('id');
    var resUrl = 'http://202.120.40.175:21100/restaurants/info';
    $('#jumpToOrder').attr('href','order.html?id='+id);

    $.ajax({
        url: resUrl,
        data: {id: id},
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            //定位求距离
            var geolocation = new BMap.Geolocation();
            var point = "";
            geolocation.getCurrentPosition(function (r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    //根据经纬度获取地理位置，不太准确，获取城市区域还是可以的
                    var map = new BMap.Map("allmap");
                    point = new BMap.Point(r.point.lng, r.point.lat);
                    //添加距离信息
                    var restaurantPoint = new BMap.Point(data.longitude, data.latitude);
                    data.distance = (parseFloat(map.getDistance(point, restaurantPoint))/ 1000).toFixed(2);
                }
                else
                    data.distance = '*';

                $(".address").append('&nbsp;|&nbsp;约'+data.distance+'km');

            }, {enableHighAccuracy: true});

            $(".resName").html(data.restaurantName);
            $(".address").html(data.restaurantAddress);
            $(".openTime").html(data.restaurantOpenTime);
            $(".price").html(data.averagePrice);
            $(".type").html(data.restaurantType);
            $(".order").attr("href",'order.html?id='+data.restaurantId)
            $(".park").html(data.park);



            var tel = data.restaurantTele.split(" ");
            //console.log(data.restaurantTele.split(" "));
            //添加电话
            var telInfo = "";
            for (var i = 0; i < tel.length; i++) {
                var aTel = '<a class="font-c-40" href="tel:' + tel[i] + '">' + tel[i] + '</a> &nbsp;';
                telInfo += aTel;
            }
            $(".tel").append(telInfo);
            //猜你喜欢
            like(data.restaurantType);
            //添加图片
            $("#d-img").attr('src', data.images[0])
            var imgInfo = "";
            for (var j = 0; j < data.images.length; j++) {
                var imgli = '<li class="fl pl10 border-r-5">' +
                    '<img src="' + data.images[j] + '" class="per100">' +
                    '</li>';
                imgInfo += imgli;
            }
            $(".img-list").append(imgInfo);
            //图片点击
            var img = $(".img-list").find('img');
            img.css("width", (document.body.clientWidth - 150) / 4 + "px")
            img.css("height", img.css("width"));
            img.click(function () {
                var src = $(this).attr("src");
                $("#d-img").attr("src", src);
            })
            var length = $(".img-list").find('img').length;
            var width = parseInt(img.css("width")) * (length + 1);
            $(".img-list").css("width", width + 'px');
        }

    })

}();

//获取url参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    else {
        return null;
    }
}
//推荐餐厅
function like(type){
    var city = $.cookie('locateCity');
    var getresUrl = 'http://202.120.40.175:21100//restaurants/recommand/city?cname=' + city;
    $.ajax({
        method: 'GET',
        url: getresUrl,
        crossDomain: true,
        success: function (data) {
            for(var i = 0;i < data.length; i++){
                if(data[i].restaurantType == type){
                    var likeRes = '<a href="details.html?id="+data[i].restaurantId style="text-decoration:none;">'+
                                  '<img src="'+data[i].image[0]+'" class="fl per40 mr20">'+
                                  '<div class="overflow-h">'+
                                  '<p class="font-c-f8 font16">'+data[i].restaurantName+'</p>'+
                                  '<p class="font-c-8f">地址：'+data[i].restaurantAddress+'</p>'+
                                  '<p class="font-c-8f">人均消费：￥'+data[i].averagePrice+'</p>'+
                                  '</div>'+
                                  '</a>';

                    $(".like").html(likeRes);
                    return ;
                }
            }
        }
    })
}
