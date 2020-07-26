/**
 * cs 月度报销
 */
<script>
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

var outingBxcsField="field13703"//报销次数


var phoneInvoceMainId="3"//费用类型对照表中电话费型主键id
var indoorTransMainId="8"//费用类型对照表中室内交通费主键id  室内交通费单笔不得超过100元
var serveMainId="19"//费用类型对照表中招待费主键id
var indoorTransEdMainId="20"//费用类型对照表中室内交通不超额度
var groupMainId="4"//费用类型对照表团建费
var outingMainId="5"//outing
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
    console.log("ready")
    findValidationId(phoneInvoceMainId)//
    findValidationId(indoorTransMainId)//
    findValidationId(serveMainId)//
    findValidationId(indoorTransEdMainId)//
    findValidationId(groupMainId)//
    findValidationId(outingMainId)//
    var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        jdZhFun(num,i);
    }
    checkCustomize = function (){
        console.log("checkCustomize!!!")
        var num = $("#submitdtlid0").val();
        num = num.split(",")
        console.log("num::"+num)
        for (var i = 0; i < num.length; i++) {
            var index=Number(num[i])+1;
            console.log(index)
            var type = $("#"+invoice_type_field+ "_" +num[i]).val();
            console.log("type：："+type)
            var sbJe = $("#"+sbje_field+"_"+num[i]).val();
            console.log("sbJe：："+sbJe)
            var limitJe= $("#"+bz_field+"_"+num[i]).val();
            console.log("limitJe：："+limitJe)
            var fyrqVal = $("#" +fyrq + "_" + num[i]).val();
            console.log("fyrqVal：："+fyrqVal)
            var nowDate = getNowDate();
            console.log("nowDate：："+nowDate)
            var days = getDays(fyrqVal,nowDate)
            console.log("days：："+days)
            if(Number(days)>60){
                top.Dialog.alert("明细第"+index+"行无法提交，费用发生日期已超过60天！！！")
                return false;
            }
            if(""!=type){
                console.log("type::"+type)
                console.log("sbJe::"+sbJe)
                console.log("limitJe::"+limitJe)
                console.log("indoorTransIDs::"+indoorTransIDs)
                console.log("phoneInvoceIDs::"+phoneInvoceIDs)
                console.log("serveIDs::"+serveIDs)
                console.log("indoorTransEdIDs::"+indoorTransEdIDs)
                console.log("groupIds::"+groupIds)
                console.log("outingIDs::"+outingIDs)
                if(phoneInvoceIDs.indexOf(type)!=-1){
                     if(Number(limitJe)<=0||limitJe==null||undefined==limitJe||""==limitJe){
                         top.Dialog.alert("明细第"+index+"行无法提交，电话费额度不能为空！！！")
                         return false;
                     }
                }else if((serveIDs+"-"+indoorTransEdIDs+"-"+indoorTransIDs+"-"+groupIds).indexOf(type)!=-1){
                    if(Number(sbJe)>Number(limitJe)){
                        top.Dialog.alert("明细第"+index+"行无法提交，实报金额不得超过执行标准！！！")
                        return false;
                    }
                }else if(outingIDs.indexOf(type)!=-1){
                    var outingBxcs=$("#"+outingBxcsField+"_"+num[i]).val();
                    console.log("outing报销次数：："+outingBxcs);
                    if(outingBxcs>=1){
                        top.Dialog.alert("明细第"+index+"行一个成本中心outing费用一年只允许报销一次，该成本中心已经报过！！！")
                        return false;
                    }
                    if(Number(sbJe)>Number(limitJe)){
                        top.Dialog.alert("明细第"+index+"行无法提交，实报金额不得超过执行标准！！！")
                        return false;
                    }
                }
            }
            jdZhFun(num,i);
        }
        return true;
    }
})


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
    console.log("findValidationId")
    console.log("val:"+val)
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


/**
 * 九段key val 赋值
 * @param num
 * @param i
 * @param type
 */
function jdZhFun(num,i) {
    console.log("jdZhFun")
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


</script>




