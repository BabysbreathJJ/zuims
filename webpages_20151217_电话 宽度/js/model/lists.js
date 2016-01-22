/**
 * Created by jimliu on 2016/1/2.
 */
//加载餐厅列表
var resUrl = 'http://202.120.40.175:21100';
var price = true;//排序时候用
var hot = true;//排序时候用
var index = 10;
$("#current-city").html($.cookie('locateCity'));//获取城市
//获取数据
function getData(cname){
    var resData = [];
    $.ajax({
        url : resUrl + "/restaurants/city",
        type : "GET",
        async: false,
        data : {cname : cname},
        crossDomain: true,
        success : function(data){
            for(var i = 0; i < data.length; i++){
                if(parseInt(data[i].price) > 0){
                    resData.push(data[i]);
                }
            }
            //resData = data;
        }
    })
    return resData;
}
//处理数据
var resData = getData($.cookie('locateCity'));

//初始化页面添加data
more(resData,index);
//更多
$("#more").click(function(){
    index+=10;
    if(resData.length - index < -10){
        alert("没有更多了")
        return false;
    }
    else{
        more(resData,index)
    }

});
//价格排序
$('.price').click(function(){
    index = 10;
    $(".result").html("");
    if(price){
        //从下到上
        $(this).find(".glyphicon-triangle-top").show();
        $(this).find(".glyphicon-triangle-bottom").hide();
        price = false;
        resData = sort(resData);

    }
    else{
        //从上到下
        $(this).find(".glyphicon-triangle-top").hide();
        $(this).find(".glyphicon-triangle-bottom").show();
        price = true;
        resData = sort(resData).reverse();

    }
    $('html,body').animate({scrollTop: '0px'}, 300);
    more(resData,index);
});

//dom添加
function loadDiv(data){
    var resInfo = "";
    var smy = '';
    for(var i = 0;i < data.length;i ++){
        smy = '<div class="pos-a font-white bg-orange transform45 smy">三免一</div>';
        var price = Math.round(data[i].price*0.67);
        if(data[i].discountType[0] == "none"){
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
            '<img src="'+data[i].image+'" class="img-responsive">'+
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
    return resInfo;
}
//搜素餐厅
$(".search").click(function(){
    var resName = $(".searchText").val()
    searchRes(resName);
})
//点击更多处理数据
function more(data,index){
    if(data.length < index){
        index = data.length;

    }
    var newData = [];
    for(var i = 0; i < index; i ++){
        newData.push(data[i]);
    }
    var resInfo = loadDiv(newData);
    $(".resList").html("")
    $(".resList").html(resInfo);

}

//热门点击
$('.hot').click(function(){
    if(hot){
        //从下到上
        $(this).find(".glyphicon-triangle-top").show();
        $(this).find(".glyphicon-triangle-bottom").hide();
        hot = false;
    }
    else{
        //从上到下
        $(this).find(".glyphicon-triangle-top").hide();
        $(this).find(".glyphicon-triangle-bottom").show();
        hot = true;
    }
});


function searchRes(resName){
    var index = 10;
    $.ajax({
        url : resUrl + "/restaurants/search",
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
                more(result,index);
            }

        }

    })
}

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
                index = 10;
                var span = '<span id="current-pro">分类 <span class="glyphicon glyphicon-triangle-bottom"></span></span>'
                $("#current-pro").html(span);
                $("#current-city").text($(this).text());
                $("#myModal").modal('hide');
                $.cookie('locateCity',$(this).text())
                resData = getData($.cookie('locateCity'));

                more(resData,index);
                //更多
                $("#more").click(function(){
                    index+=10;
                    more(proData,index)
                });
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
                index = 10;
                //产品数据
                resData = getData($.cookie('locateCity'));
                var proData = [];
                for(var i = 0;i < resData.length; i ++){
                    if(resData[i].restaurantType == $(this).text()){
                        proData.push(resData[i]);
                    }
                }
                resData = proData;
                $("#current-pro").text($(this).text());
                $("#myModal1").modal('hide');
                $('html,body').animate({scrollTop: '0px'}, 300);
                more(resData,index);

            })
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
//价格排序
function sort(array){
    var i = 0, len = array.length,
        j, d;
    for(; i<len; i++){
        for(j=0; j<len; j++){
            if(parseInt(array[i].price) < parseInt(array[j].price)){
                d = array[j];
                array[j] = array[i];
                array[i] = d;
            }
        }
    }
    return array;
}

