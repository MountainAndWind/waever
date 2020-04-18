<!-- script代码，如果需要引用js文件，请使用与HTML中相同的方式。 -->
<script type="text/javascript">
var bz_field="field12559";//标准字段field1231
var ybxje_field="field12501";//应报销金额字段field12501  人名币金额
var sbbzje_field="field12498";//申报币种金额字段field12498
var sbje_field="field12723"//实报金额字段field12723
var invoice_type_field="field13184";//费用类型field1231  field12727_0span
var jdKeyFiekds="field12726,field12727,field12728,field12729,field12730,field12731,field12732,field12733"//九段字段名称
var zhzh="field12513"//账号组合字段
var zhmc="field12514"//账号名称字段
var taxJe="field13161"//不含税金额字段
var taxLimit="field12499"//税额

var field_name1="field12744"//根据字段名  币种字段
var field_name2="field12497"//设置值字段  汇率字段
var gs_main_field="field12735";//$("#field12735").val() 公司主表字段
var gs_detail_field="field12725";//公司明细字段 field12725

/*下处无需配置*/
var phoneInvoceIDs=""//费用类型对照表中电话费集合

$(document).ready(function(){
    findValidationId(3)//费用类型对照表中电话费主键id
    var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        jdZhFun(num,i);
    }

    var dtIdLength = 0;
    var oldDtIdLength = 0;
    /*
    当明细行数量增加时，为增加的明细行添加函数；当明细行数量减少时，重新计算总额
     */
    var detileTabId = "#submitdtlid0";
    $(detileTabId).bindPropertyChange(function () {
        console.log("主表bind")
        dtIdLength = jQuery(detileTabId).val().split(",").length;
        if (oldDtIdLength < dtIdLength){
            var rowNum = $(detileTabId).val().charAt($(detileTabId).val().length-1);
            var num=$("#submitdtlid0").val();
            console.log("rowNum:"+rowNum);
            $("#"+invoice_type_field + "_" + rowNum+",#" + sbbzje_field + "_" + rowNum).bindPropertyChange(function () {
                console.log("明细bind");
                var typeVal = $("#"+invoice_type_field+ "_" + rowNum).val();
                console.log("typeVal::"+typeVal);
                dianHuaValidation(num,rowNum,typeVal);

            });
            oldDtIdLength = dtIdLength;
        }
        if(oldDtIdLength > dtIdLength){
            oldDtIdLength = dtIdLength;
        }
    });


    checkCustomize = function (){
        var num = $("#submitdtlid0").val();
        num = num.split(",")
        for (var i = 0; i < num.length; i++) {
            jdZhFun(num,i);
        }
        return true;
    }
})

function findValidationId(val) {///base/findInvoiceTypById.jsp?fieldVal=3

    var msg = "";
    $.ajax({
        type:"GET",
        url:"/base/findInvoiceTypById.jsp?",
        data: {'fieldVal':val,'timeStamp':new Date().getTime()},
        dataType:"text",
        //data:{jsonStr:jsonStr},
        success:function(data){
            /*var str=JSON.stringify(data);*/
            var str=JSON.stringify(data);
            msg=str.substring(str.indexOf("<body>")+26,str.indexOf("</body>")-8);

            if("3"==val){

                phoneInvoceIDs=msg//费用类型对照表中电话费集合
            }else if("9"==val){

                marryInvoceIDs=msg//费用类型对照表中结婚礼金集合
            }else if("10"==val){

                brithInvoceIDs=msg//费用类型对照表中生育礼金集合
            }
        },
        error:function(jqXHR){
            alert("发生错误："+ jqXHR.status);
        }
    });
}

/**
 * 点击事件触发验证赋值
 */
$(document).click(function () {
    var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        var type = $("#" + invoice_type_field + "_" + num[i]).val();
        /* dianHuaValidation(num,i,type);*/
        jdZhFun(num,i);
    }
})


/**
 * 话费赋值
 * @param num
 * @param i
 * @param type
 */
function dianHuaValidation(num,i,type) {
    if(""!=type){
        console.log("type::"+type)
        console.log("dianHuaValidation")
        console.log("phoneInvoceIDs::"+phoneInvoceIDs)
        if(phoneInvoceIDs.indexOf(type)!=-1){
            //电话类型
            var rmb = Number($("#"+sbbzje_field+"_"+num[i]).val())*Number($("#"+field_name2+"_"+num[i]).val())//×汇率所得值

            $("#"+ybxje_field+"_"+num[i]).val(rmb);
            var jePer=Number(rmb)*0.8;

            var bzval = $("#"+bz_field+"_"+num[i]).val();
            console.log("$(\"#\"+sbje_field+\"_\"+num[i]+\"span\")::::"+("#"+sbje_field+"_"+num[i]+"span"));
            if(Number(jePer)<=Number(bzval)){
                $("#"+sbje_field+"_"+num[i]).val(jePer);
                $("#"+sbje_field+"_"+num[i]+"span").html(jePer)//field12723_0span
            }else{
                $("#"+sbje_field+"_"+num[i]).val(bzval);
                $("#"+sbje_field+"_"+num[i]+"span").html(bzval)//field12723_0span
            }
        }else{
            console.log("$(\"#\"+sbje_field+\"_\"+num[i]+\"span\")::::"+("#"+sbje_field+"_"+num[i]+"span"));
            var sbVal = $("#"+ybxje_field+"_"+num[i]).val()
            $("#"+sbje_field+"_"+num[i]).val(sbVal)
            $("#"+sbje_field+"_"+num[i]+"span").html(sbVal)//field12723_0span
        }
    }
}

/**
 * 九段key val 赋值
 * @param num
 * @param i
 * @param type
 */
function jdZhFun(num,i) {
    var fieldName = jdKeyFiekds.split(",");
    var val=$("#"+gs_main_field).val();
    var name=$("#"+gs_main_field+"span a").html();//显示名

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
        //$("#"+zhzh+"_"+num[i]).attr("type","text")
        //document.getElementById(zhzh+"_"+num[i]).type="text";
        $("#"+zhmc+"_"+num[i]).val(name)
        //$("#"+zhmc+"_"+num[i]).attr("type","text")
        //document.getElementById(zhmc+"_"+num[i]).type="text";
    }
}

/**
 * 实报金额与不含税金额的赋值操作
 * 实报金额等于人民币金额,如果是话费乘0.8
 * 不含税金额是实报金额减去税额
 */
/*function factJeAndNoContainsTaxJeVal(num,i,type) {
    var rmbJe = $("#"+ybxje_field+"_"+num[i]).val();
    $("#"+sbje_field+"_"+num[i]).val(rmbJe)
    var taxLiJe  = $("#"+taxLimit+"_"+num[i]).val()

    $("#"+taxJe+"_"+num[i]).val(Number(rmbJe)-Number(taxLiJe))
}*/


//为防止明细行添加过快，添加以下参数
var addBtnName = 'addbutton0'; //添加明细行的按钮ID -- addbutton(0,1,2...)
var detileAddId = 0 ; //明细表序号，与detileTabId、addBtnName最后一位相同（第一个明细表为0，依此叠加）
var intTime = 1000; //控制明细行添加的间隔时间，单位：毫秒。建议1000
/*
 * 添加弹框前事件，防止添加明细行的速度过快
 */
var regBorwserEvent = function() {
    var time1 = new Date();
    var addDtBtnId = document.getElementsByName(addBtnName)[detileAddId].id;
    var oldClickEvent = document.getElementById(addDtBtnId).onclick;
    document.getElementById(addDtBtnId).onclick = function(event) {
        var time2 = new Date();
        if (time2.getTime()-time1.getTime() < intTime) {
            time1 = time2;
            return ;
            alert('操作太快啦！');
        } else {
            time1 = time2;
            oldClickEvent(event);
        }
    };
};
regBorwserEvent();


</script>

