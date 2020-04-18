
/*
应用场景：
针对报销明细数据，客户可能存在多币种、或者多种报销类型，在流程提交时需要分类计算总额。
此DEMO做了三种类别的计算。
参数设置较多，请耐心查看。
 */
var detileTabId = "#submitdtlid0"; //明细表ID -- #submitdtlid(0,1,2..)

// typeValue1...需要统计的明细表【币种】或【报销金额】字段的下拉框值，需要注意，值从0开始，需要统计几个，则新建几个
//此处数量为3个，如新增更多，在toToal()函数中也要做相应的改动
var typeValue1 = 0;
var typeValue2 = 1;
var typeValue3 = 2;
var total1 = "#field7343"; //主表-【币种】或【报销类别】1总额 ID
var total2 = "#field7344";  //主表-【币种】或【报销类别】2总额 ID
var total3 = "#field7345"; //主表-【币种】或【报销类别】3总额 ID
var dtType = "#field7342"; //明细行【币种】或【报销类别】字段ID
var dtValue = "#field7338"; //明细行【金额】或者【数量】字段ID

//为防止明细行添加过快，添加以下参数
var addBtnName = 'addbutton0'; //添加明细行的按钮ID -- addbutton(0,1,2...)
var detileAddId = 0 ; //明细表序号，与detileTabId、addBtnName最后一位相同（第一个明细表为0，依此叠加）
var intTime = 1000; //控制明细行添加的间隔时间，单位：毫秒。建议1000

$(document).ready(function(){
    var dtIdLength = 0;
    var oldDtIdLength = 0;
    /*
    当明细行数量增加时，为增加的明细行添加函数；当明细行数量减少时，重新计算总额
     */
    $(detileTabId).bindPropertyChange(function () {
        dtIdLength = jQuery(detileTabId).val().split(",").length;
        if (oldDtIdLength < dtIdLength){
            var rowNum = $(detileTabId).val().charAt($(detileTabId).val().length-1);
            $(dtType + "_" + rowNum + "," + dtValue + "_" + rowNum).bindPropertyChange(function () {
                toTotal(detileTabId , dtType , dtValue);
            });
            oldDtIdLength = dtIdLength;
        }
        if(oldDtIdLength > dtIdLength){
            toTotal(detileTabId , dtType , dtValue);
            oldDtIdLength = dtIdLength;
        }
    });
});

/*
 分类计算各币种总额
 如有多种类别，新建t4...新建变量 if(cls == typeValue4...)...依此类推
*/
function toTotal (detileTabId,dtType,dtValue) {
    var t1 = 0;
    var t2 = 0;
    var t3 = 0;
    var dtIds = $(detileTabId).val().split(",");
    for (var a = 0 ; a < dtIds.length ; a++) {
        var price = $(dtValue + "_" + dtIds[a]).val();
        var cls = $(dtType + "_" + dtIds[a]).val();
        //金额或类别为空时不相加
        if (price == null || price == undefined || price == '') {
            continue;
        }
        if (cls == null || cls == undefined || cls == '') {
            continue;
        };
        if (cls == typeValue1) {
            t1 = t1 + parseFloat($(dtValue + "_" + dtIds[a]).val());
            continue;
        }
        if (cls == typeValue2) {
            t2 = t2 + parseFloat($(dtValue + "_" + dtIds[a]).val());
            continue;
        }
        if (cls == typeValue3) {
            t3 = t3 + parseFloat($(dtValue + "_" + dtIds[a]).val());
            continue;
        }
    }
    $(total1).val(t1);
    $(total2).val(t2);
    $(total3).val(t3);
}
/*
 * 添加弹框前事件，防止添加明细行的速度过快
 */
var regBorwserEvent = function() {
    var time1 = new Date();
    var addDtBtnId = document.getElementsByName(addBtnName)[detileAddId].id;
    var oldClickEvent = document.getElementById(addDtBtnId).onclick;
    document.getElementById(addDtBtnId).onclick = function(event) {
        var time2 = new Date();
        if (time2.getTime()-time1.getTime() < intTime) {
            time1 = time2;
            return ;
            alert('操作太快啦！');
        } else {
            time1 = time2;
            oldClickEvent(event);
        }
    };
};
regBorwserEvent();

