<!-- script代码，如果需要引用js文件，请使用与HTML中相同的方式。 -->
<script type="text/javascript">
var bz_field="field12559";//标准字段field1231
var ybxje_field="field12501";//金额字段field12501  人名币金额
var sbbzje_field="field12498";//申报币种金额字段field12498
var sbje_field="field12723"//实报金额字段field12723
var invoice_type_field="field13184";//费用类型field1231
var jdKeyFiekds="field12725,field12726,field12727,field12728,field12729,field12731,field12730,field12732,field12733"//九段字段名称
var zhzh="field12513"//账号组合字段
var zhmc="field12514"//账号名称字段
var taxJe=""//税金字段
var taxLimit=""//税额

/*婚育津贴显示中字段*/
var isFirstJh="field13288"//是否在联影第一次享受结婚津贴  detail0_1_6   detail0_3_6 td_etype_3 detail_hide_col
/*生育津贴显示中字段*/
var isPoYhjt="field13164"//配偶是否在联影已享受婚育津贴  detail0_1_5   detail0_3_5 td_etype_3 detail_hide_col
var isFirstSyjt="field13163"//是否在联影第一次享受生育津贴 detail0_1_4  detail0_3_4 td_etype_3 detail_hide_col

var field_name1="field12744"//根据字段名  币种字段
var field_name2="field12497"//设置值字段  汇率字段
var gs_main_field="field12735";//$("#field12735").val() 公司主表字段
var gs_detail_field="field12725";//公司明细字段 field12725

var phoneInvoceMainId="3"//费用类型对照表中电话费主键id
var marryInvoceMainId="9"//费用类型对照表中结婚礼金主键id
var brithInvoceMainId="10"//费用类型对照表中生育礼金主键id

/*下处无需配置*/
var phoneInvoceIDs=""//费用类型对照表中电话费集合
var marryInvoceIDs=""//费用类型对照表中结婚礼金集合
var brithInvoceIDs=""//费用类型对照表中生育礼金集合



$(document).ready(function(){

    /*var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        var field_name1_val = $("#"+field_name1+"_"+num[i]).val();
        //console.log("field_name1_val::"+field_name1_val);
        var curr_field_name2="#"+field_name2+"_"+num[i];
        //console.log("设置字段::"+curr_field_name2);
        ajax(field_name1_val,curr_field_name2);
        gsFz(num,i);
        /!*jdZhFun(num,i);*!/
    }*/

    findValidationId(phoneInvoceMainId)
    findValidationId(marryInvoceMainId)
    findValidationId(brithInvoceMainId)

    console.log("checkCustomizecheckCustomize::!!")
    checkCustomize = function (){
        var num = $("#submitdtlid0").val();
        num = num.split(",")
        for (var i = 0; i < num.length; i++) {
            var index=Number(i)+1;
            var isFirstJhVal = $("#"+isFirstJh+"_"+num[i]).val();
            var invoice_type_fieldVal = $("#"+invoice_type_field+"_"+num[i]).val();
            var isPoYhjtVal = $("#"+isPoYhjt+"_"+num[i]).val();
            var isFirstSyjtVal = $("#"+isFirstSyjt+"_"+num[i]).val();
            console.log("isFirstJhVal::"+isFirstJhVal);
            console.log("invoice_type_fieldVal::"+invoice_type_fieldVal);
            console.log("isPoYhjtVal::"+invoice_type_fieldVal);
            console.log("isFirstSyjtVal::"+invoice_type_fieldVal);
            if("1"==isFirstJhVal){//否
                top.Dialog.alert("明细第"+index+"行无法提交，在职期间只能申请一次结婚礼金！！！")
                return false;
            }
            if("1"==isFirstSyjtVal){
                top.Dialog.alert("明细第"+index+"行无法提交,在职期间只能申请一次生育礼金！！！")
                return false;
            }
            if("0"==isPoYhjtVal){
                top.Dialog.alert("明细第"+index+"行无法提交，以家庭为单位申请一份生育礼金！！！")
                return false;
            }
        }
        return true;
    }
})

/**
 *查找费用类型对照表中存在的明细
 * @param val
 */
function findValidationId(val) {///base/findInvoiceTypById.jsp?fieldVal=3
    console.log("findValidationId")
    var msg = "";
    $.ajax({
        type:"GET",
        url:"/base/findInvoiceTypById.jsp?fieldVal="+val,
        dataType:"text",
        //data:{jsonStr:jsonStr},
        success:function(data){
            /*var str=JSON.stringify(data);*/
            var str=JSON.stringify(data);
            msg=str.substring(str.indexOf("<body>")+26,str.indexOf("</body>")-8);
            console.log("msg::"+msg)
            if(phoneInvoceMainId==val){
                console.log("赋值电话类型值")
                phoneInvoceIDs=msg//费用类型对照表中电话费集合
            }else if(marryInvoceMainId==val){
                console.log("赋值结婚类型值")
                marryInvoceIDs=msg//费用类型对照表中结婚礼金集合
            }else if(brithInvoceMainId==val){
                console.log("赋值生育类型值")
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
//console.log('定时运行：次')
    //console.log("hid")
    var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        var field_name1_val = $("#" + field_name1 + "_" + num[i]).val();
        //console.log("field_name1_val::" + field_name1_val);
        var curr_field_name2 = "#" + field_name2 + "_" + num[i];
        //console.log("设置字段::" + curr_field_name2);
        ajax(field_name1_val, curr_field_name2);
        var type = $("#" + invoice_type_field + "_" + num[i]).val();
        //console.log("费用类型：：" + type);
        factJeAndNoContainsTaxJeVal(num,i,type);
        dianHuaValidation(num, i, type)
        gsFz(num, i);
        showHunYuMsg(num, i, type)
        /*jdZhFun(num,i);*/
    }
})
/**
 * 计时器触发
 */

/*
var timeId = setInterval(function () {
    //console.log('定时运行：次')
    //console.log("hid")
    var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        var field_name1_val = $("#" + field_name1 + "_" + num[i]).val();
        //console.log("field_name1_val::" + field_name1_val);
        var curr_field_name2 = "#" + field_name2 + "_" + num[i];
        //console.log("设置字段::" + curr_field_name2);
        ajax(field_name1_val, curr_field_name2);
        var type = $("#" + invoice_type_field + "_" + num[i]).val();
        //console.log("费用类型：：" + type);
        dianHuaValidation(num, i, type)
        gsFz(num, i);
        showHunYuMsg(num, i, type)
        /!*jdZhFun(num,i);*!/
    }
}, 2000)
*/


/**
 * 实报金额与不含税金额的赋值操作
 * 实报金额等于人民币金额,如果是话费乘0.8
 * 不含税金额是实报金额减去税额
 */
function factJeAndNoContainsTaxJeVal(num,i,type) {
    var rmbJe = $("#"+ybxje_field+"_"+num[i]).val();
    $("#"+sbje_field+"_"+num[i]).val(rmbJe)
    var taxLiJe  = $("#"+taxLimit+"_"+num[i]).val()
    console.log("税额：："+taxLiJe);
    $("#"+taxJe+"_"+num[i]).val(Number(rmbJe)-Number(taxLiJe))
}


/**
 * 主表字段值赋值到明细字段上
 * @param num
 * @param i
 */
function gsFz(num,i) {
    var gsMainVal=$("#"+gs_main_field).val();
    //console.log("公司主表值：："+gsMainVal)
    //console.log("赋值字段：："+"#"+gs_detail_field+"_"+num[i])
    var name=$("#"+gs_main_field+"span a[title='"+gsMainVal+"']").html();//显示名
    //console.log("显示名name::"+name)
    $("#"+gs_detail_field+"_"+num[i]+"span").html("");
    if(name!=null){
        $("#"+gs_detail_field+"_"+num[i]+"span").append("<span class=\"e8_showNameClass\"><a title=\"33\">"+name+"</a>&nbsp;<span class=\"e8_delClass\" id=\"33\" onclick=\"del(event,this,1,false,{});\" style=\"opacity: 0; visibility: hidden;\">&nbsp;x&nbsp;</span></span>")
        $("#"+gs_detail_field+"_"+num[i]).val(gsMainVal)
    }
}

/**
 * 婚育津贴展示婚育津贴享受原则
 * @param num
 * @param i
 * @param type
 */
function showHunYuMsg(num,i,type) {
    if(""!=type){
        console.log("marryInvoceIDs::"+marryInvoceIDs+"---type::"+type);
        console.log(marryInvoceIDs.indexOf(type))
        console.log("brithInvoceIDs::"+brithInvoceIDs+"---type::"+type);
        console.log(brithInvoceIDs.indexOf(type))
        if(marryInvoceIDs.indexOf(type)!=-1){//结婚礼金
            /*top.Dialog.alert("在职期间结婚的员工（以领取结婚证日期为准），可享受一次200元/人结婚礼金。报销所需附件资料为：\n" +
                "    结婚证复印件，6个月内有效\n" +
                "   累计面值200元上海市交通或餐饮发票原件")*/
            //显示字段todo
            var fiedid=isFirstJh.substring(5)+"_"+i;
            showCol("detail0_1_6",fiedid,"detail0_3_6 td_etype_3");

            var fiedid3=isFirstSyjt.substring(5)+"_"+i;
            hiddenCol("detail0_1_4",fiedid3,"detail0_3_4");
            var fiedid2=isPoYhjt.substring(5)+"_"+i;
            hiddenCol("detail0_1_5",fiedid2,"detail0_3_5");
        }else if(brithInvoceIDs.indexOf(type)!=-1){//生育礼金
            /*top.Dialog.alert("在职期间结婚的员工（以领取结婚证日期为准），可享受一次200元/人结婚礼金。报销所需附件资料为：\n" +
                "    结婚证复印件，6个月内有效\n" +
                "   累计面值200元上海市交通或餐饮发票原件")*/
            //显示字段todo
            var fiedid=isFirstJh.substring(5)+"_"+i;
            hiddenCol("detail0_1_6",fiedid,"detail0_3_6");

            var fiedid3=isFirstSyjt.substring(5)+"_"+i;
            showCol("detail0_1_4",fiedid3,"detail0_3_4 td_etype_3");
            var fiedid2=isPoYhjt.substring(5)+"_"+i;
            showCol("detail0_1_5",fiedid2,"detail0_3_5 td_etype_3");
        }else{
            var fiedid=isFirstJh.substring(5)+"_"+i;
            hiddenCol("detail0_1_6",fiedid,"detail0_3_6");
            var fiedid3=isFirstSyjt.substring(5)+"_"+i;
            hiddenCol("detail0_1_4",fiedid3,"detail0_3_4");
            var fiedid2=isPoYhjt.substring(5)+"_"+i;
            hiddenCol("detail0_1_5",fiedid2,"detail0_3_5");
        }
    }
}

/**
 * 显示列
 */
function showCol(headName,fiedid,colCss) {
    $("."+headName).attr("class",headName+" td_etype_2");//detail0_1_5 td_etype_2 detail_hide_col
    $("td[_fieldid='"+fiedid+"']").attr("class",colCss)
}

/**
 * 隐藏列
 */
function hiddenCol(headName,fiedid,colCss) {
    $("."+headName).attr("class",headName+" td_etype_2 detail_hide_col");//detail0_1_5 td_etype_2 detail_hide_col
    $("td[_fieldid='"+fiedid+"']").attr("class",colCss+" td_etype_3 detail_hide_col")
}

/**
 * 话费赋值
 * @param num
 * @param i
 * @param type
 */
function dianHuaValidation(num,i,type) {
    if(""!=type){
        console.log("phoneInvoceIDs::"+phoneInvoceIDs+"---type::"+type);
        console.log(phoneInvoceIDs.indexOf(type))
        if(phoneInvoceIDs.indexOf(type)!=-1){
            //电话类型
            var rmb = Number($("#"+sbbzje_field+"_"+num[i]).val())*Number($("#"+field_name2+"_"+num[i]).val())//×汇率所得值
            console.log("汇率换算值：："+rmb);
            $("#"+ybxje_field+"_"+num[i]).val(rmb);
            var jePer=Number(rmb)*0.8;
            console.log("当前实际金额%80::"+jePer);
            var bzval = $("#"+bz_field+"_"+num[i]).val();
            console.log("标准金额：："+bzval);
            if(Number(jePer)<=Number(bzval)){
                $("#"+sbje_field+"_"+num[i]).val(jePer);
            }else{
                $("#"+sbje_field+"_"+num[i]).val(bzval);
            }
        }
    }
}


/**
 * 请求汇率数据
 * @param fieldVal
 * @param fieldName
 */
function ajax(fieldVal,fieldName) {
    $.ajax({
        type:"GET",
        url:"/base/findHl.jsp?fieldVal="+fieldVal,
        dataType:"text",
        //data:{jsonStr:jsonStr},
        success:function(data){
            /*var str=JSON.stringify(data);*/
            var str=JSON.stringify(data);
            var msg = "";
            /* for (var i = 5; i < $(str).length; i++) {
                 if(i%2){
                     msg=msg+$(str)[i].textContent+"</br>";
                 }
             }
             msg=msg.substring(40,msg.length-17)*/
            msg=str.substring(str.indexOf("<body>")+26,str.indexOf("</body>")-8);
            //console.log("mgs::"+msg)
            $(fieldName).val(msg);
            /* if(msg.length<=28){
             }else{
             }*/
        },
        error:function(jqXHR){
            alert("发生错误："+ jqXHR.status);
        }
    });
}


/**
 * 九段key val 赋值
 * @param num
 * @param i
 * @param type
 */
function jdZhFun(num,i) {
    var fieldName = jdKeyFiekds.split(",");
    var name="";
    var val="";
    for(var j=0;j<fieldName.length;j++){
        var namei = $("#"+fieldName[j]+"_"+num[i]+"span a").html();
        console.log("nameName::"+"#"+fieldName[j]+"_"+num[i]+"span a")
        console.log("name::"+name)
        var vali = $("#"+fieldName[j]+"_"+num[i]).val();
        console.log("vali::"+vali)
        if(""==vali){
            vali=0;
        }
        if(namei==null){
            namei="";
        }
        if(j==0){
            name=namei;
            val=vali;
        }else{
            name+="||"+namei;
            val+="."+vali;
        }
        /*赋值*/
        console.log("name::"+name)
        console.log("val::"+val)
        $("#"+zhzh+"_"+num[i]).val(val)
        //$("#"+zhzh+"_"+num[i]).attr("type","text")
        //document.getElementById(zhzh+"_"+num[i]).type="text";
        $("#"+zhmc+"_"+num[i]).val(name)
        //$("#"+zhmc+"_"+num[i]).attr("type","text")
        //document.getElementById(zhmc+"_"+num[i]).type="text";
    }
}
</script>
