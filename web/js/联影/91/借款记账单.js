<!-- script代码，如果需要引用js文件，请使用与HTML中相同的方式。 -->
<script type="text/javascript">
window.console = window.console || (function () {
    var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile
        = c.clear = c.exception = c.trace = c.assert = function () { };
    return c;
})();
var gs_main_field="field14790";// 公司主表字段
var jdKeyFiekds="field14549,field14550,field14551,field14552,field14553,field14554,field14555,field14556"//九段字段名称
var zhzh="field14791"//账号组合字段
var zhmc="field14792"//账号名称字段

$(document).ready(function(){


    checkCustomize = function () {//
        debugger;
        var num = $("#submitdtlid0").val();
        num = num.split(",")
        console.log("num::"+num)
        for (var i = 0; i < num.length; i++) {
            jdZhFun(num,i);
        }
        return true;
    }
})


/**
 * 九段key val 赋值
 * @param num
 * @param i
 * @param type
 */
function jdZhFun(num,i) {
    console.log("jdZhFun")
    console.log("num::"+num)
    console.log("i::"+i)
    debugger;
    var fieldName = jdKeyFiekds.split(",");
    var val=$("#"+gs_main_field).val();
    //var name=$("#"+gs_main_field+"span a[_key='valspan']").html();//显示名
    var name = val;
    for(var j=0;j<fieldName.length;j++){
        var alength=$("#"+fieldName[j]+"_"+num[i]+"span a").length;
        var namei="";
        if(alength==1){//a.html()
            namei = $("#"+fieldName[j]+"_"+num[i]+"span a").html();
        }else{
            namei = $("#"+fieldName[j]+"_"+num[i]+"span a[_key='valspan']").html();
        }
        var vali = $("#"+fieldName[j]+"_"+num[i]).val();
        if(""==vali){
            vali=0;
        }
        if(namei==null){
            namei="";
        }
        name+="||"+namei;
        val+="."+vali;
        /*赋值*/
        $("#"+zhzh+"_"+num[i]).val(val)
        $("#"+zhmc+"_"+num[i]).val(name)
    }
}
</script>







