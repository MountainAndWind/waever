function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);//ʱ���Ϊ10λ��*1000��ʱ���Ϊ13λ�Ļ������1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + 'Y';
    var D = date.getDate();
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return M+D+'d';

}
var date = Date.parse(new Date())/1000;; //��ȡ��ǰ����
console.log(date);

var dateList=[];

//var NowDate = timestampToTime(date);
//console.log(timestampToTime(date));//2014-06-18 10:33:24
for(var i=6;i>=0;i--){
    dateList[i] = timestampToTime(date);
    date = date-86400;
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