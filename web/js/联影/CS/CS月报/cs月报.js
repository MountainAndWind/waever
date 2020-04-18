/**
 * cs 月度报销
 */
<script>
var bz_field="field13710";//标准字段field1231
var ybxje_field="field13705";//应报销金额字段field12501  人名币金额
var sbbzje_field="field13702";//申报币种金额字段field12498
var sbje_field="field13722"//实报金额字段field12723
var invoice_type_field="field13755";//费用类型field1231  field12727_0span
var jdKeyFiekds="field13725,field13726,field13727,field13728,field13729,field13730,field13731,field13732"//九段字段名称
var zhzh="field13708"//账号组合字段
var zhmc="field13709"//账号名称字段
var taxJe="field13750"//不含税金额字段
var taxLimit="field13703"//税额
//var phonelimit="field14026"//手机话费额度主表

var field_name2="field13701"//设置值字段  汇率字段
var gs_main_field="field13733";//$("#field12735").val() 公司主表字段


var phoneInvoceMainId="3"//费用类型对照表中电话费型主键id
var indoorTransMainId="8"//费用类型对照表中室内交通费主键id  室内交通费单笔不得超过100元
var serveMainId="19"//费用类型对照表中招待费主键id
var groupMainId="4"//费用类型对照表中Group主键id
var outingMainId="5"//费用类型对照表中outing主键id
/*下处无需配置*/
var phoneInvoceIDs=""//费用类型对照表中电话费集合
var indoorTransIDs=""//费用类型对照表中室内交通费集合
var serveIDs=""//费用类型对照表中招待费集合s
var groupIDs=""//费用类型对照表中Group集合
var outingIDs=""//费用类型对照表中outing合


/**
 * 加载方法
 */
$(document).ready(function(){
    console.log("ready")
    findValidationId(phoneInvoceMainId)//
    findValidationId(indoorTransMainId)//
    findValidationId(serveMainId)//
    findValidationId(groupMainId)//
    findValidationId(outingMainId)//
    var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        jdZhFun(num,i);
    }
    checkCustomize = function (){
        console.log("checkCustomize!!!")
        var num = $("#submitdtlid0").val();
        num = num.split(",")
        console.log("num::"+num)
        for (var i = 0; i < num.length; i++) {
            var index=Number(num[i])+1;
            console.log(index)
            var type = $("#"+invoice_type_field+ "_" +num[i]).val();
            console.log("type：："+type)
            var sbJe = $("#"+sbje_field+"_"+num[i]).val();
            console.log("sbJe：："+sbJe)
            var limitJe= $("#"+bz_field+"_"+num[i]).val();
            console.log("limitJe：："+limitJe)
            if(""!=type){
                console.log("type::"+type)
                console.log("sbJe::"+sbJe)
                console.log("limitJe::"+limitJe)
                console.log("indoorTransIDs::"+indoorTransIDs)
                console.log("phoneInvoceIDs::"+phoneInvoceIDs)
                console.log("serveIDs::"+serveIDs)
                console.log("groupIDs::"+groupIDs)
                console.log("outingIDs::"+outingIDs)
                if(phoneInvoceIDs.indexOf(type)!=-1){
                     //var phonelimitVal = $("#"+phonelimit).val();
                    console.log("limitJe::"+limitJe)
                     if(Number(limitJe)<=0||limitJe==null||undefined==limitJe||""==limitJe){
                         top.Dialog.alert("明细第"+index+"行无法提交，电话费额度不能为空！！！")
                         return false;
                     }
                }else if(indoorTransIDs.indexOf(type)!=-1){
                     if(Number(sbJe)>100){
                         top.Dialog.alert("明细第"+index+"行无法提交，室内交通费单行不得超过100元！！！")
                         return false;
                     }
                }else if((serveIDs+"-"+groupIDs+"-"+outingIDs).indexOf(type)!=-1){
                    if(Number(sbJe)>Number(limitJe)){
                        top.Dialog.alert("明细第"+index+"行无法提交，实报金额不得超过执行标准！！！")
                        return false;
                    }
                }
            }
            jdZhFun(num,i);
        }
        return true;
    }
})

/**
 *
 * @param val
 */
function findValidationId(val) {///base/findInvoiceTypById.jsp?fieldVal=3
    console.log("findValidationId")
    console.log("val:"+val)
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
            console.log("msg::"+msg)
            if(phoneInvoceMainId==val){
                phoneInvoceIDs=msg//费用类型对照表中电话费集合
                console.log("phoneInvoceIDs::"+phoneInvoceIDs)
            }else if(indoorTransMainId==val){
                indoorTransIDs=msg//费用类型对照表中结婚礼金集合
                console.log("indoorTransIDs::"+indoorTransIDs)
            }else if(serveMainId==val){
                serveIDs=msg//
                console.log("serveMainId::"+serveMainId)
            }else if(groupMainId==val){
                groupIDs=msg//
                console.log("groupIDs::"+groupIDs)
            }else if(outingMainId==val){
                outingIDs=msg//国内住宿
                console.log("outingIDs::"+outingIDs)
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
        jdZhFun(num,i);
    }
})


/**
 * 九段key val 赋值
 * @param num
 * @param i
 * @param type
 */
function jdZhFun(num,i) {
    console.log("jdZhFun")
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
        $("#"+zhmc+"_"+num[i]).val(name)
    }
}


</script>




