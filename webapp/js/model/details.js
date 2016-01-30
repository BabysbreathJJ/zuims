/**
 * Created by jimliu on 2016/1/1.
 */
var imgUrl = 'http://202.120.40.175:21100';
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


            $(".type").html(data.restaurantType);
            $(".order").attr("href",'order.html?id='+data.restaurantId);
            if(data.restaurantOpenTime == ""){
                $(".timeP").addClass("display-n");
            }
            else{
                $(".openTime").html(data.restaurantOpenTime);
            }
            if(data.park == ""){
                $(".parkP").addClass("display-n");
            }
            else{
                $(".park").html(data.park);
            }

            if(data.discountType[0] == 'none'){
                $(".smy").addClass("display-n");
                $(".smy-label").addClass('display-n');
                $(".price").html(data.averagePrice);
            }
            else{
                $(".price").html(Math.round(data.averagePrice*0.67));
            }

            if(data.restaurantTele == ""){
                $(".telP").addClass("display-n");
            }
            else{
                var tel = data.restaurantTele.split(" ");
                //console.log(data.restaurantTele.split(" "));
                //添加电话
                var telInfo = "";
                for (var i = 0; i < tel.length; i++) {
                    var aTel = '<a class="font-c-40" href="tel:' + tel[i] + '">' + tel[i] + '</a> &nbsp;';
                    telInfo += aTel;
                }
                $(".tel").append(telInfo);
            }

            //猜你喜欢
            like(data.restaurantType,id);
            //添加图片
            $.ajax({
                url : "http://202.120.40.175:21104/restaurant/normalimage?id="+id,
                type : "GET",
                success : function(data){

                    //取数组后五个
                    var newData = data.slice(-5);
                    if(data.length < 5){
                        newData = data;
                    }
                    var bigImg = "";
                    var imgInfo = "";

                    for (var j = 0; j < newData.length; j++) {
                        if(j == 0){
                            var imgBig = '<div class="item active">'+
                                         '<div class="pos-r overflow-h">'+
                                         '<img src="'+imgUrl+newData[j].picname+'" class="per100">'+
                                         '<div class="pos-a tc per100 bottom20">'+
                                         '<p class="bg-t display-ib per90 ht40 l-ht40 font-white introduction">'+
                                            newData[j].introduction+
                                         '</p>'+
                                         '</div>'+
                                         '</div>'+
                                         '</div>';
                            var imgli = '<li class="fl pl4 per20 border-r-5 active" data-slide-to="'+j+'" data-target="#myCarousel">' +
                                '<img id="'+j+'"   src="' + imgUrl+newData[j].picname + '" class="per100">' +
                                '</li>';
                        }
                        else{
                            var imgBig = '<div class="item">'+
                                '<div class="pos-r overflow-h">'+
                                '<img src="'+imgUrl+newData[j].picname+'" class="per100">'+
                                '<div class="pos-a tc per100 bottom20">'+
                                '<p class="bg-t display-ib per90 ht40 l-ht40 font-white introduction">'+
                                    newData[j].introduction+
                                '</p>'+
                                '</div>'+
                                '</div>'+
                                '</div>';
                            var imgli = '<li class="fl pl4 per20 border-r-5" data-slide-to="'+j+'" data-target="#myCarousel">' +
                                '<img id="'+j+'"   src="' + imgUrl+newData[j].picname + '" class="per100">' +
                                '</li>';
                        }

                        imgInfo += imgli;
                        bigImg += imgBig;
                    }
                    $(".carousel-inner").append(bigImg);
                    $(".img-list").append(imgInfo);
                    //自动播放
                    $('.carousel').carousel({
                        interval: 3000 //两秒自动轮播
                    }).carousel('cycle');
                    //点击滑动
                    $(".left0").click(function(){
                        $('.carousel').carousel('prev');
                    });
                    $(".right0").click(function(){
                        $('.carousel').carousel('next');
                    });
                    //左右滑动
                    $("#myCarousel").swipe({
                        swipeStatus: function (event, phase, direction, distance, duration, fingers) {
                            if (direction == "left") {
                                $('.carousel').carousel('next');
                            }
                            else if (direction == "right") {
                                $('.carousel').carousel('prev');
                            }
                        },
                        threshold: 200,
                        maxTimeThreshold: 5000,
                        fingers: 'all'
                    });
                }
            })



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
function like(type,id){
    var allRes = [];
    var city = $.cookie('locateCity');
    var getresUrl = 'http://202.120.40.175:21100//restaurants/recommand/city?cname=' + city;
    $.ajax({
        method: 'GET',
        url: getresUrl,
        crossDomain: true,
        success: function (data) {
            allRes = data;
            for(var i = 0;i < data.length; i++){
                if(data[i].restaurantId == id){
                    allRes.splice(i,1)
                }
                if(allRes[i].restaurantType == type){
                    var img;
                    $.ajax({
                        url : "http://202.120.40.175:21104/restaurant/normalimage?id="+allRes[i].restaurantId,
                        type : "GET",
                        async : false,
                        success : function(data){
                            img = data[0].picname;
                        }
                    })
                    var likeRes = '<a href="details.html?id='+allRes[i].restaurantId+'" style="text-decoration:none;">'+
                                  '<img src="'+imgUrl+img+'" class="fl per40 mr20 ht80">'+
                                  '<div class="overflow-h">'+
                                  '<p class="font-c-f8 font16">'+allRes[i].title+'</p>'+
                                  '<p class="font-c-8f">地址：'+allRes[i].address+'</p>'+
                                  '<p class="font-c-8f">人均消费：￥'+allRes[i].price+'</p>'+
                                  '</div>'+
                                  '</a>';

                    $(".like").html(likeRes);
                    return ;
                }
            }
        }
    })
    //更多点击
    $("#more").click(function(){
        var moreLike = "";
        for(var i = 0;i < allRes.length;i ++){
            if(allRes[i].restaurantType == type){
                var likeRes = '<a href="details.html?id='+allRes[i].restaurantId+'" style="text-decoration:none;">'+
                    '<img src="'+imgUrl+allRes[i].image+'" class="fl per40 mr20 ht80">'+
                    '<div class="overflow-h">'+
                    '<p class="font-c-f8 font16">'+allRes[i].title+'</p>'+
                    '<p class="font-c-8f">地址：'+allRes[i].address+'</p>'+
                    '<p class="font-c-8f">人均消费：￥'+allRes[i].price+'</p>'+
                    '</div>'+
                    '</a>';
                moreLike += likeRes;
            }
        }
        $(".like").html(moreLike);
        $(this).addClass("display-n");
    })

}