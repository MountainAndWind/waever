<script type="text/javascript">
var ybxed="field12416"//原报销额度
var type="field12417"//申请类型
$(document).ready(function(){
    var val = $("#"+ybxed).val())
    console.log("val::"+val);
    setTypeP(val);
    $(ybxed).bindPropertyChange(function (e) {
        console.log("bind")
        console.log("e.id::"+e.id)
        var val = $("#"+ybxed).val());
        console.log("bindval::"+val);
        setTypeP(val);
    });
})

function setType(val) {
    if(""==val){
        $("#"+type).val(0);//首次
    }else{
        $("#"+type).val(1);//变更
    }
}
</script>