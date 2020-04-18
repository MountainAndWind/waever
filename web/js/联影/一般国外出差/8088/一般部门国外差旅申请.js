<script>
/**
 * 处理额度判断时当币种时CNY 执行标准汇率使用CNY汇率
 * 当币种为非CNY 执行标准采用USD 美国汇率
 * @type {string}
 */
var sbje_field="field12723"//实报金额
var bz_field="field12559";//标准字段
var day="field12740"//天数

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
$(document).ready(function(){

   /* var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        //gsFz(num,i);
        jdZhFun(num,i);
    }*/

    findValidationId(internationalTansInvoceMainId)
    findValidationId(internationalAccomInvoceMainId)
    findValidationId(dayAllowInvoceMainId)
    /* var num = $("#submitdtlid0").val();
     num = num.split(",")
     for (var i = 0; i < num.length; i++) {
         var field_name1_val = $("#" + field_name1 + "_" + num[i]).val();
         var curr_field_name2 = "#" + field_name2 + "_" + num[i];
         ajax(field_name1_val, curr_field_name2);
     }*/

    /*getdollarsRate()*/

    checkCustomize = function (){
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
            console.log("币种：："+field_name1_val)
            var factjeVal = $("#"+sbje_field+"_"+num[i]).val();
            var limitJeVal = $("#"+bz_field+"_"+num[i]).val();
            var dayVal = $("#"+day+"_"+num[i]).val();
            var factRmb = factjeVal;
            console.log("实报汇率换算值：："+factjeVal);
            console.log("天数：："+dayVal);
            console.log("执行额度：："+limitJeVal);
            console.log("dollarsRateVal::" + dollarsRateVal);

            console.log("天数值：："+dayVal)
            /*if(Number(dayVal)<2){
                top.Dialog.alert("明细第"+index+"行无法提交，结束日期必须大于开始日期！！！")
                return false;
            }*/

            var start = startDateVal+" "+startTimeVal+":00"
            var end = endDateVal+" "+endTimeVal+":00"
            console.log("start::"+start)
            console.log("end::"+end)
            if(!compareTime(start,end)){
                top.Dialog.alert("明细第"+index+"行无法提交, 开始时间要早于结束时间！！！")
                return false;
            }


            console.log("internationalTansInvoceIDs："+internationalTansInvoceIDs)

            console.log("invoiceVal::"+invoiceVal)
            console.log("internationalTansInvoceIDs::"+internationalTansInvoceIDs)
            console.log("internationalAccomInvoceIDs::"+internationalAccomInvoceIDs)
            if(""!=invoiceVal){
                if(internationalTansInvoceIDs.indexOf(invoiceVal)!=-1||internationalAccomInvoceIDs.indexOf(invoiceVal)!=-1||dayAllowInvoceMainIds.indexOf(invoiceVal)!=-1) {
                    if ("CNY" == field_name1_val) {//人名币处理
                        var limitRmb = Number(limitJeVal) * Number(dayVal)
                        console.log("换算CYN汇率乘天数后的执行标准：：" + limitRmb)
                        if (Number(factRmb) >= Number(limitRmb)) {
                            top.Dialog.alert("明细第" + index + "行无法提交，报销额度超过执行标准！！！")
                            return false;
                        }
                    } else {
                        console.log("dollarsRateVal::" + dollarsRateVal);
                        var limitRmb = Number(limitJeVal) * Number(dollarsRateVal) * Number(dayVal) * 1.1;//浮动%10
                        console.log("换算USD汇率乘天数后的执行标准：：" + limitRmb)
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
        console.log("endTime小于endTime！");
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
 * 主表字段值赋值到明细字段上
 * @param num
 * @param i
 */
function gsFz(num,i) {
    var gsMainVal=$("#"+gs_main_field).val();
    //console.log("公司主表值：："+gsMainVal)
    //console.log("赋值字段：："+"#"+gs_detail_field+"_"+num[i])
    var name=$("#"+gs_main_field+"span a[_key='valspan']").html();//显示名
    //console.log("显示名name::"+name)
    $("#"+gs_detail_field+"_"+num[i]+"span").html("");
    if(name!=null){
        $("#"+gs_detail_field+"_"+num[i]+"span").append("<span class=\"e8_showNameClass\"><a title=\"33\">"+name+"</a>&nbsp;<span class=\"e8_delClass\" id=\"33\" onclick=\"del(event,this,1,false,{});\" style=\"opacity: 0; visibility: hidden;\">&nbsp;x&nbsp;</span></span>")
        $("#"+gs_detail_field+"_"+num[i]).val(gsMainVal)
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
    console.log("gS  val::"+val)
    console.log("gS  name::"+name)
    for(var j=0;j<fieldName.length;j++){
        var alength=$("#"+fieldName[j]+"_"+num[i]+"span a").length;
        var namei="";
        if(alength==1){//a.html()
            namei = $("#"+fieldName[j]+"_"+num[i]+"span a").html();
        }else{
            namei = $("#"+fieldName[j]+"_"+num[i]+"span a[_key='valspan']").html();
        }
        var vali = $("#"+fieldName[j]+"_"+num[i]).val();
        console.log("vali::"+vali)
        if(""==vali){
            vali=0;
        }
        if(namei==null){
            namei="";
        }
        name+="||"+namei;
        val+="."+vali;
        /*赋值*/
        console.log("name::"+name)
        console.log("val::"+val)
        $("#"+zhzh+"_"+num[i]).val(val)
        //$("#"+zhzh+"_"+num[i]).attr("type","text")
        //document.getElementById(zhzh+"_"+num[i]).type="text";
        $("#"+zhmc+"_"+num[i]).val(name)
        //$("#"+zhmc+"_"+num[i]).attr("type","text")
        //document.getElementById(zhmc+"_"+num[i]).type="text";
    }
}

/**
 * 点击事件触发验证赋值
 */
$(document).click(function () {
//console.log('定时运行：次')
    //console.log("hid")
    var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        /*var field_name1_val = $("#" + field_name1 + "_" + num[i]).val();
        //console.log("field_name1_val::" + field_name1_val);
        var curr_field_name2 = "#" + field_name2 + "_" + num[i];
        //console.log("设置字段::" + curr_field_name2);
        ajax(field_name1_val, curr_field_name2);*/
        var type = $("#" + invoice_type_field + "_" + num[i]).val();
        factJeAndNoContainsTaxJeVal(num,i,type);
        //gsFz(num, i);
        jdZhFun(num,i);
    }
})

/**
 * 获取美国汇率
 */
/*function getdollarsRate() {
    console.log("获取汇率")
    $.ajax({
        type:"GET",
        url:"/base/findHl.jsp?fieldVal=USD",
        dataType:"text",
        //data:{jsonStr:jsonStr},
        success:function(data){
            /!*var str=JSON.stringify(data);*!/
            var str=JSON.stringify(data);
            var msg = "";
            msg=str.substring(str.indexOf("<body>")+26,str.indexOf("</body>")-8);
            dollarsRate=msg;
        },
        error:function(jqXHR){
            alert("发生错误："+ jqXHR.status);
        }
    });
}*/



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
    console.log("findValidationId")
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
            console.log("msg::"+msg)
            if(internationalTansInvoceMainId==val){
                console.log("国际交通")
                internationalTansInvoceIDs=msg//费用类型对照表中电话费集合
                console.log("internationalTansInvoceIDs："+internationalTansInvoceIDs)
            }else if(internationalAccomInvoceMainId==val){
                console.log("国际住宿")
                internationalAccomInvoceIDs=msg//费用类型对照表中结婚礼金集合
                console.log("internationalAccomInvoceIDs："+internationalAccomInvoceIDs)
            }else if(dayAllowInvoceMainId==val){
                console.log("日津贴")
                dayAllowInvoceMainIds=msg//日津贴
                console.log("dayAllowInvoceMainIds："+dayAllowInvoceMainIds)
            }
        },
        error:function(jqXHR){
            alert("发生错误："+ jqXHR.status);
        }
    });
}


/**
 * 实报金额与不含税金额的赋值操作
 * 实报金额等于人民币金额,如果是话费乘0.8
 * 不含税金额是实报金额减去税额
 */
function factJeAndNoContainsTaxJeVal(num,i,type) {
    var rmbJe = $("#"+ybxje_field+"_"+num[i]).val();
    console.log("rmbJe::"+rmbJe)
    console.log("$(\"#\"+ybxje_field+\"_\"+num[i])::"+"#"+ybxje_field+"_"+num[i])
    $("#"+sbje_field+"_"+num[i]).val(rmbJe)
    var taxLiJe  = $("#"+taxLimit+"_"+num[i]).val()
    console.log("税额：："+taxLiJe);
    $("#"+taxJe+"_"+num[i]).val(Number(rmbJe)-Number(taxLiJe))
}

</script>










