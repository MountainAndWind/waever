<script>
var bxcs="#field6034"//补卡次数
var sqr="#field6026"//申请人
jQuery(document).ready(function(){
    console.log("ready::");
    findValidationId($(sqr).val())

});
function findValidationId(sqr) {
    console.log("findValidationId")
    $.ajax({
        type:"GET",
        url:"/aes/getDkcs.jsp?",
        data: {'sqr':sqr,'timeStamp':new Date().getTime()},
        dataType:"text",
        async: false,
        success:function(data){
            console.log("data::"+data)
            var str=JSON.stringify(data);
            var res=str.substring(str.indexOf('body>')+22,str.indexOf('/body>')-10);
            console.log("res::"+res)
            $(bxcs).val(res)
        },
        error:function(jqXHR){
            console.log("发生错误："+ jqXHR.status);
        }
    });
}
</script>


