<script language="javascript">

var bField="field8762";//人均费用
var NUM=80;//?招待标准

jQuery(document).ready(function(){
    checkCustomize=function(){
        var num= WfForm.getDetailAllRowIndexStr("detail_1");//获取明细行所有行标示
        num=num.split(",");
        for(var i=0;i<num.length;i++){
            var index=Number(i)+1
            var bFieldVal=$("#"+bField+"_"+num[i]).val()*1.0;
            if(bFieldVal>NUM){
                top.Dialog.alert("明细第"+index+"行！！！")
                return false;
            }
        }
        return true;
    };
});
</script>