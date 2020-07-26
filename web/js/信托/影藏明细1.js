<script>
var yincangZd="#field9184";//影藏字段 写法  #field1231,#field1231,#field1231
var detileTabId = "#submitdtlid0";//明细2：submitdtlid1   明细1：submitdtlid0
var dtIdLength = 0;
var oldDtIdLength = 0;

jQuery(document).ready(function(){
    var num = $(detileTabId).val();
    num = num.split(",")
    var zds= yincangZd.split(",")
    for (var j = 0; j < num.length; j++) {
        for (var i = 0; i < zds.length; i++) {
            yingCang(zds[i]);
        }
    }
    /*
当明细行数量增加时，为增加的明细行添加函数；当明细行数量减少时，重新计算总额
 */
    $(detileTabId).bindPropertyChange(function () {
        console.log("bindPropertyChange")
        /*dtIdLength = jQuery(detileTabId).val().split(",").length;
        if (oldDtIdLength <= dtIdLength) {
            var num = $(detileTabId).val();
            num = num.split(",")
            var zds= yincangZd.split(",")
            for (var j = num.length-1; j >=0; j--) {
                for (var i = 0; i < zds.length; i++) {
                    yingCang(num[j],zds[i]);
                }
            }
            oldDtIdLength = dtIdLength;
        }
        if (oldDtIdLength > dtIdLength) {
            oldDtIdLength = dtIdLength;
        }*/
        var zds= yincangZd.split(",")
        for (var j = num.length-1; j >=0; j--) {
            for (var i = 0; i < zds.length; i++) {
                yingCang(zds[i]);
            }
        }
    });
})

function yingCang(col) {
    console.log("yingCang")
    var colIndex=col.split("field")[1];
    $("table[name='detailFieldTable"+colIndex+"']").parent("td").attr("style","display:none")
}
</script>