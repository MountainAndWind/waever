var textValue="<img align=absmiddle src='/images/BacoError_wev8.gif' />";
var field_a="field6646";//立项标志
var field_b="field23530";//附件字段
jQuery(document).ready(function() {
    var btzd = $("input[name='needcheck']").val();
    var flag1= $("#"+field_a).val();
    if(flag1 ==0){
        //添加必填
        $("#"+field_b+"span").html(textValue);
        $("#"+field_b).attr('viewtype','1');
        //必填字段id
        fieldIds = btzd + "," + field_b ;
        $("input[name='needcheck']").val(fieldIds);
    }else{
        //取消必填
        $("#"+field_b+"span").html("");
    }
});





