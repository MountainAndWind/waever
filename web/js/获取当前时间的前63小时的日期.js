var field1="field16314"//�����ֶ�
var field2="field18037"//����ֵ�����ֶ�  field2019
var field3="field18038"//����ֵʱ���ֶ�
var fixTime="9:00"//

$(document).click(function () {
    /*console.log(get63HourAgo("2020-01-01"))
    console.log(getLocalTime(get63HourAgo("2020-01-01")))*/
    var srcDate = $("#"+field1).val();
    console.log("��������Ϊ::"+srcDate);
    var agoDate = getLocalTime(get63HourAgo(srcDate))
    console.log("3��ǰ������::"+agoDate);
    console.log("��������")
    $("#"+field2).val(agoDate);
    $("#"+field2).attr("__value",agoDate);
    //field18037span   __value
    $("#"+field2+"span").html(agoDate);
    console.log("����ʱ��")
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
    //��ʱ�����ʮ��λʱ��꣬Ҳ���Ǵ������ʱ��꣩ת����ʱ���ʽ
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

