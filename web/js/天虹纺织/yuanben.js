<script type="text/javascript">
/**
 * 1.控制C类物料判断 必须大于0
 **/
var sapFieid="field17393"//sap物流号



function isNull(val) {
    if(""==val||val==null||val==undefined){
        return true;
    }else{
        return false;
    }
}


/**
 * 设置只读
 */
function canBt(col,num,index) {
    console.log("canBt::start")
    console.log("td[_fieldid='17393'_\"+num[index]+\"]"+"td[_fieldid='17393_"+num[index]+"']")
    $("td[_fieldid='17393_"+num[index]+"']").attr("style","pointer-events:none;")
}


jQuery(document).ready(function(){

    var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        var value = $("#"+sapFieid+"_"+num[i]).val();
        console.log("sapFieidVal：："+value)
        if(!isNull(value)){//dayAllowanceIDs
            canBt(sapFieid,num,i);
        }
    }

    checkCustomize=function  () {

        var pd="field17952";//C类判断
        var wl="field17393";//C类物料


        var ts1="";
        var ts2="";

        var flag=0;

        var idvalues = document.getElementById('submitdtlid0').value; //明细表具体行id
        idvalues = idvalues.split(",")
        for (var i = 0; i < idvalues.length; i++) {
            var j=i+1;
            var e1=$("#"+pd+"_"+idvalues[i]).val();
            var wlcd=$("#"+wl+"_"+idvalues[i]).val().length;
            console.log("wlcd="+wlcd);
            // if(wlcd!=0){
            if(wlcd!=18){
                if(ts1.length==0){
                    ts1=j+"";
                }else{
                    ts1=ts1+","+j;
                }
            }
            if(e1<=0){
                if(ts2.length==0){
                    ts2=j+"";
                }else{
                    ts2=ts2+","+j;
                }
            }
            //}
        }
        if(ts1.length>0){
            window.top.Dialog.alert("第"+ts1+"行  SAP物料号格式错误！请重新输入");
            return false;
        }
        if(ts2.length>0){
            window.top.Dialog.alert("第"+ts2+"行 SAP物料号只能选C类，请重新选择！");
            return false;
        }


        return true;
    }

});
</script>
<script type="text/javascript">
    jQuery(document).ready(function(){
        var bottonId="zksq";//按钮ID

        var jsv=0; //计数
        var js=parseFloat(jsv);


        $("#"+bottonId).live("click",function(){ //为按钮设置点击事件
            if(js%2==0){
                cus_ControlDetailColumnByClass("_detailcolumn", 1);
            }else{
                cus_ControlDetailColumnByClass("_detailcolumn", 2);
            }
            js=js+1;
        });


        jQuery("input[name=indexnum0]").bindPropertyChange(dynEvent);

        function dynEvent(){
            cus_ControlDetailColumnByClass("_detailcolumn", 2);
        }

        dynEvent();//页面加载联动


    });
</script>











