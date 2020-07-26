<script type="text/javascript">
var nsr="#field14327";//纳税人识别号
var gmf="#field14326"//购买方
var gmfVals="易勤上海网络科技有限公司,诺梵上海家具制造有限公司,诺梵上海系统科技股份有限公司北京分公司," +
    "诺梵上海系统科技股份有限公司深圳分公司,诺梵上海系统科技股份有限公司南京分公司,诺梵上海系统科技股份有限公司," +
    "胜襄上海装饰科技有限公司,深圳诺梵办公系统有限公司";
var nsrVals="91310110MA1G80QM25,9131012055002543XA,91110105797565040W," +
    "91440300093957417H,913201067482212841,913101157495733290,91310120MA1HQBAD67,91440300574761896F";

/**
 * 诺梵发票提交校验-E8
 * 1）每年4月1日起无法再发起发票开票日期非本年的流程
 * 2）每年1月1日至3月31日，用户凡提交开票日期非本年的流程，都需要提醒警告用户该发票有退回风险
 */

/**
 * 获取行显示行号
 * @param index
 * @returns {*|jQuery}
 */
function getIndex(index) {
    var val = $("tr[_rowindex='"+index+"'] td[class='detail0_3_1 td_etype_22'] span").html()
    console.log("val:"+val)
    console.log("index:"+index)
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
    var kprq="field11175";//开票日期  明细表
    var sqrq="field11163"; //申请日期  主表
    var msg="每年4月1日起无法再发起发票开票日期非本年的流程！"; //提示语句-阻止
    var msg2="该发票有退回风险,是否继续提交"; //提示语句-确认
    var mx="0"; //明细表1,从0开始

    //流程提交拦截
    checkCustomize=function  () {

        var sqrq_v=$("#"+sqrq).val();//申请日期
        var sqrq_year=sqrq_v.substring(0,4)*1.0;
        var sqrq_month=sqrq_v.substring(5,7)*1.0;

        var IndexStr="";
        var flag = true;
        var flag2= true;
        var idvalues = document.getElementById('submitdtlid'+mx).value; //明细表1具体行id
        idvalues = idvalues.split(",")

        var alertFlag=false;
        var alertInfo=""
        for (var i = 0; i < idvalues.length; i++) {
            /*         发票验证       */
            var index = getIndex(idvalues[i]);
            var nsrVal = $(nsr+"_"+idvalues[i]).val()
            var gmfVal = getGmf($(gmf+"_"+idvalues[i]).val());
            console.log("nsrVal::"+nsrVal)
            console.log("gmfVal::"+gmfVal)
            if(""!=gmfVal){
                console.log("!isExist(nsrVals,nsrVal)||!isExist(gmfVals,gmfVal)::"+(!isExist(nsrVals,nsrVal)||!isExist(gmfVals,gmfVal)))
                if(!isExist(nsrVals,nsrVal)||!isExist(gmfVals,gmfVal)){
                    alertFlag=true;
                    alertInfo+="第"+index+"行:发票抬头或纳税人识别号有误"+"\n";
                }
            }
            /*        发票验证       */
            var j=i+1;
            var kprq_v=$("#"+kprq+"_"+idvalues[i]).val();
            if(kprq_v!=undefined){
                console.log(kprq_v+"--"+sqrq_v);
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
                window.top.Dialog.alert("第"+IndexStr+"行 "+msg);
                return false;
            }
        }else{
            if (confirm(msg2) == true) {	 //确认框
                if(flag){
                    //提交成功
                    return true;
                }else{
                    //提示报错信息
                    window.top.Dialog.alert("第"+IndexStr+"行 "+msg);
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




<script type="text/javascript">

var ftlx="#field11235"
var table="formtable_main_185";//填写表单表明
var bmField="#field11223"//部门字段
var ftblField="#field11215"//分摊比列
var jeField="#field11214"//分摊金额
var bxje="#field11174"//报销金额
var bxjeXiao="#field11242"//报销金额小写
var res="";
var requestId="#field11268"//请求id

var jeCount=0;//ftje合计

var fphmField="#field11224"


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

function validationFphm(index) {
    console.log("validationFphm::" + index)
    var val = $(fphmField + "_" + index).val();
    var num = $("#submitdtlid0").val();
    num = num.split(",")
    if (val != "") {
        for (var i = 0; i < num.length; i++) {
            if(index!=num[i]){
                var vali = $(fphmField + "_" + num[i]).val();
                if (val == vali) {
                    window.top.Dialog.alert("发票选择与第" + getIndex(num[i]) + "行重复，请重新选择发票！");
                    $(fphmField+"_"+index).val("")
                    $(fphmField+"_"+index+"span").html("")
                    return ;
                }
            }
        }
    }
}


$(document).ready(function(){

    console.log("ready2")
    /*查重判断*/
    var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        var rowNum = num[i];
        $(fphmField + "_" + rowNum).bindPropertyChange(function (e) {
            var rowNumIndex = e.id.split("_")[1]
            validationFphm(rowNumIndex)
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
        console.log("dtIdLength::"+dtIdLength)
        console.log("oldDtIdLength::"+oldDtIdLength)
        if (oldDtIdLength <= dtIdLength){
            var num=$("#submitdtlid0").val();
            num = num.split(",")
            var rowNum = num[num.length-1];
            console.log("rowNum::"+rowNum)
            $(fphmField + "_" + rowNum).bindPropertyChange(function (e) {
                var rowNumIndex = e.id.split("_")[1]
                validationFphm(rowNumIndex)
            });
            oldDtIdLength = dtIdLength;
        }
        if(oldDtIdLength > dtIdLength){
            oldDtIdLength = dtIdLength;
        }
    });
    /*查重判断*/


    $(ftlx).bindPropertyChange(function (e) {
        var val = $(ftlx).val()
        console.log("val::"+ftlx)
        $("#oTable1 [_target='datarow']").remove()
        var requestIdVal=$(requestId).val();
        console.log("requestIdVal::"+requestIdVal)
        getDetailInfo(val,requestIdVal);
        resetJe();
    });
})

function resetJe() {
    console.log("resetJe")
    var bxJe=$(bxjeXiao).val()
    console.log("resetJe bxJe::"+bxJe);
    console.log("jeCount::"+jeCount)
    var disCount=Number(bxJe*100)-Number(jeCount*100);
    disCount=disCount/100
    console.log("disCount::"+disCount)
    var index = $("#submitdtlid1").val().split(",")[0];
    console.log("index::"+index)
    var jeOne = $(jeField+"_"+index).val();
    console.log("jeOne::"+jeOne)
    var newVal=Number(jeOne)+Number(disCount);
    console.log("newVal::"+newVal);
    $(jeField+"_"+index).val(newVal);
}

$(bxje).bindPropertyChange(function (e) {
    var num = $("#submitdtlid1").val();
    num = num.split(",")
    var jeTotal=0
    for (var i = 0; i < num.length; i++) {
        var bxjeVal = Number($(bxje).val());
        var ftbl=$(ftblField+"_"+num[i]).val();
        console.log("bxjeVal::"+bxjeVal)
        console.log("ftbl::"+ftbl)
        var jeFieldVal=bxjeVal*ftbl
        var jeVal = getTwoXiaoshu(jeFieldVal);
        console.log("jeVal::"+jeVal)
        jeTotal=Number(jeTotal)+Number(jeVal);
        $(jeField+"_"+num[i]).val(jeVal);
        console.log("jeTotal::"+jeTotal)
    }
    jeCount=getTwoXiaoshu(jeTotal)
    resetJe()
});

/**
 * 根据分摊类型带出不同的明细数据
 */
function getDetailInfo(val,requestIdVal) {
    var beginIndex=0
    if(val!=""){
        findMsg(val,requestIdVal);
        var tableIndexs = $("#submitdtlid1").val();
        $("#submitdtlid1").val("")
        if(""!=tableIndexs){
            var split = tableIndexs.split(",");
            beginIndex=Number(split[split.length-1])+1;
        }
        console.log("beginIndex::"+beginIndex)
        var jeTotal=0
        for(var index=0;index<res.length;index++){
            var bm = res[index].bm
            var ftbl = res[index].ftbl
            addRow1(1)
            var rowIndex=Number(index)+1
            console.log("rowIndex:"+rowIndex)
            $("table[name='oTable1'] tr[_rowindex='"+beginIndex+"'] .td_etype_22 span").html(rowIndex)
            $(bmField+"_"+beginIndex).val(bm);
            $(ftblField+"_"+beginIndex).val(ftbl);
            var bxjeVal = Number($(bxje).val());
            console.log("bxjeVal::"+bxjeVal)
            var jeFieldVal=bxjeVal*ftbl
            var jeVal = getTwoXiaoshu(jeFieldVal);
            console.log("jeFieldVal::"+jeVal)
            $(jeField+"_"+beginIndex).val(jeVal);
            //jeTotal=Number(jeTotal)+Number(jeVal)
            jeTotal = accAdd(jeTotal,jeVal)
            beginIndex++;
        }
        jeCount=getTwoXiaoshu(jeTotal)
    }
}

// 两个浮点数求和
function accAdd(num1,num2){
    var r1,r2,m;
    try{
        r1 = num1.toString().split('.')[1].length;
    }catch(e){
        r1 = 0;
    }
    try{
        r2=num2.toString().split(".")[1].length;
    }catch(e){
        r2=0;
    }
    m=Math.pow(10,Math.max(r1,r2));
    // return (num1*m+num2*m)/m;
    return Math.round(num1*m+num2*m)/m;
}

//获取两位小数非截取
function getTwoXiaoshu(num) {
    return Math.floor(num*100)/100
}

function findMsg(val,requestIdVal) {
    console.log("findValidationId")
    $.ajax({
        type:"GET",
        url:"/aes/findDetail.jsp?",
        data: {'table':table,"requestId":requestIdVal,"type":val,'timeStamp':new Date().getTime()},
        dataType:"text",
        async: false,
        success:function(data){
            /*var str=JSON.stringify(data);*/
            console.log("data::"+data)
            var str=JSON.stringify(data);
            console.log("str::"+str)
            var msg=str.substring(str.indexOf('body>')+25,str.indexOf('/body>')-13);
            console.log("msg::"+msg)
            msg=JSON.parse(msg.replace(/\\/g,""))
            console.log("msg::"+msg)
            res=msg;
        },
        error:function(jqXHR){
            console.log(jqXHR);
            alert("发生错误："+ jqXHR.status);
        }
    });
}
</script>










