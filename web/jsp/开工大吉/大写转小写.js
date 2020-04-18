</script>
<script>
jQuery(document).ready(function () {
    var jeFiled = WfForm.convertFieldNameToId("sjzfxx");//小写金额数据库字段名  修改
    var dxjeFiled = WfForm.convertFieldNameToId("sjzfdx");//大写金额数据库字段名 修改
    WfForm.bindFieldChangeEvent(jeFiled, function (obj, id, value) {
        if (value.length > 0) {
            var result = dev_amountTransform(value);
            /*WfForm.changeFieldValue(dxjeFiled, { value: result });*/
            $("#"+field5958span).html(result);
            $("#"+field5958).val(result);
        }
    });
});
/**
 * 小写金额转大写
 */
function dev_amountTransform(amount) {
    var fraction = ["角", "分"];
    var digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
    var unit = [["元", "万", "亿"], ["", "拾", "佰", "仟"]];
    var head = amount < 0 ? "欠" : "";
    amount = Math.abs(amount);
    var result = "";
    for (var i = 0; i < fraction.length; i++) {
        result += (
            digit[Math.floor(amount * 10 * Math.pow(10, i)) % 10] + fraction[i]
        ).replace(/零./, "");
    }
    result = result || "整";
    amount = Math.floor(amount);
    for (var i = 0; i < unit[0].length && amount > 0; i++) {
        var p = "";
        for (var j = 0; j < unit[1].length && amount > 0; j++) {
            p = digit[amount % 10] + unit[1][j] + p;
            amount = Math.floor(amount / 10);
        }
        result =
            p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][i] + result;
    }
    return (
        head +
        result
            .replace(/(零.)*零元/, "元")
            .replace(/(零.)+/g, "零")
            .replace(/^整$/, "零元整")
    );
}
</script>
