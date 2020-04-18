<script>
var ntdima="field10371"//拟投代码
jQuery().ready(function(){
    console.log("read")
    var val = $("#"+ntdima).val();
    findValidationId(val);
    WfForm.registerCheckEvent(WfForm.OPER_SUBMIT,function(callback){
        console.log("OPER_SUBMIT::");
        var val = $("#"+ntdima).val();
        console.log("拟投代码::"+val);
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
                msg=str.substring(str.indexOf("<body>")+26,str.indexOf("</body>")-12);
                console.log("msg::"+msg)
                if(Number(msg)==0){//不存在
                    callback();
                }else{
                    WfForm.showConfirm(msg,function(){
                            callback();
                        },
                        function(){
                        },{
                            title:"", //弹确认框的title，仅PC端有效
                            okText:"放行", //自定义确认按钮名称
                            cancelText:"不放行" //自定义取消按钮名称
                        });
                }
            },

            error:function(jqXHR){
                alert("发生错误："+ jqXHR.status);
            }
        });
    });
});
</script>

