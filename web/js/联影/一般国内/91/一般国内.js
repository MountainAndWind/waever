<script>
/**
 * 国家类别   2（中国）
 * @type {string}
 */
var ybxje_field="field13195";//人民币金额   国内
var invoice_type_field="field13245";//费用类型field1231
var jdKeyFiekds="field13215,field13216,field13217,field13218,field13219,field13220,field13221,field13222"//九段字段名称
var zhzh="field13198"//账号组合字段
var zhmc="field13199"//账号名称字段
var sbje_field="field13212"//实报金额
var bz_field="field13200";//执行标准
var daysField="field13228"//天数
var endDate="field13226"//结束日期字段
var startDate="field13224"//开始日期
var startTime="field13225"//开始时间
var endTime="field13227"//结束时间
var field_name1="field13231"//根据字段名  币种字段

var cldj="field13248"//差旅等级
var city="field13229"//城市

var taxJe="field13240"//不含税金额字段
var taxLimit="field13193"//税额
var gs_main_field="field13223";//公司主表字段  费用公司
var accoomInvoceMainId="15"//费用类型对照表中住宿类型主键id
var indoorTransMainId="8"//费用类型对照表中室内交通费主键id  室内交通费单笔不得超过100元
var canBuMainId="14"//餐补
/*下处无需配置*/
var accoomInvoceIDs=""//费用类型对照表中住宿类型集合
var indoorTransIDs=""//费用类型对照表中室内交通费集合
var canBuIDs=""//费用类型对照表中餐补集合
var array1;
/**
 * 设置必填
 */
var textValue="<img align=absmiddle src='/images/BacoError_wev8.gif' />";

/*餐补-------------------------------------------------------*/
/**
 * 设置餐补
 * @param rowNum
 */
function f_getFee(rowNum) {
    //console.log("f_getFee")
    var type=$("#"+invoice_type_field+"_"+rowNum).val();
    var s_day=$("#"+startDate+"_"+rowNum).val();
    var s_time= $("#"+startTime+"_"+rowNum).val();
    var e_day=$("#"+endDate+"_"+rowNum).val();
    var e_time=$("#"+endTime+"_"+rowNum).val();



    var s_day_r = s_day.split("-").length;
    var e_day_r = e_day.split("-").length;
    var s_time_r = s_time.split(":").length;
    var e_time_r = e_time.split(":").length;


    var res;
    if(s_day_r >1 && e_day_r >1 && s_time_r >1  && e_time_r >1 ){
        var rArray = array1.split(";");
        var search = rArray.indexOf(type);
        if (search < rArray.length - 1 && search >= 0) {
            var s_day_r = s_day.split("-");
            var e_day_r = e_day.split("-");
            var s_time_r = s_time.split(":");
            var e_time_r = e_time.split(":");

            var start_d = new Date(s_day_r[0], Number(s_day_r[1]) - 1, s_day_r[2], 0, 0, 0, 0);
            var end_d = new Date(e_day_r[0], Number(e_day_r[1]) - 1, e_day_r[2], 0, 0, 0, 0);
            var start_t = new Date(1900, Number("1") - 1, 1, s_time_r[0], s_time_r[1], 0, 0);
            var end_t = new Date(1900, Number("1") - 1, 1, e_time_r[0], e_time_r[1], 0, 0);
            if (start_d.getTime() == end_d.getTime()) {
                var dif = end_t.getTime() - start_t.getTime();
                if (dif >= 12 * 60 * 60 * 1000) {
                    res= 100;
                } else if (dif >= 10 * 60 * 60 * 1000) {
                    res=  70;
                } else if (dif >= 4 * 60 * 60 * 1000) {
                    res=  35;
                } else {
                    res=  0;
                }
            } else {
                var middle = (end_d.getTime() - start_d.getTime()) / (24 * 60 * 60 * 1000) - 1;
                var start = 0;
                var end = 0;
                var m_t = new Date(1900, Number("1") - 1, 1, 12, 0, 0, 0);
                if (start_t.getTime() > m_t.getTime()) {
                    start = 50;
                } else {
                    start = 100;
                }
                if (end_t.getTime() >= m_t.getTime()) {
                    end = 100;
                } else {
                    end = 50;
                }
                res= 100 * middle + start + end;
            }
        }
        if(!isNull(res)||res==0){
            $("#"+bz_field+"_"+rowNum+"span").html(res);
            $("#"+bz_field+"_"+rowNum).val(res);
        }
    }
}


/*餐补-------------------------------------------------------*/

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
    document.getElementById(col+"_"+num[index]+"browser").removeAttribute("disabled")
}

/**
 * 取消必填
 */
function canBt(col,num,index) {
    var btzd = $("input[name='needcheck']").val();
    btzd=btzd.replace(","+col+"_"+num[index],"")
    $("input[name='needcheck']").val(btzd);
    $("#"+col+"_"+num[index]+"browser").attr("disabled","disabled");
    $("#"+col+"_"+num[index]+"span img").remove()
}

function isNull(val) {
    if(""==val||val==null||val==undefined){
        return true;
    }else{
        return false;
    }
}


$(document).ready(function(){

    findValidationId(accoomInvoceMainId)
    findValidationId(indoorTransMainId)
    findValidationId(canBuMainId)

    var num = $("#submitdtlid0").val();
    num = num.split(",")

    $.get("/work/canbu.jsp",
        function(data, status) {
            array1= data;
        });

    if(array1==undefined){
        $.get("/work/canbu.jsp",
            function(data, status) {
                array1= data;
            });
    }
    for (var i = 0; i < num.length; i++) {
        var rowNum = num[i];
        $("#"+ invoice_type_field + "_" + rowNum).bindPropertyChange(function (e) {
            var index = e.id.split("_")[1]
            var typeVal = $("#"+invoice_type_field+ "_" + index).val();
            var flag = isNull(typeVal);
            if(!flag){
                // if(canBuIDs.indexOf(typeVal)!=-1){//dayAllowanceIDs
                if(isExist(canBuIDs,typeVal)){//dayAllowanceIDs
                    setBt(endTime,num,index);
                    setBt(startTime,num,index);
                    f_getFee(index)
                }else{
                    canBt(endTime,num,index);
                    canBt(startTime,num,index);
                    getBz(num,index);
                }
            }else{
                canBt(endTime,num,index);
                canBt(startTime,num,index);
            }
        });

        $("#"+daysField + "_" + rowNum+",#"+city + "_" + rowNum).bindPropertyChange(function (e) {
            var index = e.id.split("_")[1]
            var dayVal = $("#"+daysField+"_"+index).val();
            if(Number(dayVal)<0){
                var index=Number(index)+1
                top.Dialog.alert("明细第"+index+"行天数不能为负数请修改！！！")
            }
            var typeVal = $("#"+invoice_type_field+"_"+index).val();
            var flag = isNull(typeVal);
            if(!flag){
                if(isExist(canBuIDs,typeVal)){//dayAllowanceIDs
                    f_getFee(index)
                }else{
                    getBz(num,index);
                }
            }
        });


        /**
         * 时间触发餐补费用
         */
        $("#" +startTime + "_" + rowNum+",#" +endTime + "_" + rowNum).bindPropertyChange(function (e) {
            var index = e.id.split("_")[1]
            f_getFee(index)
        });


        jdZhFun(num,i);
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

            $("#"+daysField + "_" + rowNum).bindPropertyChange(function (e) {
                var dayVal = $("#"+daysField+"_"+rowNum).val();
                if(Number(dayVal)<0){
                    var index=Number(rowNum)+1
                    top.Dialog.alert("明细第"+index+"行天数不能为负数请修改！！！")
                }
                var typeVal = $("#"+invoice_type_field+"_"+rowNum).val();
                var flag = isNull(typeVal);
                if(!flag){
                    if(isExist(canBuIDs,typeVal)){//dayAllowanceIDs
                        f_getFee(rowNum)
                    }else{
                        getBz(num,rowNum);
                    }
                }
            });

            $("#" + invoice_type_field + "_" + rowNum).bindPropertyChange(function (e) {
                var typeVal = $("#"+invoice_type_field+"_"+rowNum).val();
                var flag = isNull(typeVal);
                if(!flag){
                    if(isExist(canBuIDs,typeVal)){//dayAllowanceIDs
                        setBt(endTime,num,rowNum);
                        setBt(startTime,num,rowNum);
                        f_getFee(rowNum)
                    }else{
                        canBt(endTime,num,rowNum);
                        canBt(startTime,num,rowNum);
                        getBz(num,rowNum);
                    }
                }else{
                    canBt(endTime,num,rowNum);
                    canBt(startTime,num,rowNum);
                }
            });



            /**
             * 时间触发餐补费用
             */
            $("#" +startTime + "_" + rowNum+",#" +endTime + "_" + rowNum).bindPropertyChange(function (e) {
                f_getFee(rowNum)
            });

            oldDtIdLength = dtIdLength;
        }
        if(oldDtIdLength > dtIdLength){
            oldDtIdLength = dtIdLength;
        }
    });

    checkCustomize = function (){
        var num = $("#submitdtlid0").val();
        num = num.split(",");
        for (var i = 0; i < num.length; i++) {
            var index=Number(i)+1;
            var endDateVal = $("#"+endDate+"_"+num[i]).val();
            var endTimeVal = $("#"+endTime+"_"+num[i]).val();
            var startDateVal = $("#"+startDate+"_"+num[i]).val();
            var startTimeVal = $("#"+startTime+"_"+num[i]).val();
            var factjeVal = $("#"+sbje_field+"_"+num[i]).val();
            var limitJeVal = $("#"+bz_field+"_"+num[i]).val();
            var invoiceVal = $("#"+invoice_type_field+"_"+num[i]).val();


            if(isExist(canBuIDs,invoiceVal)){
                if(isNull(startTimeVal)){
                    top.Dialog.alert("明细第"+index+"行无法提交, 开始时间不得为空！！！")
                    return false;
                }
                if(isNull(endTimeVal)){
                    top.Dialog.alert("明细第"+index+"行无法提交, 结束时间不得为空！！！")
                    return false;
                }
            }

            var nowDate = getNowDate();
            var days = getDays(endDateVal,nowDate)
            if(isNull(startTimeVal)){
                startTimeVal="00:00"
            }
            if(isNull(endTimeVal)){
                endTimeVal="00:00"
            }
            var start = startDateVal+" "+startTimeVal+":00"
            var end = endDateVal+" "+endTimeVal+":00"
            if(!compareTime(start,end)){
                top.Dialog.alert("明细第"+index+"行无法提交, 开始时间要早于结束时间！！！")
                return false;
            }

            if(Number(days)>60){
                top.Dialog.alert("明细第"+index+"行无法提交，费用发生日期已超过60天！！！")
                return false;
            }
            if(invoiceVal!=""){

                //if((accoomInvoceIDs+"-"+canBuIDs).indexOf(invoiceVal)!=-1) {
                if(isExist(accoomInvoceIDs,invoiceVal)||isExist(canBuIDs,invoiceVal)||isExist(indoorTransIDs,invoiceVal)) {
                    var compareJe = Number(limitJeVal);
                    if(Number(factjeVal)>Number(compareJe)){
                        top.Dialog.alert("明细第"+index+"行无法提交，报销额度超过执行标准！！！")
                        return false;
                    }
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
 * 获取执行标准
 * @param num
 * @param index
 */
function getBz(num,index) {
    var countryVal = 216;
    var invoiceVal = $("#"+invoice_type_field+"_"+num[index]).val();
    var cldjVal = $("#"+cldj).val();//
    var cityVal = $("#"+city+"_"+num[index]).val();//
    var daysVal = $("#"+daysField+"_"+num[index]).val();//
    var gjlbVal = 2;//
    $.ajax({
        type:"post",
        url:"/base/getBz.jsp",
        data: {'country':countryVal,"leixing":invoiceVal,'cldj':cldjVal,"city":cityVal,"days":daysVal,"gjlb":gjlbVal},
        dataType:"text",
        async: false,
        success:function(data){
            //   ////console.log("data:"+data)
            var str=JSON.stringify(data);
            var msg = "";
            msg=str.substring(str.indexOf("<body>")+26,str.indexOf("</body>")-12);
            //   ////console.log("getBzmsg::"+msg);
            if("-1.0"==msg||"-1"==msg||"-1.00"==msg){
                msg=0.0;
            }
            $("#"+bz_field+"_"+num[index]).val(msg)
            $("#"+bz_field+"_"+num[index]+"span").html(msg);
        },
        error:function(jqXHR){
            //   ////console.log(jqXHR);
            alert("发生错误："+ jqXHR.status);
        }
    });
}

/**
 * 比较两个时间（yyyy-MM-dd HH:mm:ss）
 * @param startTime
 * @param endTime
 * @returns {string}
 */
function compareTime(startTime,endTime) {
    var startTimes = startTime.substring(0, 10).split('-');
    var endTimes = endTime.substring(0, 10).split('-');
    startTime = startTimes[1] + '-' + startTimes[2] + '-' + startTimes[0] + ' ' + startTime.substring(10, 19);
    endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19);
    var thisResult = (Date.parse(endTime) - Date.parse(startTime)) / 3600 / 1000;
    if (thisResult < 0) {
        return false;
    } else if (thisResult > 0) {
        return true
    } else if (thisResult == 0) {
        return true
    } else {
        return false;
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
    var name="";
    var val = $("#"+gs_main_field).val()
    var alength=$("#"+gs_main_field+"span a").length;
    if(alength==1){//a.html()
        name = $("#"+gs_main_field+"span a").html();
    }else{
        name=  $("#"+gs_main_field+"span a[_key='valspan']").html();//
    }
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
        $("#"+zhzh+"_"+num[i]).val(val)
        $("#"+zhmc+"_"+num[i]).val(name)
    }
}

/**
 * 查找费用类型对照表中存在的明细
 * @param val
 */
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
            if(accoomInvoceMainId==val){
                accoomInvoceIDs=msg//费用类型对照表中电话费集合
            }else if(indoorTransMainId==val){
                indoorTransIDs=msg//费用类型对照表中结婚礼金集合
            }else if(canBuMainId==val){
                canBuIDs=msg//费用类型对照表中结婚礼金集合
            }
        },
        error:function(jqXHR){
            alert("发生错误："+ jqXHR.status);
        }
    });
}
</script>

