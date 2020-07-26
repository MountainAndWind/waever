<script type="text/javascript">
/**
 * 诺梵发票提交校验-E8
 * 1）每年4月1日起无法再发起发票开票日期非本年的流程
 * 2）每年1月1日至3月31日，用户凡提交开票日期非本年的流程，都需要提醒警告用户该发票有退回风险
 */

var nsr="#field14329";//纳税人识别号
var gmf="#field14328"//购买方
var nsr2="#field14331"//明细2纳税人识别号
var gmf2="#field14330"//明细2购买方
var gmfVals="易勤上海网络科技有限公司,诺梵上海家具制造有限公司,诺梵上海系统科技股份有限公司北京分公司," +
    "诺梵上海系统科技股份有限公司深圳分公司,诺梵上海系统科技股份有限公司南京分公司,诺梵上海系统科技股份有限公司," +
    "胜襄上海装饰科技有限公司,深圳诺梵办公系统有限公司";
var nsrVals="91310110MA1G80QM25,9131012055002543XA,91110105797565040W," +
    "91440300093957417H,913201067482212841,913101157495733290,91310120MA1HQBAD67,91440300574761896F";


/**
 * 获取行显示行号  pc
 * @param index
 * @returns {*|jQuery}
 */
function getIndex(tableIndex,index) {
    var val = $("tr[_rowindex='"+index+"'] td[class='detail"+tableIndex+"_3_1 td_etype_22'] span").html()
    /* console.log("val:"+val)
     console.log("index:"+index)*/
    return val
}

/**
 * 判断所属类型
 * @param str
 */
function isExist(str,val) {
    if(!isNull(str)){
        console.log("isExist:val:::::::"+val)
        var arr = str.split(",")
        for (var i = 0; i < arr.length; i++) {
            console.log("arr{i}:"+arr[i])
            console.log("arr[i]==val:"+(arr[i]==val))
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
        return true;
    }else{
        return false;
    }
}


jQuery(document).ready(function(){

    //字段配置
    var kprq="field10656";//开票日期  明细表1
    var kprq2="field10664";//开票日期  明细表2
    var sqrq="field10502"; //申请日期  主表
    var msg="每年4月1日起无法再发起发票开票日期非本年的流程！"; //提示语句-阻止
    var msg2="该发票有退回风险,是否继续提交"; //提示语句-确认
    var mx="0"; //明细表1,从0开始
    var mx2="1";//明细表2

    //流程提交拦截
    checkCustomize=function  () {

        debugger
        var sqrq_v=$("#"+sqrq).val();//申请日期
        var sqrq_year=sqrq_v.substring(0,4)*1.0;
        var sqrq_month=sqrq_v.substring(5,7)*1.0;

        var IndexStr="";
        var IndexStr2="";
        var flag = true;
        var flag2= true;
        //明细表1
        var idvalues = document.getElementById('submitdtlid'+mx).value; //明细表1具体行id
        //idvalues = idvalues.split(",").filter(item => item != '');

        var alertFlag=false;
        var alertInfo=""
        for (var i = 0; i < idvalues.length; i++) {

            /*         发票验证       */
            var index = getIndex(0,idvalues[i]);
            var nsrVal = $(nsr+"_"+idvalues[i]).val()
            var gmfVal = getGmf($(gmf+"_"+idvalues[i]).val());

            console.log("nsrVal::"+nsrVal)
            console.log("gmfVal::"+gmfVal)
            if(""!=gmfVal){
                console.log("!isExist(nsrVals,nsrVal)||!isExist(gmfVals,gmfVal)::"+(!isExist(nsrVals,nsrVal)||!isExist(gmfVals,gmfVal)))
                if(!isExist(nsrVals,nsrVal)||!isExist(gmfVals,gmfVal)){
                    alertFlag=true;
                    alertInfo+="明细1第"+index+"行:发票抬头或纳税人识别号有误"+"\n";
                }
            }
            /*        发票验证       */


            var j=i+1;
            var kprq_v=$("#"+kprq+"_"+idvalues[i]).val();
            if(kprq_v!=undefined){
                //console.log(kprq_v+"--"+sqrq_v);
                var kprq_year=kprq_v.substring(0,4)*1.0;
                var kprq_month=kprq_v.substring(5,7)*1.0;

                if(sqrq_month>=4&&kprq_year!=sqrq_year){

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


        //明细表2
        var idvalues2 = document.getElementById('submitdtlid'+mx2).value; //明细表1具体行id
        idvalues2 = idvalues2.split(",").filter(item => item != '');
        console.log("idvalues2::"+idvalues2)
        for (var i = 0; i < idvalues2.length; i++) {

            /*         发票验证       */
            var index = getIndex(1,idvalues2[i]);
            var nsrVal = $(nsr2+"_"+idvalues2[i]).val()
            var gmfVal = getGmf($(gmf2+"_"+idvalues2[i]).val());

            console.log("nsrVal::"+nsrVal)
            console.log("gmfVal::"+gmfVal)
            if(""!=gmfVal){
                console.log("!isExist(nsrVals,nsrVal)||!isExist(gmfVals,gmfVal)::"+(!isExist(nsrVals,nsrVal)||!isExist(gmfVals,gmfVal)))
                if(!isExist(nsrVals,nsrVal)||!isExist(gmfVals,gmfVal)){
                    alertFlag=true;
                    alertInfo+="明细2第"+index+"行:发票抬头或纳税人识别号有误"+"\n";
                }
            }
            /*        发票验证       */


            var j=i+1;
            var kprq2_v=$("#"+kprq2+"_"+idvalues2[i]).val();
            if(kprq2_v!=undefined){
                var kprq2_year=kprq2_v.substring(0,4)*1.0;
                var kprq2_month=kprq2_v.substring(5,7)*1.0;

                if(sqrq_month>=4&&kprq2_year!=sqrq_year){

                    if(IndexStr2.length==0){
                        IndexStr2=j;
                    }else{
                        IndexStr2=IndexStr2+","+j;
                    }
                    flag = false;
                }

                if(sqrq_month<=3&&kprq2_year!=sqrq_year){
                    flag2=false;
                }

            }
        }

        if(alertFlag){
            alert(alertInfo);
            return false
        }
        if(flag2){
            //不满足第二点
            if(flag){
                //提交成功
                return true;
            }else{
                //提示报错信息
                if(IndexStr2!=""){
                    window.top.Dialog.alert("明细表2 第"+IndexStr2+"行 "+msg);
                }
                if(IndexStr!=""){
                    window.top.Dialog.alert("明细表1 第"+IndexStr+"行 "+msg);
                }

                return false;
            }
        }else{
            if (confirm(msg2) == true) {	 //确认框
                if(flag){
                    //提交成功
                    return true;
                }else{
                    //提示报错信息
                    if(IndexStr2!=""){
                        window.top.Dialog.alert("明细表2 第"+IndexStr2+"行 "+msg);
                    }
                    if(IndexStr!=""){
                        window.top.Dialog.alert("明细表1 第"+IndexStr+"行 "+msg);
                    }

                    return false;
                }
            } else {
                return false;
            }
        }
    }
});

/**
 * 去扩号
 */
function getGmf(gmf) {
    return gmf.replace(/["'()]/g,"").replace(/["'（）]/g,"");
}
</script>

<script>
var fphmField2="#field11080"//
var fphmField="#field11078"//

$(document).ready(function(){
    console.log("ready2");
    /*查重判断*/
    var num = $("#submitdtlid0").val();
    console.log("num::"+num)
    num = num.split(",")
    console.log("num::"+num)
    for (var i = 0; i < num.length; i++) {
        var rowNum = num[i];
        console.log("rowNum::"+rowNum)
        $(fphmField + "_" + rowNum).bindPropertyChange(function (e) {
            var rowNumIndex = e.id.split("_")[1]
            validationFphm(rowNumIndex,1)
        });
    }

    var num2= $("#submitdtlid1").val();
    num2 = num2.split(",")
    for (var i = 0; i < num2.length; i++) {
        var rowNum = num2[i];
        $(fphmField + "_" + rowNum).bindPropertyChange(function (e) {
            var rowNumIndex = e.id.split("_")[1]
            validationFphm(rowNumIndex,2)
        });
    }


    var dtIdLength = 0;
    var oldDtIdLength = 0;
    /*
    当明细行数量增加时，为增加的明细行添加函数；当明细行数量减少时，重新计算总额
     */
    var detileTabId = "#submitdtlid0";
    $(detileTabId).bindPropertyChange(function (e) {
        console.log("change1")
        dtIdLength = jQuery(detileTabId).val().split(",").length;
        console.log("dtIdLength::"+dtIdLength)
        console.log("oldDtIdLength::"+oldDtIdLength)
        if (oldDtIdLength <= dtIdLength){
            var num=$("#submitdtlid0").val();
            num = num.split(",")
            var rowNum = num[num.length-1];
            console.log("rowNum::"+rowNum)
            $(fphmField + "_" + rowNum).bindPropertyChange(function (e) {
                var rowNumIndex = e.id.split("_")[1]
                validationFphm(rowNumIndex,1)
            });
            oldDtIdLength = dtIdLength;
        }
        if(oldDtIdLength > dtIdLength){
            oldDtIdLength = dtIdLength;
        }
    });


    var dtIdLength2 = 0;
    var oldDtIdLength2 = 0;
    /*
    当明细行数量增加时，为增加的明细行添加函数；当明细行数量减少时，重新计算总额
     */
    var detileTabId2 = "#submitdtlid1";
    $(detileTabId2).bindPropertyChange(function () {
        console.log("change2")
        dtIdLength2 = jQuery(detileTabId2).val().split(",").length;
        console.log("dtIdLength2::"+dtIdLength2)
        console.log("oldDtIdLength2::"+oldDtIdLength2)
        if (oldDtIdLength2 <= dtIdLength2){
            var num=$("#submitdtlid1").val();
            num = num.split(",")
            var rowNum = num[num.length-1];
            console.log("rowNum::"+rowNum)
            $(fphmField2 + "_" + rowNum).bindPropertyChange(function (e) {
                var rowNumIndex = e.id.split("_")[1]
                validationFphm(rowNumIndex,2)
            });
            oldDtIdLength2 = dtIdLength2;
        }
        if(oldDtIdLength2 > dtIdLength2){
            oldDtIdLength2 = dtIdLength2;
        }
    });
    /*查重判断*/
})


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

//为防止明细行添加过快，添加以下参数
var addBtnName2 = 'addbutton1'; //添加明细行的按钮ID -- addbutton(0,1,2...)
var detileAddId2 = 1 ; //明细表序号，与detileTabId、addBtnName最后一位相同（第一个明细表为0，依此叠加）
/*
 * 添加弹框前事件，防止添加明细行的速度过快
 */
var regBorwserEvent = function() {
    var time1 = new Date();
    var addDtBtnId = document.getElementsByName(addBtnName2)[detileAddId2].id;
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

function validationFphm(index,type) {
    console.log("validationFphm::" + index)
    console.log("type::"+type)
    var fphm=""
    if(type==1){
        fphm=fphmField;
    }else{
        fphm=fphmField2;
    }
    console.log("fphm::"+fphm)
    var val = $(fphm + "_" + index).val();
    console.log("val::"+val)
    var num = $("#submitdtlid0").val();
    num = num.split(",")

    console.log("val==''"+(val==""))
    console.log("val != \"\""+(val != ""))

    if (val != "") {
        for (var i = 0; i < num.length; i++) {
            var vali = $(fphmField + "_" + num[i]).val();
            console.log("vali::"+vali)
            console.log("val == vali::"+(val == vali))
            console.log("type==1::"+(type==1))
            if(type==1){
                if(index!=num[i]){
                    if (val == vali) {
                        window.top.Dialog.alert("发票选择与明细1第" + getIndex(0,num[i]) + "行重复，请重新选择发票！");
                        $(fphm+"_"+index).val("")
                        $(fphm+"_"+index+"span a").html("")
                        return ;
                    }
                }
            }else{
                if (val == vali) {
                    window.top.Dialog.alert("发票选择与明细1第" + getIndex(0,num[i]) + "行重复，请重新选择发票！");
                    $(fphm+"_"+index).val("")
                    $(fphm+"_"+index+"span a").html("")
                    return ;
                }
            }
        }
    }

    var num2 = $("#submitdtlid1").val();
    num2 = num2.split(",")
    if (val != "") {
        for (var i = 0; i < num2.length; i++) {
            var vali = $(fphmField2 + "_" + num[i]).val();
            console.log("vali::"+vali)
            console.log("val == vali::"+(val == vali))
            console.log("type==2::"+(type==2))
            if(type==2){
                if(index!=num2[i]){
                    if (val == vali) {
                        window.top.Dialog.alert("发票选择与明细2第" + getIndex(1,num2[i]) + "行重复，请重新选择发票！");
                        $(fphm+"_"+index).val("")
                        $(fphm+"_"+index+"span a").html("")
                        return ;
                    }
                }
            }else{
                if (val == vali) {
                    window.top.Dialog.alert("发票选择与明细2第" + getIndex(1,num2[i]) + "行重复，请重新选择发票！");
                    $(fphm+"_"+index).val("")
                    $(fphm+"_"+index+"span a").html("")
                    return ;
                }
            }
        }
    }
}
</script>






