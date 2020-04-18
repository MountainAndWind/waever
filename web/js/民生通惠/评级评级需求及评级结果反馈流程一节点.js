<script>
/*var ntdima="field10371";//拟投代码
var ntJc="field10370";//拟投简称
var cdztqc="field16339";//承担主体全称
var rzztqc="field16338";//融资主体全称*/

var validationFields="field16339,field16338,field10371,field10370"
var validationCols="dbztqc,rzztbz,ntzqdm,ngzqjc";
var table="formtable_main_93,formtable_main_93,formtable_main_93,formtable_main_93";

var isExist=false;
jQuery(document).ready(function(){
    console.log("ready::");
    checkCustomize = function (){
        console.log("checkCustomize::");
        var fields = validationFields.split(",")
        var cols = validationCols.split(",")
        var tables = table.split(",");
        for(var i=0;i<fields.length;i++){
            findValidationId(tables[i],$("#"+fields[i]).val(),cols[i]);
        }
        console.log("OPER_SUBMIT")
        console.log("isExist___"+isExist)
        if(isExist){
            top.Dialog.alert("已有相同代码，无法提交");
            return false;
        }
        return true;
    }

});
function findValidationId(table,val,col) {
    console.log("findValidationId")
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
            console.log("发生错误："+ jqXHR.status);
        }
    });
}
</script>



