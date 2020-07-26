<script type="text/javascript">
/**
 * 诺梵发票提交校验-E8
 * 1）每年4月1日起无法再发起发票开票日期非本年的流程
 * 2）每年1月1日至3月31日，用户凡提交开票日期非本年的流程，都需要提醒警告用户该发票有退回风险
 */
    jQuery(document).ready(function(){

        //字段配置
        var kprq="field18529";//开票日期  明细表
        var sqrq="field17817"; //申请日期  主表   
        var msg="每年4月1日起无法再发起发票开票日期非本年的流程！"; //提示语句-阻止
        var msg2="该发票有退回风险,是否继续提交"; //提示语句-确认
        var mx="0"; //明细表1,从0开始

        //流程提交拦截
		checkCustomize=function  () {

            var sqrq_v=$("#"+sqrq).val();//申请日期
            var sqrq_year=sqrq_v.substring(0,4)*1.0;
            var sqrq_month=sqrq_v.substring(5,7)*1.0;

            var IndexStr="";
            var flag = true;
            var flag2= true;
            var idvalues = document.getElementById('submitdtlid'+mx).value; //明细表1具体行id
            idvalues = idvalues.split(",")
            for (var i = 0; i < idvalues.length; i++) {

                var j=i+1;
                var kprq_v=$("#"+kprq+"_"+idvalues[i]).val();
                if(kprq_v!=undefined){
                    console.log(kprq_v+"--"+sqrq_v);
                    var kprq_year=kprq_v.substring(0,4)*1.0;
                    var kprq_month=kprq_v.substring(5,7)*1.0;

                    if(sqrq_month>=4&&kprq_year==sqrq_year){

                        if(IndexStr.length==0){
                            IndexStr=j;
                        }else{
                            IndexStr=IndexStr+","+j;
                        }
                        flag = false;
                    }

                    if(sqrq_month<=3&&kprq_year!=sqrq_year){
                        flag2=false;
                    }

                }
              
            }
            if(flag2){
                //不满足第二点
                if(flag){
                    //提交成功
                    return true;
                }else{
                    //提示报错信息
                    window.top.Dialog.alert("第"+IndexStr+"行 "+msg);
                    return false; 
                }
            }else{
                if (confirm(msg2) == true) {	 //确认框
                    if(flag){
                        //提交成功
                        return true;
                    }else{
                        //提示报错信息
                        window.top.Dialog.alert("第"+IndexStr+"行 "+msg);
                        return false; 
                    }
                } else {
                    return false;
                }
            }
        }
    });
</script>