var isExist="#field14350";
$(document).ready(function () {
    console.log("ready")
    var val = $(isExist).val();
    console.log("val:"+val)
    if(val=="0"||val==undefined||val==""){
        $(".mc_1_1").attr("class","span_mc mc_1_1 edesign_hide")
    }else{
        $(".mc_1_1").attr("class","span_mc mc_1_1")
    }
    $(isExist).bindPropertyChange(function () {
        var val = $(isExist).val();
        console.log("val:"+val)
        if(val=="0"||val==undefined||val==""){
            $(".mc_1_1").attr("class","span_mc mc_1_1 edesign_hide")
        }else{
            $(".mc_1_1").attr("class","span_mc mc_1_1")
        }
    });
})
