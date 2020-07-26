<script language="javascript">
//报销金额合计不能超过发票金额合计
var bField="field5903"// 人均费用
var cField="field10565"// 招待标准

 jQuery(document).ready(function(){
        //流程提交拦截
 checkCustomize=function  () {
        //页面加载
  var bField_b=$("#"+bField).val()*1.0;
  var cField_c=$("#"+cField).val()*1.0;
        //将主表字段转换为浮点数

 if(bField_b>cField_c){

    top.Dialog.alert("报销金额不能超过发票金额合计！")

    return false;
   
  }else{

  return true;
 }

}

});
</script>

//field5814  field10563

//field5948  field10564

//field5903  field10565