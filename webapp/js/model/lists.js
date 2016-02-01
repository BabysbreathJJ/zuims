/**
 * Created by jimliu on 2016/1/26.
 */
//获取城市
$("#current-city").html($.cookie('locateCity'));//获取城市
//图片链接
var imgUrl = 'http://202.120.40.175:21100';
//每页餐厅数
var pageSize = 10;
//页码
var pageIndex;
//排序
var sorder = 0;
//显示限制
var tmp = 0;
//餐厅类型
var restaurantType = "";
//餐厅分页url
var restaurantsUrl = 'http://202.120.40.175:21100/v3/restaurants/city';
//价格排序url
var priceUrl = 'http://202.120.40.175:21104/restaurant/page/price';
//餐厅类型排序
var typeUrl = 'http://202.120.40.175:21104/restaurant/page/restauranttype';
//请求类型
var getType = 'normal';
//价格点击
var priceClick = true;
//加载数据
function loadData(data){
    var resInfo = "";
    var smy = '';
    for(var i = 0;i < data.length;i ++){
        smy = '<div class="pos-a font-white bg-orange transform45 smy">三免一</div>';
        var price = Math.round(data[i].price*0.67);
        if(data[i].discountType !== 'discount'){
            smy = "";
            price = data[i].price;
        }
        if(data[i].image == 'http://202.120.40.175:21100/restaurants/images?relativePath=NonePicture.jpg')
        {
            data[i].image = 'http://202.120.40.175:21100/restaurants/images?relativePath=NonePicture2.jpg';
        }
        var resDiv = '<div class="border border-r-5 bg-white padding mt10">'+
            '<div class="pos-r overflow-h">'+
            '<a href="details.html?id='+data[i].restaurantId+'">'+
            '<img src="'+imgUrl+data[i].image+'" class="img-responsive">'+
            '</a>'+
            smy+
            '</div>'+
            '<div class="pl10 pr10 pos-r mt20">'+
            '<div class="mb16">'+
            '<b class="font16 display-ib pt6">'+data[i].title+
            '</b>'+
            '<a href="order.html?id='+data[i].restaurantId+'">'+
            '<span class="btn bg-orange font-white fr pl20 pr20">'+
            '订'+
            '</span>'+
            '</a>'+
            '</div>'+
            '<p>'+
            '<span class="font-c-8f">每位：</span>'+
            '<span class="font-c-40">￥'+price+
            '</span>'+
            '</p>'+
            '<p>'+
            '<span class="font-c-8f">地址：</span>'+
            '<span class="font-c-40">'+data[i].address+
            '</span>'+
            '</p>'+
            '<p>'+
            '<span class="font-c-8f">餐厅类别：</span>'+
            '<span class="font-c-40">'+data[i].restaurantType+
            '</span>'+
            '<p>'+
            '</div>'+
            '</div>';

        resInfo+= resDiv;
    }
    $(".resList").append(resInfo)
}
//加载数据鑫
function loadData(data){
    var resInfo = "";
    var smy = '';
    for(var i = 0;i < data.length;i ++){
        smy = '<div class="pos-a font-white bg-orange transform45 smy">三免一</div>';
        var price = Math.round(data[i].price*0.67);
        if(data[i].discountType !== 'discount'){
            smy = "";
            price = data[i].price;
        }
        if(data[i].image == '/restaurants/images?relativePath=NonePicture.jpg')
        {
            data[i].image = '/restaurants/images?relativePath=NonePicture2.jpg';
        }
        var resDiv = '<div class="border border-r-5 bg-white padding mt10">'+
            '<div class="pos-r overflow-h">'+
            '<a href="details.html?id='+data[i].restaurantId+'">'+
            '<img src="'+imgUrl+data[i].image+'" class="img-responsive">'+
            '</a>'+
            smy+
            '</div>'+
            '<div class="pl10 pr10 pos-r mt20">'+
            '<div class="mb16">'+
            '<b class="font16 display-ib pt6">'+data[i].title+
            '</b>'+
            '<a href="order.html?id='+data[i].restaurantId+'">'+
            '<span class="btn bg-orange font-white fr pl20 pr20">'+
            '订'+
            '</span>'+
            '</a>'+
            '</div>'+
            '<p>'+
            '<span class="font-c-8f">每位：</span>'+
            '<span class="font-c-40">￥'+price+
            '</span>'+
            '</p>'+
            '<p>'+
            '<span class="font-c-8f">地址：</span>'+
            '<span class="font-c-40">'+data[i].address+
            '</span>'+
            '</p>'+
            '<p>'+
            '<span class="font-c-8f">餐厅类别：</span>'+
            '<span class="font-c-40">'+data[i].restaurantType+
            '</span>'+
            '<p>'+
            '</div>'+
            '</div>';

        resInfo+= resDiv;
    }
    $(".resList").append(resInfo)
}
//获取初始数据
var getData = function(cname,page,size){
    var resData;
    $.ajax({
        url : restaurantsUrl,
        async  : false,
        type : 'GET',
        data : {cname:cname,page:page,size:size},
        success : function(data){
            resData = data;
        }
    })
    return resData;
}
//获取价格数据
var getPriceData = function(page,size,sorder,city,tmp){
    var resData;
    $.ajax({
        url : priceUrl,
        async  : false,
        type : 'GET',
        data : {pageIndex:page,pageSize:size,sorder:sorder,city:city,tmp:tmp},
        success : function(data){
            resData = data;
        }
    })
    return resData;
}
//获取产品数据
var getProData = function(page,size,sorder,restaurantType,city){
    var resData;
    $.ajax({
        url : typeUrl,
        async  : false,
        type : 'GET',
        data : {pageIndex:page,pageSize:size,sorder:sorder,restaurantType:restaurantType,city:city},
        success : function(data){
            resData = data;
        }
    })
    return resData;
}
//页面初始加载
var firstLoad = function(){
    pageIndex = 0;
    var cname = $.cookie('locateCity');
    var data = getData(cname,pageIndex,pageSize);
    loadData(data);

}();
//价格排序
$('.price').click(function(){
    if(getType == "pro"){
        return;
    }
    else{
        $(".resList").html("");
        pageIndex = 0;
        $(".result").html("");
        if(priceClick){
            //从下到上
            $(this).find(".glyphicon-triangle-top").show();
            $(this).find(".glyphicon-triangle-bottom").hide();
            priceClick = false;
            sorder = 0;
        }
        else{
            //从上到下
            $(this).find(".glyphicon-triangle-top").hide();
            $(this).find(".glyphicon-triangle-bottom").show();
            priceClick = true;
            sorder = 1;
        }
        var resData;
        var city = $.cookie('locateCity');
        resData = getPriceData(pageIndex,pageSize,sorder,city,tmp);
        loadData(resData);
        $('html,body').animate({scrollTop: '0px'}, 300);

    }

});
//获取城市列表
var getCityList =  function(){
    $.ajax({
        url : "http://202.120.40.175:21108/cities",
        type : "GET",
        crossDomin : true,
        contentType: 'application/json',
        success : function(data){
            var liList = "";
            for(var i = 0;i < data.length;i ++){
                var li = '<li class="l-ht30 font14 border-b-1 city-item"><a href="#">'+data[i].name+'</a></li>';
                liList += li;
            }

            $(".cityList").append(liList);
            //选择城市下拉列表触发事件
            $(".city-item").click(function(){
                var span = '<span id="current-pro">分类 <span class="glyphicon glyphicon-triangle-bottom"></span></span>'
                $("#current-pro").html(span);
                $("#current-city").text($(this).text());
                $("#myModal").modal('hide');
                $.cookie('locateCity',$(this).text());
                pageIndex = 1;
                var resData = getData($.cookie('locateCity'),pageIndex,pageSize);
                $(".resList").html("");
                loadData(resData);

            })
        }
    })
}();
//获取产品列表
var getCityList =  function(){
    $.ajax({
        url : "http://202.120.40.175:21108/productions",
        type : "GET",
        crossDomin : true,
        contentType: 'application/json',
        success : function(data){
            var liList = "";
            for(var i = 0;i < data.length;i ++){
                var li = '<li class="l-ht30 font14 border-b-1 pro-item"><a href="#">'+data[i].name+'</a></li>';
                liList += li;
            }
            $(".proList").append(liList);
            //产品排序
            $(".pro-item").click(function(){
                pageIndex = 0;
                getType = 'pro';
                restaurantType = $(this).text();
                $("#current-pro").text($(this).text());
                var resData = getProData(pageIndex,pageSize,sorder,restaurantType,$.cookie('locateCity'));
                $(".resList").html("");
                loadData(resData);
                $("#myModal1").modal('hide');
                $('html,body').animate({scrollTop: '0px'}, 300);

            })
        }
    })
}();
//页面更多点击
var more = function(){
    $("#more").click(function(){
        pageIndex +=1;
        var resdata;
        var cname = $.cookie('locateCity');
        if(getType == 'normal'){
            resdata = getData(cname,pageIndex,pageSize)
        }
        else if(getType == 'price'){
            resdata = getPriceData(pageIndex,pageSize,sorder,cname,tmp)
        }
        else if(getType == 'pro'){
            resdata = getProData(pageIndex,pageSize,sorder,restaurantType,cname)
        }
        if(resdata == ""){
            alert("没有更多了")
        }
        else{
            loadData(resdata);
        }
    })
}();
//上部点击
var  menu = function(){
    $(".menu").click(function(){
        $(".menu").find('span').removeClass("font-c-f8");
        $(this).find('span').addClass("font-c-f8");
    })
}();
//搜素餐厅
$(".search").click(function(){
    var resName = $(".searchText").val()
    searchRes(resName);
})
//搜索
function searchRes(resName){
    var index = 10;
    $.ajax({
        url : "http://202.120.40.175:21100/restaurants/search",
        type : "GET",
        data : {text : resName},
        crossDomain: true,
        success : function(data){
            var result = [];
            for(var i = 0;i < data.length;i++){
                if(data[i].city == $.cookie('locateCity')){
                    result.push(data[i]);
                }
            }

            if(result.length == 0){
                var div = '<div class="tc mt20">抱歉，没有找到相关的内容，<br>请尝试其他关键字。</div>'
                $(".resList").html(div)
            }
            else{
                loadData(result);
            }

        }

    })
}