<!-- script���룬�����Ҫ����js�ļ�����ʹ����HTML����ͬ�ķ�ʽ�� -->
<script type="text/javascript">
var bz_field="field13200";//ִ�б�׼
var ybxje_field="field13195";//����ҽ��
var sbbzje_field="field13192";//�걨���ֽ��
var sbje_field="field13212"//ʵ�����
var invoice_type_field="field13245";//��������field1231
var jdKeyFiekds="field13215,field13216,field13217,field13218,field13219,field13220,field13221,field13222"//�Ŷ��ֶ�����
var zhzh="field13198"//�˺�����ֶ�
var zhmc="field13199"//�˺������ֶ�
var taxJe="field13240"//����˰����ֶ�
var taxLimit="field13193"//˰��

var field_name1="field13231"//�����ֶ���  �����ֶ�
var field_name2="field13191"//����ֵ�ֶ�  �����ֶ�
var gs_main_field="field13223";//$("#field12735").val() ��˾�����ֶ�
var gs_detail_field="";//��˾��ϸ�ֶ� field12725

/*����������ʾ���ֶ�*/
var isFirstJh="field13249"//�Ƿ�����Ӱ��һ�����ܽ�����  detail0_1_6   detail0_3_6 td_etype_3 detail_hide_col
/*����������ʾ���ֶ�*/
var isPoYhjt="field13585"//��ż�Ƿ�����Ӱ�����ܻ�������  detail0_1_5   detail0_3_5 td_etype_3 detail_hide_col
var isFirstSyjt="field13241"//�Ƿ�����Ӱ��һ�������������� detail0_1_4  detail0_3_4 td_etype_3 detail_hide_col


/*�´���������*/
var marryInvoceIDs=""//�������Ͷ��ձ��н����𼯺�
var brithInvoceIDs=""//�������Ͷ��ձ���������𼯺�


/**
 * ���ñ���
 */
var textValue="<img align=absmiddle src='/images/BacoError_wev8.gif' />";
function setMustFill(num,rowNum,typeVal) {
    //console.log("num"+num)
    //console.log("rowNum"+rowNum)
    //console.log("typeVal"+typeVal)
    //console.log("marryInvoceIDs"+marryInvoceIDs)
    //console.log("brithInvoceIDs"+brithInvoceIDs)
    if(isExist(marryInvoceIDs,typeVal)){
        //console.log("���")
        setBt(isFirstJh,num,rowNum);
        canBt(isPoYhjt,num,rowNum);
        canBt(isFirstSyjt,num,rowNum);
    }else if(isExist(brithInvoceIDs,typeVal)){
        //console.log("����")
        setBt(isPoYhjt,num,rowNum);
        setBt(isFirstSyjt,num,rowNum);
        canBt(isFirstJh,num,rowNum);
    }else{
        canBt(isFirstJh,num,rowNum);
        canBt(isPoYhjt,num,rowNum);
        canBt(isFirstSyjt,num,rowNum);
    }
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
    document.getElementById(col+"_"+num[index]).removeAttribute("disabled")
}

/**
 * ȡ������
 */
function canBt(col,num,index) {
    var btzd = $("input[name='needcheck']").val();
    btzd=btzd.replace(","+col+"_"+num[index],"")
    $("input[name='needcheck']").val(btzd);
    $("#"+col+"_"+num[index]).attr("disabled","disabled");
    $("#"+col+"_"+num[index]).val("")
    $("#"+col+"_"+num[index]+"span img").remove()
}


$(document).ready(function(){
    findValidationId(9)//���
    findValidationId(10)//����
    var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        jdZhFun(num,i);
        var rowNum = num[i];
        $("#"+invoice_type_field + "_" + rowNum+",#" + sbbzje_field + "_" + rowNum).bindPropertyChange(function (e) {
            var index = e.id.split("_")[1]
            var typeVal = $("#"+invoice_type_field+ "_" + index).val();
            setMustFill(num,index,typeVal);
        });
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
            $("#"+invoice_type_field + "_" + rowNum+",#" + sbbzje_field + "_" + rowNum).bindPropertyChange(function () {
                var typeVal = $("#"+invoice_type_field+ "_" + rowNum).val();

                setMustFill(num,rowNum,typeVal);
                if(typeVal !=undefined && typeVal !="" ){
                    if(marryInvoceIDs.indexOf(typeVal )!=-1){
                        $("#"+"field12559"+"_"+rowNum+"span").html(200);
                    }
                    if(brithInvoceIDs.indexOf(typeVal )!=-1){
                        $("#"+"field12559"+"_"+rowNum+"span").html(500);
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
        num = num.split(",")
        for (var i = 0; i < num.length; i++) {
            var index=Number(i)+1;
            var isFirstJhVal = $("#"+isFirstJh+"_"+num[i]).val();
            var invoice_type_fieldVal = $("#"+invoice_type_field+"_"+num[i]).val();
            var isPoYhjtVal = $("#"+isPoYhjt+"_"+num[i]).val();
            var isFirstSyjtVal = $("#"+isFirstSyjt+"_"+num[i]).val();
            var sbje_fieldVal = $("#"+sbje_field+"_"+num[i]).val();
            var bz_fieldVal = $("#"+bz_field+"_"+num[i]).val();
            //if(marryInvoceIDs.indexOf(invoice_type_fieldVal)!=-1){
            if(isExist(marryInvoceIDs,invoice_type_fieldVal)){
                $("#"+bz_field+"_"+num[i]).val(200);
                if(Number(sbje_fieldVal)>200){
                    top.Dialog.alert("��ϸ��"+index+"���޷��ύ��ʵ�����ܴ���ִ�ж��200������")
                    return false;
                }
            }
            //if(brithInvoceIDs.indexOf(invoice_type_fieldVal)!=-1){
            if(isExist(brithInvoceIDs,invoice_type_fieldVal)){
                $("#"+bz_field+"_"+num[i]).val(500);
                if(Number(sbje_fieldVal)>500){
                    top.Dialog.alert("��ϸ��"+index+"���޷��ύ��ʵ�����ܴ���ִ�ж��500������")
                    return false;
                }
            }

            if("1"==isFirstJhVal){//��
                top.Dialog.alert("��ϸ��"+index+"���޷��ύ����ְ�ڼ�ֻ������һ�ν�����")
                return false;
            }
            if("1"==isFirstSyjtVal){
                top.Dialog.alert("��ϸ��"+index+"���޷��ύ,��ְ�ڼ�ֻ������һ���������")
                return false;
            }
            if("0"==isPoYhjtVal){
                top.Dialog.alert("��ϸ��"+index+"���޷��ύ���Լ�ͥΪ��λ����һ���������")
                return false;
            }
            jdZhFun(num,i);
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
        success:function(data){
            var str=JSON.stringify(data);
            msg=str.substring(str.indexOf("<body>")+26,str.indexOf("</body>")-8);
            if("9"==val){
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
 * �ж���������
 * @param str
 */
function isExist(str,val) {
    //console.log("isExist")
    //console.log("str::"+str)
    //console.log("val::"+val)
    if(!isNull(str)&&!isNull(val)){
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

function isNull(val) {
    if(""==val||val==null||val==undefined){
        //console.log("isNull::true")
        return true;
    }else{
        //console.log("isNull::false")
        return false;
    }
}

/**
 * ����¼�������֤��ֵ
 */
$(document).click(function () {
    var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        var type = $("#" + invoice_type_field + "_" + num[i]).val();
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























