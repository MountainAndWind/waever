<!-- script���룬�����Ҫ����js�ļ�����ʹ����HTML����ͬ�ķ�ʽ�� -->
<script type="text/javascript">
var bz_field="field13200";//ִ�б�׼
var ybxje_field="field13195";//����ҽ��
var sbbzje_field="field13192";//�걨���ֽ��
var sbje_field="field13212"//ʵ�����
var invoice_type_field="field13245";//��������field1231
var jdKeyFiekds="field12726,field12727,field12728,field12729,field12730,field12731,field12732,field12733"//�Ŷ��ֶ�����
var zhzh="field13198"//�˺�����ֶ�
var zhmc="field13199"//�˺������ֶ�
var taxJe="field13240"//����˰����ֶ�
var taxLimit="field13193"//˰��

var field_name1="field13231"//�����ֶ���  �����ֶ�
var field_name2="field13191"//����ֵ�ֶ�  �����ֶ�
var gs_main_field="field13223";//$("#field12735").val() ��˾�����ֶ�

/*�´���������*/
var phoneInvoceIDs=""//�������Ͷ��ձ��е绰�Ѽ���

/*************/

var stat;
var date;


/***************/


function isNull(val) {
    if(""==val||val==null||val==undefined){
        return true;
    }else{
        return false;
    }
}

$(document).ready(function(){
    findValidationId(3)//�������Ͷ��ձ��е绰������id
    var num = $("#submitdtlid0").val();
    num = num.split(",")

    /****************/


    $.get("/work/canbu.jsp?val=1",
        function(data, status) {
            date= data.toString();
            stat=status;
        });

    if( stat!="success"){
        $.get("/work/canbu.jsp?val=1",
            function(data, status) {
                date= data.toString();
                stat=status;
            });


    }



    /*******************/
    for (var i = 0; i < num.length; i++) {
        jdZhFun(num,i);
        var rowNum = num[i];
        $("#"+invoice_type_field + "_" + rowNum+",#" + field_name1 + "_" + rowNum).bindPropertyChange(function () {
            var index = e.id.split("_")[1]
            var coinVal = $("#" +field_name1 + "_" + index).val();

        });
        $("#"+sbje_field+"_"+rowNum).attr("readonly","readonly");
    }

    var dtIdLength = 0;
    var oldDtIdLength = 0;
    /*����ϸ����������ʱ��Ϊ���ӵ���ϸ����Ӻ���������ϸ����������ʱ�����¼����ܶ�*/
    var detileTabId = "#submitdtlid0";
    $(detileTabId).bindPropertyChange(function () {
        dtIdLength = jQuery(detileTabId).val().split(",").length;
        if (oldDtIdLength < dtIdLength){
            var rowNum = $(detileTabId).val().charAt($(detileTabId).val().length-1);
            var num=$("#submitdtlid0").val();
            num = num.split(",")
            $("#"+invoice_type_field + "_" + rowNum+",#" + field_name1 + "_" + rowNum).bindPropertyChange(function () {
                var coinVal = $("#" +field_name1 + "_" + rowNum).val();

                setCanBu(num)
            });
            oldDtIdLength = dtIdLength;
        }
        if(oldDtIdLength > dtIdLength){
            oldDtIdLength = dtIdLength;
        }
    });


    checkCustomize = function (){
        var num = $("#submitdtlid0").val();
        num = num.split(",")
        for (var i = 0; i < num.length; i++) {
            var index=Number(num[i])+1;
            var type = $("#"+invoice_type_field+ "_" +num[i]).val();
            var limitJe= $("#"+bz_field+"_"+num[i]).val();
            var field_name2_val = $("#" +field_name2 + "_" + num[i]).val();
            if(isNull(field_name2_val)||0==field_name2_val){
                top.Dialog.alert("��ϸ��" + index + "���޷��ύ�����ʲ���Ϊ�գ�����")
                return false;
            }

            jdZhFun(num,i);
            if(""!=type){
                if(phoneInvoceIDs.indexOf(type)!=-1){

                    if(Number(limitJe)<=0||limitJe==null||undefined==limitJe||""==limitJe){
                        top.Dialog.alert("��ϸ��"+index+"���޷��ύ���绰�Ѷ�Ȳ���Ϊ�գ�����")
                        return false;
                    }

                    /****************************/
                    date1=date.split("-");
                    var  n= $("#field12493_"+num[i]).val();
                    n=n.split("-");
                    var e_time=new Date(date1[0],date1[1]-1,date1[2],0,0,0,0);

                    var now=new Date(n[0],n[1]-1,n[2],0,0,0,0);

                    if(e_time.getTime()<now.getTime()){
                        top.Dialog.alert("�ֻ����Ѷ���Ѿ�����");
                        return false;
                    }

                    /******************************/
                }
            }
            //dianHuaValidation(num,i,type)
        }
        return true;
    }
})

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

            if("3"==val){

                phoneInvoceIDs=msg//�������Ͷ��ձ��е绰�Ѽ���
            }else if("9"==val){

                marryInvoceIDs=msg//�������Ͷ��ձ��н����𼯺�
            }else if("10"==val){

                brithInvoceIDs=msg//�������Ͷ��ձ���������𼯺�
            }
        },
        error:function(jqXHR){
            alert("��������"+ jqXHR.status);
        }
    });
}

/**
 * ����¼�������֤��ֵ
 */
$(document).click(function () {
    var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        var type = $("#" + invoice_type_field + "_" + num[i]).val();
        /* dianHuaValidation(num,i,type);*/
        jdZhFun(num,i);
    }
})


/**
 * ���Ѹ�ֵ
 * @param num
 * @param i
 *
 * @param type
 */
function dianHuaValidation(num,i,type) {
    if(""!=type){
        if(phoneInvoceIDs.indexOf(type)!=-1){
            //�绰����
            var rmb = Number($("#"+sbbzje_field+"_"+num[i]).val())*Number($("#"+field_name2+"_"+num[i]).val())//����������ֵ

            $("#"+ybxje_field+"_"+num[i]).val(rmb);
            var jePer=Number(rmb)*0.8;

            var bzval = $("#"+bz_field+"_"+num[i]).val();
            if(Number(jePer)<=Number(bzval)){
                $("#"+sbje_field+"_"+num[i]).val(jePer);
            }else{
                $("#"+sbje_field+"_"+num[i]).val(bzval);
            }
        }else{
            var sbVal = $("#"+ybxje_field+"_"+num[i]).val()
            $("#"+sbje_field+"_"+num[i]).val(sbVal)
        }
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
    var name=$("#"+gs_main_field+"span a").html();//��ʾ��

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


</script>










