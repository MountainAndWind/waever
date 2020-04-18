//1、先绑定时间DIV的属性改变事件
</pre><pre class="javascript" name="code" snippet_file_name="blog_20160527_3_4323742" code_snippet_id="1698670">jQuery("#field9530").bind("propertychange",function(){
  checkDate("9530");
});
</pre><pre class="javascript" name="code" snippet_file_name="blog_20160527_5_627008" code_snippet_id="1698670">2、对时间进行判断
function checkDate(startfieldid){
  var startDate=jQuery('#field'+startfieldid).val();
  var start_str=startDate.replace(/-/g,"/");
  var start_date=new Date(start_str);
  var end_Date=new Date();
  var num=(end_Date-start_date)/(1000*3600*24);
  var days=parseInt(Math.floor(num));
  if(startDate!=''){
  if(days>5){
   alert("根据相关规定，未打开补流程时间不能超过5天!");
  jQuery("#field"+startfieldid).val("");
  jQuery("#field"+startfieldid+"span").html("");
}
}
}

 

 

<script>
/**
*	计算主表中日期时间差，计算结果精确到分钟数
*	根据实际情况修改字段ID
*
*/
 
var ksrq = "field5814";//开始日期
var kssj = "field5815";//开始时间
var jsrq = "field5816";//结束日期
var jssj = "field5817";//结束时间
var jbsj = "field5818";//加班时间
 
jQuery(document).ready(function(){
    jQuery("#"+ksrq).bind('propertychange',function(){
         calDateTime();
    });
 
    jQuery("#"+kssj).bind('propertychange',function(){
         calDateTime();
    });
 
    jQuery("#"+jsrq).bind('propertychange',function(){
         calDateTime();
    });
 
    jQuery("#"+jssj).bind('propertychange',function(){
         calDateTime();
    });
});
 
 
 //计算时间差
function calDateTime(){
     var ksrq_v = jQuery("#"+ksrq).val().replace(/-/g, "/");
     var kssj_v = jQuery("#"+kssj).val();
     var jsrq_v = jQuery("#"+jsrq).val().replace(/-/g, "/");
     var jssj_v = jQuery("#"+jssj).val();
 
     if(ksrq_v != null && ksrq_v != "" && kssj_v != null && kssj_v != "" && jsrq_v != null && jssj_v != null && jssj_v != ""){
         var d1 = ksrq_v + " " + kssj_v + ":00";
         var d2 = jsrq_v + " " + jssj_v + ":00";
 
         d1 = new Date(d1);
         d2 = new Date(d2);
 
         if(d1 > d2){
              alert("结束日期时间不能早于开始日期时间！");
 
              jQuery("#"+jssj).val('');
              jQuery("#"+jssj+"span").html('');
 
              jQuery("#"+jbsj).val('');
              jQuery("#"+jbsj+"span").html('');
         }else {
             var time = d2.getTime() - d1.getTime(); 
 
             var min = parseInt(time / (1000 * 60));
 
             jQuery("#"+jbsj).val(min);
             jQuery("#"+jbsj+"span").html(min);
        }
    }
}
 
</script>
