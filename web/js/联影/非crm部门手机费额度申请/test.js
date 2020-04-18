<script>
var ybxed="field12418"//原报销额度
var type="field12417"//申请类型
var phone_field="field12413"//手机费字段
var limit_length="11"//限定长度
$(document).ready(function(){
    var val = $("#"+ybxed).val();
    $("#field12417_tdwrap").attr("style","pointer-events: none;")
    console.log("val::"+val);
    setType(val);
    $("#"+ybxed).bindPropertyChange(function (e) {
        console.log("bind")
        console.log("e.id::"+e.id)
        var val = $("#"+ybxed).val();
        console.log("bindval::"+val);
        setType(val);
    });

    checkCustomize = function (){
        var val = $("#"+phone_field).val();
        console.log("手机费"+val)
        if(Number(val.length)!=Number(limit_length)){
            top.Dialog.alert("手机号码格式不正确，请修改！")
            return false;
        }
        return true;
    }
})
function setType(val) {
    if(""==val){
        $("#"+type).val(0);//首次
    }else{
        $("#"+type).val(1);//变更
    }
}
</script>



