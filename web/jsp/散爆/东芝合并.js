var fieldA ="requestname"//主表字段
var fieldB="field6355";//明细字段A
var fieldC="field6359";//明细字段B
var bytesnum=""//字节数
jQuery(document).ready(function(){
    console.log("checkCustomizecheckCustomize::!!")
    checkCustomize = function (){
        var count=0;
        var requestName = $("#requestname").val();
        console.log(requestName);
        var vb=$("#"+fieldB).val();
        var vc=$("#"+fieldC).val();
        console.log("vb::"+vb)
        console.log("vc::"+vc)

        var IfDebt=WfForm.getFieldValue("field12329");
        var IfPre = WfForm.getFieldValue("field6335");
        console.log("ifDebt::"+IfDebt)
        console.log("IfPre::"+IfPre)
        if(IfPre==0){
            if(IfDebt==1){
                top.Dialog.alert("存在未清账款！请先完成报销或还款!");
                return false;
            }else
            if(IfDebt==2){
                top.Dialog.alert("存在审批中借款！请等待审批完成!");
                return false;}
        }
        var arrA = requestName.split("");
        for (var i = 0; i < arrA.length; i++) {
            count=count+Number(returnZjNumber(arrA[i]));
        }
        var arrB = vb.split("");
        for (var i = 0; i < arrB.length; i++) {
            count=count+Number(returnZjNumber(strB[i]));
        }
        var arrC = vc.split("");
        for (var i = 0; i < arrC.length; i++) {
            count=count+Number(returnZjNumber(arrC[i]));
        }
        console.log("总字节数：："+count)
        if(count>238){
            window.top.Dialog.alert("字节数超过限制！！！");
            return false;
        }else {
            return true;
        }

    }


})




function returnZjNumber(str) {
    var pattern = new RegExp("[\u4E00-\u9FA5]+");
    var pattern3 = new RegExp("[0-9]+");
    var pattern2 = new RegExp("[A-Za-z]+");
    if(pattern.test(str)){
        return 3
    }else{
        return 1
    }
}



