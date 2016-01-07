/**
 * Created by jimliu on 2016/1/2.
 */
//加载餐厅列表
var resUrl = 'http://202.120.40.175:21100';
var price = true;//排序时候用
var hot = true;//排序时候用
loadRes($.cookie('locateCity'));
$("#current-city").html($.cookie('locateCity'));
function loadRes(cname){

    $.ajax({
        url : resUrl + "/restaurants/city",
        type : "GET",
        data : {cname : cname},
        crossDomain: true,
        success : function(data){
            var newData = data;
            var index = 10;
            more(newData,index)
            $("#more").click(function(){
                index+=10;
                more(newData,index)
            });
            //价格排序
            sortPrice(newData,index);

        }

    })
}
//dom添加
function loadDiv(data){
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
            '<span class="font-c-40">￥'+data[i].price+
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
//点击更多处理数据
function more(data,index){
    var newData = [];
    for(var i = 0; i < index; i ++){
        newData.push(data[i]);
    }
    var resInfo = loadDiv(newData);
    $(".resList").html(resInfo);
}
//价格排序
function sortPrice(newData,index){
    $('.price').click(function(){

        if(price){
            //从下到上
            $(this).find(".glyphicon-triangle-top").show();
            $(this).find(".glyphicon-triangle-bottom").hide();
            price = false;
            newData = sort(newData,'small')

        }
        else{
            //从上到下
            $(this).find(".glyphicon-triangle-top").hide();
            $(this).find(".glyphicon-triangle-bottom").show();
            price = true;
            newData = newData.reverse();
            console.log(newData);

        }
        $('html,body').animate({scrollTop: '0px'}, 300);
        more(newData,index)
        $("#more").click(function(){
            index+=10;
            more(newData,index)
        })
    });
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