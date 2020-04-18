
    <script>
    var textValue="<img align=absmiddle src='/images/BacoError_wev8.gif' />";
    var field_a="field13593_0";//标准
    var field_b="field13587_0";//税额
    jQuery(document).ready(function() {
        var btzd = $("input[name='needcheck']").val();
        var flag1= $("#"+field_a).val();
        if(flag1 ==0){
            //设置必填
            $("#"+field_b+"span").html(textValue);
            $("#"+field_b).attr('viewtype','1');
            fieldIds = btzd + "," + field_b ;
            $("input[name='needcheck']").val(fieldIds);
        }else{
            //取消必填
            
            $("#"+field_b+"span").html("");
        }
    });
    </script>




