jQuery(document).ready(function(){
    console.log("checkCustomizecheckCustomize::!!")
    checkCustomize = function (){
        var IfDebt=WfForm.getFieldValue("field12329");
        var IfPre = WfForm.getFieldValue("field6335");
        if(IfPre==0){
            if(IfDebt==1){
                top.Dialog.alert("存在未清账款！请先完成报销或还款!");
                return false;
            }else
            if(IfDebt==2){
                top.Dialog.alert("存在审批中借款！请等待审批完成!");
                return false;
            }}
        return true;
    }


})








