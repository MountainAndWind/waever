<script>
/**
 * 处理额度判断时当币种时CNY 执行标准汇率使用CNY汇率
 * 当币种为非CNY 执行标准采用USD 美国汇率
 * @type {string}
 */
var sbje_field="field12723"//实报金额
var bz_field="field12559";//标准字段
var day="field12740"//天数
var sbbzje_field="field12498";//申报币种金额字段field12498

var endDate="field12738"//结束日期字段
var startDate="field12736"//开始日期
var startTime="field12737"//
var endTime="field12739"//

var invoice_type_field="field13184";//费用类型field1231
var jdKeyFiekds="field12726,field12727,field12728,field12729,field12730,field12731,field12732,field12733"//九段字段名称
var zhzh="field12513"//账号组合字段
var zhmc="field12514"//账号名称字段
var field_name1="field12744"//根据字段名  币种字段
var field_name2="field12497"//设置值字段  汇率字段
var gs_main_field="field12735";//$("#field12735").val() 公司主表字段
var gs_detail_field="field12725";//公司明细字段 field12725

var taxJe="field13161"//不含税金额字段
var taxLimit="field12499"//税额
var ybxje_field="field12501";//应报销金额字段field12501  人名币金额

var dollarsRate="field13570"//美元汇率  代码生成无需配置无需配置

var internationalTansInvoceMainId="12"//费用类型对照表中交通主键id
var internationalAccomInvoceMainId="11"//费用类型对照表住宿中主键id
var dayAllowInvoceMainId="13"//费用类型对照表日经贴中主键id
var accoomInvoceMainId="15"//费用类型对照表中住宿类型主键id
/*下处无需配置*/
var internationalTansInvoceIDs=""//费用类型对照表中电话费集合
var internationalAccomInvoceIDs=""//费用类型对照表中电话费集合
var dayAllowInvoceMainIds=""//费用类型对照表中电话费集合
var accoomInvoceIDs=""//费用类型对照表中住宿类型集合

/*餐补-------------------------------------------------------*/
function f_getFee(type, s_day, s_time, e_day, e_time,array1) {
    var rArray = array1.split(";");
    var result;
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
            if (start_d.getTime() > m_t.getTime()) {
                start = 50;
            } else {
                start = 100;
            }
            if (end_d.getTime() >= m_t.getTime()) {
                end = 100;
            } else {
                end = 50;
            }
            return 100 * middle + start + end;
        }
    }
}


function setShiBao(num,i,array1 ) {



    var  type=$("#"+invoice_type_field+"_"+num[i]).val();
    var s_day=$("#"+startDate+"_"+num[i]).val();
    var s_time= $("#"+startTime+"_"+num[i]).val();
    var e_day=$("#"+endDate+"_"+num[i]).val();
    var e_time=$("#"+endTime+"_"+num[i]).val();
    var s_day_r = s_day.split("-").length;
    var e_day_r = e_day.split("-").length;
    var s_time_r = s_time.split(":").length;
    var e_time_r = e_time.split(":").length;
//console.log(s_day_r +";"+e_day_r +";"+s_time_r +";"+e_time+";");

    if(s_day_r >1 && e_day_r >1 && s_time_r >1  && e_time_r >1 ){
        var res=f_getFee(type, s_day, s_time, e_day, e_time,array1 );
        if(res!=undefined){
            //console.log(res);
//$("#field12744_0").val()
            $("#"+"field12744"+"_"+num[i]).val("CNY");
            $("#"+"field12744"+"_"+num[i]+"span > span >a").html("CNY");
            $("#"+"field12498"+"_"+num[i]).val(res);
        }
    }

}

function setCanBu(num){
    $.get("/work/canbu.jsp",
        function(data, status) {
            array1= data;
        });

    if(array1==undefined){
        $.get("/work/canbu.jsp",
            function(data, status) {
                array1= data;
            });
    }


    for (var i=0;i<num.length;i++){
        setShiBao(num,i,array1 ) ;

    }
}
/*餐补-------------------------------------------------------*/


$(document).ready(function(){
    findValidationId(internationalTansInvoceMainId)
    findValidationId(internationalAccomInvoceMainId)
    findValidationId(dayAllowInvoceMainId)
    findValidationId(accoomInvoceMainId)
    var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        //gsFz(num,i);
        jdZhFun(num,i);
    }


    var dtIdLength = 0;
    var oldDtIdLength = 0;
    /*
    当明细行数量增加时，为增加的明细行添加函数；当明细行数量减少时，重新计算总额
     */
    var detileTabId = "#submitdtlid0";
    $(detileTabId).bindPropertyChange(function () {
        console.log("主表bind")
        dtIdLength = jQuery(detileTabId).val().split(",").length;
        if (oldDtIdLength < dtIdLength){
            var rowNum = $(detileTabId).val().charAt($(detileTabId).val().length-1);
            var num=$("#submitdtlid0").val();
            num = num.split(",")
            console.log("rowNum:"+rowNum);
            $("#"+invoice_type_field + "_" + rowNum+",#" + sbbzje_field + "_" + rowNum).bindPropertyChange(function () {
                console.log("明细bind_"+rowNum);
                var typeVal = $("#"+invoice_type_field+ "_" + rowNum).val();
                console.log("typeVal::"+typeVal);
                setCanBu(num)

            });
            oldDtIdLength = dtIdLength;
        }
        if(oldDtIdLength > dtIdLength){
            oldDtIdLength = dtIdLength;
        }
    });

    console.log("checkCustomize!!!!")

    checkCustomize = function (){//
        var num = $("#submitdtlid0").val();
        num = num.split(",")
        //获取美国汇率
        for (var i = 0; i < num.length; i++) {
            var index=Number(i)+1;
            var invoiceVal = $("#"+invoice_type_field+"_"+num[i]).val();
            var field_name1_val = $("#" +field_name1 + "_" + num[i]).val();
            var endDateVal = $("#"+endDate+"_"+num[i]).val();
            var endTimeVal = $("#"+endTime+"_"+num[i]).val();
            var startDateVal = $("#"+startDate+"_"+num[i]).val();
            var startTimeVal = $("#"+startTime+"_"+num[i]).val();
            var dollarsRateVal = $("#"+dollarsRate+"_"+num[i]).val();
            var factjeVal = $("#"+sbje_field+"_"+num[i]).val();
            var limitJeVal = $("#"+bz_field+"_"+num[i]).val();
            var dayVal = $("#"+day+"_"+num[i]).val();
            var factRmb = factjeVal;


            var start = startDateVal+" "+startTimeVal+":00"
            var end = endDateVal+" "+endTimeVal+":00"
            if(!compareTime(start,end)){
                top.Dialog.alert("明细第"+index+"行无法提交, 开始时间要早于结束时间！！！")
                return false;
            }
            console.log("dayAllowInvoceMainIds："+dayAllowInvoceMainIds)
            console.log("accoomInvoceIDs："+accoomInvoceIDs)
            console.log("invoiceVal::"+invoiceVal)
            console.log("internationalTansInvoceIDs::"+internationalTansInvoceIDs)
            console.log("internationalAccomInvoceIDs::"+internationalAccomInvoceIDs)
            if(""!=invoiceVal){
                if((dayAllowInvoceMainIds+"-"+accoomInvoceIDs+"-"+internationalTansInvoceIDs+"-"+internationalAccomInvoceIDs).indexOf(invoiceVal)!=-1){
                    /*if(internationalTansInvoceIDs.indexOf(invoiceVal)!=-1||internationalAccomInvoceIDs.indexOf(invoiceVal)!=-1||dayAllowInvoceMainIds.indexOf(invoiceVal)!=-1) {*/
                    if ("CNY" == field_name1_val) {//人名币处理
                        var limitRmb = Number(limitJeVal) * Number(dayVal)
                        if (Number(factRmb) >= Number(limitRmb)) {
                            top.Dialog.alert("明细第" + index + "行无法提交，报销额度超过执行标准！！！")
                            return false;
                        }
                    } else {
                        var limitRmb = Number(limitJeVal) * Number(dollarsRateVal) * Number(dayVal) * 1.1;//浮动%10
                        if (Number(factRmb) >= Number(limitRmb)) {//如果实报金额>执行标准*天数*美金汇率，不允许提交
                            top.Dialog.alert("明细第" + index + "行无法提交，报销额度超过执行标准！！！")
                            return false;
                        }
                    }
                }
            }
            jdZhFun(num,i);
        }
        return true;
    }
})




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
 * 九段key val 赋值
 * @param num
 * @param i
 * @param type
 */
function jdZhFun(num,i) {
    var fieldName = jdKeyFiekds.split(",");
    var val=$("#"+gs_main_field).val();
    var name=$("#"+gs_main_field+"span a[_key='valspan']").html();//显示名
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
        /*赋值*/
        $("#"+zhzh+"_"+num[i]).val(val)
        $("#"+zhmc+"_"+num[i]).val(name)
    }
}

/**
 * 点击事件触发验证赋值
 */
$(document).click(function () {
    console.log("click")
    var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        //var type = $("#" + invoice_type_field + "_" + num[i]).val();
        jdZhFun(num,i);
        setCanBu(num)
    }
})



/**
 * 请求汇率数据
 * @param fieldVal
 * @param fieldName
 */
function ajax(fieldVal,fieldName) {
    $.ajax({
        type:"GET",
        url:"/base/findHl.jsp?fieldVal="+fieldVal,
        dataType:"text",
        //data:{jsonStr:jsonStr},
        success:function(data){
            /*var str=JSON.stringify(data);*/
            var str=JSON.stringify(data);
            var msg = "";
            msg=str.substring(str.indexOf("<body>")+26,str.indexOf("</body>")-8);
            $(fieldName).val(msg);
        },
        error:function(jqXHR){
            alert("发生错误："+ jqXHR.status);
        }
    });
}

/**
 *
 * @param val
 */
function findValidationId(val) {///base/findInvoiceTypById.jsp?fieldVal=3
    var msg = "";
    $.ajax({
        type:"GET",
        url:"/base/findInvoiceTypById.jsp?",
        data: {'fieldVal':val,'timeStamp':new Date().getTime()},
        dataType:"text",
        //data:{jsonStr:jsonStr},
        success:function(data){
            /*var str=JSON.stringify(data);*/
            var str=JSON.stringify(data);
            msg=str.substring(str.indexOf("<body>")+26,str.indexOf("</body>")-8);
            if(internationalTansInvoceMainId==val){
                internationalTansInvoceIDs=msg//费用类型对照表中电话费集合
            }else if(internationalAccomInvoceMainId==val){
                internationalAccomInvoceIDs=msg//费用类型对照表中结婚礼金集合
            }else if(dayAllowInvoceMainId==val){
                dayAllowInvoceMainIds=msg//日津贴
            }else if(accoomInvoceMainId==val){
                accoomInvoceIDs=msg//国内住宿
            }
        },
        error:function(jqXHR){
            alert("发生错误："+ jqXHR.status);
        }
    });
}


//为防止明细行添加过快，添加以下参数
var addBtnName = 'addbutton0'; //添加明细行的按钮ID -- addbutton(0,1,2...)
var detileAddId = 0 ; //明细表序号，与detileTabId、addBtnName最后一位相同（第一个明细表为0，依此叠加）
var intTime = 1000; //控制明细行添加的间隔时间，单位：毫秒。建议1000
/*
 * 添加弹框前事件，防止添加明细行的速度过快
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
</script>










