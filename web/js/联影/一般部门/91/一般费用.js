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

/*下处无需配置*/
var phoneInvoceIDs=""//费用类型对照表中电话费集合

/*************/
var stat;
var date;
/***************/

var fyrq="field13190"; //费用日期
var zxbz="field13200"; //执行标准
function isNull(val) {
    if(""==val||val==null||val==undefined){
        return true;
    }else{
        return false;
    }
}

$(document).ready(function(){

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

    findValidationId(3)//费用类型对照表中电话费主键id
    var num = $("#submitdtlid0").val();
    num = num.split(",")

    for (var i = 0; i < num.length; i++) {
        jdZhFun(num,i);
    }

    checkCustomize = function (){
        var num = $("#submitdtlid0").val();
        num = num.split(",")
        for (var i = 0; i < num.length; i++) {
            var index=Number(num[i])+1;
            var type = $("#"+invoice_type_field+ "_" +num[i]).val();
            var limitJe= $("#"+bz_field+"_"+num[i]).val();
            var field_name2_val = $("#" +field_name2 + "_" + num[i]).val();
            var fyrqVal = $("#" +fyrq + "_" + num[i]).val();

            var nowDate = getNowDate();
            var days = getDays(fyrqVal,nowDate)
            if(Number(days)>60){
                top.Dialog.alert("明细第"+index+"行无法提交，费用发生日期已超过60天！！！")
                return false;
            }

            if(isNull(fyrqVal)){
                top.Dialog.alert("明细第" + index + "行无法提交，费用日期为空！！！")
                return false;
            }

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
                    var date1=date.split("-");
                    var  n= $("#"+fyrq+"_"+num[i]).val();
                    n=n.split("-");
                    var e_time=new Date(date1[0],date1[1]-1,date1[2],0,0,0,0);

                    var now=new Date(n[0],n[1]-1,n[2],0,0,0,0);

                    if(e_time.getTime()<now.getTime()){
                        top.Dialog.alert("手机话费额度已经过期");
                        return false;
                    }else{
                        if(Number($("#"+bz_field+"_"+num[i]).val())<Number($("#"+sbje_field+"_"+num[i]).val()*0.8)){
                            // top.Dialog.alert("手机话费额度不足!!");
                            // return false;

                        }
                    }
                    /******************************/
                }
            }
        }
        return true;
    }
})

/**
 * 获取当前时间
 * @returns {string}
 */
function getNowDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    var nowDate = year +"-"+ month +"-"+ day;
    return nowDate;
}

/**
 * 计算两个日期相差值
 * @param strDateStart
 * @param strDateEnd
 * @returns {number | *}
 */
function getDays(strDateStart, strDateEnd) {
    var strSeparator = "-"; //日期分隔符
    var oDate1;
    var oDate2;
    var iDays;
    oDate1 = strDateStart.split(strSeparator);
    oDate2 = strDateEnd.split(strSeparator);
    var strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2]);
    var strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2]);
    iDays = parseInt(Math.abs(strDateS - strDateE) / 1000 / 60 / 60 / 24)//把相差的毫秒数转换为天数
    return iDays;
}

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
</script>




