<script>
/**
 * �������   2���й���
  * @type {string}
 */
var ybxje_field="field13195";//����ҽ��   ����
var invoice_type_field="field13245";//��������field1231
var jdKeyFiekds="field13215,field13216,field13217,field13218,field13219,field13220,field13221,field13222"//�Ŷ��ֶ�����
var zhzh="field13198"//�˺�����ֶ�
var zhmc="field13199"//�˺������ֶ�
var sbje_field="field13212"//ʵ�����
var bz_field="field13200";//ִ�б�׼
var daysField="field13228"//����
var endDate="field13226"//���������ֶ�
var startDate="field13224"//��ʼ����
var startTime="field13225"//��ʼʱ��
var endTime="field13227"//����ʱ��
var field_name1="field13231"//�����ֶ���  �����ֶ�

var cldj="field13248"//���õȼ�
var city="field13229"//����

var taxJe="field13240"//����˰����ֶ�
var taxLimit="field13193"//˰��
var gs_main_field="field13223";//��˾�����ֶ�  ���ù�˾
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

/*�Ͳ�-------------------------------------------------------*/
/**
 * ���òͲ�
 * @param type
 * @param s_day
 * @param s_time
 * @param e_day
 * @param e_time
 * @param array1
 * @returns {number}
 */
function f_getFee(rowNum) {
    //console.log("f_getFee")
    var type=$("#"+invoice_type_field+"_"+rowNum).val();
    var s_day=$("#"+startDate+"_"+rowNum).val();
    var s_time= $("#"+startTime+"_"+rowNum).val();
    var e_day=$("#"+endDate+"_"+rowNum).val();
    var e_time=$("#"+endTime+"_"+rowNum).val();

    //console.log("type::"+type)
    //console.log("s_day::"+s_day)
    //console.log("s_time::"+s_time)
    //console.log("e_day::"+e_day)
    //console.log("e_time::"+e_time)


    var s_day_r = s_day.split("-").length;
    var e_day_r = e_day.split("-").length;
    var s_time_r = s_time.split(":").length;
    var e_time_r = e_time.split(":").length;


    //console.log("s_day_r::"+s_day_r)
    //console.log("e_day_r::"+e_day_r)
    //console.log("s_time_r::"+s_time_r)
    //console.log("e_time_r::"+e_time_r)

    //console.log("array1::"+array1)
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
                res= 100 * middle + start + end;
            }
        }
        //console.log("res::"+res)
        if(!isNull(res)){
            $("#"+bz_field+"_"+rowNum+"span").html(res);
            $("#"+bz_field+"_"+rowNum).val(res);
        }
    }
}


/*�Ͳ�-------------------------------------------------------*/

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
                if(canBuIDs.indexOf(typeVal)!=-1){//dayAllowanceIDs
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
                top.Dialog.alert("��ϸ��"+index+"����������Ϊ�������޸ģ�����")
            }
            var typeVal = $("#"+invoice_type_field+"_"+index).val();
            var flag = isNull(typeVal);
            if(!flag){
                if(canBuIDs.indexOf(typeVal)!=-1){//dayAllowanceIDs
                    f_getFee(index)
                }else{
                    getBz(num,index);
                }
            }
        });


        /**
         * ʱ�䴥���Ͳ�����
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
    ����ϸ����������ʱ��Ϊ���ӵ���ϸ����Ӻ���������ϸ����������ʱ�����¼����ܶ�
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
                    top.Dialog.alert("��ϸ��"+index+"����������Ϊ�������޸ģ�����")
                }
                var typeVal = $("#"+invoice_type_field+"_"+rowNum).val();
                var flag = isNull(typeVal);
                if(!flag){
                    if(canBuIDs.indexOf(typeVal)!=-1){//dayAllowanceIDs
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
                    if(canBuIDs.indexOf(typeVal)!=-1){//dayAllowanceIDs
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
                top.Dialog.alert("��ϸ��"+index+"���޷��ύ, ��ʼʱ��Ҫ���ڽ���ʱ�䣡����")
                return false;
            }

            if(Number(days)>60){
                top.Dialog.alert("��ϸ��"+index+"���޷��ύ�����÷��������ѳ���60�죡����")
                return false;
            }
            if(invoiceVal!=""){

                if((accoomInvoceIDs+"-"+canBuIDs).indexOf(invoiceVal)!=-1) {
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

        }
        return true;
    }
})

/**
 * ��ȡִ�б�׼
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
            alert("��������"+ jqXHR.status);
        }
    });
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