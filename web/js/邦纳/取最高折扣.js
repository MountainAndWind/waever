
<script type="text/javascript">
var mxid="indexnum0";
var tjlx="field7519";//�ؼ�����ID
var gmcs="field7539";//�������ID
var cqtj="0";//�����ؼ۶�Ӧ��IDֵ
var zgzkl="field8675";//����ۿ���ID
var zkl="field7535";//�ۿ���ID
var cpxl_main="field10436"//��ƷС�������ֶ�
var cpxl_detail="field10435"//��ƷС��ϸ�ֶ�

jQuery(document).ready(function(){

    //��������ۿ���
    $(document).bind("click",function(){
        var tmp=100;//��ʱֵ���������ۿ���
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
        $("#"+zgzkl).val(tmp);//��ֵ
        $("#"+cpxl_main).val(cpxl_detailVal)//

    });
});
</script>



