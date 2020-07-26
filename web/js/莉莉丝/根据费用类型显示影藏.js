var invoiceType="field7311"//费用类型
var zhidingVal="30"//招聘费val
WfForm.bindFieldChangeEvent("field7311", function(obj,id,value){
    console.log("WfForm.bindFieldChangeEvent--",obj,id,value);
    if(zhidingVal==value){
    //
    $("div[data-cellmark='main_14_0']").parents("tr").attr("style","height: 30px;")
}else{
    $("div[data-cellmark='main_14_0']").parents("tr").attr("style","height: 30px;display:none;")
}
});

