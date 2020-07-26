<script type="text/javascript">

var nsr="#field14441";//纳税人识别号
var gmf="#field14440"//购买方
var gmfVals="易勤上海网络科技有限公司,诺梵上海家具制造有限公司,诺梵上海系统科技股份有限公司北京分公司," +
    "诺梵上海系统科技股份有限公司深圳分公司,诺梵上海系统科技股份有限公司南京分公司,诺梵上海系统科技股份有限公司," +
    "胜襄上海装饰科技有限公司,深圳诺梵办公系统有限公司";
var nsrVals="91310110MA1G80QM25,9131012055002543XA,91110105797565040W," +
    "91440300093957417H,913201067482212841,913101157495733290,91310120MA1HQBAD67,91440300574761896F";


/**
 * 去扩号
 */
function getGmf(gmf) {
    return gmf.replace(/["'()]/g,"").replace(/["'（）]/g,"");
}

/**
 * 诺梵发票提交校验-E8--移动端
 * 1）每年4月1日起无法再发起发票开票日期非本年的流程
 * 2）每年1月1日至3月31日，用户凡提交开票日期非本年的流程，都需要提醒警告用户该发票有退回风险
 */
jQuery(document).ready(function(){


    var msg="该发票有退回风险,是否继续提交"; //提示语句-确认
    var msg2="每年4月1日起无法再发起发票开票日期非本年的流程！";
    //流程提交拦截
    checkCustomize=function  () {
        /* -------------------------发票验证--------------------------  */
        var alertFlag=false;
        var alertInfo=""
        var idvalues = getDetialIndexArr(0)
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
                    alertInfo+="第"+index+"行:发票抬头或纳税人识别号有误"+"\n";
                }
            }
            /*        发票验证       */
        }

        if(alertFlag){
            alert(alertInfo);
            return false
        }

        /* -------------------------发票验证--------------------------  */

        var sqrq="field6184"; //申请日期  主表
        var sqrq_v=$("#"+sqrq).val();//申请日期
        var sqrq_year=sqrq_v.substring(0,4)*1.0;
        var sqrq_month=sqrq_v.substring(5,7)*1.0;

        var flag = true;
        var pd=$("#field14470").val()*1.0; //判断1

        if(sqrq_month<=3){

            if(pd>0){ //不满足
                flag=false;
            }
        }

        if(flag){

            if(sqrq_month>=4){

                if(pd>0){ //不满足
                    alert(msg2);
                    return false;
                }else{
                    return true;
                }
            }
        }else{
            if (confirm(msg) == true) {	 //确认框
                return true;
            }else {
                return false;
            }
        }
    }
});

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


/**
 * 获取移动端明细下标数组
 * @param index 明细索引 从0 开始计值 明细1 就是0 明细2就是1
 */
function getDetialIndexArr(index) {
    var arr = new Array();
    $("#oTable"+index+" tr[_target='datarow']").each(function(){
        var nameVal = $(this).attr("name");
        if(!isNull(nameVal)){
            arr.push(nameVal.split("_")[2]);
        }
    });
    return arr;
}

/**
 * 移动端获取明细显示值
 * @param field   field 与pc一样写法  #field1231
 * @param tableIndex   明细索引 从0 开始计值 明细1 就是0 明细2就是1
 * @param colIndex     行索引
 */
function getDetailShowVal(field,tableIndex,colIndex) {
    var divObj = "#isshow"+tableIndex+"_"+colIndex+"_"+field.replace("#field","")
    return $(divObj).html();
}

/**
 * 移动端获取明细值
 * @param field   field 与pc一样写法  #field1231
 * @param tableIndex   明细索引 从0 开始计值 明细1 就是0 明细2就是1
 * @param colIndex     行索引
 */
function setDetailVal(field,tableIndex,colIndex,val) {
    var divObj = "#isshow"+tableIndex+"_"+colIndex+"_"+field.replace("#field","")
    $(field+"_"+colIndex).val(val)
    $(divObj).html(val);
}
/**
 * 获取行显示行号
 * @param index  行缩影
 * @param tableIndex
 * @returns {*|jQuery}
 */
function getIndex(tableIndex,index) {//trView_0_0
    var val = $("tr[name='trView_"+tableIndex+"_"+index+"'] td[class='detail"+tableIndex+"_3_1 td_etype_22'] span").html()
    return val
}

function isNull(val) {
    if(""==val||val==null||val==undefined){
        return true;
    }else{
        return false;
    }
}
</script>

<script type="text/javascript">

var ftlx="#field11237"
var table="formtable_main_29";//填写表单表明
var bmField="#field10979"//部门字段
var ftblField="#field10424"//分摊比列
var jeField="#field10422"//分摊金额
var bxje="#field6209"//报销金额
var bxjeXiao="#field11246"//报销金额小写
var res="";
var requestId="#field11271"//请求id

var jeCount=0;//ftje合计

var fphmField="#field11082"


$(document).ready(function(){
    console.log("ready2")

    /*分摊*/
    $(ftlx).bindPropertyChange(function (e) {
        var val = $(ftlx).val()
        console.log("val::"+ftlx)
        $("#oTable1 [_target='datarow']").remove()
        $("#nodenum1").val("0");
        var requestIdVal=$(requestId).val();
        console.log("requestIdVal::"+requestIdVal)
        getDetailInfo(val,requestIdVal);
        resetJe();
    });
})

function resetJe() {
    console.log("resetJe")
    var bxJe=$(bxjeXiao).val()
    var disCount=Number(bxJe*100)-Number(jeCount*100);
    disCount=disCount
    var index = getDetialIndexArr(1)[0];
    var jeOne = $(jeField+"_"+index).val();
    var newVal=(Number(jeOne)*100+Number(disCount))/100;
    $(jeField+"_"+index).val(newVal);
    setDetailVal(jeField,1,index,newVal);

}

$(bxje).bindPropertyChange(function (e) {
    var num = getDetialIndexArr(1);
    var jeTotal=0
    for (var i = 0; i < num.length; i++) {
        var bxjeVal = Number($(bxje).val());
        var ftbl=$(ftblField+"_"+num[i]).val();
        var jeFieldVal=bxjeVal*ftbl
        var jeVal = getTwoXiaoshu(jeFieldVal);
        jeTotal=Number(jeTotal)+Number(jeVal);
        //$(jeField+"_"+num[i]).val(jeVal);
        setDetailVal(jeField,1,num[i],jeVal)
    }
    jeCount=getTwoXiaoshu(jeTotal)
    resetJe()
});

/**
 * 根据分摊类型带出不同的明细数据
 */
function getDetailInfo(val,requestIdVal) {
    if(val!=""){
        findMsg(val,requestIdVal);
        var tableIndexs =  getDetialIndexArr(1)
        //$("#submitdtlid1").val("")
        var beginIndex = $("#nodenum1").val();
        console.log("beginIndex::"+beginIndex)
        var jeTotal=0
        for(var index=0;index<res.length;index++){
            var bm = res[index].bm
            var ftbl = res[index].ftbl
            addRow1(1)
            var rowIndex=Number(index)+1
            console.log("rowIndex:"+rowIndex)
            $("table[name='oTable1'] tr[_rowindex='"+beginIndex+"'] .td_etype_22 span").html(rowIndex)
            setDetailVal(bmField,1,beginIndex,bm);
            //$(bmField+"_"+beginIndex).val(bm);
            //$(ftblField+"_"+beginIndex).val(ftbl);
            setDetailVal(ftblField,1,beginIndex,ftbl);
            var bxjeVal = Number($(bxje).val());
            //var jeFieldVal=bxjeVal*ftbl
            //var jeVal = getTwoXiaoshu(jeFieldVal);
            var jeFieldVal = accMul(bxjeVal,ftbl)
            var jeVal = getTwoXiaoshu(jeFieldVal);
            setDetailVal(jeField,1,beginIndex,jeVal);
            jeTotal = accAdd(jeTotal,jeVal)
            beginIndex++;
        }
        //jeCount=getTwoXiaoshu(jeTotal)
        jeCount=jeTotal
    }
}

/**
 * 浮点数相乘
 * @param arg1
 * @param arg2
 * @returns {number}
 */
function accMul(arg1,arg2){
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
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







