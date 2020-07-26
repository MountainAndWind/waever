<!-- script代码，如果需要引用js文件，请使用与HTML中相同的方式。 -->
<script type="text/javascript">

window.console = window.console || (function () {
    var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile
        = c.clear = c.exception = c.trace = c.assert = function () { };
    return c;
})();

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
var zcbxts="field14125"; //最长报销天数
var requestIdField="field13267"//请求id
var sqrField="field13247"//申请人
var gsdField="field13214"//公司段
var fylxMainId="field13269"//费用类型对照表主键13675
var cbzxField="field13216"//成本中心
var fyrq="field13190"; //费用日期

var field_name1="field13231"//根据字段名  币种字段
var field_name2="field13191"//设置值字段  汇率字段
var gs_main_field="field13223";//$("#field12735").val() 公司主表字段

/*下处无需配置*/
var phoneInvoceIDs=""//费用类型对照表中电话费集合

/*************/
var stat;
var date;
/***************/

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
        var rowNum = num[i];
        $("#"+bz_field+"_"+rowNum).attr("readonly","readonly");
        $("#"+bz_field+"_"+rowNum).attr("UNSELECTABLE","on");
        jdZhFun(num,i);

        $("#" + fyrq + "_" + rowNum + ",#" + invoice_type_field + "_" + rowNum + ",#" + fylxMainId + "_"
            + rowNum + ",#" + gsdField + "_" + rowNum+ ",#" + cbzxField + "_"
            + rowNum+ ",#" + sqrField + "_" + rowNum).bindPropertyChange(function (e) {
            var index = e.id.split("_")[1]
            //console.log("ready:index::"+index)
            getBz(index);
        });
    }


    var dtIdLength = 0;
    var oldDtIdLength = 0;
    /*
    当明细行数量增加时，为增加的明细行添加函数；当明细行数量减少时，重新计算总额
     */
    var oldLastIndex=-1;
    var detileTabId = "#submitdtlid0";
    $(detileTabId).bindPropertyChange(function () {
        dtIdLength = jQuery(detileTabId).val().split(",").length;
        if (oldDtIdLength <= dtIdLength) {
            var num = $("#submitdtlid0").val();
            num = num.split(",")
            var nowrowNum = num[num.length - 1];
            //console.log("oldLastIndex:"+oldLastIndex)
            //console.log("nowrowNum:"+nowrowNum)
            for(var index=Number(oldLastIndex)+1;index<=nowrowNum;index++){
                //console.log("index::"+index)
                var rowNum=index;
                $("#" + fyrq + "_" + rowNum + ",#" + invoice_type_field + "_" + rowNum + ",#" + fylxMainId + "_" + rowNum + ",#"
                    + gsdField + "_" + rowNum+ ",#" + cbzxField + "_" + rowNum+ ",#" + sqrField + "_" + rowNum).bindPropertyChange(function (e) {
                    //console.log("change")
                    var i = e.id.split("_")[1]
                    //console.log("i::"+i)
                    getBz(i);
                });
            }
            oldDtIdLength = dtIdLength;
            oldLastIndex=nowrowNum;
            $("#"+bz_field+"_"+nowrowNum).attr("readonly","readonly");
            $("#"+bz_field+"_"+nowrowNum).attr("UNSELECTABLE","on");
        }
        if (oldDtIdLength > dtIdLength) {
            oldDtIdLength = dtIdLength;
        }
    });

    checkCustomize = function (){
        var num = $("#submitdtlid0").val();
        num = num.split(",")
        for (var i = 0; i < num.length; i++) {
            //var index=Number(num[i])+1;
            var index=getIndex(num[i]);
            var type = $("#"+invoice_type_field+ "_" +num[i]).val();
            var limitJe= $("#"+bz_field+"_"+num[i]).val();
            var field_name2_val = $("#" +field_name2 + "_" + num[i]).val();
            var fyrqVal = $("#" +fyrq + "_" + num[i]).val();

            var nowDate = getNowDate();
            var days = getDays(fyrqVal,nowDate)
            var zcbxtsVal = $("#" +zcbxts+ "_" + num[i]).val();
            if(Number(days)>zcbxtsVal){
                top.Dialog.alert("明细第"+index+"行无法提交，费用发生日期已超过"+zcbxtsVal+"天！！！")
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
                //if(phoneInvoceIDs.indexOf(type)!=-1){
                if(isExist(phoneInvoceIDs,type)){
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
 * 判断所属类型
 * @param str
 */
function isExist(str,val) {
    if(!isNull(str)){
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

/**
 * 获取行显示行号
 * @param index
 * @returns {*|jQuery}
 */
function getIndex(index) {
    var val = $("tr[_rowindex='"+index+"'] td[class='detail0_3_1 td_etype_22'] span").html()
    return val
}


/**
 * 获取执行标准
 * @param num
 * @param index
 */
function getBz(index) {
    //console.log("getBz")
    /*var sqrVal = $("#"+sqrField+"_"+num[index]).val()
    var fylxMainIdVal = $("#"+fylxMainId+"_"+num[index]).val()
    var fyrqVal = $("#"+fyrq+"_"+num[index]).val()
    var cbzxVal = $("#"+cbzxField+"_"+num[index]).val();//
    var gsdVal = $("#"+gsdField+"_"+num[index]).val();//
    var requestId = $("#"+requestIdField+"_"+num[index]).val();//*/
    var fylxMainIdVal = $("#"+fylxMainId+"_"+index).val()
    if(!isNull(fylxMainIdVal)){
        var sqrVal = $("#"+sqrField+"_"+index).val()
        var fyrqVal = $("#"+fyrq+"_"+index).val()
        var cbzxVal = $("#"+cbzxField+"_"+index).val();//
        var gsdVal = $("#"+gsdField+"_"+index).val();//
        var requestId = $("#"+requestIdField).val();//
        //console.log("sqrVal::"+sqrVal)
        //console.log("fyrqVal::"+fyrqVal)
        //console.log("requestId::"+requestId)
        //console.log("cbzxVal::"+cbzxVal)
        //console.log("gsdVal::"+gsdVal)
        //console.log("typeMainId::"+fylxMainIdVal)
        $.ajax({
            type:"post",
            url:"/base/getBzYb.jsp",
            data: {"typeMainId":fylxMainIdVal,"sqr":sqrVal,'fyrq':fyrqVal,"requestId":requestId
                ,"cbzx":cbzxVal,"gsd":gsdVal},
            dataType:"text",
            async: false,
            success:function(data){
                //////console.log("data:"+data)
                var str=JSON.stringify(data);
                var msg = "";
                msg=str.substring(str.indexOf("<body>")+26,str.indexOf("</body>")-12);
                //////console.log("getBzmsg::"+msg);
                if("-1.0"==msg||"-1"==msg||"-1.00"==msg||""==msg){
                    msg=0.0;
                }
                $("#"+bz_field+"_"+index).val(msg)
                $("")
                //$("#"+bz_field+"_"+index+"span").html(msg);
            },
            error:function(jqXHR){
                //   //////////console.log(jqXHR);
                alert("发生错误："+ jqXHR.status);
            }
        });
    }else{
        $("#"+bz_field+"_"+index).val("");
    }

}

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

//为防止明细行添加过快，添加以下参数
var addBtnName = 'addbutton0'; //添加明细行的按钮ID -- addbutton(0,1,2...)
var detileAddId = 0 ; //明细表序号，与detileTabId、addBtnName最后一位相同（第一个明细表为0，依此叠加）
var intTime = 1000; //控制明细行添加的间隔时间，单位：毫秒。建议1000
/*
   添加弹框前事件，防止添加明细行的速度过快
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


<style>
.cusbrowwidth .e8_os{min-width:50px !important;}
</style>


<script>
//判断浏览器
$(document).ready(function(){
    function browsertest(){
        var browserVersion;
        var ua=navigator.userAgent.toLowerCase();
        if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
            //浏览器类型
            browserType = "IE";
            //浏览器版本
            browserVersion = ua.match(/msie ([\d.]+)/) != null ? ua.match(/msie ([\d.]+)/)[1] : ua.match(/rv:([\d.]+)/)[1];
            if(browserVersion == '6.0' || browserVersion == '7.0' ){
                alert('温馨提醒：当前浏览器内核版本过低，为了保证流程正常的使用，请使用如IE10版本或谷歌浏览器！');
            }
        }else{
            myBrowser();
        }

    }
    function myBrowser(){
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        if (userAgent.indexOf("Chrome") > -1){
            //alert("谷歌")
        }else{
            alert('温馨提醒：当前浏览器存在兼容性问题，为了保证流程正常的使用，请使用IE或谷歌浏览器！');
        }
    }
    browsertest();
    //myBrowser();
})
</script>
















