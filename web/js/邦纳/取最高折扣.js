
<script type="text/javascript">
var mxid="indexnum0";
var tjlx="field7519";//特价类型ID
var gmcs="field7539";//购买次数ID
var cqtj="0";//长期特价对应的ID值
var zgzkl="field8675";//最高折扣率ID
var zkl="field7535";//折扣率ID
var cpxl_main="field10436"//产品小类主表字段
var cpxl_detail="field10435"//产品小明细字段

jQuery(document).ready(function(){

    //设置最高折扣率
    $(document).bind("click",function(){
        var tmp=100;//临时值，存放最大折扣率
        var num = $("#submitdtlid0").val();
        num = num.split(",")
        var cpxl_detailVal=""
        for (var i = 0; i < num.length; i++) {
            var rate=parseFloat($("#"+zkl+"_"+num[i]).val());
            if (rate<tmp) {
                tmp=rate;
                cpxl_detailVal=$("#"+cpxl_detail+"_"+num[i]).val()
            }
        }
        $("#"+zgzkl).val(tmp);//填值
        $("#"+cpxl_main).val(cpxl_detailVal)//

    });
});
</script>



