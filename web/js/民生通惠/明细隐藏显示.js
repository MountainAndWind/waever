// document.getElementById(col+"_"+num[index]+"browser").removeAttribute("disabled")
/**
 * 当主表字段是’否涉及投资行为=否’明细表2,3,4隐藏
 * 当主表字段是’否涉及投资行为=是’，并且主表字段‘标的=非标/存款/债券’（2，3，4）明细表3隐藏，明细表2 4 不隐藏
 * 当主表字段是’否涉及投资行为=是’，并且主表字段‘标的=基金/回购’（1，7）明细表2 4 隐藏，明细表3不隐藏
 * @type {string}
 */
var isTz="field16911"//否涉及投资行为 是0 否  1
var bd="field9864"//



WfForm.bindFieldChangeEvent(isTz+","+bd, function(obj,id,value){
    console.log("WfForm.bindFieldChangeEvent--",obj,id,value);
    var isVal = $("#"+isTz).val();
    var bdVal = $("#"+bd).val();
    console.log("isVal::"+isVal)
    console.log("bdVal::"+bdVal)

    if("1"==isVal){//明细表2,3,4隐藏
        hideTable(2)
        hideTable(3)
        hideTable(4)
    }else{

    }
});

function hideTable(index) {
    //$(".mainTd_40_0 ").parent("tr").attr("style");
    var styleVal = $(".mainTd_"+index+"0_0").parent("tr").attr("style");
    if(styleVal.indexOf()){

    }
    styleVal+="   display:none"
    $(".mainTd_"+index+"0_0").parent("tr").attr("style",styleVal);

}

function showTable(index) {
    var styleVal = $(".mainTd_"+index+"0_0").parent("tr").attr("style");
    styleVal =styleVal.split("   ")[0]
    $(".mainTd_"+index+"0_0").parent("tr").attr("style",styleVal);
}