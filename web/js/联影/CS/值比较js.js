<script>
var fieldOne="field13775"//ʾ�� field12314
var fieldTwo="field13717"//ʾ�� field2131
var errorMessage="Ʊ����ϸ�д����Ѿ��������ķ�Ʊ����˶Ժ����ύ��"//��ʾ��Ϣ
$(document).ready(function(){
    checkCustomize = function (){
        var v1=$("#"+fieldOne).val();
        var v2=$("#"+fieldTwo).val();
        alert("fieldOne:"+v1+"fieldTwo:"+v2);
        if(Number(v1)!=Number(v2)){
            top.Dialog.alert(errorMessage)
            return false;
        }
        return true;
    }
})
</script>






