jQuery(document).ready(function(){
    var jshjField="#field9084";
    var invoiceTypeField="#field9492"
    var territoryField="#field9525";
    var timeField="#field9493";
    var mobileField="#field9499";
    var zymcField="#field9094";
    var bxr="#field5982";
    var ccrq=""
    var fhrq="";
    var fksy=""
    var ccsy="";
    var ewsm=""
    var shiyou=""
    checkCustomize = function(){
        console.log("file checkCustomize::")
        var num = $("#submitdtlid1").val();
        num = num.split(",")
        var jsonArr = new Array();
        for (var i = 0; i < num.length; i++) {//jshj,invoiceType zymc  //bxr  ccrq   fhrq   //territory//time  fksy   ccsy  ewsm  shiyou//mobile
            var imap={}
            imap.jshj=$(jshjField+"_"+num[i]).val
            imap.invoiceType=$(invoiceTypeField+"_"+num[i]).val
            imap.territory=$(territoryField+"_"+num[i]).val
            imap.time=$(timeField+"_"+num[i]).val
            imap.mobile=$(mobileField+"_"+num[i]).val
            imap.zymc=$(zymcField+"_"+num[i]).val
            jsonArr[i]=imap;
        }
        var mainMap={}
        mainMap.bxr=$(bxr).val();
        mainMap.ccrq=$(ccrq).val();
        mainMap.fhrq=$(fhrq).val();
        mainMap.fksy=$(fksy).val();
        mainMap.ccsy=$(ccsy).val();
        mainMap.ewsm=$(ewsm).val();
        mainMap.shiyou=$(shiyou).val();
        var jsonMain = "["+JSON.stringify(mainMap)+"]";
        var jsonDetail=JSON.stringify(jsonArr);
        console.log("jsonMain::"+jsonMain);
        console.log("jsonDetail::"+jsonDetail);
        findMsg(jsonMain,jsonDetail);
    }
})

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

