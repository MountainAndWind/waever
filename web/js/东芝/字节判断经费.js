var fieldA ="requestname"//����
var fieldB="";//���̱��
var fieldC="";//֧������
jQuery(document).ready(function(){
    console.log("checkCustomizecheckCustomize::!!")
    checkCustomize = function (){
        var requestName = $("#"+fieldA).val();
        var fieldBVal = $("#"+fieldB).val();
        console.log("���⣺��"+fieldA);
        console.log("���̱�ţ���"+fieldB);
        var num = WfForm.getDetailAllRowIndexStr("detail_1")
        num = num.split(",")
        for (var i = 0; i < num.length; i++) {
            var fieldCVal = $("#"+fieldC+"_"+num[i]).val();
            var totalStr = requestName+fieldBVal+fieldCVal
            console.log("֧������::"+fieldCVal);
            console.log("�ϼ�str::"+totalStr);
            isOverByte(totalStr,++i);
        }
        return true;
    }
})

/*�ж��Ƿ񳬹�ָ���ֽ���*/
function isOverByte(value,index) {
    console.log("isOverByte::�жϵ�ǰ�У�"+index);
    var valueArr = value.split("");
    var count=0;
    for (var i = 0; i < valueArr.length; i++) {
        count+= Number(returnZjNumber(valueArr[i]));
    }
    console.log("count::"+count)
    if(count>150){
        window.top.Dialog.alert("����+���+��ϸ��1��"+index+"�����ݹ������޸ģ�����");
        return false;
    }

}

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