<!-- script代码，如果需要引用js文件，请使用与HTML中相同的方式。 -->
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




