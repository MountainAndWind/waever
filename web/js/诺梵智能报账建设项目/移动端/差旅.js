<script type="text/javascript">

var nsr="#field14443";//纳税人识别号
var gmf="#field14442"//购买方

var nsr2="#field14445"//明细2纳税人识别号
var gmf2="#field14444"//明细2购买方
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

jQuery(document).ready(function(){

    /**
     * 诺梵发票提交校验-E8--移动端
     * 1）每年4月1日起无法再发起发票开票日期非本年的流程
     * 2）每年1月1日至3月31日，用户凡提交开票日期非本年的流程，都需要提醒警告用户该发票有退回风险
     */

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
                    alertInfo+="明细1第"+index+"行:发票抬头或纳税人识别号有误"+"\n";
                }
            }
        }


        idvalues = getDetialIndexArr(1)
        for (var i = 0; i < idvalues.length; i++) {
            /*         发票验证       */
            var index = getIndex(0,idvalues[i]);
            var nsrVal = $(nsr2+"_"+idvalues[i]).val()
            var gmfVal = getGmf($(gmf2+"_"+idvalues[i]).val());
            console.log("nsrVal::"+nsrVal)
            console.log("gmfVal::"+gmfVal)
            if(""!=gmfVal){
                console.log("!isExist(nsrVals,nsrVal)||!isExist(gmfVals,gmfVal)::"+(!isExist(nsrVals,nsrVal)||!isExist(gmfVals,gmfVal)))
                if(!isExist(nsrVals,nsrVal)||!isExist(gmfVals,gmfVal)){
                    alertFlag=true;
                    alertInfo+="明细2第"+index+"行:发票抬头或纳税人识别号有误"+"\n";
                }
            }
        }

        /*        发票验证       */
        if(alertFlag){
            alert(alertInfo);
            return false
        }

        /* -------------------------发票验证--------------------------  */

        var sqrq="field6126"; //申请日期  主表
        var sqrq_v=$("#"+sqrq).val();//申请日期
        var sqrq_year=sqrq_v.substring(0,4)*1.0;
        var sqrq_month=sqrq_v.substring(5,7)*1.0;

        var flag = true;
        var pd=$("#field14592").val()*1.0; //判断1
        var pd2=$("#field14593").val()*1.0; //判断2

        if(sqrq_month<=3){

            if(pd>0){ //不满足
                flag=false;
            }
            if(pd2>0){ //不满足
                flag=false;
            }
        }

        if(flag){

            if(sqrq_month>=4){

                if(pd>0||pd2>0){ //不满足
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
})


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









