<script>
/**
 * �������ж�ʱ������ʱCNY ִ�б�׼����ʹ��CNY����
 * ������Ϊ��CNY ִ�б�׼����USD ��������
 * @type {string}
 */
var sbje_field="field13212"//ʵ�����
var bz_field="field13200";//ִ�б�׼
var daysField="field13228"//����
var sbbzje_field="field13192";//�걨���ֽ��

var endDate="field13226"//���������ֶ�
var startDate="field13224"//��ʼ����
var startTime="field13225"//��ʼʱ��
var endTime="field13227"//����ʱ��

var invoice_type_field="field13245";//��������field1231
var jdKeyFiekds="field13215,field13216,field13217,field13218,field13219,field13220,field13221,field13222"//�Ŷ��ֶ�����
var zhzh="field13198"//�˺�����ֶ�
var zhmc="field13199"//�˺������ֶ�
var field_name1="field13231"//�����ֶ���  �����ֶ�
var field_name2="field13191"//����ֵ�ֶ�  �����ֶ�
var gs_main_field="field13223";//$("#field12735").val() ��˾�����ֶ�
var array1;
var taxJe="field13240"//����˰����ֶ�
var taxLimit="field13193"//˰��
var ybxje_field="field13195";//����ҽ��


var dollarsRate="field13261"//��Ԫ����
var country="field13334"//����
var chinaId="216";


var internationalTansInvoceMainId="12"//�������Ͷ��ձ��н�ͨ����id
var internationalAccomInvoceMainId="11"//�������Ͷ��ձ�ס��������id
var dayAllowInvoceMainId="13"//�������Ͷ��ձ��վ���������id
var accoomInvoceMainId="15"//�������Ͷ��ձ���ס����������id
var canBuMainId="14"//�Ͳ�
/*�´���������*/
var internationalTansInvoceIDs=""//�������Ͷ��ձ��е绰�Ѽ���
var internationalAccomInvoceIDs=""//�������Ͷ��ձ��е绰�Ѽ���
var dayAllowInvoceMainIds=""//�������Ͷ��ձ��е绰�Ѽ���
var accoomInvoceIDs=""//�������Ͷ��ձ���ס�����ͼ���
var canBuIDs=""//�������Ͷ��ձ��вͲ�����

/**
 * ���ñ���
 */
var textValue="<img align=absmiddle src='/images/BacoError_wev8.gif' />";

/*�Ͳ�-------------------------------------------------------*/
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
    var  type=$("#"+invoice_type_field+"_"+num[i]).val();
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
            $("#"+"field12744"+"_"+num[i]).val("CNY");
            $("#"+"field12744"+"_"+num[i]+"span > span >a").html("CNY");
            $("#field12559_"+num[i]+"span").html(res);
        }
    }

}

function setCanBu(num){
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


    for (var i=0;i<num.length;i++){
        setShiBao(num,i,array1 ) ;

    }
}
/*�Ͳ�-------------------------------------------------------*/


/**
 * ���ñ���
 */
function setBt(col,num,index) {
    var btzd = $("input[name='needcheck']").val();
    $("#"+col+"_"+num[index]+"span").html(textValue);
    $("#"+col+"_"+num[index]).attr('viewtype','1');
    var s="," + col+"_"+num[index];
    if(btzd.indexOf(s)==-1){
        var fieldIds = btzd + "," + col+"_"+num[index] ;
        $("input[name='needcheck']").val(fieldIds);
    }
    /*if(JudgeBroswer()){//ie
        document.getElementById(col+"_"+num[index]+"browser").removeAttribute("disabled")
    }else{
        $("#"+col+"_"+num[index]+"browser").removeAttr("disabled");
    }*/
    document.getElementById(col+"_"+num[index]+"browser").removeAttribute("disabled")
}

/**
 * ȡ������
 */
function canBt(col,num,index) {
    //console.log("canBt")
    //console.log("col::"+col)
    //console.log("num::"+num)
    //console.log("index::"+index)


    var btzd = $("input[name='needcheck']").val();
    //console.log("btzd::"+btzd)
    btzd=btzd.replace(","+col+"_"+num[index],"")
    $("input[name='needcheck']").val(btzd);
    //console.log("btzd::"+btzd)
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



$(document).ready(function(){
    findValidationId(internationalTansInvoceMainId)
    findValidationId(internationalAccomInvoceMainId)
    findValidationId(dayAllowInvoceMainId)
    findValidationId(accoomInvoceMainId)
    findValidationId(canBuMainId)
    var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        var rowNum = num[i];
        $("#"+daysField + "_" + rowNum+",#"+invoice_type_field + "_" + rowNum+",#" + sbbzje_field + "_" + rowNum+",#" +field_name1 + "_" + rowNum).bindPropertyChange(function (e) {

            var index = e.id.split("_")[1]
            var dayVal = $("#"+daysField+"_"+index).val();
            if(Number(dayVal)<0){
                var index=Number(index)+1
                top.Dialog.alert("��ϸ��"+index+"����������Ϊ�������޸ģ�����")
            }

            var index = e.id.split("_")[1]

            var typeVal = $("#"+invoice_type_field+ "_" + index).val();

            /*if(typeVal!=""||typeVal!=null||typeVal!=undefined){

            }*/

            var flag = isNull(typeVal);
            alert("flag::"+flag);
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

            var coinVal = $("#" +field_name1 + "_" + index).val();

            //setCoin(num,rowNum,coinVal)


            var  type=$("#"+invoice_type_field+"_"+rowNum).val();
            var s_day=$("#"+startDate+"_"+rowNum).val();
            var s_time= $("#"+startTime+"_"+rowNum).val();
            var e_day=$("#"+endDate+"_"+rowNum).val();
            var e_time=$("#"+endTime+"_"+rowNum).val();
            var s_day_r = s_day.split("-").length;
            var e_day_r = e_day.split("-").length;
            var s_time_r = s_time.split(":").length;
            var e_time_r = e_time.split(":").length;

            if(s_day_r >1 && e_day_r >1 && s_time_r >1  && e_time_r >1 ){
                var res=f_getFee(type, s_day, s_time, e_day, e_time,array1 );
                if(res!=undefined){
                    $("#"+"field12744"+"_"+rowNum).val("CNY");
                    $("#"+"field12744"+"_"+rowNum+"span > span >a").html("CNY");
                    $("#field12559_"+rowNum+"span").html(res);
                }
            }
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
            /* $("#"+invoice_type_field + "_" + rowNum+",#" + sbbzje_field + "_" + rowNum).bindPropertyChange(function () {

             });*/
            $("#"+daysField + "_" + rowNum+",#"+invoice_type_field + "_" + rowNum+",#" + sbbzje_field + "_" + rowNum+",#" +field_name1 + "_" + rowNum).bindPropertyChange(function (e) {

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

                var coinVal = $("#" +field_name1 + "_" + rowNum).val();

                //setCoin(num,rowNum,coinVal)
                setCanBu(num)
            });
            oldDtIdLength = dtIdLength;
        }
        if(oldDtIdLength > dtIdLength){
            oldDtIdLength = dtIdLength;
        }
    });


    checkCustomize = function (){//
        var num = $("#submitdtlid0").val();
        num = num.split(",")
        //��ȡ��������
        for (var i = 0; i < num.length; i++) {
            var index=Number(i)+1;
            var invoiceVal = $("#"+invoice_type_field+"_"+num[i]).val();
            var field_name1_val = $("#" +field_name1 + "_" + num[i]).val();
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
            //var dayVal = $("#"+day+"_"+num[i]).val();
            var countryVal = $("#"+country+"_"+num[i]).val();
            var factRmb = factjeVal;

            if(isNull(startTimeVal)){
                startTimeVal="00:00"
            }
            if(isNull(endTimeVal)){
                endTimeVal="00:00"
            }


            var start = startDateVal+" "+startTimeVal+":00"
            var end = endDateVal+" "+endTimeVal+":00"
            //console.log("compareTime::")
            if(!compareTime(start,end)){
                top.Dialog.alert("��ϸ��"+index+"���޷��ύ, ��ʼʱ��Ҫ���ڽ���ʱ�䣡����")
                return false;
            }
            if(""!=invoiceVal){
                //console.log("invoiceVal:"+invoiceVal)
                //console.log("dayAllowInvoceMainIds+\"-\"+accoomInvoceIDs+\"-\"+internationalTansInvoceIDs+\"-\"+internationalAccomInvoceIDs"+dayAllowInvoceMainIds+"-"+accoomInvoceIDs+"-"+internationalTansInvoceIDs+"-"+internationalAccomInvoceIDs)
                //console.log("countryVal::"+countryVal)
                //console.log("chinaId==countryVal"+(chinaId==countryVal))
                if((dayAllowInvoceMainIds+"-"+accoomInvoceIDs+"-"+internationalTansInvoceIDs+"-"+internationalAccomInvoceIDs).indexOf(invoiceVal)!=-1){
                    if (chinaId==countryVal) {//�����Ҵ���
                        //var limitRmb = Number(limitJeVal) * Number(dayVal)
                        var limitRmb = Number(limitJeVal)
                        //console.log("limitRmb����"+limitRmb)
                        if (Number(factRmb) >= Number(limitRmb)) {
                            top.Dialog.alert("��ϸ��" + index + "���޷��ύ��������ȳ���ִ�б�׼������")
                            return false;
                        }
                    } else {
                        //var limitRmb = Number(limitJeVal) * Number(dollarsRateVal) * Number(dayVal) * 1.1;//����%10
                        //console.log("limitJeVal::"+limitJeVal)
                        //console.log("dollarsRateVal::"+dollarsRateVal)
                        //console.log("factRmb::"+factRmb)
                        var limitRmb = Number(limitJeVal) * Number(dollarsRateVal)* 1.1;//����%10
                        //console.log("limit����"+limitRmb)
                        if (Number(factRmb) >= Number(limitRmb)) {//���ʵ�����>ִ�б�׼*����*������ʣ��������ύ
                            top.Dialog.alert("��ϸ��" + index + "���޷��ύ��������ȳ���ִ�б�׼������")
                            return false;
                        }
                    }
                }
            }
            jdZhFun(num,i);
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
 * �Ŷ�key val ��ֵ
 * @param num
 * @param i
 * @param type
 */
function jdZhFun(num,i) {
    var fieldName = jdKeyFiekds.split(",");
    var val=$("#"+gs_main_field).val();
    var name=$("#"+gs_main_field+"span a[_key='valspan']").html();//��ʾ��
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
        //var type = $("#" + invoice_type_field + "_" + num[i]).val();
        jdZhFun(num,i);
        setCanBu(num)
    }
})



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
            }
        },
        error:function(jqXHR){
            alert("��������"+ jqXHR.status);
        }
    });
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
