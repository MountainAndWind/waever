<!-- script���룬�����Ҫ����js�ļ�����ʹ����HTML����ͬ�ķ�ʽ�� -->
<script type="text/javascript">
var bz_field="field12559";//��׼�ֶ�field1231
var ybxje_field="field12501";//����ֶ�field12501  �����ҽ��
var sbbzje_field="field12498";//�걨���ֽ���ֶ�field12498
var sbje_field="field12723"//ʵ������ֶ�field12723
var invoice_type_field="field13184";//��������field1231
var jdKeyFiekds="field12725,field12726,field12727,field12728,field12729,field12731,field12730,field12732,field12733"//�Ŷ��ֶ�����
var zhzh="field12513"//�˺�����ֶ�
var zhmc="field12514"//�˺������ֶ�
var taxJe=""//˰���ֶ�
var taxLimit=""//˰��

/*����������ʾ���ֶ�*/
var isFirstJh="field13288"//�Ƿ�����Ӱ��һ�����ܽ�����  detail0_1_6   detail0_3_6 td_etype_3 detail_hide_col
/*����������ʾ���ֶ�*/
var isPoYhjt="field13164"//��ż�Ƿ�����Ӱ�����ܻ�������  detail0_1_5   detail0_3_5 td_etype_3 detail_hide_col
var isFirstSyjt="field13163"//�Ƿ�����Ӱ��һ�������������� detail0_1_4  detail0_3_4 td_etype_3 detail_hide_col

var field_name1="field12744"//�����ֶ���  �����ֶ�
var field_name2="field12497"//����ֵ�ֶ�  �����ֶ�
var gs_main_field="field12735";//$("#field12735").val() ��˾�����ֶ�
var gs_detail_field="field12725";//��˾��ϸ�ֶ� field12725

var phoneInvoceMainId="3"//�������Ͷ��ձ��е绰������id
var marryInvoceMainId="9"//�������Ͷ��ձ��н���������id
var brithInvoceMainId="10"//�������Ͷ��ձ��������������id

/*�´���������*/
var phoneInvoceIDs=""//�������Ͷ��ձ��е绰�Ѽ���
var marryInvoceIDs=""//�������Ͷ��ձ��н����𼯺�
var brithInvoceIDs=""//�������Ͷ��ձ���������𼯺�



$(document).ready(function(){

    /*var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        var field_name1_val = $("#"+field_name1+"_"+num[i]).val();
        //console.log("field_name1_val::"+field_name1_val);
        var curr_field_name2="#"+field_name2+"_"+num[i];
        //console.log("�����ֶ�::"+curr_field_name2);
        ajax(field_name1_val,curr_field_name2);
        gsFz(num,i);
        /!*jdZhFun(num,i);*!/
    }*/

    findValidationId(phoneInvoceMainId)
    findValidationId(marryInvoceMainId)
    findValidationId(brithInvoceMainId)

    console.log("checkCustomizecheckCustomize::!!")
    checkCustomize = function (){
        var num = $("#submitdtlid0").val();
        num = num.split(",")
        for (var i = 0; i < num.length; i++) {
            var index=Number(i)+1;
            var isFirstJhVal = $("#"+isFirstJh+"_"+num[i]).val();
            var invoice_type_fieldVal = $("#"+invoice_type_field+"_"+num[i]).val();
            var isPoYhjtVal = $("#"+isPoYhjt+"_"+num[i]).val();
            var isFirstSyjtVal = $("#"+isFirstSyjt+"_"+num[i]).val();
            console.log("isFirstJhVal::"+isFirstJhVal);
            console.log("invoice_type_fieldVal::"+invoice_type_fieldVal);
            console.log("isPoYhjtVal::"+invoice_type_fieldVal);
            console.log("isFirstSyjtVal::"+invoice_type_fieldVal);
            if("1"==isFirstJhVal){//��
                top.Dialog.alert("��ϸ��"+index+"���޷��ύ����ְ�ڼ�ֻ������һ�ν����𣡣���")
                return false;
            }
            if("1"==isFirstSyjtVal){
                top.Dialog.alert("��ϸ��"+index+"���޷��ύ,��ְ�ڼ�ֻ������һ��������𣡣���")
                return false;
            }
            if("0"==isPoYhjtVal){
                top.Dialog.alert("��ϸ��"+index+"���޷��ύ���Լ�ͥΪ��λ����һ��������𣡣���")
                return false;
            }
        }
        return true;
    }
})

/**
 *���ҷ������Ͷ��ձ��д��ڵ���ϸ
 * @param val
 */
function findValidationId(val) {///base/findInvoiceTypById.jsp?fieldVal=3
    console.log("findValidationId")
    var msg = "";
    $.ajax({
        type:"GET",
        url:"/base/findInvoiceTypById.jsp?fieldVal="+val,
        dataType:"text",
        //data:{jsonStr:jsonStr},
        success:function(data){
            /*var str=JSON.stringify(data);*/
            var str=JSON.stringify(data);
            msg=str.substring(str.indexOf("<body>")+26,str.indexOf("</body>")-8);
            console.log("msg::"+msg)
            if(phoneInvoceMainId==val){
                console.log("��ֵ�绰����ֵ")
                phoneInvoceIDs=msg//�������Ͷ��ձ��е绰�Ѽ���
            }else if(marryInvoceMainId==val){
                console.log("��ֵ�������ֵ")
                marryInvoceIDs=msg//�������Ͷ��ձ��н����𼯺�
            }else if(brithInvoceMainId==val){
                console.log("��ֵ��������ֵ")
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
//console.log('��ʱ���У���')
    //console.log("hid")
    var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        var field_name1_val = $("#" + field_name1 + "_" + num[i]).val();
        //console.log("field_name1_val::" + field_name1_val);
        var curr_field_name2 = "#" + field_name2 + "_" + num[i];
        //console.log("�����ֶ�::" + curr_field_name2);
        ajax(field_name1_val, curr_field_name2);
        var type = $("#" + invoice_type_field + "_" + num[i]).val();
        //console.log("�������ͣ���" + type);
        factJeAndNoContainsTaxJeVal(num,i,type);
        dianHuaValidation(num, i, type)
        gsFz(num, i);
        showHunYuMsg(num, i, type)
        /*jdZhFun(num,i);*/
    }
})
/**
 * ��ʱ������
 */

/*
var timeId = setInterval(function () {
    //console.log('��ʱ���У���')
    //console.log("hid")
    var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        var field_name1_val = $("#" + field_name1 + "_" + num[i]).val();
        //console.log("field_name1_val::" + field_name1_val);
        var curr_field_name2 = "#" + field_name2 + "_" + num[i];
        //console.log("�����ֶ�::" + curr_field_name2);
        ajax(field_name1_val, curr_field_name2);
        var type = $("#" + invoice_type_field + "_" + num[i]).val();
        //console.log("�������ͣ���" + type);
        dianHuaValidation(num, i, type)
        gsFz(num, i);
        showHunYuMsg(num, i, type)
        /!*jdZhFun(num,i);*!/
    }
}, 2000)
*/


/**
 * ʵ������벻��˰���ĸ�ֵ����
 * ʵ������������ҽ��,����ǻ��ѳ�0.8
 * ����˰�����ʵ������ȥ˰��
 */
function factJeAndNoContainsTaxJeVal(num,i,type) {
    var rmbJe = $("#"+ybxje_field+"_"+num[i]).val();
    $("#"+sbje_field+"_"+num[i]).val(rmbJe)
    var taxLiJe  = $("#"+taxLimit+"_"+num[i]).val()
    console.log("˰���"+taxLiJe);
    $("#"+taxJe+"_"+num[i]).val(Number(rmbJe)-Number(taxLiJe))
}


/**
 * �����ֶ�ֵ��ֵ����ϸ�ֶ���
 * @param num
 * @param i
 */
function gsFz(num,i) {
    var gsMainVal=$("#"+gs_main_field).val();
    //console.log("��˾����ֵ����"+gsMainVal)
    //console.log("��ֵ�ֶΣ���"+"#"+gs_detail_field+"_"+num[i])
    var name=$("#"+gs_main_field+"span a[title='"+gsMainVal+"']").html();//��ʾ��
    //console.log("��ʾ��name::"+name)
    $("#"+gs_detail_field+"_"+num[i]+"span").html("");
    if(name!=null){
        $("#"+gs_detail_field+"_"+num[i]+"span").append("<span class=\"e8_showNameClass\"><a title=\"33\">"+name+"</a>&nbsp;<span class=\"e8_delClass\" id=\"33\" onclick=\"del(event,this,1,false,{});\" style=\"opacity: 0; visibility: hidden;\">&nbsp;x&nbsp;</span></span>")
        $("#"+gs_detail_field+"_"+num[i]).val(gsMainVal)
    }
}

/**
 * ��������չʾ������������ԭ��
 * @param num
 * @param i
 * @param type
 */
function showHunYuMsg(num,i,type) {
    if(""!=type){
        console.log("marryInvoceIDs::"+marryInvoceIDs+"---type::"+type);
        console.log(marryInvoceIDs.indexOf(type))
        console.log("brithInvoceIDs::"+brithInvoceIDs+"---type::"+type);
        console.log(brithInvoceIDs.indexOf(type))
        if(marryInvoceIDs.indexOf(type)!=-1){//������
            /*top.Dialog.alert("��ְ�ڼ����Ա��������ȡ���֤����Ϊ׼����������һ��200Ԫ/�˽����𡣱������踽������Ϊ��\n" +
                "    ���֤��ӡ����6��������Ч\n" +
                "   �ۼ���ֵ200Ԫ�Ϻ��н�ͨ�������Ʊԭ��")*/
            //��ʾ�ֶ�todo
            var fiedid=isFirstJh.substring(5)+"_"+i;
            showCol("detail0_1_6",fiedid,"detail0_3_6 td_etype_3");

            var fiedid3=isFirstSyjt.substring(5)+"_"+i;
            hiddenCol("detail0_1_4",fiedid3,"detail0_3_4");
            var fiedid2=isPoYhjt.substring(5)+"_"+i;
            hiddenCol("detail0_1_5",fiedid2,"detail0_3_5");
        }else if(brithInvoceIDs.indexOf(type)!=-1){//�������
            /*top.Dialog.alert("��ְ�ڼ����Ա��������ȡ���֤����Ϊ׼����������һ��200Ԫ/�˽����𡣱������踽������Ϊ��\n" +
                "    ���֤��ӡ����6��������Ч\n" +
                "   �ۼ���ֵ200Ԫ�Ϻ��н�ͨ�������Ʊԭ��")*/
            //��ʾ�ֶ�todo
            var fiedid=isFirstJh.substring(5)+"_"+i;
            hiddenCol("detail0_1_6",fiedid,"detail0_3_6");

            var fiedid3=isFirstSyjt.substring(5)+"_"+i;
            showCol("detail0_1_4",fiedid3,"detail0_3_4 td_etype_3");
            var fiedid2=isPoYhjt.substring(5)+"_"+i;
            showCol("detail0_1_5",fiedid2,"detail0_3_5 td_etype_3");
        }else{
            var fiedid=isFirstJh.substring(5)+"_"+i;
            hiddenCol("detail0_1_6",fiedid,"detail0_3_6");
            var fiedid3=isFirstSyjt.substring(5)+"_"+i;
            hiddenCol("detail0_1_4",fiedid3,"detail0_3_4");
            var fiedid2=isPoYhjt.substring(5)+"_"+i;
            hiddenCol("detail0_1_5",fiedid2,"detail0_3_5");
        }
    }
}

/**
 * ��ʾ��
 */
function showCol(headName,fiedid,colCss) {
    $("."+headName).attr("class",headName+" td_etype_2");//detail0_1_5 td_etype_2 detail_hide_col
    $("td[_fieldid='"+fiedid+"']").attr("class",colCss)
}

/**
 * ������
 */
function hiddenCol(headName,fiedid,colCss) {
    $("."+headName).attr("class",headName+" td_etype_2 detail_hide_col");//detail0_1_5 td_etype_2 detail_hide_col
    $("td[_fieldid='"+fiedid+"']").attr("class",colCss+" td_etype_3 detail_hide_col")
}

/**
 * ���Ѹ�ֵ
 * @param num
 * @param i
 * @param type
 */
function dianHuaValidation(num,i,type) {
    if(""!=type){
        console.log("phoneInvoceIDs::"+phoneInvoceIDs+"---type::"+type);
        console.log(phoneInvoceIDs.indexOf(type))
        if(phoneInvoceIDs.indexOf(type)!=-1){
            //�绰����
            var rmb = Number($("#"+sbbzje_field+"_"+num[i]).val())*Number($("#"+field_name2+"_"+num[i]).val())//����������ֵ
            console.log("���ʻ���ֵ����"+rmb);
            $("#"+ybxje_field+"_"+num[i]).val(rmb);
            var jePer=Number(rmb)*0.8;
            console.log("��ǰʵ�ʽ��%80::"+jePer);
            var bzval = $("#"+bz_field+"_"+num[i]).val();
            console.log("��׼����"+bzval);
            if(Number(jePer)<=Number(bzval)){
                $("#"+sbje_field+"_"+num[i]).val(jePer);
            }else{
                $("#"+sbje_field+"_"+num[i]).val(bzval);
            }
        }
    }
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
            /* for (var i = 5; i < $(str).length; i++) {
                 if(i%2){
                     msg=msg+$(str)[i].textContent+"</br>";
                 }
             }
             msg=msg.substring(40,msg.length-17)*/
            msg=str.substring(str.indexOf("<body>")+26,str.indexOf("</body>")-8);
            //console.log("mgs::"+msg)
            $(fieldName).val(msg);
            /* if(msg.length<=28){
             }else{
             }*/
        },
        error:function(jqXHR){
            alert("��������"+ jqXHR.status);
        }
    });
}


/**
 * �Ŷ�key val ��ֵ
 * @param num
 * @param i
 * @param type
 */
function jdZhFun(num,i) {
    var fieldName = jdKeyFiekds.split(",");
    var name="";
    var val="";
    for(var j=0;j<fieldName.length;j++){
        var namei = $("#"+fieldName[j]+"_"+num[i]+"span a").html();
        console.log("nameName::"+"#"+fieldName[j]+"_"+num[i]+"span a")
        console.log("name::"+name)
        var vali = $("#"+fieldName[j]+"_"+num[i]).val();
        console.log("vali::"+vali)
        if(""==vali){
            vali=0;
        }
        if(namei==null){
            namei="";
        }
        if(j==0){
            name=namei;
            val=vali;
        }else{
            name+="||"+namei;
            val+="."+vali;
        }
        /*��ֵ*/
        console.log("name::"+name)
        console.log("val::"+val)
        $("#"+zhzh+"_"+num[i]).val(val)
        //$("#"+zhzh+"_"+num[i]).attr("type","text")
        //document.getElementById(zhzh+"_"+num[i]).type="text";
        $("#"+zhmc+"_"+num[i]).val(name)
        //$("#"+zhmc+"_"+num[i]).attr("type","text")
        //document.getElementById(zhmc+"_"+num[i]).type="text";
    }
}
</script>
