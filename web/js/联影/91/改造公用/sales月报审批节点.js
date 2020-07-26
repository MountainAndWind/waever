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
var sbje_field="field13620"//实报金额字段field12723
var bz_field="field13608";//标准字段field1231
var invoice_type_field="field13651";//费用类型field1231  field12727_0span
var bxlx="field14393"//报销类型
var fylxMainId="field13675"//费用类型对照表主键13675
var canBuMainId="14"//餐补

var indoorTransMainId="8"//费用类型对照表中室内交通费主键id  室内交通费单笔不得超过100元
var serveMainId="19"//费用类型对照表中招待费主键id
var indoorTransEdMainId="20"//费用类型对照表中室内交通不超额度
var tiJianMainId="22"//体检费
/**
 * 加载方法
 */
$(document).ready(function(){
    console.log("ready")
    checkCustomize = function (){
        var num = $("#submitdtlid0").val();
        num = num.split(",")
        var comfirmMsg="";
        var zhaoDaiNum=""//招待费明细总报销金额
        var zhaoDaiLimit=""//招待费额度
        for (var i = 0; i < num.length; i++) {
            var index=getPcIndex(num[i]);
            var factjeVal = $("#"+sbje_field+"_"+num[i]).val();
            var limitJeVal= $("#"+bz_field+"_"+num[i]).val();
            var isLet = $("#"+isLetField+"_"+num[i]).val();
            var fylxName = $("#"+invoice_type_field+"_"+num[i]+"span").html().replace("&nbsp;","");
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
            if(comfirmMsg=="false"){
                return false;
            }
        }
        if($("#"+bxlx).val()==0){
            if(Number(zhaoDaiNum)>Number(zhaoDaiLimit)){
                alert("招待费总报销超过执行标准,超标金额为"+accSub(zhaoDaiNum,zhaoDaiLimit)+"RMB！！！")
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