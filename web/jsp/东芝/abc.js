<script>

/**
 * 此处id的值都需要在前加上#
 * */
var farAndCloseField="#field15348"
var placeField="#field15354"
var morningField="#field9450"
var midField="#field9451"
var eveField="#field9452"
var dayField="#field9336"
var mainCctype="#field7341";
var qtField="#field9446";
var startTimeField="#field9447"
var endTimeField="#field9448"

$(document).bind('click',function(){
    console.log("进入点击事件")
    var index=0;
    var mx=$("#indexnum6");
    if(mx){
        index=mx.val();
    }
    for(var i=0;i<index;i++){
        var farAndCloseFieldValue = $(farAndCloseField+"_"+i).val();
        if("0"==farAndCloseFieldValue){
            closeFunction(i)
        }
        if("1"==farAndCloseFieldValue){
            farFunction(i)
        }
    }
});

/**
 * JS 判断 1、当字段明细表字段近距离/远距离= 0 //近距离
 当字段“地点”=0,1,2,3,4, 赋值 早津贴 15 中津贴 15   晚津贴 15   日津贴 45
 else 赋值 早津贴 10 中津贴 10   晚津贴 10   日津贴 30
 */
function closeFunction(colIndex) {
    console.log("进入近距离事件")
    var placeValue = $(placeField+"_"+colIndex).val();
    if(placeValue!=""&&placeValue==0||placeValue==1||placeValue==2||placeValue==3||placeValue==4){
        $(morningField+"_"+colIndex).val("15")
        $(midField+"_"+colIndex).val("15")
        $(eveField+"_"+colIndex).val("15")
        $(dayField+"_"+colIndex).val("45")
    }else{
        $(morningField+"_"+colIndex).val("10")
        $(midField+"_"+colIndex).val("10")
        $(eveField+"_"+colIndex).val("10")
        $(dayField+"_"+colIndex).val("30")
    }
}

/**
 * 2、当字段明细表字段近距离/远距离 = 1 //远距离
 */
function farFunction(colIndex) {
    console.log("进入远距离事件")
    var mainCctypeVal = $(mainCctype).val();
    var startTime = $(startTimeField+"_"+colIndex).val();
    var endTime = $(endTimeField+"_"+colIndex).val();
    var qtFieldValue = $(qtField+"_"+colIndex).val();
    /*if(startTime>endTime){
        window.top.Dialog.alert("开始日期不能大于结束时间,请重新填写！");
        return;
    }*/
    if(mainCctypeVal==0){//主表字段出差类型= 0
        valJinTie(qtFieldValue,startTime,endTime,colIndex,80,40);
    }else if(mainCctypeVal==1){//主表字段出差类型= 1
        valJinTie(qtFieldValue,startTime,endTime,colIndex,55,40);
    }else if(mainCctypeVal==2){//主表字段出差类型= 2
        valJinTie(qtFieldValue,startTime,endTime,colIndex,280,140);
    }else if(mainCctypeVal==3){//主表字段出差类型= 3
        valJinTie(qtFieldValue,startTime,endTime,colIndex,210,105);
    }
}



/**
 * 给津贴赋值
 * @param qtFieldValue
 * @param startTime
 * @param endTime
 * @param colIndex
 * @param dayValue
 * @param halfValue
 */
function valJinTie(qtFieldValue,startTime,endTime,colIndex,dayValue,halfValue) {
    //var comPareTime = "1200";
    if("0"==qtFieldValue){
        swapVal(colIndex);
        $(dayField+"_"+colIndex).val(dayValue)
    }else if("1"==qtFieldValue){
        /*if(endTime>comPareTime){
            window.top.Dialog.alert("开始时间、结束时间不允许大于12:00,请重新填写！");
            return;
        }*/
        swapVal(colIndex);
        $(dayField+"_"+colIndex).val(halfValue)
    }else if("2"==qtFieldValue){
        /*if(startTime<comPareTime){
            window.top.Dialog.alert("开始时间不允许小于12:00,请重新填写！");
            return;
        }*/
        swapVal(colIndex);
        $(dayField+"_"+colIndex).val(halfValue)
    }
}

/**
 * 清除原理的赋值
 * @param colIndex
 */
function  swapVal(colIndex){
    $(morningField+"_"+colIndex).val("");
    $(midField+"_"+colIndex).val("");
    $(eveField+"_"+colIndex).val("");
    $(dayField+"_"+colIndex).val("");
}

</script>