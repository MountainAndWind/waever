<script>
var ybxje_field="field12501";//应报销金额字段field12501  人民币金额
var invoice_type_field="field13184";//费用类型field1231
var jdKeyFiekds="field12726,field12727,field12728,field12729,field12731,field12730,field12732,field12733"//九段字段名称
var zhzh="field12513"//账号组合字段
var zhmc="field12514"//账号名称字段
var sbje_field="field12723"//实报金额
var bz_field="field12559";//执行标准
var daysField="field12740"//天数

var endDate="field12738"//结束日期字段
var startDate="field12736"//开始日期
var startTime="field12737"//
var endTime="field12739"//


var taxJe="field13161"//不含税金额字段
var taxLimit="field12499"//税额

var gs_main_field="field12735";//$("#field12735").val() 公司主表字段

var accoomInvoceMainId="12"//费用类型对照表中住宿类型主键id
/*下处无需配置*/
var accoomInvoceIDs=""//费用类型对照表中住宿类型集合


$(document).ready(function(){

    var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        //gsFz(num,i);
        jdZhFun(num,i);
    }

    findValidationId(accoomInvoceMainId)
    console.log("checkCustomize！！")

    checkCustomize = function (){
        console.log("checkCustomize  inner")
        var num = $("#submitdtlid0").val();
        num = num.split(",")
        console.log("num:"+num)
        for (var i = 0; i < num.length; i++) {
            console.log("i::"+num[i])
            var index=Number(i)+1;
            var endDateVal = $("#"+endDate+"_"+num[i]).val();
            var endTimeVal = $("#"+endTime+"_"+num[i]).val();
            var startDateVal = $("#"+startDate+"_"+num[i]).val();
            var startTimeVal = $("#"+startTime+"_"+num[i]).val();
            var factjeVal = $("#"+sbje_field+"_"+num[i]).val();
            var limitJeVal = $("#"+bz_field+"_"+num[i]).val();
            var invoiceVal = $("#"+invoice_type_field+"_"+num[i]).val();
            console.log("invoiceVal::"+invoiceVal)
            console.log("endDateVal::"+endDateVal)
            var nowDate = getNowDate();
            console.log("nowDate::"+nowDate)
            var days = getDays(endDateVal,nowDate)
            var day_val=$("#"+daysField+"_"+num[i]).val()
            console.log("天数值：："+day_val)
            /*if(Number(day_val)<2){
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

            if(Number(days)>60){
                top.Dialog.alert("明细第"+index+"行无法提交，费用发生日期已超过60天！！！")
                return false;
            }
            console.log("accoomInvoceIDs::"+accoomInvoceIDs)
            if(invoiceVal!=""){
                if(accoomInvoceIDs.indexOf(invoiceVal)!=-1) {
                    if(Number(factjeVal)>Number(limitJeVal)){
                        top.Dialog.alert("明细第"+index+"行无法提交，报销额度超过执行标准！！！")
                        return false;
                    }
                }
            }
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
    console.log(nowDate)
    return nowDate;
}


/**
 * 计算两个日期相差值
 * @param strDateStart
 * @param strDateEnd
 * @returns {number | *}
 */
function getDays(strDateStart, strDateEnd) {
    console.log("getDays")
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
        console.log("num_"+num[i])
        factJeAndNoContainsTaxJeVal(num,i);
        //gsFz(num,i);
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
    console.log("alength：："+alength)
    if(alength==1){//a.html()
        name = $("#"+gs_main_field+"span a").html();
    }else{
        name=  $("#"+gs_main_field+"span a[_key='valspan']").html();//
    }
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
 * 实报金额与不含税金额的赋值操作
 * 实报金额等于人民币金额,如果是话费乘0.8
 * 不含税金额是实报金额减去税额
 */
function factJeAndNoContainsTaxJeVal(num,i) {
    console.log("factJeAndNoContainsTaxJeVal")
    var rmbJe = $("#"+ybxje_field+"_"+num[i]).val();
    console.log("rmb::"+rmbJe)
    $("#"+sbje_field+"_"+num[i]).val(rmbJe)
    /*var taxLiJe  = $("#"+taxLimit+"_"+num[i]).val()
    console.log("税额：："+taxLiJe);
    $("#"+taxJe+"_"+num[i]).val(Number(rmbJe)-Number(taxLiJe))*/
}


/**
 * 查找费用类型对照表中存在的明细
 * @param val
 */
function findValidationId(val) {///base/findInvoiceTypById.jsp?fieldVal=3
    console.log("findValidationId")
    var msg = "";
    $.ajax({
        type:"GET",
        url:"/base/findInvoiceTypById.jsp?fieldVal="+val,
        dataType:"text",
        //data:{jsonStr:jsonStr},
        success:function(data){
            /*var str=JSON.stringify(data);*/
            var str=JSON.stringify(data);
            msg=str.substring(str.indexOf("<body>")+26,str.indexOf("</body>")-8);
            console.log("msg::"+msg)
            if(accoomInvoceMainId==val){
                console.log("赋值住宿型值")
                accoomInvoceIDs=msg//费用类型对照表中电话费集合
            }
        },
        error:function(jqXHR){
            alert("发生错误："+ jqXHR.status);
        }
    });
}

</script>







