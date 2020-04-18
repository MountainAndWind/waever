<script type="text/javascript">

    jQuery(document).ready(function(){
        var aField="field10363"// 投票人 字段
        var vote1="field11827";//投票人1
        var vote2="field11828";//投票人2
        var vote3="field11829";//投票人3
        var vote4="field11830";//投票人4
        var vote5="field11831";//投票人5
        var vote6="field11832";//投票人6
        var vote7="field11833";//投票人7

        WfForm.bindDetailFieldChangeEvent(aField,function(){  //绑定明细表 投票人 字段
            var f1 = WfForm.getFieldValue(aField+"_0");
            var f1show= WfForm.getBrowserShowName(aField+"_0");
            var f2 = WfForm.getFieldValue(aField+"_1");
            var f2show= WfForm.getBrowserShowName(aField+"_1");
            var f3 = WfForm.getFieldValue(aField+"_2");
            var f3show= WfForm.getBrowserShowName(aField+"_2");
            var f4 = WfForm.getFieldValue(aField+"_3");
            var f4show= WfForm.getBrowserShowName(aField+"_3");
            var f5 = WfForm.getFieldValue(aField+"_4");
            var f5show= WfForm.getBrowserShowName(aField+"_4");
            var f6 = WfForm.getFieldValue(aField+"_5");
            var f6show= WfForm.getBrowserShowName(aField+"_5");
            var f7 = WfForm.getFieldValue(aField+"_6");
            var f7show= WfForm.getBrowserShowName(aField+"_6");

            console.log("f1:"+f1+"--f1show:"+f1show);

            WfForm.changeFieldValue(vote1, {value:f1, specialobj:[ {id:f1,name:f1show} ] });
            WfForm.changeFieldValue(vote2, {value:f2, specialobj:[ {id:f2,name:f2show} ] });
            WfForm.changeFieldValue(vote3, {value:f3, specialobj:[ {id:f3,name:f3show} ] });
            WfForm.changeFieldValue(vote4, {value:f4, specialobj:[ {id:f4,name:f4show} ] });
            WfForm.changeFieldValue(vote5, {value:f5, specialobj:[ {id:f5,name:f5show} ] });
            WfForm.changeFieldValue(vote6, {value:f6, specialobj:[ {id:f6,name:f6show} ] });
            WfForm.changeFieldValue(vote7, {value:f7, specialobj:[ {id:f7,name:f7show} ] });

        });
        checkCustomize=function () {

            var n1= jQuery("#field11824").val()*1.0;  //审批中数量
            var n2= jQuery("#field11825").val()*1.0;  //评级库数量
            var n3= jQuery("#field11826").val()*1.0;  //债券库数量

            if(n1>0){
                alert("该债券已评级!");
                return  false;
            }
            return true;
        }
    });
</script>



