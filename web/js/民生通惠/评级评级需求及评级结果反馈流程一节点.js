<script>
/*var ntdima="field10371";//拟投代码
var ntJc="field10370";//拟投简称
var cdztqc="field16339";//承担主体全称
var rzztqc="field16338";//融资主体全称*/

var validationFields="field16339,field16338,field10371,field10370"
var validationCols="dbztqc1,rzztqc1,ntzqdm,ngzqjc";
var table="formtable_main_93,formtable_main_93,formtable_main_93,formtable_main_93";
var requestId=""//请求id
var alertCount=0;
//var isExist=false;

jQuery(document).ready(function(){
    console.log("ready::");
    checkCustomize = function (){
        alertCount=0;
        var validationCount=0;
        console.log("checkCustomize::");
        var fields = validationFields.split(",")
        var cols = validationCols.split(",")
        var tables = table.split(",");
        for(var i=0;i<fields.length;i++){
            if($("#"+fields[i]).val()!=""){
                validationCount++;
                findValidationId(tables[i],$("#"+fields[i]).val(),cols[i]);
            }
        }
        console.log("OPER_SUBMIT")
        //console.log("isExist___"+isExist)
        if(validationCount!=0&&alertCount==validationCount){
            top.Dialog.alert("此项目已有其他同事申请评级，尚在内部评级中，请勿重复提交");
            return false;
        }
        return true;
    }

});
function findValidationId(table,val,col) {
    console.log("findValidationId")
    var reqVal=$("#"+requestId).val();
    console.log("reqVal::"+reqVal)
    $.ajax({
        type:"GET",
        url:"/aes/findstr.jsp?",
        data: {'table':table,'val':val,'col':col,"requestId":reqVal,'timeStamp':new Date().getTime()},
        dataType:"text",
        async: false,
        success:function(data){
            console.log("data::"+data)
            var str=JSON.stringify(data);
            var res=str.substring(str.indexOf('body>')+25,str.indexOf('/body>')-13);
            console.log("res::"+res)
            if("true"==res){
                //isExist=true;
                alertCount++
            }
        },
        error:function(jqXHR){
            console.log("发生错误："+ jqXHR.status);
        }
    });
}
</script>