<script type="text/javascript">
/**
 * 1.����C�������ж� �������0
 **/
var sapFieid="field17393"//sap������



function isNull(val) {
    if(""==val||val==null||val==undefined){
        return true;
    }else{
        return false;
    }
}


/**
 * ����ֻ��
 */
function canBt(col,num,index) {
    console.log("canBt::start")
    console.log("td[_fieldid='17393'_\"+num[index]+\"]"+"td[_fieldid='17393_"+num[index]+"']")
    $("td[_fieldid='17393_"+num[index]+"']").attr("style","pointer-events:none;")
}


jQuery(document).ready(function(){

    var num = $("#submitdtlid0").val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        var value = $("#"+sapFieid+"_"+num[i]).val();
        console.log("sapFieidVal����"+value)
        if(!isNull(value)){//dayAllowanceIDs
            canBt(sapFieid,num,i);
        }
    }

    checkCustomize=function  () {

        var pd="field17952";//C���ж�
        var wl="field17393";//C������


        var ts1="";
        var ts2="";

        var flag=0;

        var idvalues = document.getElementById('submitdtlid0').value; //��ϸ�������id
        idvalues = idvalues.split(",")
        for (var i = 0; i < idvalues.length; i++) {
            var j=i+1;
            var e1=$("#"+pd+"_"+idvalues[i]).val();
            var wlcd=$("#"+wl+"_"+idvalues[i]).val().length;
            console.log("wlcd="+wlcd);
            // if(wlcd!=0){
            if(wlcd!=18){
                if(ts1.length==0){
                    ts1=j+"";
                }else{
                    ts1=ts1+","+j;
                }
            }
            if(e1<=0){
                if(ts2.length==0){
                    ts2=j+"";
                }else{
                    ts2=ts2+","+j;
                }
            }
            //}
        }
        if(ts1.length>0){
            window.top.Dialog.alert("��"+ts1+"��  SAP���ϺŸ�ʽ��������������");
            return false;
        }
        if(ts2.length>0){
            window.top.Dialog.alert("��"+ts2+"�� SAP���Ϻ�ֻ��ѡC�࣬������ѡ��");
            return false;
        }


        return true;
    }

});
</script>
<script type="text/javascript">
    jQuery(document).ready(function(){
        var bottonId="zksq";//��ťID

        var jsv=0; //����
        var js=parseFloat(jsv);


        $("#"+bottonId).live("click",function(){ //Ϊ��ť���õ���¼�
            if(js%2==0){
                cus_ControlDetailColumnByClass("_detailcolumn", 1);
            }else{
                cus_ControlDetailColumnByClass("_detailcolumn", 2);
            }
            js=js+1;
        });


        jQuery("input[name=indexnum0]").bindPropertyChange(dynEvent);

        function dynEvent(){
            cus_ControlDetailColumnByClass("_detailcolumn", 2);
        }

        dynEvent();//ҳ���������


    });
</script>











