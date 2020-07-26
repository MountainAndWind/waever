<script src="/aes/controller.js"></script>
<script>
var sbje_field="field13620"//实报金额字段field12723
var bz_field="field13608";//标准字段field1231
var invoice_type_field="field13651";//费用类型field1231  field12727_0span
var country="field13642"//国家field13642
var dollarsRate="field13667"//美元汇率
var chinaId="216";
var bxlx="field14393"//报销类型
var fylxMainId="field13675"//费用类型对照表主键13675

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
        console.log("checkCustomize")
        debugger
        var num = getDetialIndexArr(0);
        var zhaoDaiNum=""//招待费明细总报销金额
        var zhaoDaiLimit=""//招待费额度
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
            var fylxName = $("#field13651_"+num[i]+"_span span").html()

            var bxlxVal = $("#"+bxlx).val()
            var fylxMainIdVal = $("#"+fylxMainId+"_"+num[i]).val()

            if(fylxMainIdVal==serveMainId){
                zhaoDaiNum = Number(zhaoDaiNum)+Number(factjeVal);
                zhaoDaiLimit = Number(limitJeVal);
            }

            comfirmMsg = checkValidation(comfirmMsg,bxlxVal,isLet,index,fylxName,factjeVal,limitJeVal,type,fylxMainIdVal)

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