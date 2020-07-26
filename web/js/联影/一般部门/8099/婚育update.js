<!-- script代码，如果需要引用js文件，请使用与HTML中相同的方式。 -->
<script type="text/javascript">
var bz_field="field13200";//执行标准
var ybxje_field="field13195";//人民币金额
var sbbzje_field="field13192";//申报币种金额
var sbje_field="field13212"//实报金额
var invoice_type_field="field13245";//费用类型field1231
var jdKeyFiekds="field13215,field13216,field13217,field13218,field13219,field13220,field13221,field13222"//九段字段名称
var zhzh="field13198"//账号组合字段
var zhmc="field13199"//账号名称字段
var taxJe="field13240"//不含税金额字段
var taxLimit="field13193"//税额

var field_name1="field13231"//根据字段名  币种字段
var field_name2="field13191"//设置值字段  汇率字段
var gs_main_field="field13223";//$("#field12735").val() 公司主表字段
var gs_detail_field="";//公司明细字段 field12725

/*婚育津贴显示中字段*/
var isFirstJh="field13249"//是否在联影第一次享受结婚津贴  detail0_1_6   detail0_3_6 td_etype_3 detail_hide_col
/*生育津贴显示中字段*/
var isPoYhjt="field13585"//配偶是否在联影已享受婚育津贴  detail0_1_5   detail0_3_5 td_etype_3 detail_hide_col
var isFirstSyjt="field13241"//是否在联影第一次享受生育津贴 detail0_1_4  detail0_3_4 td_etype_3 detail_hide_col


/*下处无需配置*/
var marryInvoceIDs=""//费用类型对照表中结婚礼金集合
var brithInvoceIDs=""//费用类型对照表中生育礼金集合


/**
 * 设置必填
 */
var textValue="<img align=absmiddle src='/images/BacoError_wev8.gif' />";
function setMustFill(num,rowNum,typeVal) {
    //console.log("num"+num)
    //console.log("rowNum"+rowNum)
    //console.log("typeVal"+typeVal)
    //console.log("marryInvoceIDs"+marryInvoceIDs)
    //console.log("brithInvoceIDs"+brithInvoceIDs)
    if(isExist(marryInvoceIDs,typeVal)){
        //console.log("结婚")
        setBt(isFirstJh,num,rowNum);
        canBt(isPoYhjt,num,rowNum);
        canBt(isFirstSyjt,num,rowNum);
    }else if(isExist(brithInvoceIDs,typeVal)){
        //console.log("生育")
        setBt(isPoYhjt,num,rowNum);
        setBt(isFirstSyjt,num,rowNum);
        canBt(isFirstJh,num,rowNum);
    }else{
        canBt(isFirstJh,num,rowNum);
        canBt(isPoYhjt,num,rowNum);
        canBt(isFirstSyjt,num,rowNum);
    }
}

/**
 * 设置必填
 */
function setBt(col,num,index) {
    var btzd = $("input[name='needcheck']").val();
    var colVal = $("#"+col+"_"+num[index]).val();
    if(isNull(colVal)){
        $("#"+col+"_"+num[index]+"span").html(textValue);
    }
    $("#"+col+"_"+num[index]).attr('viewtype','1');
    var s="," + col+"_"+num[index];
    if(btzd.indexOf(s)==-1){
        var fieldIds = btzd + "," + col+"_"+num[index] ;
        $("input[name='needcheck']").val(fieldIds);
    }
    document.getElementById(col+"_"+num[index]).removeAttribute("disabled")
}

/**
 * 取消必填
 */
function canBt(col,num,index) {
    var btzd = $("input[name='needcheck']").val();
    btzd=btzd.replace(","+col+"_"+num[index],"")
    $("input[name='needcheck']").val(btzd);
    $("#"+col+"_"+num[index]).attr("disabled","disabled");
    $("#"+col+"_"+num[index]).val("")
    $("#"+col+"_"+num[index]+"span img").remove()
}


$(document).ready(function(){
    findValidationId(9)//结婚
    findValidationId(10)//生育
    var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        jdZhFun(num,i);
        var rowNum = num[i];
        $("#"+invoice_type_field + "_" + rowNum+",#" + sbbzje_field + "_" + rowNum).bindPropertyChange(function (e) {
            var index = e.id.split("_")[1]
            var typeVal = $("#"+invoice_type_field+ "_" + index).val();
            setMustFill(num,index,typeVal);
        });
    }



    var dtIdLength = 0;
    var oldDtIdLength = 0;
    /*
    当明细行数量增加时，为增加的明细行添加函数；当明细行数量减少时，重新计算总额
     */
    var detileTabId = "#submitdtlid0";
    $(detileTabId).bindPropertyChange(function () {
        dtIdLength = jQuery(detileTabId).val().split(",").length;
        if (oldDtIdLength <= dtIdLength){
            var num=$("#submitdtlid0").val();
            num = num.split(",")
            var rowNum = num[num.length-1];
            $("#"+invoice_type_field + "_" + rowNum+",#" + sbbzje_field + "_" + rowNum).bindPropertyChange(function () {
                var typeVal = $("#"+invoice_type_field+ "_" + rowNum).val();

                setMustFill(num,rowNum,typeVal);
                if(typeVal !=undefined && typeVal !="" ){
                    if(marryInvoceIDs.indexOf(typeVal )!=-1){
                        $("#"+"field12559"+"_"+rowNum+"span").html(200);
                    }
                    if(brithInvoceIDs.indexOf(typeVal )!=-1){
                        $("#"+"field12559"+"_"+rowNum+"span").html(500);
                    }}
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
            var index=Number(i)+1;
            var isFirstJhVal = $("#"+isFirstJh+"_"+num[i]).val();
            var invoice_type_fieldVal = $("#"+invoice_type_field+"_"+num[i]).val();
            var isPoYhjtVal = $("#"+isPoYhjt+"_"+num[i]).val();
            var isFirstSyjtVal = $("#"+isFirstSyjt+"_"+num[i]).val();
            var sbje_fieldVal = $("#"+sbje_field+"_"+num[i]).val();
            var bz_fieldVal = $("#"+bz_field+"_"+num[i]).val();
            //if(marryInvoceIDs.indexOf(invoice_type_fieldVal)!=-1){
            if(isExist(marryInvoceIDs,invoice_type_fieldVal)){
                $("#"+bz_field+"_"+num[i]).val(200);
                if(Number(sbje_fieldVal)>200){
                    top.Dialog.alert("明细第"+index+"行无法提交，实报金额不能大于执行额度200！！！")
                    return false;
                }
            }
            //if(brithInvoceIDs.indexOf(invoice_type_fieldVal)!=-1){
            if(isExist(brithInvoceIDs,invoice_type_fieldVal)){
                $("#"+bz_field+"_"+num[i]).val(500);
                if(Number(sbje_fieldVal)>500){
                    top.Dialog.alert("明细第"+index+"行无法提交，实报金额不能大于执行额度500！！！")
                    return false;
                }
            }

            if("1"==isFirstJhVal){//否
                top.Dialog.alert("明细第"+index+"行无法提交，在职期间只能申请一次结婚礼金。")
                return false;
            }
            if("1"==isFirstSyjtVal){
                top.Dialog.alert("明细第"+index+"行无法提交,在职期间只能申请一次生育礼金。")
                return false;
            }
            if("0"==isPoYhjtVal){
                top.Dialog.alert("明细第"+index+"行无法提交，以家庭为单位申请一份生育礼金。")
                return false;
            }
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
        success:function(data){
            var str=JSON.stringify(data);
            msg=str.substring(str.indexOf("<body>")+26,str.indexOf("</body>")-8);
            if("9"==val){
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
 * 判断所属类型
 * @param str
 */
function isExist(str,val) {
    //console.log("isExist")
    //console.log("str::"+str)
    //console.log("val::"+val)
    if(!isNull(str)&&!isNull(val)){
        var arr = str.split(",")
        for (var i = 0; i < arr.length; i++) {
            if(arr[i]==val){
                return true;
            }
        }
        return false;
    }else{
        return false;
    }
}

function isNull(val) {
    if(""==val||val==null||val==undefined){
        //console.log("isNull::true")
        return true;
    }else{
        //console.log("isNull::false")
        return false;
    }
}

/**
 * 点击事件触发验证赋值
 */
$(document).click(function () {
    var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        var type = $("#" + invoice_type_field + "_" + num[i]).val();
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























