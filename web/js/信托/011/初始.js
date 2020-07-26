<script>
jQuery.getScript( '/workflow/request/ux/ux.js' );
jQuery.getScript( '/workflow/request/ux/fns.js' );
jQuery.getScript('/workflow/request/js/FnTrans.js');
my_zhaodaiFee="";
my_qitaFee="";
my_dangqianFee="";
my_ifbusiness=false;
function getXM(){
    var vs = [];
    jQuery.each(jQuery( 'select[name^=field7972]' ),function(i,n){
        var v = jQuery(n).val();
        vs[i]=v;
    });
    return vs;
}
function xmchange(){
    var vs = getXM();
    if(Fns.checkRequest( vs )){
        cTool.setMust( "field6473" );
    }else{
        cTool.setNoMust( "field6473" );
    }
}

function addRow(i){
    addRow0(i);
    //jQuery( 'select[name^=field7972]' ).unbind('change',xmchange).bind( 'change' , xmchange );
}

//获取所有选择项目
var alertFlag=""

$(document).ready(function(){
    checkCustomize = function (){//
        console.log("checkCustomize::")

        var bxJe_field="#field7885"//报销金额
        var hzJe_field="#field9521";//发票汇总金额
        var purchaser_field="#field9157"//付款方名称
        var bxje=$(bxJe_field).val();
        var hzje=$(hzJe_field).val();
        console.log("bxje::"+bxje)
        console.log("hzje::"+hzje)
        if(Number(bxje)>Number(hzje)){
            alert("报销总金额不能大于发票汇总金额！！！")
            return false;
        }

        alertFlag="false"
        var num = $("#submitdtlid1").val();
        num = num.split(",")
        for (var i = 0; i < num.length; i++) {
            var val = $(purchaser_field+"_"+num[i]).val();
            console.log("$(purchaser_field+\"_\"+num[i])::"+purchaser_field+"_"+num[i])
            console.log("val::"+val)
            findValidationId(val);
        }
        console.log("alertFlag::"+alertFlag)
        if("true"==alertFlag){
            alert("识别关联企业发票");
        }
    }
})


function findValidationId(val) {///base/findInvoiceTypById.jsp?fieldVal=3
    var msg = "";
    $.ajax({
        type:"GET",
        url:"/aes/getAss.jsp?",
        data: {'val':val,'timeStamp':new Date().getTime()},
        dataType:"text",
        async:false,
        success:function(data){
            var str=JSON.stringify(data);
            msg=str.substring(str.indexOf("body>")+29,str.indexOf("</body")-8);
            console.log("msg::"+msg);
            console.log("\"true\"==msg"+("true"==msg));
            if("true"==msg){
                console.log("setFlag");
                alertFlag="true";
                console.log("alertFlag::"+alertFlag);
            }
        },
        error:function(jqXHR){
            alert("发生错误："+ jqXHR.status);
        }
    });
}

</script>