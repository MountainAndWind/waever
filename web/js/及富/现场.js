<script type="text/javascript">

var type = "field12323";  //电脑形式
//页面加载事件
jQuery(document).ready(function(){

    jQuery("#"+type).bind('change',function(){
        trDisplay();
    });


    trDisplay();

    function trDisplay(){
        var type_v = jQuery("#"+type).val()*1.0;


        if(type_v == '4'){//
            cus_HideAreaByName("_detailarea");
        }else if(type_v == '2'|| type_v == '3'){
            cus_ShowAreaByName("_detailarea");
        }

    }
});
</script>
<script>
/**
 *当主表的“电脑类型”字段，选择“不需要”时，隐藏明细表
 当主表的“电脑类型”字段，选择其他两项时，明细表的“资产名称”字段必填
 完成事宜，必须至少选择一项
 */
jQuery(document).ready(function(){
    console.log("checkCustomizecheckCustomize!!")
    checkCustomize = function (){
        var class1 = $("span[_fieldid='16086']").find("span").find("span").attr("class")
        var class2 = $("span[_fieldid='16087']").find("span").find("span").attr("class")
        var class3 = $("span[_fieldid='16099']").find("span").find("span").attr("class")
        var class4 = $("span[_fieldid='16100']").find("span").find("span").attr("class")
        var class5 = $("span[_fieldid='16101']").find("span").find("span").attr("class")
        if(class1.indexOf(" ")==-1&&class2.indexOf(" ")==-1&&class3.indexOf(" ")==-1&&class4.indexOf(" ")==-1&&class5.indexOf(" ")==-1){
            window.top.Dialog.alert("完成事宜，必须至少选择一项！");
            return false;
        }
        var rows = document.getElementById('nodesnum0').value; //明细表行数
        var idvalues = document.getElementById('submitdtlid0').value; //明细表具体行id

        var k = 0;
        var data = new Array();

        for (k; k < rows; k++) { //拆分明细表id
            var index = idvalues.indexOf(",");
            if (index > 0)
                data[k] = idvalues.substring(0, index);
            idvalues = idvalues.substring(index + 1);
        }
        data[k - 1] = idvalues;


        for (var i = 0; i < rows; i++) {

            var xh=$("#"+num+"_"+i).val().length*1.0;

            if(lx==2||lx==3){
                if(xh==0){
                    window.top.Dialog.alert("资产名称必填！");
                    return false;
                }
            }
        }


        return true;
    }

});
</script>









