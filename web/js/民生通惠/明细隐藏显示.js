// document.getElementById(col+"_"+num[index]+"browser").removeAttribute("disabled")
/**
 * �������ֶ��ǡ����漰Ͷ����Ϊ=����ϸ��2,3,4����
 * �������ֶ��ǡ����漰Ͷ����Ϊ=�ǡ������������ֶΡ����=�Ǳ�/���/ծȯ����2��3��4����ϸ��3���أ���ϸ��2 4 ������
 * �������ֶ��ǡ����漰Ͷ����Ϊ=�ǡ������������ֶΡ����=����/�ع�����1��7����ϸ��2 4 ���أ���ϸ��3������
 * @type {string}
 */
var isTz="field16911"//���漰Ͷ����Ϊ ��0 ��  1
var bd="field9864"//



WfForm.bindFieldChangeEvent(isTz+","+bd, function(obj,id,value){
    console.log("WfForm.bindFieldChangeEvent--",obj,id,value);
    var isVal = $("#"+isTz).val();
    var bdVal = $("#"+bd).val();
    console.log("isVal::"+isVal)
    console.log("bdVal::"+bdVal)

    if("1"==isVal){//��ϸ��2,3,4����
        hideTable(2)
        hideTable(3)
        hideTable(4)
    }else{

    }
});

function hideTable(index) {
    //$(".mainTd_40_0 ").parent("tr").attr("style");
    var styleVal = $(".mainTd_"+index+"0_0").parent("tr").attr("style");
    if(styleVal.indexOf()){

    }
    styleVal+="   display:none"
    $(".mainTd_"+index+"0_0").parent("tr").attr("style",styleVal);

}

function showTable(index) {
    var styleVal = $(".mainTd_"+index+"0_0").parent("tr").attr("style");
    styleVal =styleVal.split("   ")[0]
    $(".mainTd_"+index+"0_0").parent("tr").attr("style",styleVal);
}