<script>
var ybxed="field13300"//ԭ�������
var type="field13299"//��������
var phone_field="field13296"//�ֻ����ֶ�
var limit_length="11"//�޶�����
$(document).ready(function(){
    var val = $("#"+ybxed).val();
    $("#field13299_tdwrap").attr("style","pointer-events: none;")
    //console.log("val::"+val);
    setType(val);
    $("#"+ybxed).bindPropertyChange(function (e) {
        //console.log("bind")
        //console.log("e.id::"+e.id)
        var val = $("#"+ybxed).val();
        //console.log("bindval::"+val);
        setType(val);
    });

    checkCustomize = function (){
        var val = $("#"+phone_field).val();
        //console.log("�ֻ���"+val)
        if(Number(val.length)!=Number(limit_length)){
            top.Dialog.alert("�ֻ������ʽ����ȷ�����޸ģ�")
            return false;
        }
        return true;
    }
})
function setType(val) {
    if(""==val){
        $("#"+type).val(0);//�״�
    }else{
        $("#"+type).val(1);//���
    }
}
</script>




