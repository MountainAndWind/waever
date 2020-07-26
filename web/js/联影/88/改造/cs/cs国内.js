<script src="/aes/controllerCSYB.js"></script>
<script>
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
    var type=$("#"+invoice_type_field+"_"+rowNum).val();
    var s_day=$("#"+startDate+"_"+rowNum).val();
    var s_time= $("#"+startTime+"_"+rowNum).val();
    var e_day=$("#"+endDate+"_"+rowNum).val();
    var e_time=$("#"+endTime+"_"+rowNum).val();



    var s_day_r = s_day.split("-").length;
    var e_day_r = e_day.split("-").length;
    var s_time_r = s_time.split(":").length;
    var e_time_r = e_time.split(":").length;


    var res;
    if(s_day_r >1 && e_day_r >1 && s_time_r >1  && e_time_r >1 ){
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
                    res= 100;
                } else if (dif >= 10 * 60 * 60 * 1000) {
                    res=  70;
                } else if (dif >= 4 * 60 * 60 * 1000) {
                    res=  35;
                } else {
                    res=  0;
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
        if(!isNull(res)||res==0){
            //$("#"+bz_field+"_"+rowNum+"span").html(res);
            $("#"+bz_field+"_"+rowNum).val(res);
        }
    }
}





$(document).ready(function() {

    findValidationId(canBuMainId)


    var num = $("#submitdtlid0").val();
    num = num.split(",")

    $.get("/work/canbu.jsp",
        function (data, status) {
            array1 = data;
        });

    if (array1 == undefined) {
        $.get("/work/canbu.jsp",
            function (data, status) {
                array1 = data;
            });
    }
    for (var i = 0; i < num.length; i++) {
        var rowNum = num[i];
        $("#" + invoice_type_field + "_" + rowNum).bindPropertyChange(function (e) {
            var index = e.id.split("_")[1]
            var typeVal = $("#" + invoice_type_field + "_" + index).val();
            var flag = isNull(typeVal);
            if (!flag) {
                if (isExist(canBuIDs, typeVal)) {//dayAllowanceIDs
                    setBt(endTime, index);
                    setBt(startTime, index);
                    f_getFee(index)
                } else {
                    canBt(endTime, index);
                    canBt(startTime, index);
                    getBz(index);
                }
            } else {
                canBt(endTime, index);
                canBt(startTime, index);
            }
        });
        // //国内触发点 ：城市   费用类型   费用类型对照id  sqr  天数  fylxMainId  sqrField
        $("#" + daysField + "_" + rowNum + ",#" + city + "_" + rowNum
            + ",#" + fylxMainId + "_" + rowNum
            + ",#" + bz_field + "_" + rowNum).bindPropertyChange(function (e) {
            var index = e.id.split("_")[1]
            setDay(index)
            var dayVal = $("#" + daysField + "_" + index).val();
            if (Number(dayVal) < 0) {
                var index = getIndex(index)
                top.Dialog.alert("明细第" + index + "行天数不能为负数请修改！！！")
            }
            var typeVal = $("#" + invoice_type_field + "_" + index).val();
            var flag = isNull(typeVal);
            if (!flag) {
                if (isExist(canBuIDs, typeVal)) {//dayAllowanceIDs
                    f_getFee(index)
                } else {
                    getBz(index);
                }
            }
        });

        /**
         * 天数计算触发操作
         */
        $("#" + startDate + "_" + rowNum + ",#" + endDate + "_" + rowNum).bindPropertyChange(function (e) {
            var index = e.id.split("_")[1]
            setDay(index);
        });


        /**
         * 时间触发餐补费用
         */
        $("#" + startTime + "_" + rowNum + ",#" + endTime + "_" + rowNum).bindPropertyChange(function (e) {
            var index = e.id.split("_")[1]
            f_getFee(index)
        });

        $("#"+bz_field+"_"+rowNum).attr("readonly","readonly");
        $("#"+bz_field+"_"+rowNum).attr("UNSELECTABLE","on");
        jdZhFun(num, i);
    }

    var dtIdLength = 0;
    var oldDtIdLength = 0;
    var oldLastIndex=-1;
    /*
    当明细行数量增加时，为增加的明细行添加函数；当明细行数量减少时，重新计算总额
     */
    var detileTabId = "#submitdtlid0";
    $(detileTabId).bindPropertyChange(function () {
        dtIdLength = jQuery(detileTabId).val().split(",").length;
        if (oldDtIdLength <= dtIdLength) {
            var num = $("#submitdtlid0").val();
            num = num.split(",")
            var nowrowNum = num[num.length - 1];
            //console.log("oldLastIndex:"+oldLastIndex)
            //console.log("nowrowNum:"+nowrowNum)
            for(var index=Number(oldLastIndex)+1;index<=nowrowNum;index++) {
                //console.log("index::" + index)
                var rowNum = index;
                // //国内触发点 ：城市   费用类型   费用类型对照id  sqr  天数  fylxMainId  sqrField
                $("#" + daysField + "_" + rowNum + ",#" + city + "_" + rowNum
                    + ",#" + fylxMainId + "_" + rowNum
                    + ",#" + bz_field + "_" + rowNum).bindPropertyChange(function (e) {
                    var i = e.id.split("_")[1]
                    setDay(i)
                    var dayVal = $("#" + daysField + "_" + i).val();
                    if (Number(dayVal) < 0) {
                        var index = getIndex(i)
                        top.Dialog.alert("明细第" + index + "行天数不能为负数请修改！！！")
                    }
                    var typeVal = $("#" + invoice_type_field + "_" + i).val();
                    var flag = isNull(typeVal);
                    if (!flag) {
                        if (isExist(canBuIDs, typeVal)) {//dayAllowanceIDs
                            f_getFee(i)
                        } else {
                            getBz(i);
                        }
                    }
                });

                $("#" + invoice_type_field + "_" + rowNum).bindPropertyChange(function (e) {
                    var i = e.id.split("_")[1]
                    var typeVal = $("#" + invoice_type_field + "_" + i).val();
                    var flag = isNull(typeVal);
                    if (!flag) {
                        if (isExist(canBuIDs, typeVal)) {//dayAllowanceIDs
                            setBt(endTime, i);
                            setBt(startTime, i);
                            f_getFee(i)
                        } else {
                            canBt(endTime, i);
                            canBt(startTime, i);
                            getBz(i);
                        }
                    } else {
                        canBt(endTime, i);
                        canBt(startTime, i);
                    }
                });

                /**
                 * 日期计算触发操作
                 */
                $("#" + startDate + "_" + rowNum + ",#" + endDate + "_" + rowNum).bindPropertyChange(function (e) {
                    var i = e.id.split("_")[1]
                    setDay(i);
                });

                /**
                 * 时间触发餐补费用
                 */
                $("#" + startTime + "_" + rowNum + ",#" + endTime + "_" + rowNum).bindPropertyChange(function (e) {
                    var i = e.id.split("_")[1]
                    f_getFee(i)
                });
            }
            oldDtIdLength = dtIdLength;
            oldLastIndex=nowrowNum;
            $("#"+bz_field+"_"+nowrowNum).attr("readonly","readonly");
            $("#"+bz_field+"_"+nowrowNum).attr("UNSELECTABLE","on");
        }
        if (oldDtIdLength > dtIdLength) {
            oldDtIdLength = dtIdLength;
        }
    });

    checkCustomize = function () {
        var num = $("#submitdtlid0").val();
        num = num.split(",");
        var comfirmMsg="";
        for (var i = 0; i < num.length; i++) {
            //var index = Number(i) + 1;
            var index=getIndex(num[i]);
            var endDateVal = $("#" + endDate + "_" + num[i]).val();
            var endTimeVal = $("#" + endTime + "_" + num[i]).val();
            var startDateVal = $("#" + startDate + "_" + num[i]).val();
            var startTimeVal = $("#" + startTime + "_" + num[i]).val();
            var factjeVal = $("#" + sbje_field + "_" + num[i]).val();
            var limitJeVal = $("#" + bz_field + "_" + num[i]).val();
            var invoiceVal = $("#" + invoice_type_field + "_" + num[i]).val();
            var fylxMainIdVal = $("#"+fylxMainId+"_"+num[i]).val()
            var nowDate = getNowDate();
            if(isExist(canBuIDs,invoiceVal)){
                if(isNull(startTimeVal)){
                    top.Dialog.alert("明细第"+index+"行无法提交, 开始时间不得为空！！！")
                    return false;
                }
                if(isNull(endTimeVal)){
                    top.Dialog.alert("明细第"+index+"行无法提交, 结束时间不得为空！！！")
                    return false;
                }
            }
            if (isNull(startTimeVal)) {
                startTimeVal = "00:00"
            }
            if (isNull(endTimeVal)) {
                endTimeVal = "00:00"
            }
            var start = startDateVal + " " + startTimeVal + ":00"
            var end = endDateVal + " " + endTimeVal + ":00"
            if (!compareTime(start, end)) {
                top.Dialog.alert("明细第" + index + "行无法提交, 开始时间要早于结束时间！！！")
                return false;
            }
            var bs = $("#"+thbs).val()
            if(bs!=1){
                var days = getDays(endDateVal,nowDate)
                var zcbxtsVal = $("#" +zcbxts+ "_" + num[i]).val();
                console.log("最长报销天数::"+zcbxtsVal)
                if(Number(days)>zcbxtsVal){
                    top.Dialog.alert("明细第"+index+"行无法提交，费用发生日期已超过"+zcbxtsVal+"天！！！")
                    return false;
                }
            }else{
                var fhrqVal =$("#"+fhrq).val();
                var days = getDays(fhrqVal,nowDate)
                if(Number(days)>30){
                    top.Dialog.alert("明细第"+index+"行无法提交，退回发生日期已超过"+days+"天！！！")
                    return false;
                }
            }
            var isLet = $("#"+isLetField+"_"+num[i]).val();
            console.log("$(\"#\"+isLetField+\"_\"+num[i])"+("#"+isLetField+"_"+num[i]))
            var fylxName = getFylxName("#"+invoice_type_field+"_"+num[i])
            console.log("fylxName::"+fylxName)
            console.log("isLet::"+isLet)
            comfirmMsg = checkValidation(comfirmMsg,isLet,index,fylxName,factjeVal,limitJeVal,"",fylxMainIdVal)
            console.log("comfirmMsg::"+comfirmMsg)
            console.log("comfirmMsg==\"false\"::"+(comfirmMsg=="false"))
            if(comfirmMsg=="false"){
                return false;
            }
            jdZhFun(num,i);
        }
        console.log("comfirmMsg::"+comfirmMsg)
        if(comfirmMsg!=""){
            $(isContainOverBz).val("1");
            comfirmMsg+="请在报销说明中写上超标原因，并确认是否继续提交！！！";
            if(confirm(comfirmMsg)){
                return true;
            }else{
                return false;
            }
        }
        $(isContainOverBz).val("0");
        return true;
    }
})



/**
 * 获取执行标准
 * @param num
 * @param index
 */
function getBz(index) {
    getSimpleBz(index,"INNER");
}


/**
 * 比较两个时间
 * @param dateString1
 * @param dateString2
 * @returns {number}
 */
function  getDaysBetween(dateString1,dateString2){
    var  startDate = Date.parse(dateString1);
    var  endDate = Date.parse(dateString2);
    var days=(endDate - startDate)/(1*24*60*60*1000);
    // alert(days);
    return  days;
}

/**
 * 设置天数
 * @param index
 */
function setDay(index) {
    ////console.log("setDay")
    var s_day=$("#"+startDate+"_"+index).val();
    var e_day=$("#"+endDate+"_"+index).val();
    var days = getDaysBetween(s_day,e_day);
    var  type=$("#"+fylxMainId+"_"+index).val();
    if(type!="11"&&type!="15"){
        if(days>=0){
            days++;
        }
    }
    $("#"+daysField+"_"+index).val(days);
    $("#"+daysField+"_"+index+"span").html(days);
}

/**
 * 查找费用类型对照表中存在的明细
 * @param val
 */
function findValidationId(val) {///base/findInvoiceTypById.jsp?fieldVal=3
    var msg = "";
    $.ajax({
        type:"GET",
        url:"/base/findInvoiceTypById.jsp?",
        data: {'fieldVal':val,'timeStamp':new Date().getTime()},
        dataType:"text",
        success:function(data){
            var str=JSON.stringify(data);
            msg=str.substring(str.indexOf("<body>")+26,str.indexOf("</body>")-8);
            if(accoomInvoceMainId==val){
                accoomInvoceIDs=msg//费用类型对照表中电话费集合
            }else if(indoorTransMainId==val){
                indoorTransIDs=msg//费用类型对照表中结婚礼金集合
            }else if(canBuMainId==val){
                canBuIDs=msg//费用类型对照表中结婚礼金集合
            }else if(serveMainId==val){
                serveIDs=msg//费用类型对照表中电话费集合
            }else if(indoorTransEdMainId==val){
                indoorTransEdIDs=msg//费用类型对照表中电话费集合
            }
        },
        error:function(jqXHR){
            alert("发生错误："+ jqXHR.status);
        }
    });
}
</script>
<style>
.cusbrowwidth .e8_os{min-width:50px !important;}
</style>









