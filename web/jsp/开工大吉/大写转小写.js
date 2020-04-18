</script>
<script>
jQuery(document).ready(function () {
    var jeFiled = WfForm.convertFieldNameToId("sjzfxx");//Сд������ݿ��ֶ���  �޸�
    var dxjeFiled = WfForm.convertFieldNameToId("sjzfdx");//��д������ݿ��ֶ��� �޸�
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
 * Сд���ת��д
 */
function dev_amountTransform(amount) {
    var fraction = ["��", "��"];
    var digit = ["��", "Ҽ", "��", "��", "��", "��", "½", "��", "��", "��"];
    var unit = [["Ԫ", "��", "��"], ["", "ʰ", "��", "Ǫ"]];
    var head = amount < 0 ? "Ƿ" : "";
    amount = Math.abs(amount);
    var result = "";
    for (var i = 0; i < fraction.length; i++) {
        result += (
            digit[Math.floor(amount * 10 * Math.pow(10, i)) % 10] + fraction[i]
        ).replace(/��./, "");
    }
    result = result || "��";
    amount = Math.floor(amount);
    for (var i = 0; i < unit[0].length && amount > 0; i++) {
        var p = "";
        for (var j = 0; j < unit[1].length && amount > 0; j++) {
            p = digit[amount % 10] + unit[1][j] + p;
            amount = Math.floor(amount / 10);
        }
        result =
            p.replace(/(��.)*��$/, "").replace(/^$/, "��") + unit[0][i] + result;
    }
    return (
        head +
        result
            .replace(/(��.)*��Ԫ/, "Ԫ")
            .replace(/(��.)+/g, "��")
            .replace(/^��$/, "��Ԫ��")
    );
}
</script>
