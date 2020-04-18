<!-- script代码，如果需要引用js文件，请使用与HTML中相同的方式。 -->
<script type="text/javascript">
var bz_field="field13200";//执行标准
var ybxje_field="field13195";//人民币金额
var sbbzje_field="field13192";//申报币种金额
var sbje_field="field13212"//实报金额
var invoice_type_field="field13245";//费用类型field1231
var jdKeyFiekds="field12726,field12727,field12728,field12729,field12730,field12731,field12732,field12733"//九段字段名称
var zhzh="field13198"//账号组合字段
var zhmc="field13199"//账号名称字段
var taxJe="field13240"//不含税金额字段
var taxLimit="field13193"//税额

var field_name1="field13231"//根据字段名  币种字段
var field_name2="field13191"//设置值字段  汇率字段
var gs_main_field="field13223";//$("#field12735").val() 公司主表字段

/*下处无需配置*/
var phoneInvoceIDs=""//费用类型对照表中电话费集合

/*************/

var stat;
var date;


/***************/


function isNull(val) {
    if(""==val||val==null||val==undefined){
        return true;
    }else{
        return false;
    }
}

$(document).ready(function(){
    findValidationId(3)//费用类型对照表中电话费主键id
    var num = $("#submitdtlid0").val();
    num = num.split(",")

    /****************/


    $.get("/work/canbu.jsp?val=1",
        function(data, status) {
            date= data.toString();
            stat=status;
        });

    if( stat!="success"){
        $.get("/work/canbu.jsp?val=1",
            function(data, status) {
                date= data.toString();
                stat=status;
            });


    }



    /*******************/
    for (var i = 0; i < num.length; i++) {
        jdZhFun(num,i);
        var rowNum = num[i];
        $("#"+invoice_type_field + "_" + rowNum+",#" + field_name1 + "_" + rowNum).bindPropertyChange(function () {
            var index = e.id.split("_")[1]
            var coinVal = $("#" +field_name1 + "_" + index).val();

        });
        $("#"+sbje_field+"_"+rowNum).attr("readonly","readonly");
    }

    var dtIdLength = 0;
    var oldDtIdLength = 0;
    /*当明细行数量增加时，为增加的明细行添加函数；当明细行数量减少时，重新计算总额*/
    var detileTabId = "#submitdtlid0";
    $(detileTabId).bindPropertyChange(function () {
        dtIdLength = jQuery(detileTabId).val().split(",").length;
        if (oldDtIdLength < dtIdLength){
            var rowNum = $(detileTabId).val().charAt($(detileTabId).val().length-1);
            var num=$("#submitdtlid0").val();
            num = num.split(",")
            $("#"+invoice_type_field + "_" + rowNum+",#" + field_name1 + "_" + rowNum).bindPropertyChange(function () {
                var coinVal = $("#" +field_name1 + "_" + rowNum).val();

                setCanBu(num)
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
            var index=Number(num[i])+1;
            var type = $("#"+invoice_type_field+ "_" +num[i]).val();
            var limitJe= $("#"+bz_field+"_"+num[i]).val();
            var field_name2_val = $("#" +field_name2 + "_" + num[i]).val();
            if(isNull(field_name2_val)||0==field_name2_val){
                top.Dialog.alert("明细第" + index + "行无法提交，汇率不得为空！！！")
                return false;
            }

            jdZhFun(num,i);
            if(""!=type){
                if(phoneInvoceIDs.indexOf(type)!=-1){

                    if(Number(limitJe)<=0||limitJe==null||undefined==limitJe||""==limitJe){
                        top.Dialog.alert("明细第"+index+"行无法提交，电话费额度不能为空！！！")
                        return false;
                    }

                    /****************************/
                    date1=date.split("-");
                    var  n= $("#field12493_"+num[i]).val();
                    n=n.split("-");
                    var e_time=new Date(date1[0],date1[1]-1,date1[2],0,0,0,0);

                    var now=new Date(n[0],n[1]-1,n[2],0,0,0,0);

                    if(e_time.getTime()<now.getTime()){
                        top.Dialog.alert("手机话费额度已经过期");
                        return false;
                    }

                    /******************************/
                }
            }
            //dianHuaValidation(num,i,type)
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
 *
 * @param type
 */
function dianHuaValidation(num,i,type) {
    if(""!=type){
        if(phoneInvoceIDs.indexOf(type)!=-1){
            //电话类型
            var rmb = Number($("#"+sbbzje_field+"_"+num[i]).val())*Number($("#"+field_name2+"_"+num[i]).val())//×汇率所得值

            $("#"+ybxje_field+"_"+num[i]).val(rmb);
            var jePer=Number(rmb)*0.8;

            var bzval = $("#"+bz_field+"_"+num[i]).val();
            if(Number(jePer)<=Number(bzval)){
                $("#"+sbje_field+"_"+num[i]).val(jePer);
            }else{
                $("#"+sbje_field+"_"+num[i]).val(bzval);
            }
        }else{
            var sbVal = $("#"+ybxje_field+"_"+num[i]).val()
            $("#"+sbje_field+"_"+num[i]).val(sbVal)
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










