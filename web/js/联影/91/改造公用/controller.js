var isContainOverBz="#field14629";//是否含超标项
var isLetField="field14567"//是否允许超标字段
var jqr="field14418"//加签人

window.console = window.console || (function () {
    var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile
        = c.clear = c.exception = c.trace = c.assert = function () { };
    return c;
})();


/**
 * 获取费用类型显示值
 * @param field
 */
function getFylxName(field){
    var aCount = $(field+"span a").length;
    if(aCount!=0){
        return $(field+"span a").html().replace("&nbsp;","");
    }else{
        return $(field+"span span").html().split("<span")[0];
    }

}

/**
 * sales 判断是否个人报销
 * 非个人报销且
 */
function checkValidation(comfirmMsg,bxlxVal,isLet,index,fylxName,factjeVal,limitJeVal,type,fylxMainIdVal){
    if(fylxMainIdVal!=tiJianMainId){//体检费不控制
        if(bxlxVal==0){
            comfirmMsg = checkScan(comfirmMsg,isLet,index,fylxName,factjeVal,limitJeVal,type)
        }else if(fylxMainIdVal!=indoorTransMainId&&fylxMainIdVal!=serveMainId&&fylxMainIdVal!=indoorTransEdMainId){
            comfirmMsg = checkScan(comfirmMsg,isLet,index,fylxName,factjeVal,limitJeVal,type)
        }
    }
    return comfirmMsg;
}


/**
 * @param comfirmMsg   确认框信息
 * @param isLet  是否允许超标
 * @param index  行下标
 * @param fylxName  费用类型名称
 * @param factjeVal  报销金额
 * @param limitJeVal  额度
 * @param type  用于判断是否是国际报销中外币计算
 */
function checkScan(comfirmMsg,isLet,index,fylxName,factjeVal,limitJeVal,type) {
    console.log("checkScan");
    debugger;
    if (!isNull(isLet)&&isLet!="2") {
        if(Number(factjeVal)>Number(limitJeVal)){
            if(isLet=="0"){
                //额度控制
                alert("明细第" + index + "行无法提交，报销额度超过执行标准！！！")
                return "false";
            }else if(isLet=="1"){
                //第几行+费用类型+超标金额（报销人民币金额-标准）并让提供用户两个按钮：继续提交、返回当前页
                if(type=="NO_CNY"){
                    //limitJeVal = numDiv(limitJeVal,1.1)
                }
                var subval = accSub(factjeVal,limitJeVal)
                console.log("subVal::"+subval)
                subval = subval.substring(0,subval.indexOf(".")+1+2);
                comfirmMsg+="明细第"+index+"行，"+fylxName+"报销超"+subval+"RMB"+"\n";
            }
        }
    }
    return comfirmMsg;
}


/**
 * 获取sales国外执行标准
 */
function getOutBz(index) {
    console.log("getOutBz::"+index)
    var fylxMainIdVal = $("#"+fylxMainId+"_"+index).val()
    var invoiceVal = $("#"+invoice_type_field+"_"+index).val();
    var sqrVal = $("#"+sqrField+"_"+index).val()
    var enDateVal = $("#"+endDate+"_"+index).val()
    var cldjVal = $("#"+cldj+"_"+index).val()
    var requestId=$("#"+requestIdField).val()
    var cityVal = $("#"+city+"_"+index).val();//
    var daysVal = $("#"+daysField+"_"+index).val();//
    var cbzxVal = $("#"+cbzxField+"_"+index).val();//
    var gsdVal = $("#"+gsdField+"_"+index).val();//
    var gjlbVal = $("#"+gjlb+"_"+index).val();//
    ////console.log("sqrVal::"+sqrVal)
    ////console.log("enDateVal::"+enDateVal)
    ////console.log("requestId::"+requestId)
    ////console.log("cldjVal::"+cldjVal)
    ////console.log("cityVal::"+cityVal)
    ////console.log("daysVal::"+daysVal)
    ////console.log("cbzxVal::"+cbzxVal)
    ////console.log("gsdVal::"+gsdVal)
    ////console.log("$(\"#\"+fylxMainId+\"_\"+index)::"+"#"+fylxMainId+"_"+index)
    ////console.log("typeMainId::"+fylxMainIdVal)
    $.ajax({
        type:"post",
        url:"/base/getCsBz.jsp",
        data: {"type":invoiceVal,"typeMainId":fylxMainIdVal,"sqr":sqrVal,'fyrq':enDateVal,"requestId":requestId
            ,"cldj":cldjVal,"city":cityVal,"days":daysVal,"gjlb":gjlbVal,"cbzx":cbzxVal,"gsd":gsdVal},
        dataType:"text",
        async: false,
        success:function(data){
            //////console.log("data:"+data)
            var str=JSON.stringify(data);
            var msg = "";
            msg=str.substring(str.indexOf("<body>")+26,str.indexOf("</body>")-12);
            //////console.log("getBzmsg::"+msg);
            if("-1.0"==msg||"-1"==msg||"-1.00"==msg||""==msg){
                msg=0.0;
            }
            ////console.log("msg::"+msg)
            $("#"+bz_field+"_"+index).val(msg)
            //$("#"+bz_field+"_"+index+"span").html(msg);
        },
        error:function(jqXHR){
            //   //////////console.log(jqXHR);
            alert("发生错误："+ jqXHR.status);
        }
    });
}


/**
 * 获取bz
 * @param index
 * @param type
 */
function getSalesBz(index,type) {
    var bxlxVal = $("#"+bxlx).val()
    var fylxMainIdVal = $("#"+fylxMainId+"_"+index).val()
    if(bxlxVal!="0"){//非个人报销  不控市内交通和招待费
        if(!isNull(fylxMainIdVal)&&fylxMainIdVal!=tiJianMainId&&fylxMainIdVal!=indoorTransMainId&&fylxMainIdVal!=serveMainId&&fylxMainIdVal!=indoorTransEdMainId){
            selectBz(index,type)
        }
        else{
            $("#"+bz_field+"_"+index).val("")
        }
    }
    else{
        if(!isNull(fylxMainIdVal)&&fylxMainIdVal!=tiJianMainId){
            selectBz(index,type)
        }else{
            $("#"+bz_field+"_"+index).val("")
        }
    }
}

function selectBz(index,type) {
    if("YB"==type){
        getYbBz(index);
    }
    else if("INNER"==type){
        getInnerBz(index);
    }else if("OUT"==type){
        getOutBz(index)
    }
}


/**
 *
 * 获取sales国内执行标准
 */
function getInnerBz(index){
    console.log("getInnerBz::"+index)
    var fylxMainIdVal = $("#"+fylxMainId+"_"+index).val()
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
}



/**
 * 获取sales一般执行标准
 */
function getYbBz(index) {
    console.log("getYbBz::"+index)
    var fylxMainIdVal = $("#"+fylxMainId+"_"+index).val()
    var invoiceVal = $("#"+invoice_type_field+"_"+index).val();
    var requestId=$("#"+requestIdField).val()
    var sqrVal = $("#"+sqrField+"_"+index).val()
    var fyrqVal = $("#"+fyrq+"_"+index).val()
    var cbzxVal = $("#"+cbzxField+"_"+index).val();//
    var gsdVal = $("#"+gsdField+"_"+index).val();//
    $.ajax({
        type:"post",
        url:"/base/getCsBzYb.jsp",
        data: {"type":invoiceVal,"typeMainId":fylxMainIdVal,"sqr":sqrVal,'fyrq':fyrqVal,"requestId":requestId
            ,"cbzx":cbzxVal,"gsd":gsdVal},
        dataType:"text",
        async: false,
        success:function(data){
            var str=JSON.stringify(data);
            var msg = "";
            msg=str.substring(str.indexOf("<body>")+26,str.indexOf("</body>")-12);
            if("-1.0"==msg||"-1"==msg||"-1.00"==msg||""==msg){
                msg=0.0;
            }
            $("#"+bz_field+"_"+index).val(msg)
        },
        error:function(jqXHR){
            alert("发生错误："+ jqXHR.status);
        }
    });
}


/**
 * 除法运算，避免数据相除小数点后产生多位数和计算精度损失。
 *
 * @param num1被除数 | num2除数
 */
function numDiv(num1, num2) {
    var baseNum1 = 0, baseNum2 = 0;
    var baseNum3, baseNum4;
    try {
        baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    with (Math) {
        baseNum3 = Number(num1.toString().replace(".", ""));
        baseNum4 = Number(num2.toString().replace(".", ""));
        return (baseNum3 / baseNum4) * pow(10, baseNum2 - baseNum1);
    }
};

/**
 * 精度减法运算
 * @param arg1
 * @param arg2
 * @returns {string}
 */
function accSub(arg1, arg2) {
    var r1, r2, m, n;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0}
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0}
    m = Math.pow(10, Math.max(r1, r2));
    //last modify by deeka
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

function isNull(val) {
    if(""==val||val==null||val==undefined){
        return true;
    }else{
        return false;
    }
}
/**
 * 获取行显示行号
 * @param index
 * @returns {*|jQuery}
 */
function getPcIndex(index) {
    var val = $("tr[_rowindex='"+index+"'] td[class='detail0_3_1 td_etype_22'] span").html()
    return val
}


/**
 * 获取行显示行号
 * @param index  行缩影
 * @param tableIndex
 * @returns {*|jQuery}
 */
function getMobileIndex(tableIndex,index) {//trView_0_0
    var val = $("tr[name='trView_"+tableIndex+"_"+index+"'] td[class='detail"+tableIndex+"_3_1 td_etype_22'] span").html()
    return val
}