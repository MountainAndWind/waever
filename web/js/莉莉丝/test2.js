<script>
jQuery(document).ready(function(){
    console.log("ready")

    checkCustomize = function (){
        console.log("checkCustomize")
        var beginDate=$("#beginDate").val(); //审批时间
        var endDate=$("#endDate").val();     //发票开具时间
        var d1 = new Date(beginDate.replace(/\-/g, "\/"));
        var d2 = new Date(endDate.replace(/\-/g, "\/"));
        var bxje=Number(WfForm.getFieldValue("field6404"))*1.00;//报销金额
        var kyys=Number(WfForm.getFieldValue("field6564"))*1.00;//可用预算
        var dgfk=Number(WfForm.getFieldValue("field6436"))*1.00;//对公付款金额合计
        var grbz=Number(WfForm.getFieldValue("field6407"))*1.00;//个人报账金额
        var sjfkje=(bxje-dgfk-grbz)*1.00;//报销金额-对公付款金额合计+个人报账金额
        var sfcys=(bxje-kyys)*1.00;//报销金额-可用预算
        console.log("d1:"+d1)
        console.log("d2:"+d2)
        console.log("sfcys:"+sfcys)
        console.log("sjfkje:"+sjfkje)
        if(d1 < d2 ){
            alert("发票开具时间必须晚于审批时间,请核对后再提交！");
            return false;
        }
        if(sfcys>0){//报销金额-可用预算>0
            alert("当前报销金额"+bxje+"，超出可用预算金额"+kyys+",请核对后再提交！");
            return false;
        }
        if(sjfkje<0){//个人报账和对公付款之和不能超过报销金额
            alert("个人报账金额加上对公付款金额不能超过报销金额，请核对后再提交！");
            return false;
        }
        return true;
    }

});
</script>