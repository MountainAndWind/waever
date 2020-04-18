<script language="javascript">

var dru = "field6730";
var fre = "field6731";
var bl = "field6728";
var bn1="field6520";
var bn2="field6701"
var bn3="field6702"
var bn4="field6703"
jQuery(document).ready(function(){
    listen()
});
$(document).click(function () {
    listen();
})

$("#"+bn1).change(function () {
    listen();
})
$("#"+bn2).change(function () {
    listen();
})
$("#"+bn3).change(function () {
    listen();
})
$("#"+bn4).change(function () {
    listen();
})
function listen() {
    console.log("进入绑定事件listen")
    var index=0;
    var mx=$("#indexnum0");
    if(mx){
        index=mx.val();
    }
    console.log(mx)
    for(var i=0;i<index;i++) {
        var druVal = $("#"+dru+"_"+i).val()
        var freVal = $("#"+fre+"_"+i).val()
        console.log("druVal::"+druVal+"  freVal"+freVal)
        console.log(druVal==""&&freVal=="")
        if(druVal==""&&freVal==""){
        }else{
            var blVal = druVal+"/"+freVal;
            $("#"+bl+"_"+i).val(blVal)
        }
    }
}
</script>