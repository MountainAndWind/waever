<script>

/**
 * �˴�id��ֵ����Ҫ��ǰ����#
 * */
var farAndCloseField="#field15348"
var placeField="#field15354"
var morningField="#field9450"
var midField="#field9451"
var eveField="#field9452"
var dayField="#field9336"
var mainCctype="#field7341";
var qtField="#field9446";
var startTimeField="#field9447"
var endTimeField="#field9448"

$(document).bind('click',function(){
    console.log("�������¼�")
    var index=0;
    var mx=$("#indexnum6");
    if(mx){
        index=mx.val();
    }
    for(var i=0;i<index;i++){
        var farAndCloseFieldValue = $(farAndCloseField+"_"+i).val();
        if("0"==farAndCloseFieldValue){
            closeFunction(i)
        }
        if("1"==farAndCloseFieldValue){
            farFunction(i)
        }
    }
});

/**
 * JS �ж� 1�����ֶ���ϸ���ֶν�����/Զ����= 0 //������
 ���ֶΡ��ص㡱=0,1,2,3,4, ��ֵ ����� 15 �н��� 15   ����� 15   �ս��� 45
 else ��ֵ ����� 10 �н��� 10   ����� 10   �ս��� 30
 */
function closeFunction(colIndex) {
    console.log("����������¼�")
    var placeValue = $(placeField+"_"+colIndex).val();
    if(placeValue!=""&&placeValue==0||placeValue==1||placeValue==2||placeValue==3||placeValue==4){
        $(morningField+"_"+colIndex).val("15")
        $(midField+"_"+colIndex).val("15")
        $(eveField+"_"+colIndex).val("15")
        $(dayField+"_"+colIndex).val("45")
    }else{
        $(morningField+"_"+colIndex).val("10")
        $(midField+"_"+colIndex).val("10")
        $(eveField+"_"+colIndex).val("10")
        $(dayField+"_"+colIndex).val("30")
    }
}

/**
 * 2�����ֶ���ϸ���ֶν�����/Զ���� = 1 //Զ����
 */
function farFunction(colIndex) {
    console.log("����Զ�����¼�")
    var mainCctypeVal = $(mainCctype).val();
    var startTime = $(startTimeField+"_"+colIndex).val();
    var endTime = $(endTimeField+"_"+colIndex).val();
    var qtFieldValue = $(qtField+"_"+colIndex).val();
    /*if(startTime>endTime){
        window.top.Dialog.alert("��ʼ���ڲ��ܴ��ڽ���ʱ��,��������д��");
        return;
    }*/
    if(mainCctypeVal==0){//�����ֶγ�������= 0
        valJinTie(qtFieldValue,startTime,endTime,colIndex,80,40);
    }else if(mainCctypeVal==1){//�����ֶγ�������= 1
        valJinTie(qtFieldValue,startTime,endTime,colIndex,55,40);
    }else if(mainCctypeVal==2){//�����ֶγ�������= 2
        valJinTie(qtFieldValue,startTime,endTime,colIndex,280,140);
    }else if(mainCctypeVal==3){//�����ֶγ�������= 3
        valJinTie(qtFieldValue,startTime,endTime,colIndex,210,105);
    }
}



/**
 * ��������ֵ
 * @param qtFieldValue
 * @param startTime
 * @param endTime
 * @param colIndex
 * @param dayValue
 * @param halfValue
 */
function valJinTie(qtFieldValue,startTime,endTime,colIndex,dayValue,halfValue) {
    //var comPareTime = "1200";
    if("0"==qtFieldValue){
        swapVal(colIndex);
        $(dayField+"_"+colIndex).val(dayValue)
    }else if("1"==qtFieldValue){
        /*if(endTime>comPareTime){
            window.top.Dialog.alert("��ʼʱ�䡢����ʱ�䲻�������12:00,��������д��");
            return;
        }*/
        swapVal(colIndex);
        $(dayField+"_"+colIndex).val(halfValue)
    }else if("2"==qtFieldValue){
        /*if(startTime<comPareTime){
            window.top.Dialog.alert("��ʼʱ�䲻����С��12:00,��������д��");
            return;
        }*/
        swapVal(colIndex);
        $(dayField+"_"+colIndex).val(halfValue)
    }
}

/**
 * ���ԭ��ĸ�ֵ
 * @param colIndex
 */
function  swapVal(colIndex){
    $(morningField+"_"+colIndex).val("");
    $(midField+"_"+colIndex).val("");
    $(eveField+"_"+colIndex).val("");
    $(dayField+"_"+colIndex).val("");
}

</script>