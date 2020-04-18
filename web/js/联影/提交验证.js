<script type="text/javascript">
    /**
     * 遍历赋值明细表中费用科目
     */
    jQuery(document).ready(function(){

        var a='128'; //赋的值
        var fykm="field6102";//费用科目

        jQuery("#field10110").bindPropertyChange(getResult);
        function getResult(){
            var pd= jQuery("#field10110").val();    //是否调整
            if(pd==0){
                for(var i = 0 ; i < jQuery("input[name^='"+fykm+"']").length; i++){    //遍历赋值明细表中费用科目
                    var rowindex = jQuery("input[name^='"+fykm+"']")[i].id;
                    rowindex = rowindex.replace(fykm,'');

                    jQuery("#"+fykm + rowindex).val(a);
                    jQuery("#"+fykm + rowindex+"span").html(a);
                    //jQuery("#field6102" + rowindex+"spanimg").html(a);   
                    //jQuery("#isshow0" + rowindex+"_6102").html(a);   
                }
            }
        }

    });
</script>