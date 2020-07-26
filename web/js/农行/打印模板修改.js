<script>
 var validationFields="#field6681,#field6683,#field6684,#field6680,#field6685," +
     "#field6686,#field6782,#field6827,#field6687,#field6688,#field6689,#field6690,#field6610,#field6620,#field6615,#field6700"
jQuery(document).ready(function(){

    var fields = validationFields.split(",");
    for(var i=0;i<fields.length;i++){
        rest(fields[i]);
    }

    var jip = jQuery("#field6681").val();//机票票价
    var jip1 = jQuery("#field6683").val();//机票民航发展基金
    var jip1 = jQuery("#field6684").val();//机票其他税费
    var jip1 = jQuery("#field6680").val();//机票张数
    var hc = jQuery("#field6685").val();//火车票张数
    var hc1 = jQuery("#field6686").val();//火车票金额
    var qtjt = jQuery("#field6782").val();//其他交通工具
    var qtjtje = jQuery("#field6827").val();//其他交通工具金额
    var jtqt = jQuery("#field6687").val();//交通其他票据张数
    var jtqt1 = jQuery("#field6688").val();//交通其他票据金额
    var zsqt = jQuery("#field6689").val();//住宿其他票据张数
    var zsqt1 = jQuery("#field6690").val();//住宿其他票据金额
    var hsf = jQuery("#field6610").val();//伙食费
    var snjt = jQuery("#field6620").val();//市内交通费
    var btqt = jQuery("#field6615").val();//补贴其他
    var btje = jQuery("#field6700").val();//补贴金额
    if( jip ==0){
        jQuery("#field6681span").html('');//机票票价
        jQuery("#field6683span").html('');//机票民航发展基金
        jQuery("#field6684span").html('');//机票其他税费
        jQuery("#field6680span").html('');//机票张数
    }
    if( jip >0){
        jQuery("#field6842span").html('0');//机票燃油附加费
        jQuery("#field6684span").html('0');//机票其他税费
    }
    if( hc1 ==0){
        jQuery("#field6685span").html('');//火车票张数
        jQuery("#field6686span").html('');//火车票金额
    }
    if( qtjtje ==0){
        jQuery("#field6782span").html('');//其他交通工具
        jQuery("#field6827span").html('');//其他交通工具金额
    }
    if( jtqt1 ==0){
        jQuery("#field6687span").html('');//交通其他票据张数
        jQuery("#field6688span").html('');//交通其他票据金额
    }
    if( zsqt1 ==0){
        jQuery("#field6689span").html('');//住宿其他票据张数
        jQuery("#field6690span").html('');//住宿其他票据金额
    }
    if( hsf ==0){
        jQuery("#field6610span").html('');//伙食费
    }
    if( snjt ==0){
        jQuery("#field6620span").html('');//市内交通费
    }
    if( btqt ==0){
        jQuery("#field6615span").html('');//补贴其他
    }
    if( btje ==0){
        jQuery("#field6700span").html('');//补贴金额
    }
})

/**
 * 0 ，0.00  的值设置为空
  */
function rest(field) {
   var val = $(field).val()
    if("0"==val||"0.00"==val||"0.0"==val){
        $(field).val("");
    }
}
</script>

