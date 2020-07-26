<script src="/aes/controllerCSYB.js"></script>
<script>
$(document).ready(function(){
    var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        var rowNum = num[i];
        $("#"+bz_field+"_"+rowNum).attr("readonly","readonly");
        $("#"+bz_field+"_"+rowNum).attr("UNSELECTABLE","on");
        jdZhFun(num,i);
        $("#" + fyrq + "_" + rowNum + ",#" + invoice_type_field
            + "_" + rowNum + ",#" + fylxMainId + "_"
            + rowNum + ",#" + gsdField
            + "_" + rowNum+ ",#" + cbzxField + "_"
            + rowNum+ ",#" + sqrField + "_" + rowNum
            + ",#" + bz_field + "_" + rowNum).bindPropertyChange(function (e) {
            ////console.log("change")
            var index = e.id.split("_")[1]
            ////console.log("第：："+index+"行触发")
            getBz(index);
        });
    }


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
            ////console.log("oldLastIndex:"+oldLastIndex)
            ////console.log("nowrowNum:"+nowrowNum)
            for(var index=Number(oldLastIndex)+1;index<=nowrowNum;index++){
                ////console.log("index::"+index)
                var rowNum=index;
                // //国内触发点 ：城市   费用类型   费用类型对照id  sqr  天数  fylxMainId  sqrField
                $("#" + fyrq + "_" + rowNum + ",#" + invoice_type_field
                    + "_" + rowNum + ",#" + fylxMainId + "_" + rowNum
                    + ",#" + gsdField + "_" + rowNum+ ",#" + cbzxField
                    + "_" + rowNum+ ",#" + sqrField + "_" + rowNum+ ",#" + bz_field + "_" + rowNum).bindPropertyChange(function (e) {
                    ////console.log("change")
                    var i = e.id.split("_")[1]
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
        //////console.log("checkCustomize!!!")
        var num = $("#submitdtlid0").val();
        num = num.split(",")
        var comfirmMsg="";
        //////console.log("num::"+num)
        for (var i = 0; i < num.length; i++) {
            //var index=Number(num[i])+1;
            var index=getIndex(num[i]);
            var invoiceVal = $("#"+invoice_type_field+ "_" +num[i]).val();
            var factjeVal = $("#"+sbje_field+"_"+num[i]).val();
            var limitJeVal= $("#"+bz_field+"_"+num[i]).val();
            var limitJe= $("#"+bz_field+"_"+num[i]).val();
            var fyrqVal = $("#" +fyrq + "_" + num[i]).val();
            var fylxMainIdVal = $("#"+fylxMainId+"_"+num[i]).val()
            var nowDate = getNowDate();
            var bs = $("#"+thbs).val()
            if(bs!=1){
                //console.log("非退回校验时间：：")
                var days = getDays(fyrqVal,nowDate)
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

            if(phoneMainId==fylxMainIdVal){
                if(Number(limitJe)<=0||limitJe==null||undefined==limitJe||""==limitJe){
                    top.Dialog.alert("明细第"+index+"行无法提交，电话费额度不能为空！！！")
                    return false;
                }
            }
            console.log("[outingMainId==fylxMainIdVal]"+(outingMainId==fylxMainIdVal))
            if(outingMainId==fylxMainIdVal){
                var outingBxcs=$("#"+outingBxcsField+"_"+num[i]).val();
                if(outingBxcs>=1){
                    top.Dialog.alert("明细第"+index+"行一个成本中心outing费用一年只允许报销一次，该成本中心已经报过！！！")
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
    getSimpleBz(index,"YB");
}
</script>
<style>
.cusbrowwidth .e8_os{min-width:50px !important;}
</style>