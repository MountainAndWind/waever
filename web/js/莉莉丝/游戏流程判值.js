<script>
    var gameField=""//field7311  ��Ϸ�ֶ�
    var dq=""//���ڴ����ֶ�  field7311
    var flmc=""//��������    field7311
    WfForm.bindFieldChangeEvent(gameField, function(obj,id,value){
        console.log("WfForm.bindFieldChangeEvent--",obj,id,value);
        $("#"+dq).val("");
        $("#"+flmc).val("");
    });
</script>