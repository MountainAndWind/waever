<script language="javascript">
var aField = "field5947"//a 选择框字段
var aMain = "field5922"// a 触发到主表上的字段

$(document).click(function () {
    console.log("click")
    var strMainVal = "";
    var num = WfForm.getDetailAllRowIndexStr("detail_1")
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        var aFieldVal = $("div[data-fieldmark=" + aField + "_" + num[i] + "]").find("a").html()
        console.log("aFieldVal::" + aFieldVal)
        if (aFieldVal != undefined) {
            //var aFieldVal = $("#"+aField+"_"+i).val();
            if (i == 0) {
                strMainVal = aFieldVal
            } else {
                if ("" != aFieldVal) {
                    if ("0" == quchong(strMainVal, aFieldVal)) {
                        strMainVal = strMainVal + "," + aFieldVal
                    }
                }
            }
        }
    }
    console.log("strMainVal::" + strMainVal)
    if (strMainVal.startsWith(",")) {
        strMainVal = strMainVal.substring(1, strMainVal.length)
    }
    $("#" + aMain).val(strMainVal);
})

function quchong(str, val) {
    if (str.indexOf(val) != -1) {
        return "1"
    }
    return "0"
}

</script>


