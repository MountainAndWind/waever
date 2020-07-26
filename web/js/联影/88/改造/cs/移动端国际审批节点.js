<script src="/aes/controllerCSYB.js"></script>
<script>
$(document).ready(function(){
    console.log("ready")
    checkCustomize = function (){
        console.log("checkCustomize")
        debugger
        var num = getDetialIndexArr(0);
        var comfirmMsg="";
        for (var i = 0; i < num.length; i++) {
            var index=getIndex(num[i]);
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
            var fylxName = $("#"+invoice_type_field+"_"+num[i]+"_span span").html()
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


function getIndex(i) {
    return $("tr[name='trView_0_"+i+"'] span[name='detailIndexSpan0']").html()
}


/**
 * 回去明细索引集合
 * @param index
 * @returns {any[]}
 */
function getDetialIndexArr(index) {
    var arr = new Array();
    var names = "";
    $("#oTable"+index+" tr[_target='datarow']").each(function(){
        var nameVal = $(this).attr("name");
        if(names!=nameVal){
            names=nameVal
            if(!isNull(nameVal)){
                arr.push(nameVal.split("_")[2]);
            }
        }
    });
    return arr;
}


function isNull(val) {
    if(""==val||val==null||val==undefined){
        return true;
    }else{
        return false;
    }
}
</script>