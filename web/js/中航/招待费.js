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
<script type="text/javascript">
    //判定是否超预算，并给是否超预算字段赋值；
    jQuery(function($){
        window.checkCustomize = function (){
            var zdrs = "field8810_";//招待人数
            var ptrs = "field8811_";//陪同人数
            var rjje = "field8812_";//人均金额
            var fieldSelector=  "input[name^='" + rjje + "']";
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
                    var zdrsval = jQuery("#"+zdrs+currentIndex).val()*1.0;//招待人数
                    var ptrsval = jQuery("#"+ptrs+currentIndex).val()*1.0;//陪同人数
                    var rjjeval = jQuery("#"+rjje+currentIndex).val()*1.0;//人均金额
                    //人均>300,陪同人数>招待人数，陪同人数>(招待人数+5）/2
                    if(rjjeval > 300 || ptrsval > zdrsval || ptrsval >(zdrsval+5)/2){
                        alert("第"+hang+"行，填写不符合标准，请核对重新填写！")
                        return false;
                    }
                }
            }
            var ys =jQuery("#field7379span").html();//预算信息
            ys = ys.split(";");
            var kyys = ys[4];
            kyys = kyys.split("<");
            var kyysje = kyys[0];//可用预算
            kyysje =kyysje .replace(/,/g, "");//取消字符串中出现的所有逗号
            var bcfkje =jQuery("#field6405").val();//本次付款金额
            if(parseFloat(kyysje)<parseFloat(bcfkje)){
                $("#field6417").val('0');//是否超预算
                return true;
            }
            $("#field6417").val('1');//是否超预算field8026
            return true;
        }
    });
</script>
<script type="text/javascript">
    jQuery("#field6405").bindPropertyChange(function(){
        getFwh();
    });
function getFwh(){
    var _ys =jQuery("#field7379span").html();//预算信息
    _ys = _ys.split(";");
    var _kyys = _ys[4];
    _kyys = _kyys.split("<");
    var _kyysje = _kyys[0];//部门可用预算
    _kyysje =_kyysje.replace(/,/g, "");//取消字符串中出现的所有逗号
    var _yfsfy = _ys[7];
    _yfsfy = _yfsfy.split("<");
    var _yfsfyje = _yfsfy[0];//已发生费用
    _yfsfyje =_yfsfyje .replace(/,/g, "");//取消字符串中出现的所有逗号
    var _spzfy = _ys[10];
    _spzfy = _spzfy.split("<");
    var _spzfyje = _spzfy[0];//审批中费用
    _spzfyje =_spzfyje .replace(/,/g, "");//取消字符串中出现的所有逗号
    var zys=parseFloat(_kyysje)+parseFloat(_yfsfyje)+parseFloat(_spzfyje); //部门总预算
    jQuery("#field8024").val(zys);
    jQuery("#field8024span").html(zys);
    $("#field8026").val(_kyysje);//提交时当前可用预算
    $("#field8026span").text(_kyysje);//提交时当前可用预算
}
var t = window.setTimeout("getFwh()",2000);
</script>

<style>
input{ border: 0px !important; }
select{ width:90%;border: 0px !important; }
.excelMainTable textarea{ width: 98% !important;border:1px solid #4a86e8; }
.textarea{min-height:72px !important;height:100% !important; width: 98% !important;border:1px solid #4a86e8 !important; }
.e8_innerShow{ border: 0px !important; }
.e8_outScroll{ border: 0px !important; }
</style>

