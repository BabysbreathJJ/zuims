/**
 * Created by Lijingjing on 16/1/21.
 */
$("input").focus(function () {
    var name = $(this).attr('name');
    $("." + name + "Err").addClass("display-n");
});


$("#validate").click(function () {

    if ($("input[name='tel']").val() == "") {
        $(".telErr").removeClass('display-n');
        return false;
    }
    var tel = $("input[name='tel']").val();
    var telTest = /^1[3|4|5|8][0-9]\d{4,8}$/;
    if (telTest.test(tel)) {
        $.ajax({
            url: "http://202.120.40.177:30180/checkNumberRest/checkNumber/send/" + tel,
            type: "GET",
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                console.log(data);
            }
        });
    }
    else {
        $(".telErr").removeClass("display-n");
        return false;
    }


});


$("#nextStep").click(function () {
    var tel = $("input[name='tel']").val();
    if ($("input[name='secode']").val() == "") {
        $(".secodeErr").removeClass('display-n');
        return false;
    }
    else {
        var secode = $("input[name='secode']").val();
        $.ajax({
            url: "http://202.120.40.177:30180/checkNumberRest/checkNumber/check/" + tel + "/" + secode,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            success: function (data) {
                console.log(data.result);
                if (data.result == "success") {
                    window.location.href = "regpay.html?tel="+tel;
                }
                else {
                    console.log("error");
                    $(".secodeErr").removeClass('display-n');
                    return false;
                }
            },
            error: function (data) {
                console.log(data);
            }
        });
    }

});