<script>
var fieldOne="field13775"//示列 field12314
var fieldTwo="field13717"//示列 field2131
var errorMessage="票据明细中存在已经报销过的发票，请核对后再提交！"//提示信息
$(document).ready(function(){
    checkCustomize = function (){
        var v1=$("#"+fieldOne).val();
        var v2=$("#"+fieldTwo).val();
        alert("fieldOne:"+v1+"fieldTwo:"+v2);
        if(Number(v1)!=Number(v2)){
            top.Dialog.alert(errorMessage)
            return false;
        }
        return true;
    }
})
</script>






