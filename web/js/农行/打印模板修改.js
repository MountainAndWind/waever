<script>
 var validationFields="#field6681,#field6683,#field6684,#field6680,#field6685," +
     "#field6686,#field6782,#field6827,#field6687,#field6688,#field6689,#field6690,#field6610,#field6620,#field6615,#field6700"
jQuery(document).ready(function(){

    var fields = validationFields.split(",");
    for(var i=0;i<fields.length;i++){
        rest(fields[i]);
    }

    var jip = jQuery("#field6681").val();//��ƱƱ��
    var jip1 = jQuery("#field6683").val();//��Ʊ�񺽷�չ����
    var jip1 = jQuery("#field6684").val();//��Ʊ����˰��
    var jip1 = jQuery("#field6680").val();//��Ʊ����
    var hc = jQuery("#field6685").val();//��Ʊ����
    var hc1 = jQuery("#field6686").val();//��Ʊ���
    var qtjt = jQuery("#field6782").val();//������ͨ����
    var qtjtje = jQuery("#field6827").val();//������ͨ���߽��
    var jtqt = jQuery("#field6687").val();//��ͨ����Ʊ������
    var jtqt1 = jQuery("#field6688").val();//��ͨ����Ʊ�ݽ��
    var zsqt = jQuery("#field6689").val();//ס������Ʊ������
    var zsqt1 = jQuery("#field6690").val();//ס������Ʊ�ݽ��
    var hsf = jQuery("#field6610").val();//��ʳ��
    var snjt = jQuery("#field6620").val();//���ڽ�ͨ��
    var btqt = jQuery("#field6615").val();//��������
    var btje = jQuery("#field6700").val();//�������
    if( jip ==0){
        jQuery("#field6681span").html('');//��ƱƱ��
        jQuery("#field6683span").html('');//��Ʊ�񺽷�չ����
        jQuery("#field6684span").html('');//��Ʊ����˰��
        jQuery("#field6680span").html('');//��Ʊ����
    }
    if( jip >0){
        jQuery("#field6842span").html('0');//��Ʊȼ�͸��ӷ�
        jQuery("#field6684span").html('0');//��Ʊ����˰��
    }
    if( hc1 ==0){
        jQuery("#field6685span").html('');//��Ʊ����
        jQuery("#field6686span").html('');//��Ʊ���
    }
    if( qtjtje ==0){
        jQuery("#field6782span").html('');//������ͨ����
        jQuery("#field6827span").html('');//������ͨ���߽��
    }
    if( jtqt1 ==0){
        jQuery("#field6687span").html('');//��ͨ����Ʊ������
        jQuery("#field6688span").html('');//��ͨ����Ʊ�ݽ��
    }
    if( zsqt1 ==0){
        jQuery("#field6689span").html('');//ס������Ʊ������
        jQuery("#field6690span").html('');//ס������Ʊ�ݽ��
    }
    if( hsf ==0){
        jQuery("#field6610span").html('');//��ʳ��
    }
    if( snjt ==0){
        jQuery("#field6620span").html('');//���ڽ�ͨ��
    }
    if( btqt ==0){
        jQuery("#field6615span").html('');//��������
    }
    if( btje ==0){
        jQuery("#field6700span").html('');//�������
    }
})

/**
 * 0 ��0.00  ��ֵ����Ϊ��
  */
function rest(field) {
   var val = $(field).val()
    if("0"==val||"0.00"==val||"0.0"==val){
        $(field).val("");
    }
}
</script>

