<script src="/aes/controller.js"></script>
<script>
/**
 * cs 月度报销
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
var fyrq="field13598"//费用日期
var zcbxts="field14127"; //最长报销天数
var requestIdField="field13673"//请求id
var outingBxcsField="field13703"//报销次数
var sqrField="field13653"//申请人
var cbzxField="field13624"//成本中心 field13216
var gsdField="field13622"//公司段
var fylxMainId="field13675"//费用类型对照表主键13675

var bxlx="field14393"//报销类型

var pxhdVal="4"//培训活动val值

/*退回操作*/
var fhrq="field14396"//返回日期 14396
var thbs="field14397"//退回标识 14397

var phoneInvoceMainId="3"//费用类型对照表中电话费型主键id
var indoorTransMainId="8"//费用类型对照表中室内交通费主键id  室内交通费单笔不得超过100元
var serveMainId="19"//费用类型对照表中招待费主键id
var indoorTransEdMainId="20"//费用类型对照表中室内交通不超额度
var tiJianMainId="22"//体检费
var groupMainId="4"//费用类型对照表团建费
var outingMainId="5"//outing
var canBuMainId="14"//餐补
/*下处无需配置*/
var phoneInvoceIDs=""//费用类型对照表中电话费集合
var indoorTransIDs=""//费用类型对照表中室内交通费集合
var serveIDs=""//费用类型对照表中招待费集合s
var indoorTransEdIDs=""//费用类型对照表中室内交通不超额度控制集合
var groupIds=""//费用类型对照表团建费集合
var outingIDs=""//outing
/**
 * 加载方法
 */
$(document).ready(function(){

    if(""==$("#"+bxlx).val()){
        //报销类型为空
        $("#"+jqr).val("");
        $("#"+jqr+"_tdwrap").attr("style","display:none")
    }else{
        $("#"+jqr+"_tdwrap").attr("style","")
    }
    debugger
    //////console.log("ready")
    findValidationId(phoneInvoceMainId)//
    findValidationId(indoorTransMainId)//
    findValidationId(serveMainId)//
    findValidationId(indoorTransEdMainId)//
    findValidationId(groupMainId)//
    findValidationId(outingMainId)//
    var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        var rowNum = num[i];

        $("#"+bz_field+"_"+rowNum).attr("readonly","readonly");
        $("#"+bz_field+"_"+rowNum).attr("UNSELECTABLE","on");
        jdZhFun(num,i);
        console.log("rowNum::"+rowNum)
        //jiqQianBt(rowNum);
        $("#" + fyrq + "_" + rowNum + ",#" + invoice_type_field
            + "_" + rowNum + ",#" + fylxMainId + "_"
            + rowNum + ",#" + gsdField
            + "_" + rowNum+ ",#" + cbzxField + "_"
            + rowNum+ ",#" + sqrField + "_" + rowNum
            + ",#" + bz_field + "_" + rowNum).bindPropertyChange(function (e) {
            var index = e.id.split("_")[1]
            //jiqQianBt(index);
            getBz(index);
        });
    }

    $("#"+bxlx).bindPropertyChange(function (e) {
        console.log("bxlxchange")
        $("#"+jqr+"_readonlytext span a[onclick='pointerXY(event);']").html("")
        $("#"+jqr).val("");
        if(""==$("#"+bxlx).val()){
            //报销类型为空
            $("#"+jqr+"_tdwrap").attr("style","display:none")
        }else{
            $("#"+jqr+"_tdwrap").attr("style","")
        }
        var num = $("#submitdtlid0").val();
        num = num.split(",")
        for(var i=0;i<num.length;i++){
            //jiqQianBt(num[i]);
            getBz(num[i])
        }
    })



    var dtIdLength = 0;
    var oldDtIdLength = 0;
    /*
    当明细行数量增加时，为增加的明细行添加函数；当明细行数量减少时，重新计算总额
     */
    var oldLastIndex=-1;
    var detileTabId = "#submitdtlid0";
    $(detileTabId).bindPropertyChange(function () {
        dtIdLength = jQuery(detileTabId).val().split(",").length;
        if (oldDtIdLength <= dtIdLength) {
            var num = $("#submitdtlid0").val();
            num = num.split(",")
            var nowrowNum = num[num.length - 1];
            //jiqQianBt(nowrowNum);
            for(var index=Number(oldLastIndex)+1;index<=nowrowNum;index++){
                var rowNum=index;
                // //国内触发点 ：城市   费用类型   费用类型对照id  sqr  天数  fylxMainId  sqrField
                $("#" + fyrq + "_" + rowNum + ",#" + invoice_type_field
                    + "_" + rowNum + ",#" + fylxMainId + "_" + rowNum
                    + ",#" + gsdField + "_" + rowNum+ ",#" + cbzxField
                    + "_" + rowNum+ ",#" + sqrField + "_" + rowNum
                    + ",#" + bz_field + "_" + rowNum).bindPropertyChange(function (e) {
                    var i = e.id.split("_")[1]
                    //jiqQianBt(i);
                    getBz(i);
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


    checkCustomize = function (){
        var num = $("#submitdtlid0").val();
        num = num.split(",")
        var comfirmMsg="";
        debugger;
        var zhaoDaiNum=""//招待费明细总报销金额
        var zhaoDaiLimit=""//招待费额度
        for (var i = 0; i < num.length; i++) {
            var index=getIndex(num[i]);
            var invoiceVal = $("#"+invoice_type_field+ "_" +num[i]).val();
            var factjeVal = $("#"+sbje_field+"_"+num[i]).val();
            var limitJeVal= $("#"+bz_field+"_"+num[i]).val();
            var fyrqVal = $("#" +fyrq + "_" + num[i]).val();
            var nowDate = getNowDate();
            var bs = $("#"+thbs).val()

            if(isNull(invoiceVal)){
                top.Dialog.alert("明细第"+index+"行无法提交, 费用类型不得为空！！！")
                return false;
            }
            //console.log("标识：："+bs)
            if(bs!=1){
                //console.log("非退回校验时间：：")
                var days = getDays(fyrqVal,nowDate)
                var zcbxtsVal = $("#" +zcbxts+ "_" + num[i]).val();
                if(Number(days)>zcbxtsVal){
                    top.Dialog.alert("明细第"+index+"行无法提交，费用发生日期已超过"+zcbxtsVal+"天！！！")
                    return false;
                }
            }else{
                //console.log("退回校验时间：：")
                var fhrqVal =$("#"+fhrq).val();
                //console.log("退回日期::"+fhrqVal)
                var days = getDays(fhrqVal,nowDate)
                //console.log("退回日期与此时日期相差的天数："+days)
                if(Number(days)>30){
                    top.Dialog.alert("明细第"+index+"行无法提交，退回发生日期已超过"+days+"天！！！")
                    return false;
                }
            }
            if(isExist(outingIDs,invoiceVal)){
                var outingBxcs=$("#"+outingBxcsField+"_"+num[i]).val();
                //////console.log("outing报销次数：："+outingBxcs);
                if(outingBxcs>=1){
                    top.Dialog.alert("明细第"+index+"行一个成本中心outing费用一年只允许报销一次，该成本中心已经报过！！！")
                    return false;
                }
            }
            if(isExist(phoneInvoceIDs,invoiceVal)){
                if(Number(limitJeVal)<=0||limitJeVal==null||undefined==limitJeVal||""==limitJeVal){
                    top.Dialog.alert("明细第"+index+"行无法提交，电话费额度不能为空！！！")
                    return false;
                }
            }
            var isLet = $("#"+isLetField+"_"+num[i]).val();
            var fylxName = getFylxName("#"+invoice_type_field+"_"+num[i])
            console.log("fylxName::"+fylxName)
            console.log("isLet::"+isLet)

            var bxlxVal = $("#"+bxlx).val()
            var fylxMainIdVal = $("#"+fylxMainId+"_"+num[i]).val()
            if(fylxMainIdVal==serveMainId){
                zhaoDaiNum = Number(zhaoDaiNum)+Number(factjeVal);
                zhaoDaiLimit = Number(limitJeVal);
            }

            if(fylxMainIdVal!=canBuMainId){
                comfirmMsg = checkValidation(comfirmMsg,bxlxVal,isLet,index,fylxName,factjeVal,limitJeVal,"",fylxMainIdVal)
            }

            console.log("comfirmMsg::"+comfirmMsg)
            console.log("comfirmMsg==\"false\"::"+(comfirmMsg=="false"))
            if(comfirmMsg=="false"){
                return false;
            }
            jdZhFun(num,i);
        }
        console.log("zhaoDaiNum::"+zhaoDaiNum)
        console.log("zhaoDaiLimit::"+zhaoDaiLimit)
        console.log("$(bxlx).val()::"+($("#"+bxlx).val()))
        if($("#"+bxlx).val()==0){
            if(Number(zhaoDaiNum)>Number(zhaoDaiLimit)){
                alert("招待费总报销超过执行标准,超标金额为"+accSub(zhaoDaiNum,zhaoDaiLimit)+"RMB！！！")
            }
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
 * 设置必填
 */
var textValue="<img align=absmiddle src='/images/BacoError_wev8.gif' />";
/**
 * 设置必填
 */
function setBt(col,index) {
    console.log("setBt")
    var btzd = $("input[name='needcheck']").val();
    var colVal = $("#"+col+"_"+index).val();
    console.log("colVal::"+colVal)
    console.log("isNull(colVal)::"+isNull(colVal))
    if(isNull(colVal)){
        $("#"+col+"_"+index+"span").html(textValue);
    }
    $("#"+col+"_"+index).attr('viewtype','1');
    var s="," + col+"_"+index;
    if(btzd.indexOf(s)==-1){
        var fieldIds = btzd + "," + col+"_"+index ;
        $("input[name='needcheck']").val(fieldIds);
    }
    //field13611_0_browserbtn
    document.getElementById(col+"_"+index+"_browserbtn").removeAttribute("disabled")
}

/**
 * 取消必填
 */
function canBt(col,index) {
    console.log("canBt")
    debugger
    var btzd = $("input[name='needcheck']").val();
    btzd=btzd.replace(","+col+"_"+index,"")
    $("input[name='needcheck']").val(btzd);
    $("#"+col+"_"+index+"_browserbtn").attr("disabled","disabled");
    $("#"+col+"_"+index+"span img").remove()
}

function isNull(val) {
    if(""==val||val==null||val==undefined){
        return true;
    }else{
        return false;
    }
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
    getSalesBz(index,"YB");
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
 *
 * @param val
 */
function findValidationId(val) {///base/findInvoiceTypById.jsp?fieldVal=3
    //////console.log("findValidationId")
    //////console.log("val:"+val)
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
            //////console.log("msg::"+msg)
            if(phoneInvoceMainId==val){
                phoneInvoceIDs=msg//费用类型对照表中电话费集合
            }else if(indoorTransMainId==val){
                indoorTransIDs=msg//费用类型对照表中结婚礼金集合
            }else if(serveMainId==val){
                serveIDs=msg//
            }else if(indoorTransEdMainId==val){
                indoorTransEdIDs=msg//国内住宿
            }else if(groupMainId==val){
                groupIds=msg;
            }else if(outingMainId==val){
                outingIDs=msg;
            }
        },
        error:function(jqXHR){
            alert("发生错误："+ jqXHR.status);
        }
    });
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


function getIndex(index) {
    //$("tr[_rowindex='3'] td[class='detail0_3_1 td_etype_22'] span").html()
    var val = $("tr[_rowindex='"+index+"'] td[class='detail0_3_1 td_etype_22'] span").html()
    ////console.log("tag::"+("tr[_rowindex='"+index+"'] td[class='detail0_3_1 td_etype_22'] span"))
    ////console.log("getIndex::"+val)
    return val
}


/**
 * 九段key val 赋值
 * @param num
 * @param i
 * @param type
 */
function jdZhFun(num,i) {
    //////console.log("jdZhFun")
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
                alert('温馨提醒：当前浏览器内核版本过低，为了保证流程正常的使用请更换如ie 10版本或谷歌浏览器');
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
            alert('温馨提醒：当前浏览器存在兼容性问题，为了保证流程正常的使用请更换ie或谷歌浏览器');
        }
    }
    browsertest();
    //myBrowser();
})
</script>









