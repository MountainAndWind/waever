<script language="javascript">
// �����˾����ò��ܳ������ñ�׼������������ʾ������Ȼ�����ύ
var bField="field5913"// �˾�����
var cField="field5914"// �д���׼

jQuery(document).ready(function(){

    checkCustomize=function () {

        var peoAvgField="field5903"// �˾�����
        var zdBzField="field10565"// �д���׼

        //ҳ�����
        var bField_b=$("#"+peoAvgField).val()*1.0;
        var cField_c=$("#"+zdBzField).val()*1.0;
        //�������ֶ�ת��Ϊ������

        if(bField_b>cField_c){
            top.Dialog.alert("�������ܳ�����Ʊ���ϼƣ�")
            return false;
        }

        var num = WfForm.getDetailAllRowIndexStr("detail_1")  //��ȡ��ϸ�������б�ʾ
        num = num.split(",")
        for (var i = 0; i < num.length; i++) {
            var bFieldVal = $("#"+bField+"_"+num[i]).val()*1.0;
            var cFieldVal = $("#"+cField+"_"+num[i]).val()*1.0;
            console.log("bFieldVal::"+bFieldVal);
            console.log("cFieldVal::"+cFieldVal);
            if(bFieldVal>cFieldVal){
                top.Dialog.alert("���������д���׼��")
                return false;

            }

        }
        return true;
    }
});
</script>
<script type="text/javascript">
    /**
     * ��ϸ��ȡ���ֵ��ֵ����
     */
    jQuery(document).ready(function(){
        var je="field5936";//��ϸ���ֶ�
        var max="field9487";//����ֵ�ֶ�

        WfForm.bindDetailFieldChangeEvent(je,function(id,rowIndex,value){
            var max_v=0;//���ֵ
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
            //��ֵ
            $("#"+max).val(max_v);

        });

    });

</script>
