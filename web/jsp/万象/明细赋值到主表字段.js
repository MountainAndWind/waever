var aField="field9853"//a 选择框字段
var bField="field9856"//b 选择框字段  field12122
var aMain="field9864"// a 触发到主表上的字段
var bMain="field9863"// b 触发到主表上的字段
var ACondition="1,2";//设置a 触发字段的值
var bCondition="1,3";//设置b 触发字段的值

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
                console.log("A 触发")
                $("#"+aMain).val(aFieldVal)
            }
        }

        for(var i=0;i<condsB.length;i++) {
            console.log(" B "+condsB[i])
            if(condsB[i]==bFieldVal){
                console.log("b 触发")
                $("#"+bMain).val(bFieldVal)
            }
        }
    }
})