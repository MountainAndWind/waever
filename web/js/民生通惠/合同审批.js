<script>
var valueField="field10328";
var changeField="field13829";
$(document).click( function () {
    console.log("click::")
    var flag=false;
    var values = $("#"+valueField).val();
    var valArr = values.split(",")
    for(var i=0;i<valArr.length;i++){
        if(valArr[i]=="2"){
            flag=true;
            break;
        }
    }
    if(!flag){
        console.log("����������")
        // $("div[data-fieldmark='field13829']").parent("td").attr("style","display:none")
        WfForm.changeFieldAttr(changeField, 4);
        $("div[data-fieldmark='"+changeField+"']").parents("tr").attr("style","display:none")
    }else{
        //$("div[data-fieldmark='field13829']").parent("td").attr("style","")
        $("div[data-fieldmark='"+changeField+"']").parents("tr").attr("style","")
        console.log("��������ʾ����")
        WfForm.changeFieldAttr(changeField, 3);
    }
})

</script>


