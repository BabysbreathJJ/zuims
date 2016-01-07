/**
 * Created by jimliu on 2016/1/2.
 */
//加载餐厅列表
var resUrl = 'http://202.120.40.175:21100';
loadRes($.cookie('locateCity'));
function loadRes(cname){

    $.ajax({
        url : resUrl + "/restaurants/recommand/city",
        type : "GET",
        data : {cname : cname},
        crossDomain: true,
        success : function(data){
            var resInfo = loadDiv(data);
            $(".resList").html("");
            $(".resList").append(resInfo);
        }

    })
}
//dom添加
function loadDiv(data){
    debugger;
    var resInfo = "";
    var smy = '<div class="pos-a font-white bg-orange transform45 smy">三免一</div>';
    for(var i = 0;i < data.length;i ++){
        if(data[i].discountType[0] == "暂无"){
            smy = "";
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
            '<span class="font-c-8f">每位 :</span>'+
            '<span class="font-c-40">'+data[i].price+'元'+
            '</span>'+
            '</p>'+
            '<p>'+
            '<span class="font-c-8f">地址：</span>'+
            '<span class="font-c-40">'+data[i].address+
            '</span>'+
            '</p>'+
            /*                             '<p>'+
             '<span class="font-c-8f">电话 ：</span>'+
             '<span>'+
             '<a class="font-c-40" href="tel:'+tel[0]+'">'+tel[0]+
             '</a>'+','+
             '<a class="font-c-40" href="tel:'+tel[1]+'">'+tel[1]+
             '</a>'+
             '</span>'+
             '</p>'+*/
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

function searchRes(resName){
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
            console.log(result)
            var resInfo = loadDiv(result);
            $(".resList").html("");
            $(".resList").append(resInfo);
        }

    })
}

//选择城市
//选择城市下拉列表触发事件
$(".city-item").click(function(){
    $("#current-city").text($(this).text());
    $("#myModal").modal('hide');
    $.cookie('locateCity', $(this).text());
    loadRes($.cookie('locateCity'));
})
//上部点击
menu();
function menu(){
    $(".menu").click(function(){
        $(".menu").find('span').removeClass("font-c-f8");
        $(this).find('span').addClass("font-c-f8");
    })
}
$(".hot").click(function(){
    change($(this));
});
$(".price").click(function(){
    change($(this));
});
var i = true;
function change(obj){
    if(i){
        //从下到上
        obj.find(".glyphicon-triangle-top").show();
        obj.find(".glyphicon-triangle-bottom").hide();
        i = false;
    }
    else{
        //从上到下
        obj.find(".glyphicon-triangle-top").hide();
        obj.find(".glyphicon-triangle-bottom").show();
        i = true;
    }
}