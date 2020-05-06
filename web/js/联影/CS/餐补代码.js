var array1;
/*
* 设置点  费用类型  天数   时间
* */
/**
 * 设置餐补
 * @param type
 * @param s_day
 * @param s_time
 * @param e_day
 * @param e_time
 * @param array1
 * @returns {number}
 */
function f_getFee(rowNum) {
    var  type=$("#"+invoice_type_field+"_"+rowNum).val();
    var s_day=$("#"+startDate+"_"+rowNum).val();
    var s_time= $("#"+startTime+"_"+rowNum).val();
    var e_day=$("#"+endDate+"_"+rowNum).val();
    var e_time=$("#"+endTime+"_"+rowNum).val();
    var s_day_r = s_day.split("-").length;
    var e_day_r = e_day.split("-").length;
    var s_time_r = s_time.split(":").length;
    var e_time_r = e_time.split(":").length;

    if(s_day_r >1 && e_day_r >1 && s_time_r >1  && e_time_r >1 ){
        var res;
        var rArray = array1.split(";");
        var search = rArray.indexOf(type);
        if (search < rArray.length - 1 && search >= 0) {
            var s_day_r = s_day.split("-");
            var e_day_r = e_day.split("-");
            var s_time_r = s_time.split(":");
            var e_time_r = e_time.split(":");

            var start_d = new Date(s_day_r[0], Number(s_day_r[1]) - 1, s_day_r[2], 0, 0, 0, 0);
            var end_d = new Date(e_day_r[0], Number(e_day_r[1]) - 1, e_day_r[2], 0, 0, 0, 0);
            var start_t = new Date(1900, Number("1") - 1, 1, s_time_r[0], s_time_r[1], 0, 0);
            var end_t = new Date(1900, Number("1") - 1, 1, e_time_r[0], e_time_r[1], 0, 0);
            if (start_d.getTime() == end_d.getTime()) {
                var dif = end_t.getTime() - start_t.getTime();
                if (dif >= 12 * 60 * 60 * 1000) {
                    return 100;
                } else if (dif >= 10 * 60 * 60 * 1000) {
                    return 70;
                } else if (dif >= 4 * 60 * 60 * 1000) {
                    return 35;
                } else {
                    return 0;
                }
            } else {
                var middle = (end_d.getTime() - start_d.getTime()) / (24 * 60 * 60 * 1000) - 1;
                var start = 0;
                var end = 0;
                var m_t = new Date(1900, Number("1") - 1, 1, 12, 0, 0, 0);
                if (start_t.getTime() > m_t.getTime()) {
                    start = 50;
                } else {
                    start = 100;
                }
                if (end_t.getTime() >= m_t.getTime()) {
                    end = 100;
                } else {
                    end = 50;
                }
                res= 100 * middle + start + end;
            }
        }
        if(res!=undefined){
            $("#"+bz_field+"_"+rowNum+"span").html(res);
            $("#"+bz_field+"_"+rowNum).val(res);
        }
    }
}

function validationCb(num,i) {
    var  type=$("#"+invoice_type_field+"_"+num[i]).val();
    var s_day=$("#"+startDate+"_"+num[i]).val();
    var s_time= $("#"+startTime+"_"+num[i]).val();
    var e_day=$("#"+endDate+"_"+num[i]).val();
    var e_time=$("#"+endTime+"_"+num[i]).val();
    var s_day_r = s_day.split("-").length;
    var e_day_r = e_day.split("-").length;
    var s_time_r = s_time.split(":").length;
    var e_time_r = e_time.split(":").length;

    if(s_day_r >1 && e_day_r >1 && s_time_r >1  && e_time_r >1 ){
        var res=f_getFee(type, s_day, s_time, e_day, e_time,array1 );
        if(res!=undefined &&Number(   $("#"+ sbje_field +"_"+num[i]).val()  )>res ){
            errors=errors+"\n明细第"+index+"行,额度为:"+res
        }
    }
}


if(errors!=""){
    top.Dialog.alert("明细无法提交，报销额度超过执行标准!"+errors);
    return false;
}