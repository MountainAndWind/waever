<script language="javascript">

var bField="field8762";//�˾�����
var NUM=80;//?�д���׼

jQuery(document).ready(function(){
    checkCustomize=function(){
        var num= WfForm.getDetailAllRowIndexStr("detail_1");//��ȡ��ϸ�������б�ʾ
        num=num.split(",");
        for(var i=0;i<num.length;i++){
            var index=Number(i)+1
            var bFieldVal=$("#"+bField+"_"+num[i]).val()*1.0;
            if(bFieldVal>NUM){
                top.Dialog.alert("��ϸ��"+index+"�У�����")
                return false;
            }
        }
        return true;
    };
});
</script>