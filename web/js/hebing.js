<script language="javascript">
// 控制人均费用不能超过费用标准，超出弹框提示，但任然可以提交
var bField="field5913"// 人均费用
var cField="field5914"// 招待标准

jQuery(document).ready(function(){

    checkCustomize=function () {

        var peoAvgField="field5903"// 人均费用
        var zdBzField="field10565"// 招待标准

        //页面加载
        var bField_b=$("#"+peoAvgField).val()*1.0;
        var cField_c=$("#"+zdBzField).val()*1.0;
        //将主表字段转换为浮点数

        if(bField_b>cField_c){
            top.Dialog.alert("报销金额不能超过发票金额合计！")
            return false;
        }

        var num = WfForm.getDetailAllRowIndexStr("detail_1")  //获取明细行所有行标示
        num = num.split(",")
        for (var i = 0; i < num.length; i++) {
            var bFieldVal = $("#"+bField+"_"+num[i]).val()*1.0;
            var cFieldVal = $("#"+cField+"_"+num[i]).val()*1.0;
            console.log("bFieldVal::"+bFieldVal);
            console.log("cFieldVal::"+cFieldVal);
            if(bFieldVal>cFieldVal){
                top.Dialog.alert("报销金额超过招待标准！")
                return false;

            }

        }
        return true;
    }
});
</script>
<script type="text/javascript">
    /**
     * 明细表取最大值赋值主表
     */
    jQuery(document).ready(function(){
        var je="field5936";//明细表字段
        var max="field9487";//主表赋值字段

        WfForm.bindDetailFieldChangeEvent(je,function(id,rowIndex,value){
            var max_v=0;//最大值
            var idvalues = WfForm.getDetailAllRowIndexStr("detail_4");
            idvalues = idvalues.split(",")
            for (var i = 0; i < idvalues.length; i++) {
                var je_v=$("#"+je+"_"+idvalues[i]).val()*1.0;
                if(i==0){
                    max_v=je_v*1.0;
                }else{
                    if(je_v>max_v){
                        max_v=je_v;
                    }
                }

            }
            //赋值
            $("#"+max).val(max_v);

        });

    });

</script>
