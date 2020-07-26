<script>
/**
 * 国家类别   2（中国）  cs  国内
 * @type {string}
 */

window.console = window.console || (function () {
    var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile
        = c.clear = c.exception = c.trace = c.assert = function () { };
    return c;
})();

var bz_field="field13608";//标准字段field1231
var ybxje_field="field13603";//应报销金额字段field12501  人名币金额
var sbbzje_field="field13600";//申报币种金额字段field12498
var sbje_field="field13620"//实报金额字段field12723
var invoice_type_field="field13651";//费用类型field1231  field12727_0span
var jdKeyFiekds="field13623,field13624,field13625,field13626,field13627,field13628,field13629,field13630"//九段字段名称
var zhzh="field13606"//账号组合字段
var zhmc="field13607"//账号名称字段
var taxJe="field13646"//不含税金额字段
var taxLimit="field13601"//税额
var field_name2="field13599"//设置值字段  汇率字段
var gs_main_field="field13631";//$("#field12735").val() 公司主表字段

var daysField="field13636"//天数
var endDate="field13634"//结束日期字段
var startDate="field13632"//开始日期
var startTime="field13633"//
var endTime="field13635"//
var zcbxts="field14127"; //最长报销天数
var sqrField="field13653"//申请人
var requestIdField="field13673"//请求id
var cbzxField="field13624"//成本中心
var gsdField="field13622"//公司段
var fylxMainId="field13675"//费用类型对照表主键13675


var cldj="field13687"//差旅等级  非CRM职级
var city="field13637"//城市  field13229

var accoomInvoceMainId="15"//费用类型对照表中住宿类型主键id
var indoorTransMainId="8"//费用类型对照表中室内交通费主键id  室内交通费（运营）单笔不得超过100元
var indoorTransEdMainId="20"//费用类型对照表中室内交通不超额度
var serveMainId="19"//费用类型对照表中招待费主键id
var canBuMainId="14"//餐补
/*下处无需配置*/
var accoomInvoceIDs=""//费用类型对照表中住宿类型集合
var indoorTransIDs=""//费用类型对照表中室内交通费集合
var serveIDs=""//费用类型对照表中招待费集合s
var indoorTransEdIDs=""//费用类型对照表中室内交通不超额度控制集合
var canBuIDs=""//费用类型对照表中餐补集合
var array1;
/**
 * 设置必填
 */
var textValue="<img align=absmiddle src='/images/BacoError_wev8.gif' />";

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

//为防止明细行添加过快，添加以下参数
var addBtnName = 'addbutton0'; //添加明细行的按钮ID -- addbutton(0,1,2...)
var detileAddId = 0 ; //明细表序号，与detileTabId、addBtnName最后一位相同（第一个明细表为0，依此叠加）
var intTime = 1000; //控制明细行添加的间隔时间，单位：毫秒。建议1000
/*
   添加弹框前事件，防止添加明细行的速度过快
*/
var regBorwserEvent = function() {
    var time1 = new Date();
    var addDtBtnId = document.getElementsByName(addBtnName)[detileAddId].id;
    var oldClickEvent = document.getElementById(addDtBtnId).onclick;
    document.getElementById(addDtBtnId).onclick = function(event) {
        var time2 = new Date();
        if (time2.getTime()-time1.getTime() < intTime) {
            time1 = time2;
            return ;
            alert('操作太快啦！');
        } else {
            time1 = time2;
            oldClickEvent(event);
        }
    };
};
regBorwserEvent();


/**
 * 取消必填
 */
function canBt(col,index) {
    var btzd = $("input[name='needcheck']").val();
    btzd=btzd.replace(","+col+"_"+index,"")
    $("input[name='needcheck']").val(btzd);
    $("#"+col+"_"+index+"browser").attr("disabled","disabled");
    $("#"+col+"_"+index+"span img").remove()
}

/**
 * 设置必填
 */
function setBt(col,index) {
    var btzd = $("input[name='needcheck']").val();
    var colVal = $("#"+col+"_"+index).val();
    if(isNull(colVal)){
        $("#"+col+"_"+index+"span").html(textValue);
    }
    $("#"+col+"_"+index).attr('viewtype','1');
    var s="," + col+"_"+index;
    if(btzd.indexOf(s)==-1){
        var fieldIds = btzd + "," + col+"_"+index ;
        $("input[name='needcheck']").val(fieldIds);
    }
    document.getElementById(col+"_"+index+"browser").removeAttribute("disabled")
}

function isNull(val) {
    if(""==val||val==null||val==undefined){
        return true;
    }else{
        return false;
    }
}


$(document).ready(function() {

    findValidationId(accoomInvoceMainId)
    findValidationId(indoorTransMainId)
    findValidationId(canBuMainId)
    findValidationId(serveMainId)
    findValidationId(indoorTransEdMainId)


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
            var nowDate = getNowDate();
            var days = getDays(endDateVal, nowDate)
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
            var zcbxtsVal = $("#" +zcbxts+ "_" + num[i]).val();
            if(Number(days)>zcbxtsVal){
                top.Dialog.alert("明细第"+index+"行无法提交，费用发生日期已超过"+zcbxtsVal+"天！！！")
                return false;
            }
            if (invoiceVal != "") {
                ////console.log("accoomInvoceIDs::" + accoomInvoceIDs)
                ////console.log("serveIDs::" + serveIDs)
                ////console.log("indoorTransEdIDs::" + indoorTransEdIDs)
                ////console.log("canBuIDs::" + canBuIDs)
                ////console.log("indoorTransIDs::" + indoorTransIDs)
                //if((accoomInvoceIDs+"-"+serveIDs+"-"+indoorTransEdIDs+"-"+indoorTransIDs+"-"+canBuIDs).indexOf(invoiceVal)!=-1) {
                if (isExist(accoomInvoceIDs, invoiceVal) || isExist(serveIDs, invoiceVal) || isExist(indoorTransEdIDs, invoiceVal) || isExist(indoorTransIDs, invoiceVal) || isExist(canBuIDs, invoiceVal)) {
                    ////console.log("实报金额：：" + factjeVal)
                    ////console.log("执行标准：：" + limitJeVal)
                    if (Number(factjeVal) > Number(limitJeVal)) {
                        top.Dialog.alert("明细第" + index + "行无法提交，报销额度超过执行标准！！！")
                        return false;
                    }
                }
            }
            jdZhFun(num, i);
        }
        return true;
    }
})


/**
 * 获取行显示行号
 * @param index
 * @returns {*|jQuery}
 */
function getIndex(index) {
    //$("tr[_rowindex='3'] td[class='detail0_3_1 td_etype_22'] span").html()
    var val = $("tr[_rowindex='"+index+"'] td[class='detail0_3_1 td_etype_22'] span").html()
    return val
}


/**
 * 判断所属类型
 * @param str
 */
function isExist(str,val) {
    if(!isNull(str)){
        var arr = str.split(",")
        for (var i = 0; i < arr.length; i++) {
            if(arr[i]==val){
                return true;
            }
        }
        return false;
    }else{
        return false;
    }
}

/**
 * 获取执行标准
 * @param num
 * @param index
 */
function getBz(index) {
    ////console.log("getBz::start")
    var fylxMainIdVal = $("#"+fylxMainId+"_"+index).val()
    if(!isNull(fylxMainIdVal)){
        var invoiceVal = $("#"+invoice_type_field+"_"+index).val();
        var sqrVal = $("#"+sqrField+"_"+index).val()
        var enDateVal = $("#"+endDate+"_"+index).val()
        var cldjVal = $("#"+cldj+"_"+index).val()
        var requestId=$("#"+requestIdField).val()
        var cityVal = $("#"+city+"_"+index).val();//
        var daysVal = $("#"+daysField+"_"+index).val();//
        var cbzxVal = $("#"+cbzxField+"_"+index).val();//
        var gsdVal = $("#"+gsdField+"_"+index).val();//

        var gjlbVal = 2;//
        //console.log("sqrVal::"+sqrVal)
        //console.log("enDateVal::"+enDateVal)
        //console.log("requestId::"+requestId)
        //console.log("cldjVal::"+cldjVal)
        //console.log("cityVal::"+cityVal)
        //console.log("daysVal::"+daysVal)
        //console.log("cbzxVal::"+cbzxVal)
        //console.log("gsdVal::"+gsdVal)
        //console.log("typeMainId::"+fylxMainIdVal)
        $.ajax({
            type:"post",
            url:"/base/getCsBz.jsp",
            data: {"type":invoiceVal,"typeMainId":fylxMainIdVal,"sqr":sqrVal,'fyrq':enDateVal,"requestId":requestId
                ,"cldj":cldjVal,"city":cityVal,"days":daysVal,"gjlb":gjlbVal,"cbzx":cbzxVal,"gsd":gsdVal},
            dataType:"text",
            async: false,
            success:function(data){
                var str=JSON.stringify(data);
                var msg = "";
                msg=str.substring(str.indexOf("<body>")+26,str.indexOf("</body>")-12);
                ////console.log("getBzmsg::"+msg);
                if("-1.0"==msg||"-1"==msg||"-1.00"==msg||""==msg){
                    msg=0.0;
                }
                $("#"+bz_field+"_"+index).val(msg)
                //$("#"+bz_field+"_"+index+"span").html(msg);
            },
            error:function(jqXHR){
                //   ////////console.log(jqXHR);
                alert("发生错误："+ jqXHR.status);
            }
        });
    }else{
        $("#"+bz_field+"_"+index).val("")
    }
}

/**
 * 比较两个时间（yyyy-MM-dd HH:mm:ss）
 * @param startTime
 * @param endTime
 * @returns {string}
 */
function compareTime(startTime,endTime) {
    var startTimes = startTime.substring(0, 10).split('-');
    var endTimes = endTime.substring(0, 10).split('-');
    startTime = startTimes[1] + '-' + startTimes[2] + '-' + startTimes[0] + ' ' + startTime.substring(10, 19);
    endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19);
    var thisResult = (Date.parse(endTime) - Date.parse(startTime)) / 3600 / 1000;
    if (thisResult < 0) {
        return false;
    } else if (thisResult > 0) {
        return true
    } else if (thisResult == 0) {
        return true
    } else {
        return false;
    }
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
 * 获取当前时间
 * @returns {string}
 */
function getNowDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    var nowDate = year +"-"+ month +"-"+ day;
    return nowDate;
}


/**
 * 计算两个日期相差值
 * @param strDateStart
 * @param strDateEnd
 * @returns {number | *}
 */
function getDays(strDateStart, strDateEnd) {
    var strSeparator = "-"; //日期分隔符
    var oDate1;
    var oDate2;
    var iDays;
    oDate1 = strDateStart.split(strSeparator);
    oDate2 = strDateEnd.split(strSeparator);
    var strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2]);
    var strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2]);
    iDays = parseInt(Math.abs(strDateS - strDateE) / 1000 / 60 / 60 / 24)//把相差的毫秒数转换为天数
    return iDays;
}

/**
 * 点击事件触发验证赋值
 */
$(document).click(function () {
    var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        jdZhFun(num,i);
    }

})


/**
 * 九段key val 赋值
 * @param num
 * @param i
 * @param type
 */
function jdZhFun(num,i) {
    var fieldName = jdKeyFiekds.split(",");
    var name="";
    var val = $("#"+gs_main_field).val()
    var alength=$("#"+gs_main_field+"span a").length;
    if(alength==1){//a.html()
        name = $("#"+gs_main_field+"span a").html();
    }else{
        name=  $("#"+gs_main_field+"span a[_key='valspan']").html();//
    }
    for(var j=0;j<fieldName.length;j++){
        var alength=$("#"+fieldName[j]+"_"+num[i]+"span a").length;
        var namei="";
        if(alength==1){//a.html()
            namei = $("#"+fieldName[j]+"_"+num[i]+"span a").html();
        }else{
            namei = $("#"+fieldName[j]+"_"+num[i]+"span a[_key='valspan']").html();
        }
        var vali = $("#"+fieldName[j]+"_"+num[i]).val();
        if(""==vali){
            vali=0;
        }
        if(namei==null){
            namei="";
        }
        name+="||"+namei;
        val+="."+vali;
        $("#"+zhzh+"_"+num[i]).val(val)
        $("#"+zhmc+"_"+num[i]).val(name)
    }
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


<script>
//判断浏览器
$(document).ready(function(){
    function browsertest(){
        var browserVersion;
        var ua=navigator.userAgent.toLowerCase();
        if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
            //浏览器类型
            browserType = "IE";
            //浏览器版本
            browserVersion = ua.match(/msie ([\d.]+)/) != null ? ua.match(/msie ([\d.]+)/)[1] : ua.match(/rv:([\d.]+)/)[1];
            if(browserVersion == '6.0' || browserVersion == '7.0' ){
                alert('温馨提醒：当前浏览器内核版本过低，为了保证流程正常的使用，请使用如IE10版本或谷歌浏览器！');
            }
        }else{
            myBrowser();
        }

    }
    function myBrowser(){
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        if (userAgent.indexOf("Chrome") > -1){
            //alert("谷歌")
        }else{
            alert('温馨提醒：当前浏览器存在兼容性问题，为了保证流程正常的使用，请使用IE或谷歌浏览器！');
        }
    }
    browsertest();
    //myBrowser();
})
</script>







