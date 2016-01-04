/**
 * Created by jimliu on 2016/1/2.
 */
//加载餐厅列表
var resUrl = 'http://202.120.40.175:21100';
loadRes($.cookie('locateCity'));
function loadRes(cname){
    var resInfo = "";
    $.ajax({
        url : resUrl + "/restaurants/recommand/city",
        type : "GET",
        data : {cname : cname},
        crossDomain: true,
        success : function(data){
            for(var i = 0;i < data.length;i ++){
                var resDiv = '<div class="border border-r-5 bg-white padding mt10">'+
                             '<div class="pos-r overflow-h">'+
                             '<a href="details.html?id='+data[i].restaurantId+'">'+
                             '<img src="'+data[i].image+'" class="img-responsive">'+
                             '</a>'+
                             '<div class="pos-a font-white bg-orange transform45 smy">三免一</div>'+
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