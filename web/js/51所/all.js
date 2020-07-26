<script>
var qjType = "field6606";
var birthDate="field6608";//出身日期
var qjEndDate="field6611"//请假结束日期
var ycDate="field6609"//预产期

jQuery(document).ready(function(){
    console.log("ready::");
    WfForm.registerCheckEvent(WfForm.OPER_SUBMIT, function(callback){
        var type = WfForm.getFieldValue(qjType);
        var endDate = WfForm.getFieldValue(qjEndDate);
        /*var type = $(qjType).val();
        var endDate = $(qjEndDate).val()*/
        if(type=="1"){//授乳假
            var birthDateVal = WfForm.getFieldValue(birthDate);
            //var birthDateVal = jQuery(birthDate).val();
            var year = Number(birthDateVal.split("-")[0])+1
            var val = year+birthDateVal.substring(4,11)
            if(compareTime(endDate,birthDateVal)&&birthDateVal!=endDate){
                alert("出生日期不能在结束日期之前！！！")
                return ;
            }
            if(compareTime(val,endDate)){
                alert("请假结束日期子女未满一周岁！！！")
                return ;
            }
        }else if(type=="0"){//产前假0
            var ycDateVal = WfForm.getFieldValue(ycDate);
            //var ycDateVal = $(ycDate).val();
            if(compareTime(ycDateVal,endDate)&&endDate!=ycDateVal){
                alert("请假结束日期不能超过预产期！！！")
                return ;
            }
        }
        callback();
    })
});

/**
 * 比较两个时间（yyyy-MM-dd HH:mm:ss）
 * @param startTime
 * @param endTime
 * @returns {string}
 */
function compareTime(startTime,endTime) {
    var startTimes = startTime.substring(0, 10).split('-');
    var endTimes = endTime.substring(0, 10).split('-');
    startTime = startTimes[1] + '-' + startTimes[2] + '-' + startTimes[0] + ' ' + startTime.substring(10, 19);
    endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19);
    var thisResult = (Date.parse(endTime.replace(/-/g, '/')) - Date.parse(startTime.replace(/-/g, '/'))) / 3600 / 1000;
    //alert("thisResult::"+thisResult)
    if (thisResult < 0) {
        return false;
    } else if (thisResult > 0) {
        return true
    } else if (thisResult == 0) {
        return true
    } else {
        return false;
    }
}
</script>

<head>

<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />
    </head>
    <script type="text/javascript">
window.cardCollapse = function() {
    $('tr.wea-zd-start').click(function() {
        var $start = $(this);
        var $end = $start.next();
        while ($end.attr('class') != 'wea-zd-end') {
            $end.toggle();
            $end = $end.next();
        }
    })
}
/*
*  TODO
 *  请在此处编写javascript代码
 */

$(document).ready(function(){
    $(".Inputstyle").css('width','100%');
    cardCollapse();
});

window.onload = function(){
        $(".Inputstyle").css('width','100%');
    }

    </script>

    <style>

    body{
    background:#f3f3f3
}

.Inputstyle{
    border:none;
    text-align:right !important;


}
.excelMainTable textarea{
    width:100%;
}

input.InputStyle, input.Inputstyle, input.inputStyle, input.inputstyle,.excelMainTable input[type="text"],.excelMainTable input[type="password"], .e8_innerShowContent,.excelMainTable textarea, .sbHolder{

    border:none;
    width: 100%!important;


}

input.InputStyle, input.Inputstyle, input.inputStyle, input.inputstyle, .excelMainTable input[type="text"], .excelMainTable input[type="password"], .e8_innerShowContent, .excelMainTable textarea, .sbHolder{
    text-align: left !important;

}
.excelMainTable{
    width: 100% !important;
}
.form_out_content{
    margin: 0px !important;
}


/*圆角样式*/

td{
    padding:0px;
}
.ysyj{
    height:100%;
    width:100%;
    background:#ffffff!important;
    border: 1px solid #ffffff!important;
    border-top-right-radius:9px;
}
.zxyj{
    height:100%;
    width:100%;
    background:#ffffff!important;
    border: 1px solid #ffffff!important;
    border-bottom-left-radius:9px;
}
.yxyj{
    height:100%;
    width:100%;
    background:#ffffff!important;
    border: 1px solid #ffffff!important;
    border-bottom-right-radius:9px;
}
.zsyj{
    height:100%;
    width:100%;
    background:#ffffff!important;
    border: 1px solid #ffffff!important;
    border-top-left-radius:9px;
}


</style>

