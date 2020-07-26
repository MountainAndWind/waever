<!-- script代码，如果需要引用js文件，请使用与HTML中相同的方式。 -->
<script src="/aes/controllerYB.js"></script>
<script type="text/javascript">
var requestIdField="field13267"//请求id
var sqrField="field13247"//申请人
var gsdField="field13214"//公司段
var cbzxField="field13216"//成本中心
var fyrq="field13190"; //费用日期

/*************/
var stat;
var date;
/***************/

$(document).ready(function(){

    $.get("/work/canbu.jsp?val=1",
        function(data, status) {
            date= data.toString();
            stat=status;
        });

    if( stat!="success"){
        $.get("/work/canbu.jsp?val=1",
            function(data, status) {
                date= data.toString();
                stat=status;
            });


    }
    findValidationId(phoneMainId)//费用类型对照表中电话费主键id

    var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        var rowNum = num[i];
        $("#"+bz_field+"_"+rowNum).attr("readonly","readonly");
        $("#"+bz_field+"_"+rowNum).attr("UNSELECTABLE","on");
        jdZhFun(num,i);

        $("#" + fyrq + "_" + rowNum + ",#" + invoice_type_field + "_" + rowNum + ",#" + fylxMainId + "_"
            + rowNum + ",#" + gsdField + "_" + rowNum+ ",#" + cbzxField + "_"
            + rowNum+ ",#" + sqrField + "_" + rowNum).bindPropertyChange(function (e) {
            var index = e.id.split("_")[1]
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
            for(var index=Number(oldLastIndex)+1;index<=nowrowNum;index++){
                var rowNum=index;
                $("#" + fyrq + "_" + rowNum + ",#" + invoice_type_field + "_" + rowNum + ",#" + fylxMainId + "_" + rowNum + ",#"
                    + gsdField + "_" + rowNum+ ",#" + cbzxField + "_" + rowNum+ ",#" + sqrField + "_" + rowNum).bindPropertyChange(function (e) {
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
        var num = $("#submitdtlid0").val();
        num = num.split(",")
        var comfirmMsg="";
        debugger;
        for (var i = 0; i < num.length; i++) {
            //var index=Number(num[i])+1;
            var index=getIndex(num[i]);
            var invoiceVal = $("#"+invoice_type_field+ "_" +num[i]).val();
            var factjeVal = $("#"+sbje_field+"_"+num[i]).val();
            var limitJeVal= $("#"+bz_field+"_"+num[i]).val();
            var limitJe= $("#"+bz_field+"_"+num[i]).val();
            var field_name2_val = $("#" +field_name2 + "_" + num[i]).val();
            var fyrqVal = $("#" +fyrq + "_" + num[i]).val();
            var nowDate = getNowDate();
            var days = getDays(fyrqVal,nowDate)
            var zcbxtsVal = $("#" +zcbxts+ "_" + num[i]).val();

            if(isNull(fyrqVal)){
                top.Dialog.alert("明细第" + index + "行无法提交，费用日期为空！！！")
                return false;
            }
            if(isNull(field_name2_val)||0==field_name2_val){
                top.Dialog.alert("明细第" + index + "行无法提交，汇率不得为空！！！")
                return false;
            }
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
            if(isExist(phoneInvoceIDs,invoiceVal)){
                if(Number(limitJe)<=0||limitJe==null||undefined==limitJe||""==limitJe){
                    top.Dialog.alert("明细第"+index+"行无法提交，电话费额度不能为空！！！")
                    return false;
                }
                /****************************/
                var date1=date.split("-");
                var  n= $("#"+fyrq+"_"+num[i]).val();
                n=n.split("-");
                var e_time=new Date(date1[0],date1[1]-1,date1[2],0,0,0,0);

                var now=new Date(n[0],n[1]-1,n[2],0,0,0,0);

                if(e_time.getTime()<now.getTime()){
                    top.Dialog.alert("手机话费额度已经过期");
                    return false;
                }else{
                    if(Number($("#"+bz_field+"_"+num[i]).val())<Number($("#"+sbje_field+"_"+num[i]).val()*0.8)){
                    }
                }
                /******************************/
            }
            var fylxMainIdVal = $("#"+fylxMainId+"_"+num[i]).val()

            if(outingMainId==fylxMainIdVal){
                var outingBxcs=$("#"+outingBxcsField+"_"+num[i]).val();
                console.log("outingBxcs::"+outingBxcs)
                if(outingBxcs>=1){
                    top.Dialog.alert("明细第"+index+"行一个成本中心outing费用一年只允许报销一次，该成本中心已经报过！！！")
                    return false;
                }
            }
            debugger
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


function findValidationId(val) {///base/findInvoiceTypById.jsp?fieldVal=3
    var msg = "";
    $.ajax({
        type:"GET",
        url:"/base/findInvoiceTypById.jsp?",
        data: {'fieldVal':val,'timeStamp':new Date().getTime()},
        dataType:"text",
        success:function(data){
            var str=JSON.stringify(data);
            msg=str.substring(str.indexOf("<body>")+26,str.indexOf("</body>")-8);
            if(phoneMainId==val){
                phoneInvoceIDs=msg//费用类型对照表中电话费集合
            }
        },
        error:function(jqXHR){
            alert("发生错误："+ jqXHR.status);
        }
    });
}
</script>
<style>
.cusbrowwidth .e8_os{min-width:50px !important;}
</style>


















