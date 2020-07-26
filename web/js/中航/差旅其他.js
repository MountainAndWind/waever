<!-- script代码，如果需要引用js文件，请使用与HTML中相同的方式。 -->
<script type="text/javascript" src="/workflow/request/js/calculateWorkingDate.js"></script>
    <script type="text/javascript">
    /*
    *  TODO
    *  请在此处编写javascript代码
    */
    jQuery(document).ready(function () {
        //cus_ConvertSelectToRadio("field11576,field8591");
        //插入图片，需要在页面中添加对应ID，如icon1
        jQuery("#icon1").html('<img id="img1" src="/page/resource/userfile/image/icon/001.png" width="35" height="35"  /> ');
        jQuery("#icon2").html('<img id="img2" src="/page/resource/userfile/image/icon/002.png" width="35" height="35" /> ');
        jQuery("#icon3").html('<img id="img3" src="/page/resource/userfile/image/icon/003.png" width="35" height="35" /> ');
        jQuery("#icon4").html('<img id="img4" src="/page/resource/userfile/image/icon/004.png" width="35" height="35" /> ');
        jQuery("#icon5").html('<img id="img5" src="/page/resource/userfile/image/icon/005.png" width="35" height="35" /> ');
        jQuery("#icon6").html('<img id="img6" src="/page/resource/userfile/image/icon/006.png" width="35" height="35" /> ');
        jQuery("#icon7").html('<img id="img7" src="/page/resource/userfile/image/icon/007.png" width="35" height="35" /> ');
        //alert("0");
//添加点击事件，包括图片和标题
        jQuery("#img1,#title1").click(function () {
            jQuery(".icon1_h").toggle();
        });
        jQuery("#img2,#title2").click(function () {
            jQuery(".icon2_h").toggle();
        });
        jQuery("#img3,#title3").click(function () {
            jQuery(".icon3_h").toggle();
        });
        jQuery("#img4,#title4").click(function () {
            jQuery(".icon4_h").toggle();
        });
        jQuery("#img5,#title5").click(function () {
            jQuery(".icon5_h").toggle();
        });
        jQuery("#img6,#title6").click(function () {
            jQuery(".icon6_h").toggle();
        });
        jQuery("#img7,#title7").click(function () {
            jQuery(".icon7_h").toggle();
        });
    });
</script>
<style>
input{ border: 0px !important; }
select{ width:90%;border: 0px !important; }
textarea{ width: 98% !important;border:1px solid #4a86e8; }
.textarea{min-height:72px !important;height:100% !important; width: 98% !important;border:1px solid #4a86e8 !important; }
.e8_innerShow{ border: 0px !important; }
.e8_outScroll{ border: 0px !important; }
</style>

<script type="text/javascript">
    //判定住宿费是否超标准
    jQuery("#field6312").bindPropertyChange(function(){
        GetYus();
    });
jQuery("#field6311").bindPropertyChange(function(){
    getFwh();
});
checkCustomize = function (){
    /**
     * 超标判断
     */
    GetYus();
    var hotel = "field6324_";		//住宿费
    var standarthotel = "field7435_" //标准住宿费
    var datecount = "field6322_"; //出差天数
    var jdjd = "field8815_"; //集团酒店 0否 1是
    var _stand_BJ = 500;			//北京住宿费标准
    var _stand_Other = 400;			//其他地区住宿费标准
    var destination = "field6318_"; 		//目的地,1表示北京
    var fieldSelector=  "input[name^='" + hotel + "']";
    var eles = jQuery(fieldSelector);
    console.log(eles);
    var hang =1;
    if (eles) {
        for (var i = 0; i < eles.length; i++) {
            console.log(eles[i]);
            var currentIndex = getCurrentIndex(eles[i]);
            if (i!=0){
                var lastIndex = getCurrentIndex(eles[i-1]);
                if(currentIndex!= lastIndex){
                    hang++;
                }
            }
            var hotelval= jQuery("#"+hotel+currentIndex).val()*1.0;//住宿费
            var dateval = jQuery("#"+standarthotel+currentIndex).val()*1.0;//标准住宿费
            var jdjdval = jQuery("#"+jdjd+currentIndex).val()*1.0;//集团酒店 0否 1是
            if(hotelval > dateval && jdjdval==0){//住宿费>标准住宿费
                jQuery("#field6330").val(0);
                alert("第"+hang+"行，住宿费超出标准,请确认！");
                return false;
                //if(confirm("第"+hang+"行，住宿费超出标准,请确认！")){
                //	return true;
                //}else{
                //	return false;
                //}
            }else{
                jQuery("#field6330").val(1);
            }
        }
    }
    return true;
    /**
     * 结束
     */
}
function GetYus(){
    var ys =jQuery("#field7519span").html();//预算信息
    ys = ys.split(";");
    var kyys = ys[4];
    kyys = kyys.split("<");
    var kyysje = kyys[1];//可用预算
    kyysje =kyysje .replace(/,/g, "");//取消字符串中出现的所有逗号
    var bcfkje =jQuery("#field6312").val()*1.0;//本次付款金额
    if(kyysje<bcfkje){
        $("#field8017").val('0');//是否超预算
    }
    if(parseFloat(kyysje)>=parseFloat(bcfkje)){
        $("#field8017").val('1');//是否超预算
    }
}

function getCurrentIndex(selector){
    var tmp = jQuery(selector).attr("id");
    if (tmp) {
        var tmp = tmp.split('_');
        if (tmp.length > 1) {
            return tmp[1];
        }
    }
    return undefined;
}
function getFwh(){
    var _ys =jQuery("#field7519span").html();//预算信息
    _ys = _ys.split(";");
    var _kyys = _ys[4];
    _kyys = _kyys .split("<");
    var _kyysje = _kyys [0];//部门可用预算
    _kyysje =_kyysje .replace(/,/g, "");//取消字符串中出现的所有逗号
    var _yfsfy = _ys[7];
    _yfsfy = _yfsfy .split("<");
    var _yfsfyje = _yfsfy[0];//已发生费用
    _yfsfyje =_yfsfyje .replace(/,/g, "");//取消字符串中出现的所有逗号
    var _spzfy = _ys[10];
    _spzfy = _spzfy .split("<");
    var _spzfyje = _spzfy[0];//审批中费用
    _spzfyje =_spzfyje .replace(/,/g, "");//取消字符串中出现的所有逗号
    var zys=parseFloat(_kyysje)+parseFloat(_yfsfyje)+parseFloat(_spzfyje); //部门总预算
    $("#field8025").val(zys);
    $("#field8025span").html(zys);
    $("#field8027").val(_kyysje);
    $("#field8027span").html(_kyysje);
}
var t = window.setTimeout("getFwh()",2000);
</script>



