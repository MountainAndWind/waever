<script>
var sapFieid="field17393"//sap物流号

$(document).ready(function(){

    var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        var value = $("#"+sapFieid+"_"+num[i]).val();
        if(!isNull(value)){//dayAllowanceIDs
            canBt(sapFieid,num,i);
        }
    }

}


function isNull(val) {
    if(""==val||val==null||val==undefined){
        return true;
    }else{
        return false;
    }
}

/**
 * 设置必填
 */
function setBt(col,num,index) {
    var btzd = $("input[name='needcheck']").val();
    $("#"+col+"_"+num[index]+"span").html(textValue);
    $("#"+col+"_"+num[index]).attr('viewtype','1');
    var s="," + col+"_"+num[index];
    if(btzd.indexOf(s)==-1){
        var fieldIds = btzd + "," + col+"_"+num[index] ;
        $("input[name='needcheck']").val(fieldIds);
    }
    document.getElementById(col+"_"+num[index]+"browser").removeAttribute("disabled")
}

/**
 * 取消必填
 */
function canBt(col,num,index) {
    var btzd = $("input[name='needcheck']").val();
    btzd=btzd.replace(","+col+"_"+num[index],"")
    $("input[name='needcheck']").val(btzd);
    $("#"+col+"_"+num[index]+"span").html("");
    $("#"+col+"_"+num[index]).val("");
    //$("#"+col+"_"+num[index]+"browser").attr("disabled","disabled");
    //$("#"+col+"_"+num[index]+"wrapspan div[class='e8_os']").attr("style","pointer-events:none; width:100%;min-width:120px;");
    $("td[_fieldid='17393'_"+num[index]+"]").attr("style","pointer-events:none;")
}
</script>