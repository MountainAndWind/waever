var aField="field9853"//a ѡ����ֶ�
var bField="field9856"//b ѡ����ֶ�  field12122
var aMain="field9864"// a �����������ϵ��ֶ�
var bMain="field9863"// b �����������ϵ��ֶ�
var ACondition="1,2";//����a �����ֶε�ֵ
var bCondition="1,3";//����b �����ֶε�ֵ

$(document).click(function () {
    console.log("click")

    var num = WfForm.getDetailAllRowIndexStr("detail_1")
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        var aFieldVal = $("#"+aField+"_"+i).val();
        var bFieldVal = $("#"+bField+"_"+i).val();
        console.log("aFieldVal::"+aFieldVal)
        console.log("bFieldVal::"+bFieldVal)
        var condsA =  ACondition.split(",");
        var condsB = bCondition.split(",");

        for(var i=0;i<condsA.length;i++) {
            console.log(" A "+condsA[i])
            if(condsA[i]==aFieldVal){
                console.log("A ����")
                $("#"+aMain).val(aFieldVal)
            }
        }

        for(var i=0;i<condsB.length;i++) {
            console.log(" B "+condsB[i])
            if(condsB[i]==bFieldVal){
                console.log("b ����")
                $("#"+bMain).val(bFieldVal)
            }
        }
    }
})