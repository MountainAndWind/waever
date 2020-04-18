var field1="field16314"//触发字段
var field2="field18037"//被赋值日期字段  field2019
var field3="field18038"//被赋值时间字段
var fixTime="9:00"//

$(document).click(function () {
    /*console.log(get63HourAgo("2020-01-01"))
    console.log(getLocalTime(get63HourAgo("2020-01-01")))*/
    var srcDate = $("#"+field1).val();
    console.log("触发日期为::"+srcDate);
    var agoDate = getLocalTime(get63HourAgo(srcDate))
    console.log("3天前的日期::"+agoDate);
    console.log("设置日期")
    $("#"+field2).val(agoDate);
    $("#"+field2).attr("__value",agoDate);
    //field18037span   __value
    $("#"+field2+"span").html(agoDate);
    console.log("设置时间")
    $("#"+field3).val(fixTime);
    $("#"+field3).attr("__value",fixTime);
    //field18037span   __value
    $("#"+field3+"span").html(fixTime);
})


function get63HourAgo(time) {
    var timeStamp = new Date(time).getTime();
    return Number(timeStamp)-3*86400*1000
}


function getLocalTime(nS) {
    //将时间戳（十三位时间搓，也就是带毫秒的时间搓）转换成时间格式
    // d.cTime = 1539083829787
    var date = new Date(nS);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    date = year + '-' + month + '-' + day;
    console.log(date); // 2018-10-09
    return date;
}

