<script>
/**
 * �������ж�ʱ������ʱCNY ִ�б�׼����ʹ��CNY����
 * ������Ϊ��CNY ִ�б�׼����USD ��������
 * @type {string}
 */
var sbje_field="field12723"//ʵ�����
var bz_field="field12559";//��׼�ֶ�
var day="field12740"//����
var sbbzje_field="field12498";//�걨���ֽ���ֶ�field12498

var endDate="field12738"//���������ֶ�
var startDate="field12736"//��ʼ����
var startTime="field12737"//
var endTime="field12739"//

var invoice_type_field="field13184";//��������field1231
var jdKeyFiekds="field12726,field12727,field12728,field12729,field12730,field12731,field12732,field12733"//�Ŷ��ֶ�����
var zhzh="field12513"//�˺�����ֶ�
var zhmc="field12514"//�˺������ֶ�
var field_name1="field12744"//�����ֶ���  �����ֶ�
var field_name2="field12497"//����ֵ�ֶ�  �����ֶ�
var gs_main_field="field12735";//$("#field12735").val() ��˾�����ֶ�
var gs_detail_field="field12725";//��˾��ϸ�ֶ� field12725
var array1;
var taxJe="field13161"//����˰����ֶ�
var taxLimit="field12499"//˰��
var ybxje_field="field12501";//Ӧ��������ֶ�field12501  �����ҽ��
var daysField="field12740";//����


var dollarsRate="field13570"//��Ԫ����
var country="field12751"//����
var chinaId="96";
var fuhaoField="field14342"//���ַ���


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


/**
 * ���ñ���
 */
function setBt(col,num,index) {
    var btzd = $("input[name='needcheck']").val();
    $("#"+col+"_"+num[index]+"span").html(textValue);
    $("#"+col+"_"+num[index]).attr('viewtype','1');
    var fieldIds = btzd + "," + col+"_"+num[index] ;
    $("input[name='needcheck']").val(fieldIds);
    console.log("$(\"#\"+col+\"_\"+num[index]+\"browser\").disabled"+($("#"+col+"_"+num[index]+"browser").disabled))
    if($("#"+col+"_"+num[index]+"browser").disabled){
        document.getElementById(col+"_"+num[index]+"browser").removeAttribute("disabled")
    }
}

/**
 * ȡ������
 */
function canBt(col,num,index) {
    console.log("canBt")
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


            var flag = isNull(typeVal);
            console.log("flag::"+flag);
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
            var dayVal = $("#"+day+"_"+num[i]).val();
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
            if(!compareTime(start,end)){
                top.Dialog.alert("��ϸ��"+index+"���޷��ύ, ��ʼʱ��Ҫ���ڽ���ʱ�䣡����")
                return false;
            }
            if(""!=invoiceVal){
                if((dayAllowInvoceMainIds+"-"+accoomInvoceIDs+"-"+internationalTansInvoceIDs+"-"+internationalAccomInvoceIDs).indexOf(invoiceVal)!=-1){
                    if (chinaId==countryVal) {//�����Ҵ���
                        //var limitRmb = Number(limitJeVal) * Number(dayVal)
                        var limitRmb = Number(limitJeVal)
                        if (Number(factRmb) >= Number(limitRmb)) {
                            top.Dialog.alert("��ϸ��" + index + "���޷��ύ��������ȳ���ִ�б�׼������")
                            return false;
                        }
                    } else {
                        //var limitRmb = Number(limitJeVal) * Number(dollarsRateVal) * Number(dayVal) * 1.1;//����%10
                        var limitRmb = Number(limitJeVal) * Number(dollarsRateVal)* 1.1;//����%10
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
        jdZhFun(num,i);
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



