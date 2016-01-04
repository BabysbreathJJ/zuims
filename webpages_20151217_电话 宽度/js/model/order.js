/**
 * Created by jimliu on 2016/1/1.
 */

//加载餐厅
var loadRes = function(){
    var id = getUrlParam('id');
    var resUrl = 'http://202.120.40.175:21100/restaurants/info';
    $.ajax({
        url: resUrl,
        data: {id: id},
        type: "GET",
        dataType: "JSON",
        success : function(data){
            $("#d-img").attr("src",data.images[0]);
            $("input[name='resId']").val(data.restaurantId);
            $(".resName").html(data.restaurantName);

        }
    })

}();
//选择日期及餐厅类别
addClass($("#date"),false);
addClass($("#class"),false);
addClass($("#people-number"),true);
function addClass(obj,isClear){
    var i = true;
    obj.find('.plot').click(function(){
        if(i){
            if(isClear){
                obj.find('.plot').removeClass("plot-active");
                $(this).addClass("plot-active");
                i = false;
            }
            else{
                $(this).addClass("plot-active");
                i = false;
            }
        }
        else{
            $(this).removeClass("plot-active");
            i = true;
        }

    })
}

//获取url参数
function getUrlParam(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
    {
        return unescape(r[2]);
    }
    else
    {
        return null;
    }
}
//menu();
//
//function menu(){
//
//    $(".menu").click(function(){
//        $(".menu").find('span').removeClass("font-c-f8");
//        $(this).find('span').addClass("font-c-f8");
//        i = false;
//
//    })
//}
//上方排序内容，需与产品商议
//var hot = true;
//var price = true;
//$(".hot").click(function(){
//    if(hot){
//        $(this).find(".glyphicon-triangle-top").show();
//        $(this).find(".glyphicon-triangle-bottom").hide();
//        hot = false;
//    }
//    else{
//        $(this).find(".glyphicon-triangle-top").hide();
//        $(this).find(".glyphicon-triangle-bottom").show();
//        hot = true;
//    }
//})
//$(".price").click(function(){
//    if(price){
//        $(this).find(".glyphicon-triangle-top").show();
//        $(this).find(".glyphicon-triangle-bottom").hide();
//        price = false;
//    }
//    else{
//        $(this).find(".glyphicon-triangle-top").hide();
//        $(this).find(".glyphicon-triangle-bottom").show();
//        price = true;
//    }
//})