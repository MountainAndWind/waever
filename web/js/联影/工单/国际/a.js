<script>
/**
 * �������ж�ʱ������ʱ�й�ִ�б�׼����ʹ��CNY����
 * ������Ϊ���й� ִ�б�׼����USD ��������
 * @type {string}
 */
var sbje_field="field13620"//ʵ������ֶ�field12723
var bz_field="field13608";//��׼�ֶ�field1231
var daysField="field13636"//����
var sbbzje_field="field13600";//�걨���ֽ���ֶ�field12498

var endDate="field13634"//���������ֶ�
var startDate="field13632"//��ʼ����
var startTime="field13633"//
var endTime="field13635"//


var sqrField="field13653"//������
var requestIdField="field13673"//����id
var cbzxField="field13624"//�ɱ�����
var gsdField="field13622"//��˾��
var fylxMainId="field13675"//�������Ͷ��ձ�����13675
var cldj="field13687"//���õȼ�  ��CRMְ��
var gjlb="field13657"//�������

var invoice_type_field="field13651";//��������field1231
var jdKeyFiekds="field13623,field13624,field13625,field13626,field13627,field13628,field13629,field13630"//�Ŷ��ֶ�����

var zhzh="field13606"//�˺�����ֶ�
var zhmc="field13607"//�˺������ֶ�
var field_name1="field13639"//�����ֶ���  �����ֶ�
var field_name2="field13599"//����ֵ�ֶ�  �����ֶ�
var gs_main_field="field13631";//$("#field12735").val() ��˾�����ֶ�

var dollarsRate="field13667"//��Ԫ����
var country="field13725"//����
var city="field13644"//����  ע��˴�����ڲ�ͬ
var chinaId="216";


var internationalTansInvoceMainId="12"//�������Ͷ��ձ��н�ͨ����id
var internationalAccomInvoceMainId="11"//�������Ͷ��ձ�ס��������id
var dayAllowInvoceMainId="13"//�������Ͷ��ձ��վ���������id
var accoomInvoceMainId="15"//�������Ͷ��ձ���ס����������id
var serveMainId="19"//�������Ͷ��ձ����д�������id
var indoorTransEdMainId="20"//�������Ͷ��ձ������ڽ�ͨ�������
var canBuMainId="14"//�Ͳ�
/*�´���������*/
var internationalTansInvoceIDs=""//�������Ͷ��ձ��е绰�Ѽ���
var internationalAccomInvoceIDs=""//�������Ͷ��ձ��е绰�Ѽ���
var dayAllowInvoceMainIds=""//�������Ͷ��ձ��е绰�Ѽ���
var accoomInvoceIDs=""//�������Ͷ��ձ���ס�����ͼ���
var serveIDs=""//�������Ͷ��ձ����д��Ѽ���s
var indoorTransEdIDs=""//�������Ͷ��ձ������ڽ�ͨ������ȿ��Ƽ���
var canBuIDs=""//�������Ͷ��ձ��вͲ�����
var array1;
/**
 * ���ñ���
 */
var textValue="<img align=absmiddle src='/images/BacoError_wev8.gif' />";

/*�Ͳ�-------------------------------------------------------*/
/**
 * ���òͲ�
 * @param rowNum
 */
function f_getFee(rowNum) {
    ////console.log("f_getFee")
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
        ////console.log("res::"+res)
        if(!isNull(res)){
            $("#"+bz_field+"_"+rowNum+"span").html(res);
            $("#"+bz_field+"_"+rowNum).val(res);
        }
    }
}



/*�Ͳ�-------------------------------------------------------*/




$(document).ready(function(){
    findValidationId(internationalTansInvoceMainId)
    findValidationId(internationalAccomInvoceMainId)
    findValidationId(dayAllowInvoceMainId)
    findValidationId(accoomInvoceMainId)
    findValidationId(serveMainId)
    findValidationId(indoorTransEdMainId)
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

        /* ������ ��������  ���ձ�id  �������  ���� ����*/
        $("#"+daysField + "_" + rowNum+",#" +gjlb + "_" + rowNum+",#" +city + "_" + rowNum+",#" +fylxMainId + "_" + rowNum).bindPropertyChange(function (e) {
            var index = e.id.split("_")[1]
            var dayVal = $("#"+daysField+"_"+index).val();
            if(Number(dayVal)<0){
                var index=Number(index)+1
                top.Dialog.alert("��ϸ��"+index+"����������Ϊ�������޸ģ�����")
            }
            var typeVal = $("#"+invoice_type_field+"_"+index).val();
            var flag = isNull(typeVal);
            if(!flag){
                if(isExist(canBuIDs,typeVal)){
                    f_getFee(index)
                }else{
                    getBz(num,index);
                }
            }
        });
        $("#"+invoice_type_field + "_" + rowNum).bindPropertyChange(function (e) {
            var index = e.id.split("_")[1]
            var typeVal = $("#"+invoice_type_field+ "_" + index).val();
            var flag = isNull(typeVal);
            if(!flag){
                if(isExist(canBuIDs,typeVal)){
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

        $("#" +endTime + "_" + rowNum+",#" +startTime + "_" + rowNum).bindPropertyChange(function (e) {
            var index = e.id.split("_")[1]
            f_getFee(index)
        });

        /**
         * �������㴥������
         */
        $("#" +startDate + "_" + rowNum+",#" +endDate + "_" + rowNum).bindPropertyChange(function (e) {
            var index = e.id.split("_")[1]
            setDay(index);
        });

        $("#"+fylxMainId + "_" + rowNum).bindPropertyChange(function (e) {
            var index = e.id.split("_")[1]
            setDay(index)
        });

        jdZhFun(num,i);
    }


    var dtIdLength = 0;
    var oldDtIdLength = 0;
    /*
    ����ϸ����������ʱ��Ϊ���ӵ���ϸ����Ӻ���������ϸ����������ʱ�����¼����ܶ�
     */
    var detileTabId = "#submitdtlid0";
    $(detileTabId).bindPropertyChange(function () {
        dtIdLength = jQuery(detileTabId).val().split(",").length;
        if (oldDtIdLength <= dtIdLength){
            var num=$("#submitdtlid0").val();
            num = num.split(",")
            var rowNum = num[num.length-1];
            $("#"+daysField + "_" + rowNum+",#" +gjlb + "_" + rowNum+",#" +city + "_" + rowNum+",#" +fylxMainId + "_" + rowNum).bindPropertyChange(function (e) {
                var typeVal = $("#"+invoice_type_field+"_"+rowNum).val();
                var flag = isNull(typeVal);
                if(!flag){
                    if(isExist(canBuIDs,typeVal)){
                        f_getFee(rowNum)
                    }else{
                        getBz(num,rowNum);
                    }
                }
                var dayVal = $("#"+daysField+"_"+rowNum).val();
                if(Number(dayVal)<0){
                    var index=Number(rowNum)+1
                    top.Dialog.alert("��ϸ��"+index+"����������Ϊ�������޸ģ�����")
                }
            });

            $("#"+invoice_type_field + "_" + rowNum).bindPropertyChange(function (e) {
                var typeVal = $("#"+invoice_type_field+"_"+rowNum).val();
                var flag = isNull(typeVal);
                if(!flag){
                    if(isExist(canBuIDs,typeVal)){
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
             * ʱ�䴥���Ͳ�����
             */
            $("#" +startTime + "_" + rowNum+",#" +endTime + "_" + rowNum).bindPropertyChange(function (e) {
                f_getFee(rowNum)
            });

            /**
             * ���ڼ��㴥������
             */
            $("#" +startDate + "_" + rowNum+",#" +endDate + "_" + rowNum).bindPropertyChange(function (e) {
                setDay(rowNum);
            });

            /**
             * ��������
             */
            $("#"+fylxMainId + "_" + rowNum).bindPropertyChange(function (e) {
                setDay(rowNum)
            });

            oldDtIdLength = dtIdLength;
        }
        if(oldDtIdLength > dtIdLength){
            oldDtIdLength = dtIdLength;
        }
    });


    checkCustomize = function (){//
        var errors="";
        var num = $("#submitdtlid0").val();
        num = num.split(",")
        //��ȡ��������
        for (var i = 0; i < num.length; i++) {
            var index=Number(i)+1;
            var invoiceVal = $("#"+invoice_type_field+"_"+num[i]).val();
            var field_name2_val = $("#" +field_name2 + "_" + num[i]).val();

            if(isNull(field_name2_val)||0==field_name2_val){
                top.Dialog.alert("��ϸ��" + index + "���޷��ύ�����ʲ���Ϊ�գ�����")
                return false;
            }


            var endDateVal = $("#"+endDate+"_"+num[i]).val();
            var endTimeVal = $("#"+endTime+"_"+num[i]).val();
            var startDateVal = $("#"+startDate+"_"+num[i]).val();
            var startTimeVal = $("#"+startTime+"_"+num[i]).val();
            var dollarsRateVal = $("#"+dollarsRate+"_"+num[i]).val();
            var factjeVal = $("#"+sbje_field+"_"+num[i]).val();
            var limitJeVal = $("#"+bz_field+"_"+num[i]).val();
            var countryVal = $("#"+country+"_"+num[i]).val();
            var factRmb = factjeVal;

            if(isExist(canBuIDs,invoiceVal)){
                if(isNull(startTimeVal)){
                    top.Dialog.alert("��ϸ��"+index+"���޷��ύ, ��ʼʱ�䲻��Ϊ�գ�����")
                    return false;
                }
                if(isNull(endTimeVal)){
                    top.Dialog.alert("��ϸ��"+index+"���޷��ύ, ����ʱ�䲻��Ϊ�գ�����")
                    return false;
                }
            }

            if(isNull(startTimeVal)){
                startTimeVal="00:00"
            }
            if(isNull(endTimeVal)){
                endTimeVal="00:00"
            }
            //console.log("invoiceVal:"+invoiceVal)
            //console.log("countryVal::"+countryVal)
            //console.log("chinaId==countryVal"+(chinaId==countryVal))
            //console.log("factRmb::"+factRmb)
            //console.log("canBuIDs::"+canBuIDs)
            //console.log("serveIDs::"+serveIDs)
            //console.log("indoorTransEdIDs::"+indoorTransEdIDs)
            var start = startDateVal+" "+startTimeVal+":00"
            var end = endDateVal+" "+endTimeVal+":00"
            var nowDate = getNowDate();
            var days = getDays(endDateVal,nowDate)
            if(!compareTime(start,end)){
                top.Dialog.alert("��ϸ��"+index+"���޷��ύ, ��ʼʱ��Ҫ���ڽ���ʱ�䣡����")
                return false;
            }
            //console.log("days::"+days)
            if(Number(days)>60){
                top.Dialog.alert("��ϸ��"+index+"���޷��ύ�����÷��������ѳ���60�죡����")
                return false;
            }
            if(""!=invoiceVal){
                //(dayAllowInvoceMainIds+"-"+accoomInvoceIDs+"-"+internationalTansInvoceIDs+"-"+internationalAccomInvoceIDs+"-"+serveIDs+"-"+indoorTransEdIDs).indexOf(invoiceVal)!=-1
                if(isExist(dayAllowInvoceMainIds,invoiceVal)||isExist(accoomInvoceIDs,invoiceVal)||isExist(internationalTansInvoceIDs,invoiceVal)||isExist(internationalAccomInvoceIDs,invoiceVal)||isExist(serveIDs,invoiceVal)||isExist(indoorTransEdIDs,invoiceVal)){
                    if (chinaId==countryVal) {//�����Ҵ���
                        var limitRmb = Number(limitJeVal)
                        //console.log("limitRmb����"+limitRmb)
                        if (Number(factRmb) > Number(limitRmb)) {
                            top.Dialog.alert("��ϸ��" + index + "���޷��ύ��������ȳ���ִ�б�׼������")
                            return false;
                        }
                    } else {
                        //console.log("dollarsRateVal::"+dollarsRateVal)
                        var limitRmb = Number(limitJeVal) * Number(dollarsRateVal)* 1.1;//����%10
                        //console.log("limit����"+limitRmb)
                        if (Number(factRmb) > Number(limitRmb)) {//���ʵ�����>ִ�б�׼*����*������ʣ��������ύ
                            top.Dialog.alert("��ϸ��" + index + "���޷��ύ��������ȳ���ִ�б�׼������")
                            return false;
                        }
                    }
                }
                if(isExist(canBuIDs,invoiceVal)){
                    var limitRmb = Number(limitJeVal)
                    //console.log("limitRmb����"+limitRmb)
                    if (Number(factRmb) > Number(limitRmb)) {
                        top.Dialog.alert("��ϸ��" + index + "���޷��ύ��������ȳ���ִ�б�׼������")
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
 * ��ȡ��ǰʱ��
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
 * ���������������ֵ
 * @param strDateStart
 * @param strDateEnd
 * @returns {number | *}
 */
function getDays(strDateStart, strDateEnd) {
    var strSeparator = "-"; //���ڷָ���
    var oDate1;
    var oDate2;
    var iDays;
    oDate1 = strDateStart.split(strSeparator);
    oDate2 = strDateEnd.split(strSeparator);
    var strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2]);
    var strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2]);
    iDays = parseInt(Math.abs(strDateS - strDateE) / 1000 / 60 / 60 / 24)//�����ĺ�����ת��Ϊ����
    return iDays;
}

/**
 * ���ñ���
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
 * ȡ������
 */
function canBt(col,num,index) {
    var btzd = $("input[name='needcheck']").val();
    ////////console.log("btzd::"+btzd)
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

/**
 * �Ƚ�����ʱ��
 * @param dateString1
 * @param dateString2
 * @returns {number}
 */
function  getDaysBetween(dateString1,dateString2){
    var  startDate = Date.parse(dateString1);
    var  endDate = Date.parse(dateString2);
    var days=(endDate - startDate)/(1*24*60*60*1000);
    // alert(days);
    return  days;
}

/**
 * ��������
 * @param index
 */
function setDay(index) {
    var s_day=$("#"+startDate+"_"+index).val();
    var e_day=$("#"+endDate+"_"+index).val();
    var days = getDaysBetween(s_day,e_day);
    var  type=$("#"+fylxMainId+"_"+index).val();
    if(type!="11"&&type!="15"){
        if(days>=0){
            days++;
        }
    }
    $("#"+daysField+"_"+index).val(days);
    $("#"+daysField+"_"+index+"span").html(days);
}



/**
 * �Ƚ�����ʱ�䣨yyyy-MM-dd HH:mm:ss��
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
 * �Ŷ�key val ��ֵ
 * @param num
 * @param i
 * @param type
 */
function jdZhFun(num,i) {
    var fieldName = jdKeyFiekds.split(",");
    var val=$("#"+gs_main_field).val();
    var name=$("#"+gs_main_field).val();//��ʾ��
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
        /*��ֵ*/
        $("#"+zhzh+"_"+num[i]).val(val)
        $("#"+zhmc+"_"+num[i]).val(name)
    }
}

/**
 * ����¼�������֤��ֵ
 */
$(document).click(function () {
    var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        jdZhFun(num,i);
    }
})

/**
 * ��ȡִ�б�׼   ������ ��������  ���ձ�id  �������  ���� ����
 * @param num
 * @param index
 */
function getBz(num,index) {
    //console.log("getBz::start")
    var invoiceVal = $("#"+invoice_type_field+"_"+num[index]).val();
    var sqrVal = $("#"+sqrField+"_"+num[index]).val()
    var enDateVal = $("#"+endDate+"_"+num[index]).val()
    var cldjVal = $("#"+cldj+"_"+num[index]).val()
    var requestId=$("#"+requestIdField).val()
    var cityVal = $("#"+city+"_"+num[index]).val();//
    var daysVal = $("#"+daysField+"_"+num[index]).val();//
    var cbzxVal = $("#"+cbzxField+"_"+num[index]).val();//
    var gsdVal = $("#"+gsdField+"_"+num[index]).val();//
    var fylxMainIdVal = $("#"+fylxMainId+"_"+num[index]).val();//
    var gjlbVal = $("#"+gjlb+"_"+num[index]).val();//
    //console.log("sqrVal::"+sqrVal)
    //console.log("enDateVal::"+enDateVal)
    //console.log("requestId::"+requestId)
    //console.log("cldjVal::"+cldjVal)
    //console.log("cityVal::"+cityVal)
    //console.log("daysVal::"+daysVal)
    //console.log("cbzxVal::"+cbzxVal)
    //console.log("gsdVal::"+gsdVal)
    //console.log("$(\"#\"+fylxMainId+\"_\"+num[index])::"+"#"+fylxMainId+"_"+num[index])
    //console.log("typeMainId::"+fylxMainIdVal)
    $.ajax({
        type:"post",
        url:"/base/getCsBz.jsp",
        data: {"type":invoiceVal,"typeMainId":fylxMainIdVal,"sqr":sqrVal,'fyrq':enDateVal,"requestId":requestId
            ,"cldj":cldjVal,"city":cityVal,"days":daysVal,"gjlb":gjlbVal,"cbzx":cbzxVal,"gsd":gsdVal},
        dataType:"text",
        async: false,
        success:function(data){
            //console.log("data:"+data)
            var str=JSON.stringify(data);
            var msg = "";
            msg=str.substring(str.indexOf("<body>")+26,str.indexOf("</body>")-12);
            //console.log("getBzmsg::"+msg);
            if("-1.0"==msg||"-1"==msg||"-1.00"==msg||""==msg){
                msg=0.0;
            }
            $("#"+bz_field+"_"+num[index]).val(msg)
            $("#"+bz_field+"_"+num[index]+"span").html(msg);
        },
        error:function(jqXHR){
            //   //////console.log(jqXHR);
            alert("��������"+ jqXHR.status);
        }
    });
}



/**
 * �����������
 * @param fieldVal
 * @param fieldName
 */
function ajax(fieldVal,fieldName) {
    $.ajax({
        type:"GET",
        url:"/base/findHl.jsp?fieldVal="+fieldVal,
        dataType:"text",
        //data:{jsonStr:jsonStr},
        success:function(data){
            /*var str=JSON.stringify(data);*/
            var str=JSON.stringify(data);
            var msg = "";
            msg=str.substring(str.indexOf("<body>")+26,str.indexOf("</body>")-8);
            $(fieldName).val(msg);
        },
        error:function(jqXHR){
            alert("��������"+ jqXHR.status);
        }
    });
}

/**
 *
 * @param val
 */
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
            if(internationalTansInvoceMainId==val){
                internationalTansInvoceIDs=msg//�������Ͷ��ձ��е绰�Ѽ���
            }else if(internationalAccomInvoceMainId==val){
                internationalAccomInvoceIDs=msg//�������Ͷ��ձ��н����𼯺�
            }else if(dayAllowInvoceMainId==val){
                dayAllowInvoceMainIds=msg//�ս���
            }else if(accoomInvoceMainId==val){
                accoomInvoceIDs=msg//����ס��
            }else if(canBuMainId==val){
                canBuIDs=msg//����ס��
            }else if(serveMainId==val){
                serveIDs=msg//����ס��
            }else if(indoorTransEdMainId==val){
                indoorTransEdIDs=msg//����ס��
            }
        },
        error:function(jqXHR){
            alert("��������"+ jqXHR.status);
        }
    });
}

/**
 * �ж���������
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


//Ϊ��ֹ��ϸ����ӹ��죬������²���
var addBtnName = 'addbutton0'; //�����ϸ�еİ�ťID -- addbutton(0,1,2...)
var detileAddId = 0 ; //��ϸ����ţ���detileTabId��addBtnName���һλ��ͬ����һ����ϸ��Ϊ0�����˵��ӣ�
var intTime = 1000; //������ϸ����ӵļ��ʱ�䣬��λ�����롣����1000
/*
 * ��ӵ���ǰ�¼�����ֹ�����ϸ�е��ٶȹ���
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
            alert('����̫������');
        } else {
            time1 = time2;
            oldClickEvent(event);
        }
    };
};
regBorwserEvent();
/*�Ͳ�*/
</script>















