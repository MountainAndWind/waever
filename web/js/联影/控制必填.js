var textValue="<img align=absmiddle src='/images/BacoError_wev8.gif' />";
var field_a="field6646";//�����־
var field_b="field23530";//�����ֶ�
jQuery(document).ready(function() {
    var btzd = $("input[name='needcheck']").val();
    var flag1= $("#"+field_a).val();
    if(flag1 ==0){
        //��ӱ���
        $("#"+field_b+"span").html(textValue);
        $("#"+field_b).attr('viewtype','1');
        //�����ֶ�id
        fieldIds = btzd + "," + field_b ;
        $("input[name='needcheck']").val(fieldIds);
    }else{
        //ȡ������
        $("#"+field_b+"span").html("");
    }
});





