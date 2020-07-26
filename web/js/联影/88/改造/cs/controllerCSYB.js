var sbje_field="field13620"//实报金额
var bz_field="field13608";//执行标准
var daysField="field13636"//天数
var fylxMainId="field13675";//费用类型对照表主表id 13269
var invoice_type_field="field13651";//费用类型field1231
var outingBxcsField="field13748"//outing报销次数

var fyrq="field13598"//费用日期
var endDate="field13634"//结束日期字段
var startDate="field13632"//开始日期
var startTime="field13633"//
var endTime="field13635"//

var gs_main_field="field13631";//$("#field12735").val() 公司主表字段
var jdKeyFiekds="field13623,field13624,field13625,field13626,field13627,field13628,field13629,field13630"//九段字段名称
var zhzh="field13606"//账号组合字段
var zhmc="field13607"//账号名称字段
var field_name1="field13639"//根据字段名  币种字段
var field_name2="field13599"//设置值字段  汇率字段

var zcbxts="field14127"; //最长报销天数
var sqrField="field13653"//申请人
var requestIdField="field13673"//请求id
var cldj="field13687"//差旅等级
var city="field13637"//目的城市
var countryAndcity="field13644"//国家/城市
var gjcc="field13238"//13238  国家层次
var dollarsRate="field13667"//美元汇率
var country="field13642"//国家
var gjlb="field13657"//国家类别
var chinaId="216";
var cbzxField="field13624"//成本中心
var gsdField="field13622"//公司段

/*退回操作*/
var fhrq="field14394"//返回日期 14396
var thbs="field14395"//退回标识 14397


var accoomInvoceMainId="15"//费用类型对照表中住宿类型主键id
var dayAllowInvoceMainId="13"//费用类型对照表日经贴中主键id
var canBuMainId="14"//餐补
var internationalTansInvoceMainId="12"//费用类型对照表中交通主键id
var internationalAccomInvoceMainId="11"//费用类型对照表住宿中主键id
var indoorTransMainId="8"//费用类型对照表中室内交通费主键id  室内交通费单笔不得超过100元
var outingMainId="5"//outing
var phoneMainId="3";//费用类型对照表中电话费主键id
var groupMainId="4"//费用类型对照表团建费
/*下处无需配置*/
var internationalTansInvoceIDs=""//费用类型对照表中电话费集合
var internationalAccomInvoceIDs=""//费用类型对照表中电话费集合
var dayAllowInvoceMainIds=""//费用类型对照表中电话费集合
var accoomInvoceIDs=""//费用类型对照表中住宿类型集合
var canBuIDs=""//费用类型对照表中餐补集合
var indoorTransIDs=""//费用类型对照表中室内交通费集合
var phoneInvoceIDs=""//费用类型对照表中电话费集合
var groupIds=""//费用类型对照表团建费集合
var outingIDs=""//outing
var array1;

var noControllerMainIds="20"//fieldid 不控制费用类型主表id集合，多个用逗号隔开


var isContainOverBz="#field14629";//是否含超标项
var isLetField="field14567"//是否允许超标字段

/*英文转中文字段配置 此处配置field   配置示列  #field12331*/
var fieldDt1="";
var fieldDt2="";
var fieldDt3="";
var fieldMain="";

/**
 * 设置必填
 */
var textValue="<img align=absmiddle src='/images/BacoError_wev8.gif' />";


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
 * 验证是否控制过滤
 */
function checkValidation(comfirmMsg,isLet,index,fylxName,factjeVal,limitJeVal,type,fylxMainIdVal){
    /*if(fylxMainIdVal!=tiJianMainId){//体检费不控制
        if(bxlxVal==0){
            comfirmMsg = checkScan(comfirmMsg,isLet,index,fylxName,factjeVal,limitJeVal,type)
        }else if(fylxMainIdVal!=indoorTransMainId&&fylxMainIdVal!=serveMainId&&fylxMainIdVal!=indoorTransEdMainId){
            comfirmMsg = checkScan(comfirmMsg,isLet,index,fylxName,factjeVal,limitJeVal,type)
        }
    }
    return comfirmMsg;*/
    if(!isExist(noControllerMainIds,fylxMainIdVal)){
        comfirmMsg = checkScan(comfirmMsg,isLet,index,fylxName,factjeVal,limitJeVal,type)
    }

    $(fieldDt1+"_"+index).val(chineseChar2englishChar($(fieldDt1+"_"+index).val()))
    $(fieldDt2+"_"+index).val(chineseChar2englishChar($(fieldDt2+"_"+index).val()))
    $(fieldDt3+"_"+index).val(chineseChar2englishChar($(fieldDt3+"_"+index).val()))
    $(fieldMain).val(chineseChar2englishChar($(fieldMain).val()))

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
 * 获取国外执行标准
 */
function getOutBz(index) {
    console.log("getOutBz::"+index)
    var fylxMainIdVal = $("#"+fylxMainId+"_"+index).val()
    if(!isNull(fylxMainIdVal)){
        var invoiceVal = $("#"+invoice_type_field+"_"+index).val();
        var sqrVal = $("#"+sqrField+"_"+index).val()
        var enDateVal = $("#"+endDate+"_"+index).val()
        var cldjVal = $("#"+cldj+"_"+index).val()
        var requestId=$("#"+requestIdField).val()
        var cityVal = $("#"+countryAndcity+"_"+index).val();//
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
    }else{
        $("#"+bz_field+"_"+index).val("")
    }
}


/**
 * 获取bz
 * @param index
 * @param type
 */
function getSimpleBz(index,type) {
    var fylxMainIdVal = $("#"+fylxMainId+"_"+index).val()
    if(isExist(noControllerMainIds,fylxMainIdVal)){
        $("#"+bz_field+"_"+index).val("");
        return;
    }
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
 * 获取sales一般执行标准
 */
function getYbBz(index) {
    console.log("getYbBz::"+index)
    var fylxMainIdVal = $("#"+fylxMainId+"_"+index).val()
    if(!isNull(fylxMainIdVal)){
        var invoiceVal = $("#"+invoice_type_field+"_"+index).val();
        var requestId=$("#"+requestIdField).val()
        var sqrVal = $("#"+sqrField+"_"+index).val()
        var fyrqVal = $("#"+fyrq+"_"+index).val()
        var cbzxVal = $("#"+cbzxField+"_"+index).val();//
        var gsdVal = $("#"+gsdField+"_"+index).val();//
        ////console.log("sqrVal::"+sqrVal)
        ////console.log("fyrqVal::"+fyrqVal)
        ////console.log("requestId::"+requestId)
        ////console.log("cbzxVal::"+cbzxVal)
        ////console.log("gsdVal::"+gsdVal)
        ////console.log("typeMainId::"+fylxMainIdVal)
        $.ajax({
            type:"post",
            url:"/base/getCsBzYb.jsp",
            data: {"type":invoiceVal,"typeMainId":fylxMainIdVal,"sqr":sqrVal,'fyrq':fyrqVal,"requestId":requestId
                ,"cbzx":cbzxVal,"gsd":gsdVal},
            dataType:"text",
            async: false,
            success:function(data){
                //console.log("data:"+data)
                var str=JSON.stringify(data);
                var msg = "";
                msg=str.substring(str.indexOf("<body>")+26,str.indexOf("</body>")-12);
                ////console.log("getBzmsg::"+msg);
                if("-1.0"==msg||"-1"==msg||"-1.00"==msg||""==msg){
                    msg=0.0;
                }
                $("#"+bz_field+"_"+index).val(msg)
                // $("#"+bz_field+"_"+index+"span").html(msg);
            },
            error:function(jqXHR){
                //   //////////console.log(jqXHR);
                alert("发生错误："+ jqXHR.status);
            }
        });
    }else{
        $("#"+bz_field+"_"+index).val("")
    }
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
 * 获取行显示行号
 * @param index
 * @returns {*|jQuery}
 */
function getIndex(index) {
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
    var name=$("#"+gs_main_field+"span a").html();//显示名

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
    // ////////console.log("colVal::"+colVal)
    // ////////console.log("isNull(colVal)::"+isNull(colVal))
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

/**
 * 将中文符号转换成英文符号
 */
function chineseChar2englishChar(chineseChar){
    // 将单引号‘’都转换成'，将双引号“”都转换成"
    var str = chineseChar.replace(/\’|\‘/g,"'").replace(/\“|\”/g,"\"");
    // 将中括号【】转换成[]，将大括号｛｝转换成{}
    str = str.replace(/\【/g,"[").replace(/\】/g,"]").replace(/\｛/g,"{").replace(/\｝/g,"}");
    // 将逗号，转换成,，将：转换成:
    str = str.replace(/，/g,",").replace(/：/g,":").replace(/？/g,"?").replace(/。/g,".");
    return str;
}


/*-----------------------------------------提交验证-------------------------------------------------------------*/



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

