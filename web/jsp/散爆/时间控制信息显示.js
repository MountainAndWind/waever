jQuery(document).ready(function(){
    console.log("checkCustomizecheckCustomize::!!")
    checkCustomize = function (){
        var IfDebt=WfForm.getFieldValue("field12329");
        var IfPre = WfForm.getFieldValue("field6335");
        if(IfPre==0){
            if(IfDebt==1){
                top.Dialog.alert("����δ���˿������ɱ����򻹿�!");
                return false;
            }else
            if(IfDebt==2){
                top.Dialog.alert("���������н���ȴ��������!");
                return false;
            }}
        return true;
    }


})








