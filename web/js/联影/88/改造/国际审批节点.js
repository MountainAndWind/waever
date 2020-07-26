<script src="/aes/controllerYB.js"></script>
<script>
$(document).ready(function(){
    console.log("ready")
    checkCustomize = function (){
        var num = $("#submitdtlid0").val();
        num = num.split(",")
        var comfirmMsg="";
        for (var i = 0; i < num.length; i++) {
            var index=getPcIndex(num[i]);
            var factjeVal = $("#"+sbje_field+"_"+num[i]).val();
            var limitJeVal= $("#"+bz_field+"_"+num[i]).val();
            var isLet = $("#"+isLetField+"_"+num[i]).val();
            var countryVal = $("#"+country+"_"+num[i]).val();
            var dollarsRateVal = $("#"+dollarsRate+"_"+num[i]).val();
            var type = "";
            if (chinaId!=countryVal) {// 国外：非人名币处理
                limitJeVal = Number(limitJeVal) * Number(dollarsRateVal)* 1.1;//浮动%10
                type="NO_CNY";
            }
            var fylxName = $("#"+invoice_type_field+"_"+num[i]+"span").html().replace("&nbsp;","");
            var fylxMainIdVal = $("#"+fylxMainId+"_"+num[i]).val()
            comfirmMsg = comfirmMsg = checkValidation(comfirmMsg,isLet,index,fylxName,factjeVal,limitJeVal,type,fylxMainIdVal)
            if(comfirmMsg=="false"){
                return false;
            }
        }
        console.log("comfirmMsg::"+comfirmMsg)
        if(comfirmMsg!=""){
            comfirmMsg+="是否放行！！！";
            if(confirm(comfirmMsg)){
                return true;
            }else{
                return false;
            }
        }
        return true;
    }
})
</script>