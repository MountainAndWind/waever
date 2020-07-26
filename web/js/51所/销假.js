<script>
jQuery(document).ready(function(){
    console.log("ready")
    window.checkCustomize =()=>{
        debugger;
        alert("dasd")
        var xtxs = Number(WfForm.getFieldValue("field6019_0"))//销假时长
        alert(xtxs );
        if(xtxs <1){
            alert("当前销假不满1小时，请核对后再提交！");
            return false;
        }
        if (xtxs % 0.5 != 0) {
            alert("当前请假时长不满足半小时规则，请核对后再提交！");
            return false;
        }
        return true;
    }
});
</script>