/*批量请假流程，当选择为授乳假时，请假结束日期不能超过出生日期，当选择为产前假时，请假结束日期不能超过预产期。*/
<script>
var qjType = "#field6606";
var birthDate="#field6608";//出身日期
var qjEndDate="#field6611"//请假结束日期
var ycDate="#field6609"//预产期

jQuery(document).ready(function(){
    console.log("ready::");
    checkCustomize = function (){
        var type = $(qjType).val();
        var endDate = $(qjEndDate).val()
        if(type=="1"){//授乳假
            var birthDateVal = $(birthDate).val();
            var year = Number(birthDateVal.split("-")[0])+1
            var val = year+birthDateVal.substring(4,11)
            if(compareTime(endDate,birthDateVal)&&birthDateVal!=endDate){
                top.Dialog.alert("出生日期不能在结束日期之前！！！")
                return false;
            }
            if(compareTime(val,endDate)){
                top.Dialog.alert("请假结束日期子女未满一周岁！！！")
                return false;
            }
        }else if(type=="0"){//产前假0
            var ycDateVal = $(ycDate).val();
            if(compareTime(ycDateVal,endDate)&&endDate!=ycDateVal){
                top.Dialog.alert("请假结束日期不能超过预产期！！！")
                return false;
            }
        }
        return true;
    }

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
    var thisResult = (Date.parse(endTime) - Date.parse(startTime)) / 3600 / 1000;
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