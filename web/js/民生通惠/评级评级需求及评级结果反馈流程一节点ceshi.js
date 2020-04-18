<script>
/*var ntdima="field10371";//拟投代码
var ntJc="field10370";//拟投简称
var cdztqc="field16339";//承担主体全称
var rzztqc="field16338";//融资主体全称*/

var validationFields="field16339,field16338,field10371,field10370"
var validationCols="dbztqc,rzztbz,ntzqdm,ngzqjc";
var table="uf_JYDSK,uf_JYDSK,uf_pjkx,uf_pjkx";

var isExist=false;
jQuery(document).ready(function(){
    console.log("ready::");
    WfForm.registerCheckEvent(WfForm.OPER_SUBMIT,function(callback){
       /* var fields = validationFields.split(",")
        var cols = validationCols.split(",")
        var tables = table.split(",");
        for(var i=0;i<fields.length;i++){
            findValidationId(tables[i],$("#"+fields[i]).val(),cols[i]);
        }*/
        console.log("OPER_SUBMIT")
        //console.log("isExist___"+isExist)
       /* if(isExist){

        }else {
            callback();
        }*/
        WfForm.showConfirm("已有相同代码，是否继续审批",function(){
                callback();
            },
            function(){
                //WfForm.changeFieldAttr(yijian, 3);
            },{
                title:"", //弹确认框的title，仅PC端有效
                okText:"放行", //自定义确认按钮名称
                cancelText:"不放行" //自定义取消按钮名称
            });
    })

});
function findValidationId(table,val,col) {
    console.log("findValidationId")
    console.log("table:"+table)
    console.log("val:"+val)
    console.log("col:"+col)
    $.ajax({
        type:"GET",
        url:"/aes/findstr.jsp?",
        data: {'table':table,'val':val,'col':col,'timeStamp':new Date().getTime()},
        dataType:"text",
        async: false,
        success:function(data){
            console.log("data::"+data)
            var str=JSON.stringify(data);
            var res=str.substring(str.indexOf('body>')+25,str.indexOf('/body>')-13);
            console.log("res::"+res)
            if("true"==res){
                isExist=true;
            }
        },
        error:function(jqXHR){
            alert("发生错误："+ jqXHR.status);
        }
    });
}
</script>



