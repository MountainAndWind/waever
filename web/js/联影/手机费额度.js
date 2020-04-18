<script type="text/javascript">

var phone_field=""//手机费字段
var limit_length=""//限定长度
$(document).ready(function(){
    console.log("checkCustomize")
    checkCustomize = function (){
        var val = $("#"+phone_field).val();
        console.log("手机费"+val)
        if(Number(val.length)!=Number(limit_length)){
            top.Dialog.alert("手机费长度超过限制！！！！")
            return false;
        }
        return true;
    }
})
</script>