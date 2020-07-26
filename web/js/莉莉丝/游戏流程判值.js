<script>
    var gameField=""//field7311  游戏字段
    var dq=""//所在大区字段  field7311
    var flmc=""//福利名称    field7311
    WfForm.bindFieldChangeEvent(gameField, function(obj,id,value){
        console.log("WfForm.bindFieldChangeEvent--",obj,id,value);
        $("#"+dq).val("");
        $("#"+flmc).val("");
    });
</script>