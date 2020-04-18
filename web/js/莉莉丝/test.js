<script>
jQuery(document).ready(function(){
    var selectObj = jQuery("#field6698");
    var controlDetailFun = function(vthis){
        if(jQuery(vthis).val()  == "1" )
            cus_ShowAreaByName("byj");    //封装的根据name属性显示区域方法
        else
            cus_HideAreaByName("byj");    //封装的根据name属性隐藏区域方法
    }
    selectObj.bindPropertyChange(controlDetailFun);
    controlDetailFun(selectObj[0]);

    checkCustomize = function (){

        var num=jQuery("#field7634").val()*1.0;//冲销总金额
        var num2=jQuery("#field5960").val()*1.0;//申请金额
        var num3=jQuery("#field6698").val();//支付类型
        var msg="";
        if(num3==1){
            if(num<=num2){
                return true;
            }else{
                msg="冲销金额大于报销金额，请核对后提交";
                alert(msg);
                return false;
            }

        }else{
            return true;
        }
    }

});
</script>
<script type="text/javascript">

/**
 * HLML中某些字段根据文本框中的字段，实现必填与非必填
 * 需求：根据字段field_a来控制field_b、field_c是否为必填，当field_a = ‘员工’时，field_b字段必填；当a=‘主管’时，field_c字段必填。
 * 注：因为图片元素在HTML表单源码编辑页面定义时，字符串被转义了，故需要新建一个js文件，将下列代码放入其中，然后再在HTML表单页面中将js引入，
 **/
//报销人字段
var mt_det = "field5957";//
//费用类型
var cbzx_det = "field5966" ;//
//出差申请
var dls_main="field5968"//

//页面加载事件
jQuery(document).ready(function() {
    /*linkageMust();*/
});

$(document).click( function () {
    /*linkageMust();*/
});

//字段联动必填 函数
function linkageMust(){
    var field_bxr_val=$("#"+mt_det).val();
    console.log("field_bxr_val::"+field_bxr_val)
    var index=0;
    var mx=$("#indexnum0");
    if(mx){
        index=mx.val();
    }
    for(var i=0;i<index;i++){
        var mt=$("#"+dls_main+"_"+i);
        var cbzx=$("#"+cbzx_det+"_"+i);
        var mt_det_val=mt.val()
        var cbzx_det_val=$("#"+cbzx_det+"_"+i).val()
        console.log("mt_det_val::"+mt_det_val+"  cbzx_det_val::"+cbzx_det_val)
        if(mt_det_val == ''&&cbzx_det_val=="3"){//填写下拉框为差旅费的值 0 1 2
            if(field_bxr_val!='344'&&field_bxr_val!='309'&&field_bxr_val!='341'){//设置cfo，ceo，cto的id值
                //添加必填
                console.log("添加必填")
                WfForm.changeFieldAttr(dls_main+"_"+i, 3);
            }else{
                //取消必填
                console.log("取消必填")
                WfForm.changeFieldAttr(dls_main+"_"+i, 2);
            }
        }else{
            console.log("取消必填")
            jWfForm.changeFieldAttr(dls_main+"_"+i, 2);
        }
    }
}
</script>



