<script>
var ajhField="field7323"//示列field12312
jQuery(document).ready(function(){
    console.log("ready")
    var ajhFieldVal =$("#"+ajhField).val()
    console.log("ajhFieldVal::"+ajhFieldVal)
    var name =$("#requestname").val()
    console.log("name::"+name)
    if(!name.startsWith("0")){
        var requestid =$("#requestid").val()
        console.log("requestid::"+requestid)
        var newTitle=ajhFieldVal+name;
        findValidationId(requestid,newTitle);
    }
})

/**
 * @param val
 */
function findValidationId(requestid,newTitle) {///
    console.log("findValidationId")
    $.ajax({
        type:"GET",
        url:"/aes/requestReset.jsp?",
        data: {'requestid':requestid,"newTitle":newTitle,'timeStamp':new Date().getTime()},
        dataType:"text",
        success:function(data){
            /*var str=JSON.stringify(data);*/
            console.log("data::"+data)
            var str=JSON.stringify(data);
            console.log("str::"+str)
        },
        error:function(jqXHR){
            alert("发生错误："+ jqXHR.status);
        }
    });
}
</script>