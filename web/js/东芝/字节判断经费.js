var fieldA ="requestname"//标题
var fieldB="";//流程编号
var fieldC="";//支付内容
jQuery(document).ready(function(){
    console.log("checkCustomizecheckCustomize::!!")
    checkCustomize = function (){
        var requestName = $("#"+fieldA).val();
        var fieldBVal = $("#"+fieldB).val();
        console.log("标题：："+fieldA);
        console.log("流程编号：："+fieldB);
        var num = WfForm.getDetailAllRowIndexStr("detail_1")
        num = num.split(",")
        for (var i = 0; i < num.length; i++) {
            var fieldCVal = $("#"+fieldC+"_"+num[i]).val();
            var totalStr = requestName+fieldBVal+fieldCVal
            console.log("支付内容::"+fieldCVal);
            console.log("合计str::"+totalStr);
            isOverByte(totalStr,++i);
        }
        return true;
    }
})

/*判断是否超过指定字节数*/
function isOverByte(value,index) {
    console.log("isOverByte::判断当前行："+index);
    var valueArr = value.split("");
    var count=0;
    for (var i = 0; i < valueArr.length; i++) {
        count+= Number(returnZjNumber(valueArr[i]));
    }
    console.log("count::"+count)
    if(count>150){
        window.top.Dialog.alert("标题+编号+明细表1中"+index+"行数据过大，请修改！！！");
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