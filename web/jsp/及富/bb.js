<script language="javascript">

    jQuery(document).ready(function(){
        console.log("checkCustomizecheckCustomize::!!")
            checkCustomize = function (){
                console.log("$(\"#field12323\").val():"+$("#field12323").val())
                if($("#field12323").val()=="4") {
                    var class1 = $("span[_fieldid='16086']").find("span").find("span").attr("class").length
                    var class2 = $("span[_fieldid='16087']").find("span").find("span").attr("class").length
                    var class3 = $("span[_fieldid='16099']").find("span").find("span").attr("class").length
                    var class4 = $("span[_fieldid='16100']").find("span").find("span").attr("class").length
                    var class5 = $("span[_fieldid='16101']").find("span").find("span").attr("class").length
                    if(class1 ==-1&&class2 =-1&&class3 =-1&&class4 =-1&&class5==-1) {
                    if() {
                        window.top.Dialog.alert("完成事宜，必须至少选择一项！");
                        return false;
                    }
                }
            }
        })

</script>