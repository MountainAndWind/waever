<script>
var ybxje_field="field12501";//Ӧ��������ֶ�field12501  ����ҽ��   ����
var invoice_type_field="field13184";//��������field1231
var jdKeyFiekds="field12726,field12727,field12728,field12729,field12730,field12731,field12732,field12733"//�Ŷ��ֶ�����
var zhzh="field12513"//�˺�����ֶ�
var zhmc="field12514"//�˺������ֶ�
var sbje_field="field12723"//ʵ�����
var bz_field="field12559";//ִ�б�׼
var daysField="field12740"//����
var feeType= "field13184";
var endDate="field12738"//���������ֶ�
var startDate="field12736"//��ʼ����
var startTime="field12737"//
var endTime="field12739"//
var field_name1="field12744"//�����ֶ���  �����ֶ�
var fuhaoField="field14342"//���ַ���

var taxJe="field13161"//����˰����ֶ�
var taxLimit="field12499"//˰��
var gs_main_field="field12735";//$("#field12735").val() ��˾�����ֶ�
var accoomInvoceMainId="15"//�������Ͷ��ձ���ס����������id
var indoorTransMainId="8"//�������Ͷ��ձ������ڽ�ͨ������id  ���ڽ�ͨ�ѵ��ʲ��ó���100Ԫ
var canBuMainId="14"//�Ͳ�
/*�´���������*/
var accoomInvoceIDs=""//�������Ͷ��ձ���ס�����ͼ���
var indoorTransIDs=""//�������Ͷ��ձ������ڽ�ͨ�Ѽ���
var canBuIDs=""//�������Ͷ��ձ��вͲ�����
var array1;
/**
 * ���ñ���
 */
var textValue="<img align=absmiddle src='/images/BacoError_wev8.gif' />";

function f_getFee(type, s_day, s_time, e_day, e_time,array1) {
    var rArray = array1.split(";");
    var result;
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
                return 100;
            } else if (dif >= 10 * 60 * 60 * 1000) {
                return 70;
            } else if (dif >= 4 * 60 * 60 * 1000) {
                return 35;
            } else {
                return 0;
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
            return 100 * middle + start + end;
        }
    }
}


function setShiBao(num,i,array1 ) {



    var  type=$("#"+feeType+"_"+num[i]).val();
    var s_day=$("#"+startDate+"_"+num[i]).val();
    var s_time= $("#"+startTime+"_"+num[i]).val();
    var e_day=$("#"+endDate+"_"+num[i]).val();
    var e_time=$("#"+endTime+"_"+num[i]).val();
    var s_day_r = s_day.split("-").length;
    var e_day_r = e_day.split("-").length;
    var s_time_r = s_time.split(":").length;
    var e_time_r = e_time.split(":").length;

    if(s_day_r >1 && e_day_r >1 && s_time_r >1  && e_time_r >1 ){
        var res=f_getFee(type, s_day, s_time, e_day, e_time,array1 );
        if(res!=undefined){

            $("#"+"field12498"+"_"+num[i]).val(res);
        }
    }

}

//Ϊ��ֹ��ϸ����ӹ��죬������²���
var addBtnName = 'addbutton0'; //�����ϸ�еİ�ťID -- addbutton(0,1,2...)
var detileAddId = 0 ; //��ϸ����ţ���detileTabId��addBtnName���һλ��ͬ����һ����ϸ��Ϊ0�����˵��ӣ�
var intTime = 1000; //������ϸ����ӵļ��ʱ�䣬��λ�����롣����1000
/*
   ��ӵ���ǰ�¼�����ֹ�����ϸ�е��ٶȹ���
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


/**
 * ���ñ���
 */
function setBt(col,num,index) {
    var btzd = $("input[name='needcheck']").val();
    $("#"+col+"_"+num[index]+"span").html(textValue);
    $("#"+col+"_"+num[index]).attr('viewtype','1');
    var fieldIds = btzd + "," + col+"_"+num[index] ;
    $("input[name='needcheck']").val(fieldIds);
    document.getElementById(col+"_"+num[index]+"browser").removeAttribute("disabled")
}

/**
 * ȡ������
 */
function canBt(col,num,index) {
    var btzd = $("input[name='needcheck']").val();
    btzd=btzd.replace(","+col+"_"+num[index],"")
    $("input[name='needcheck']").val(btzd);
    $("#"+col+"_"+num[index]+"span").html("");
    $("#"+col+"_"+num[index]).val("");
    $("#"+col+"_"+num[index]+"browser").attr("disabled","disabled");
}

function isNull(val) {
    if(""==val||val==null||val==undefined){
        return true;
    }else{
        return false;
    }
}

/**
 * ���ñ��ַ���
 * @param num
 * @param rowNum
 * @param coinVal
 */
function setCoin(num,rowNum,coinVal) {
    if("CNY"==coinVal){
        $("#"+fuhaoField+"_"+rowNum).val("��")
        $("#"+fuhaoField+"_"+rowNum+"span").html("��")
    }else if("USD"==coinVal){
        $("#"+fuhaoField+"_"+rowNum).val("$")
        $("#"+fuhaoField+"_"+rowNum+"span").html("$")
    }
}

$(document).ready(function(){

    findValidationId(accoomInvoceMainId)
    findValidationId(indoorTransMainId)
    findValidationId(canBuMainId)


    var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        //gsFz(num,i);
        var rowNum = num[i];
        $("#"+daysField + "_" + rowNum+",#" + invoice_type_field + "_" + rowNum+",#" +field_name1 + "_" + rowNum).bindPropertyChange(function (e) {
            var index = e.id.split("_")[1]
            var dayVal = $("#"+daysField+"_"+index).val();
            if(Number(dayVal)<0){
                var index=Number(num[index])+1
                top.Dialog.alert("��ϸ��"+index+"����������Ϊ�������޸ģ�����")
            }

            var index = e.id.split("_")[1]
            var typeVal = $("#"+invoice_type_field+ "_" + index).val();
            var flag = isNull(typeVal);
            if(!flag){
                if(canBuIDs.indexOf(typeVal)!=-1){//dayAllowanceIDs
                    setBt(endTime,num,index);
                    setBt(startTime,num,index);
                }else{
                    canBt(endTime,num,index);
                    canBt(startTime,num,index);
                }
            }else{
                canBt(endTime,num,index);
                canBt(startTime,num,index);
            }


            var  type=$("#field13184"+"_"+rowNum).val();
            var s_day=$("#field12736"+"_"+rowNum).val();
            var s_time= $("#field12737"+"_"+rowNum).val();
            var e_day=$("#field12738"+"_"+rowNum).val();
            var e_time=$("#field12739"+"_"+rowNum).val();
            var s_day_r = s_day.split("-").length;
            var e_day_r = e_day.split("-").length;
            var s_time_r = s_time.split(":").length;
            var e_time_r = e_time.split(":").length;
            if(s_day_r >1 && e_day_r >1 && s_time_r >1  && e_time_r >1 ){

                var res=f_getFee(type, s_day, s_time, e_day, e_time,array1 );
                if(res!=undefined){
                    $("#field12559_"+rowNum+"span").html(res);
                }}


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
        if (oldDtIdLength < dtIdLength){
            var rowNum = $(detileTabId).val().charAt($(detileTabId).val().length-1);
            var num=$("#submitdtlid0").val();
            num = num.split(",")
            $("#"+daysField + "_" + rowNum+",#" + invoice_type_field + "_" + rowNum).bindPropertyChange(function (e) {
                var dayVal = $("#"+daysField+"_"+rowNum).val();
                if(Number(dayVal)<0){
                    var index=Number(rowNum)+1
                    top.Dialog.alert("��ϸ��"+index+"����������Ϊ�������޸ģ�����")
                }

                var typeVal = $("#"+invoice_type_field+"_"+rowNum).val();
                var flag = isNull(typeVal);
                if(!flag){
                    if(canBuIDs.indexOf(typeVal)!=-1){//dayAllowanceIDs
                        setBt(endTime,num,rowNum);
                        setBt(startTime,num,rowNum);
                    }else{
                        canBt(endTime,num,rowNum);
                        canBt(startTime,num,rowNum);
                    }
                }else{
                    canBt(endTime,num,rowNum);
                    canBt(startTime,num,rowNum);
                }


                var  type=$("#field13184"+"_"+rowNum).val();
                var s_day=$("#field12736"+"_"+rowNum).val();
                var s_time= $("#field12737"+"_"+rowNum).val();
                var e_day=$("#field12738"+"_"+rowNum).val();
                var e_time=$("#field12739"+"_"+rowNum).val();
                var s_day_r = s_day.split("-").length;
                var e_day_r = e_day.split("-").length;
                var s_time_r = s_time.split(":").length;
                var e_time_r = e_time.split(":").length;
                //alert("s_day_r��"+s_day_r+"e_day_r:"+e_day_r+"s_time_r:"+s_time_r+"e_time_r��"+e_time_r)
                if(s_day_r >1 && e_day_r >1 && s_time_r >1  && e_time_r >1 ){
                    //alert("inner")
                    var res=f_getFee(type, s_day, s_time, e_day, e_time,array1 );
                    //alert("res:"+res)
                    if(res!=undefined){
                        $("#field12559_"+rowNum+"span").html(res);
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
        num = num.split(",");
        var errors="";
        for (var i = 0; i < num.length; i++) {
            var index=Number(i)+1;
            var endDateVal = $("#"+endDate+"_"+num[i]).val();
            var endTimeVal = $("#"+endTime+"_"+num[i]).val();
            var startDateVal = $("#"+startDate+"_"+num[i]).val();
            var startTimeVal = $("#"+startTime+"_"+num[i]).val();
            var factjeVal = $("#"+sbje_field+"_"+num[i]).val();
            var limitJeVal = $("#"+bz_field+"_"+num[i]).val();
            var invoiceVal = $("#"+invoice_type_field+"_"+num[i]).val();
            var nowDate = getNowDate();
            var days = getDays(endDateVal,nowDate)
            var day_val=$("#"+daysField+"_"+num[i]).val()
            if(isNull(startTimeVal)){
                startTimeVal="00:00"
            }
            if(isNull(endTimeVal)){
                endTimeVal="00:00"
            }
            var start = startDateVal+" "+startTimeVal+":00"
            var end = endDateVal+" "+endTimeVal+":00"
            if(!compareTime(start,end)){
                top.Dialog.alert("��ϸ��"+index+"���޷��ύ, ��ʼʱ��Ҫ���ڽ���ʱ�䣡����")
                return false;
            }

            if(Number(days)>60){
                top.Dialog.alert("��ϸ��"+index+"���޷��ύ�����÷��������ѳ���60�죡����")
                return false;
            }
            if(invoiceVal!=""){

                if(accoomInvoceIDs.indexOf(invoiceVal)!=-1) {
                    /* var compareJe = Number(limitJeVal)*Number(day_val);*/
                    var compareJe = Number(limitJeVal);
                    if(Number(factjeVal)>Number(compareJe)){
                        top.Dialog.alert("��ϸ��"+index+"���޷��ύ��������ȳ���ִ�б�׼������")
                        return false;
                    }
                }else if(indoorTransIDs.indexOf(invoiceVal)!=-1){
                    if(Number(factjeVal)>100){
                        top.Dialog.alert("��ϸ��"+index+"���޷��ύ�����ڽ�ͨ�ѵ��в��ó���100Ԫ������")
                        return false;
                    }
                }
            }


            var  type=$("#"+feeType+"_"+num[i]).val();
            var s_day=$("#"+startDate+"_"+num[i]).val();
            var s_time= $("#"+startTime+"_"+num[i]).val();
            var e_day=$("#"+endDate+"_"+num[i]).val();
            var e_time=$("#"+endTime+"_"+num[i]).val();
            var s_day_r = s_day.split("-").length;
            var e_day_r = e_day.split("-").length;
            var s_time_r = s_time.split(":").length;
            var e_time_r = e_time.split(":").length;

            if(s_day_r >1 && e_day_r >1 && s_time_r >1  && e_time_r >1 ){
                var res=f_getFee(type, s_day, s_time, e_day, e_time,array1 );
                if(res!=undefined &&Number(   $("#"+"field12498"+"_"+num[i]).val()  )>res ){
                    errors=errors+"\n��ϸ��"+index+"��,���Ϊ:"+res
                }
            }
        }

        if(errors!=""){
            top.Dialog.alert("��ϸ�޷��ύ��������ȳ���ִ�б�׼!"+errors);
            return false;
        }



        return true;
    }
})

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
 * ����¼�������֤��ֵ
 */
$(document).click(function () {
    var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        jdZhFun(num,i);
    }

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


    try{
        var num = $("#submitdtlid0").val();
        num = num.split(",");

        for (var i = 0; i < num.length; i++) {
            var  type=$("#field13184"+"_"+num[i]).val();
            var s_day=$("#field12736"+"_"+num[i]).val();
            var s_time= $("#field12737"+"_"+num[i]).val();
            var e_day=$("#field12738"+"_"+num[i]).val();
            var e_time=$("#field12739"+"_"+num[i]).val();
            var s_day_r = s_day.split("-").length;
            var e_day_r = e_day.split("-").length;
            var s_time_r = s_time.split(":").length;
            var e_time_r = e_time.split(":").length;
            if(s_day_r >1 && e_day_r >1 && s_time_r >1  && e_time_r >1 ){

                var res=f_getFee(type, s_day, s_time, e_day, e_time,array1 );
                if(res!=undefined){
                    $("#field12559_"+num[i]+"span").html(res);
                }}}}catch(e){}
})


/**
 * �Ŷ�key val ��ֵ
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
 * ���ҷ������Ͷ��ձ��д��ڵ���ϸ
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
                accoomInvoceIDs=msg//�������Ͷ��ձ��е绰�Ѽ���
            }else if(indoorTransMainId==val){
                indoorTransIDs=msg//�������Ͷ��ձ��н����𼯺�
            }else if(canBuMainId==val){
                canBuIDs=msg//�������Ͷ��ձ��н����𼯺�
            }
        },
        error:function(jqXHR){
            alert("��������"+ jqXHR.status);
        }
    });
}
</script>




