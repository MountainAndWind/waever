<!-- script���룬�����Ҫ����js�ļ�����ʹ����HTML����ͬ�ķ�ʽ�� -->
<script type="text/javascript">
var bz_field="field12574";//��׼�ֶ�field1231
var ybxje_field="field12501";//Ӧ��������ֶ�field12501  �����ҽ��
var sbbzje_field="field12498";//�걨���ֽ���ֶ�field12498
var sbje_field="field12723"//ʵ������ֶ�field12723
var invoice_type_field="field13184";//��������field1231
var dianhuaVal="140"//�绰�������͵�ֵ������м��ö��Ÿ���
var hyVal="142"//�����������͵�ֵ������м��ö��Ÿ���
var jhlj_val="22";//�������ֵ
var sylj_val="32";//��������ֵ
var jdKeyFiekds="field12725,field12726,field12727,field12728,field12729,field12731,field12730,field12732,field12733"//�Ŷ��ֶ�����
var zhzh="field12513"//�˺�����ֶ�
var zhmc="field12514"//�˺������ֶ�


/*����������ʾ���ֶ�*/
var isFirstJh="field13288"//�Ƿ�����Ӱ��һ�����ܽ�����  detail0_1_6   detail0_3_6 td_etype_3 detail_hide_col
var jhRq=""//�������
/*����������ʾ���ֶ�*/
var isPoYhjt="field13164"//��ż�Ƿ�����Ӱ�����ܻ�������  detail0_1_5   detail0_3_5 td_etype_3 detail_hide_col
var isFirstSyjt="field13163"//�Ƿ�����Ӱ��һ�������������� detail0_1_4  detail0_3_4 td_etype_3 detail_hide_col
var syRq=""//��������

var field_name1="field12744"//�����ֶ���  �����ֶ�
var field_name2="field12497"//����ֵ�ֶ�  �����ֶ�
var gs_main_field="field12735";//$("#field12735").val() ��˾�����ֶ�
var gs_detail_field="field12725";//��˾��ϸ�ֶ� field12725

$(document).ready(function(){
    console.log("aaa")

    let input = document.querySelector('input');
//let input = document.getElementById('test');

    let descriper = Object.getOwnPropertyDescriptor(input.__proto__, 'value');
//ȡ��ԭ�ȵ�get��set����
    let getValue = descriper.get;
    let setValue = descriper.set;

    Object.defineProperty(
        input.__proto__,
        'value',
        {
            configurable: true,
            enumerable: true,
            get: function (){
                return getValue.call(this);
            },
            // ��дset����
            set: function (){
                console.log(arguments);
                console.log('value�����仯');
                // ����֪ͨ����
                setValue.call(this, ...arguments);
                myAction();
            }
        })

});

function myAction() {
    console.log("myAction")
    var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        var field_name1_val = $("#" + field_name1 + "_" + num[i]).val();
        //console.log("field_name1_val::" + field_name1_val);
        var curr_field_name2 = "#" + field_name2 + "_" + num[i];
        //console.log("�����ֶ�::" + curr_field_name2);
        ajax(field_name1_val, curr_field_name2);
    }
}
/**
 * �����������
 * @param fieldVal
 * @param fieldName
 */
function ajax(fieldVal,fieldName) {
    console.log("AJAX")
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


c