/**
 * Created by jimliu on 2016/1/4.
 */
var loginUrl = 'http://202.120.40.175:21100/users/register';
$("input").focus(function(){
   var name = $(this).attr('name');
   $("."+name+"Err").addClass("display-n");
});

$("submit").click(function(){
    var pass = $("input[name='pass']").val();
    var passAgain = $("input[name='passAgain']").val();
    if(pass == passAgain){
        var lastName = $("input[name='lastName']").val();
        var gender = $("input[name='gender']").val();
        var tel = $("input[name='tel']").val();
        var pass = $("input[name='pass']").val();
        $.ajax({

        })
    }
    else{
        $(".passAgainErr").removeClass("display-n")
    }

})