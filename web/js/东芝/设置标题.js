



/**
 * ���ҷ������Ͷ��ձ��д��ڵ���ϸ
 * @param val
 */
function findValidationId(val) {///base/findInvoiceTypById.jsp?fieldVal=3
    console.log("findValidationId")
    console.log("val:"+val)
    var msg = "";
    $.ajax({
        type:"GET",
        url:"/aes/requestReset.jsp?",
        data: {'val':val,'timeStamp':new Date().getTime()},
        dataType:"text",
        //data:{jsonStr:jsonStr},
        success:function(data){
            /*var str=JSON.stringify(data);*/
            console.log("data::"+data)
            var str=JSON.stringify(data);
            isExist=str.substring(str.indexOf('body>')+25,str.indexOf('/body>')-13);
            console.log("isExist::"+isExist)
        },
        error:function(jqXHR){
            alert("��������"+ jqXHR.status);
        }
    });
}