<script>
window.console = window.console || (function () {
    var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile
        = c.clear = c.exception = c.trace = c.assert = function () { };
    return c;
})();
/**
 *
 * 1、当字段明细表字段近距离/远距离= 0 //近距离（明细触发）
 * 2、当字段“地点”=0,1,2,3,4,5 赋值 早津贴 15 中津贴 15   晚津贴 15   日津贴 45（明细）
 * 3、主表字段出差类型（主表）
 *         全天判定（明细）
 *
 * 此处id的值都需要在前加上#
 * */

var farAndCloseField="#field15348"
var placeField="#field15354"
var morningField="#field9450"
var midField="#field9451"
var eveField="#field9452"
var dayField="#field9449"
var mainCctype="#field7341";//出差类别
var qtField="#field9446";//全天
var startTimeField="#field9447"
var endTimeField="#field9448"
var detailChangeFields="field15348,field15354,field9446,field9447,field9448";//明细change触发字段配置


/**
 * 获取不带前缀#的field
 */
function getField(val) {
    return val.substring(1,val.length)
}

$(document).ready(function() {

    console.log("页面初始化")
    var num = $("#submitdtlid6").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        var rowNum = num[i];
        if(rowNum!=""){
            var farAndCloseFieldValue = $(farAndCloseField+"_"+rowNum).val();
            if("0"==farAndCloseFieldValue){
                closeFunction(rowNum)
            }
            if("1"==farAndCloseFieldValue){
                farFunction(rowNum)
            }
        }
    }
    /**
     *主表字段出差类型change触发，明细都要修改
     */
    WfForm.bindFieldChangeEvent(getField(mainCctype), function(obj,id,value) {
        debugger;
        console.log("mainCctypeChange")
        var num = $("#submitdtlid6").val();
        num = num.split(",")
        for (var i = 0; i < num.length; i++) {
            var rowNum = num[i];
            //只改变远距离事件
            var farAndCloseFieldValue = $(farAndCloseField + "_" + rowNum).val();
            if ("1" == farAndCloseFieldValue) {
                farFunction(rowNum)
            }
        }
    });


    /**
     * 明细修改触发
     * 近距离触发条件：placeField，qtField，startTimeField，endTimeField  （field15354,field9446,field9447,field9448）
     * 远距离触发条件：mainCctype，startTimeField，endTimeField，qtField
     */
    WfForm.bindDetailFieldChangeEvent(detailChangeFields,function(id,rowIndex,value) {
        debugger;
        console.log("bindDetailFieldChangeEvent")
        var farAndCloseFieldValue = $(farAndCloseField+"_"+rowIndex).val();
        if("0"==farAndCloseFieldValue){
            closeFunction(rowIndex)
        }
        if("1"==farAndCloseFieldValue&&id!="field15354"){
            farFunction(rowIndex)
        }
    });

})



/**
 * JS 判断 1、当字段明细表字段近距离/远距离= 0 //近距离
 当字段“地点”=0,1,2,3,4, 赋值 早津贴 15 中津贴 15   晚津贴 15   日津贴 45
 else 赋值 早津贴 10 中津贴 10   晚津贴 10   日津贴 30

 触发条件：placeField，qtField，startTimeField，endTimeField
 */
function closeFunction(colIndex) {
    console.log("进入近距离事件")
    var placeValue = $(placeField+"_"+colIndex).val();
    var qtFieldValue = $(qtField+"_"+colIndex).val();
    var startTimeFieldVal=$(startTimeField+"_"+colIndex).val().replace(":","");
    var endTimeFieldVal=$(endTimeField+"_"+colIndex).val().replace(":","");
    console.log("colIndex:: "+colIndex+" qtFieldValue:"+qtFieldValue+" startTimeFieldVal:"+startTimeFieldVal+" endTimeFieldVal"+endTimeFieldVal)
    if(placeValue!=""&&placeValue==0||placeValue==1||placeValue==2||placeValue==3||placeValue==4){
        if(qtFieldValue==0){//全天
            $(morningField+"_"+colIndex).val("15")
            $(midField+"_"+colIndex).val("15")
            $(eveField+"_"+colIndex).val("15")
            $(dayField+"_"+colIndex).val("45")
        }else{//非全天
            var v1="0";
            var v2="0";
            var v3="0";
            if(startTimeFieldVal<=630&&endTimeFieldVal>630){
                //$(morningField+"_"+colIndex).val("15")
                v1=15;
            }
            if(startTimeFieldVal<1900&&endTimeFieldVal>=1900){
                //$(eveField+"_"+colIndex).val("15")
                v3=15;
            }
            if(startTimeFieldVal<1230&&endTimeFieldVal>1230){
                //$(midField+"_"+colIndex).val("15")
                v2=15;
            }
            $(morningField+"_"+colIndex).val(v1)
            $(midField+"_"+colIndex).val(v2)
            $(eveField+"_"+colIndex).val(v3)
            var total=Number(v1)+Number(v2)+Number(v3);
            $(dayField+"_"+colIndex).val(total)
            /* if(startTimeFieldVal<=630&&endTimeFieldVal>=1900){
                 $(morningField+"_"+colIndex).val("15")
                 $(midField+"_"+colIndex).val("15")
                 $(eveField+"_"+colIndex).val("15")
                 $(dayField+"_"+colIndex).val("45")
             }else if((startTimeFieldVal<=630&&endTimeFieldVal>=1230&&endTimeFieldVal<1900)||(startTimeFieldVal>630&&startTimeFieldVal<=1230&&endTimeFieldVal>=1900)){
                 $(morningField+"_"+colIndex).val("0")
                 $(midField+"_"+colIndex).val("0")
                 $(eveField+"_"+colIndex).val("0")
                 $(dayField+"_"+colIndex).val("30")
             }else if((startTimeFieldVal<=630&&endTimeFieldVal<1230)||(startTimeFieldVal<=1230&&startTimeFieldVal>630&&endTimeFieldVal>=1230&&endTimeFieldVal<1900)||(startTimeFieldVal>1230&&startTimeFieldVal<=1900&&endTimeFieldVal>=1900)){
                 $(morningField+"_"+colIndex).val("0")
                 $(midField+"_"+colIndex).val("0")
                 $(eveField+"_"+colIndex).val("0")
                 $(dayField+"_"+colIndex).val("15")
             }else{
                 $(morningField+"_"+colIndex).val("0")
                 $(midField+"_"+colIndex).val("0")
                 $(eveField+"_"+colIndex).val("0")
                 $(dayField+"_"+colIndex).val("0")
             }*/

        }
    }else{
        if(qtFieldValue==0){//全天
            $(morningField+"_"+colIndex).val("10")
            $(midField+"_"+colIndex).val("10")
            $(eveField+"_"+colIndex).val("10")
            $(dayField+"_"+colIndex).val("30")
        }else{//非全天

            var v1="0";
            var v2="0";
            var v3="0";
            if(startTimeFieldVal<=630&&endTimeFieldVal>630){
                //$(morningField+"_"+colIndex).val("10")
                v1=10;
            }
            if(startTimeFieldVal<1900&&endTimeFieldVal>=1900){
                //$(eveField+"_"+colIndex).val("10")
                v3=10;
            }
            if(startTimeFieldVal<1230&&endTimeFieldVal>1230){
                //$(midField+"_"+colIndex).val("10")
                v2=10;
            }
            $(morningField+"_"+colIndex).val(v1)
            $(midField+"_"+colIndex).val(v2)
            $(eveField+"_"+colIndex).val(v3)
            var total=Number(v1)+Number(v2)+Number(v3);
            $(dayField+"_"+colIndex).val(total)

            /*if(startTimeFieldVal<=630&&endTimeFieldVal>=1900){
                $(morningField+"_"+colIndex).val("0")
                $(midField+"_"+colIndex).val("0")
                $(eveField+"_"+colIndex).val("0")
                $(dayField+"_"+colIndex).val("30")
            }else if((startTimeFieldVal<=630&&endTimeFieldVal>=1230&&endTimeFieldVal<1900)||(startTimeFieldVal>630&&startTimeFieldVal<=1230&&endTimeFieldVal>=1900)){
                $(morningField+"_"+colIndex).val("0")
                $(midField+"_"+colIndex).val("0")
                $(eveField+"_"+colIndex).val("0")
                $(dayField+"_"+colIndex).val("20")
            }else if((startTimeFieldVal<=630&&endTimeFieldVal<1230)||(startTimeFieldVal<=1230&&startTimeFieldVal>630&&endTimeFieldVal>=1230&&endTimeFieldVal<1900)||(startTimeFieldVal>1230&&startTimeFieldVal<=1900&&endTimeFieldVal>=1900)){
                $(morningField+"_"+colIndex).val("0")
                $(midField+"_"+colIndex).val("0")
                $(eveField+"_"+colIndex).val("0")
                $(dayField+"_"+colIndex).val("10")
            }else{
                $(morningField+"_"+colIndex).val("0")
                $(midField+"_"+colIndex).val("0")
                $(eveField+"_"+colIndex).val("0")
                $(dayField+"_"+colIndex).val("0")
            }*/
        }
    }
}

/**
 * 2、当字段明细表字段近距离/远距离 = 1 //远距离
 * mainCctype，startTimeField，endTimeField，qtField
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

/**
 * 此方法针对明细字段id
 * 通过filed获取当前列
 * @param field
 * @constructor
 */
function GetIndexByField(field) {
    if(""!=field&&field!=null){
        index = field.split("detail")[1]
        return index;
    }
    return -1;
}

</script>


