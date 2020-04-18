<script>
$(document).click(function () {
    findValidationId("aa")
})

/**
 * 查找费用类型对照表中存在的明细
 * @param val
 */
function findValidationId(val) {///base/findInvoiceTypById.jsp?fieldVal=3
    console.log("findValidationId")
    console.log("val:"+val)
    var msg = "";
    $.ajax({
        type:"GET",
        url:"/test/findstr.jsp?",
        data: {'val':val,'timeStamp':new Date().getTime()},
        dataType:"text",
        //data:{jsonStr:jsonStr},
        success:function(data){
            /*var str=JSON.stringify(data);*/
            console.log("data::"+data)
            var str=JSON.stringify(data);
            isExist=str.substring(str.indexOf('body>')+25,str.indexOf('/body>')-13);
            console.log("isExist::"+isExist)
        },
        error:function(jqXHR){
            alert("发生错误："+ jqXHR.status);
        }
    });
}
</script>

