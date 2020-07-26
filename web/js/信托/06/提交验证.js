jQuery(document).ready(function(){
    /*//明细
    var jshjField="#field9099";
    var invoiceTypeField="#field9484"
    var territoryField="#field9523";
    var timeField="#field9486";
    var mobileField="#field9487";
    var zymcField="#field9108";
    //主表
    var bxr="#field6557";
    var ccrq="#field6009"//06
    var fhrq="#field6010";//06
    var ewsm=""//07
    var shiyou=""//07*/
    checkCustomize = function(){
        console.log("file checkCustomize::")
        var detailFields="#field9099,#field9484,#field9523,#field9486,#field9487,#field9108";
        var mainFields="#field6557,#field6009,#field6010";
        showInfo("6",detailFields,mainFields);
    }
})

function showInfo(index,fields,mainFields) {
    console.log("showInfo::")
    console.log("fields::"+fields)
    console.log("mainFields::"+mainFields)
    var num = $("#submitdtlid1").val();
    num = num.split(",")
    var jsonArr = new Array();
    var fieldArr = fields.split(",")
    var mainArr = mainFields.split(",")
    for (var i = 0; i < num.length; i++) {//jshj,invoiceType zymc  //bxr  ccrq   fhrq   //territory//time  fksy   ccsy  ewsm  shiyou//mobile
        var count=0;
        var imap={}
        console.log("fieldArr[count++]+\"_\"+num[i]  jshj::"+(fieldArr[0]+"_"+num[i]))
        console.log("fieldArr[count++]+\"_\"+num[i]  zymc::"+(fieldArr[5]+"_"+num[i]))
        imap.jshj=$(fieldArr[count++]+"_"+num[i]).val
        imap.invoiceType=$(fieldArr[count++]+"_"+num[i]).val
        imap.territory=$(fieldArr[count++]+"_"+num[i]).val
        imap.time=$(fieldArr[count++]+"_"+num[i]).val
        imap.mobile=$(fieldArr[count++]+"_"+num[i]).val
        imap.zymc=$(fieldArr[count++]+"_"+num[i]).val
        console.log("imap::"+imap);
        jsonArr[i]=imap;
    }
    var mainMap={}
    if("9"==index||"6"==index){
        mainMap.bxr=$(mainArr[0]).val();
        mainMap.ccrq=$(mainArr[1]).val();
        mainMap.fhrq=$(mainArr[2]).val();
    }else if("7"==index){
        mainMap.ewsm=$(mainArr[0]).val();
        mainMap.shiyou=$(mainArr[1]).val();
    }else{
        alert("验证规则js发生错误")
    }
    var jsonMain = "["+JSON.stringify(mainMap)+"]";
    var jsonDetail=JSON.stringify(jsonArr);
    console.log("jsonMain::"+jsonMain);
    console.log("jsonDetail::"+jsonDetail);
    findMsg(jsonMain,jsonDetail);
}

/**
 * 后台提交查询提示
 * @param val
 */
function findMsg(jsonMain,jsonDetail) {///base/findInvoiceTypById.jsp?fieldVal=3
    var msg = "";
    $.ajax({
        type:"GET",
        url:"/aes/findMsg.jsp?",
        data: {'jsonMain':jsonMain,"jsonDetail":jsonDetail,'timeStamp':new Date().getTime()},
        dataType:"text",
        success:function(data){
            var str=JSON.stringify(data);
            msg=str.substring(str.indexOf("<body>")+26,str.indexOf("</body>")-8);
            alert(msg);
        },
        error:function(jqXHR){
            alert("发生错误："+ jqXHR.status);
        }
    });
}

