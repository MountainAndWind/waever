<script language="javascript">
/**
 *
 * �汾3���˰汾�����һ���������һ������������͸�ֵ
 * ʹ��ǰ�������ã�
 *   1������ϸ��1�����ý���ֶ�idΪjedetail����ϸ��ĿΪkmdetail�Լ�ָ����ֵ��ϸ����ʱ�����ϸ����ͬ����Ҫ���ö�Ӧ���ֶ�id
 *      ��ʽΪje����km��Ϊǰ׺ +detail+�������ֵ
 *   2������kmidMap��jeMap
 *   3��detail1je��detail1kmid�ֱ�Ϊ����ֶ������ǰ׺����ϸ��Ŀ�ֶ������ǰ׺
 *   4��zdmc��Ϊǰ׺�ı���Ϊ������ֶ�
 */
var tables=8//��ϸ�����
var excludeTableIndex="2,4"//�ų�����ϸ������
var detail1kmid="field10823"
var detail1je="field7366"
/*��˰���*/
var detail1hsje="field14869";
var detail1sj="field15830";

var zdmc_kmid="kmid"
var zdmc_je="je"
/**/
var zdmc_hsje="hsje";
var zdmc_sj="sj"
var kmidMap={3:"field9329",5:"field9331",6:"field9333",7:"field9335",8:"field9337"};
var jeMap={3:"field9330",5:"field9332",6:"field9334",7:"field9336",8:"field9338"};
/**/
var sjMap={3:"field15831",5:"field15832",6:"field15833",7:"field15835",8:"field15834"};
var hsjeMap={3:"field14878",5:"field14880",6:"field14882",7:"field14884",8:"field14886"};
var addOrUpdateMarkStrField="field16332"
var bindFieldStrField="field16333"
var map = {};
var mapField="field16344"
/*����ʱ��ʱ����*/
var addStr=""
var mapF=[];
var array = [];
var arr = new Array(20);
/*����2��ʼ��*/
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


jQuery(document).ready(function(){
    var excludeArr;//����������ڽ����ų���������
    if(excludeTableIndex!=""&&excludeTableIndex!=null){
        excludeArr = excludeTableIndex.split(",")//���ַ�������ת����int���Ͳ��ҷ�װ��������
        console.log("excludeArr����::"+excludeArr)
    }
    resetDeatil1ColName();

    WfForm.registerAction(WfForm.ACTION_ADDROW+""+1, function(index){ //�������¼�
        console.log("��ϸ"+1+"�������¼�����"+"�����±�Ϊ::"+index);
        var addStrs = addStr.split(",");

        $("#"+detail1kmid+"_"+index).attr("name",addStrs[0])
        $("#"+detail1je+"_"+index).attr("name",addStrs[1])
        $("#"+detail1sj+"_"+index).attr("name",addStrs[2]);
        $("#"+detail1hsje+"_"+index).attr("name",addStrs[3]);
        setJson(index,addStr);
    });

    console.log("��ϸ��"+3+"�����¼�������")
    WfForm.registerAction(WfForm.ACTION_ADDROW+""+3, function(index){ //�������¼�
        console.log("��ϸ"+3+"�������¼�����"+"�����±�Ϊ::"+index);
        bindField(3,index);
    });
    WfForm.registerAction(WfForm.ACTION_DELROW+""+3, function(arg){ //��ɾ���¼�
        console.log("��ϸ"+3+"��ɾ���¼�����"+"�����±�Ϊ::"+arg.join(","));
        removeBindField(3,arg);
    });
    console.log("��ϸ��"+5+"�����¼�������")
    WfForm.registerAction(WfForm.ACTION_ADDROW+""+5, function(index){ //�������¼�
        console.log("��ϸ"+5+"�������¼�����"+"�����±�Ϊ::"+index);
        bindField(5,index);
    });
    WfForm.registerAction(WfForm.ACTION_DELROW+""+5, function(arg){ //��ɾ���¼�
        console.log("��ϸ"+5+"��ɾ���¼�����"+"�����±�Ϊ::"+arg.join(","));
        removeBindField(5,arg);
    });
    console.log("��ϸ��"+6+"�����¼�������")
    WfForm.registerAction(WfForm.ACTION_ADDROW+""+6, function(index){ //�������¼�
        console.log("��ϸ"+6+"�������¼�����"+"�����±�Ϊ::"+index);
        bindField(6,index);
    });
    WfForm.registerAction(WfForm.ACTION_DELROW+""+6, function(arg){ //��ɾ���¼�
        console.log("��ϸ"+6+"��ɾ���¼�����"+"�����±�Ϊ::"+arg.join(","));
        removeBindField(6,arg);
    });
    console.log("��ϸ��"+7+"�����¼�������")
    WfForm.registerAction(WfForm.ACTION_ADDROW+""+7, function(index){ //�������¼�
        console.log("��ϸ"+7+"�������¼�����"+"�����±�Ϊ::"+index);
        bindField(7,index);
    });
    WfForm.registerAction(WfForm.ACTION_DELROW+""+7, function(arg){ //��ɾ���¼�
        console.log("��ϸ"+7+"��ɾ���¼�����"+"�����±�Ϊ::"+arg.join(","));
        removeBindField(7,arg);
    });
    console.log("��ϸ��"+8+"�����¼�������")
    WfForm.registerAction(WfForm.ACTION_ADDROW+""+8, function(index){ //�������¼�
        console.log("��ϸ"+8+"�������¼�����"+"�����±�Ϊ::"+index);
        bindField(8,index);
    });
    WfForm.registerAction(WfForm.ACTION_DELROW+""+8, function(arg){ //��ɾ���¼�
        console.log("��ϸ"+8+"��ɾ���¼�����"+"�����±�Ϊ::"+arg.join(","));
        removeBindField(8,arg);
    });
    bindFunction();

});

function replaceAll(str){
    if(str!=null&&""!=str){
        str=str.replace(/��/g,"'")
        str=str.replace(/��/g,"'" )
    }
    return str;
}

function resetDeatil1ColName() {
    var json = replaceAll($("#"+mapField).val());
    console.log("resetDeatil1ColName::"+json)
    var jsonObj;
    if(json!=""){
        jsonObj = eval('(' + json + ')');
        array =jsonObj
        console.log(array)
    }
    var num = WfForm.getDetailAllRowIndexStr("detail_1")
    // map = $("#"+mapField).val();
    if(num!=""){
        num = num.split(",")
        for (var i = 0; i < num.length; i++) {
            var text = jsonObj[i].split(",");
            var kmidNameId =text[0];
            var jeNameID = text[1];
            var sjNameId=text[2];
            var hsjeNameId =text[3];
            $("#"+detail1kmid+"_"+i).attr("name",kmidNameId)
            $("#"+detail1je+"_"+i).attr("name",jeNameID)
            $("#"+detail1sj+"_"+i).attr("name",sjNameId)
            $("#"+detail1hsje+"_"+i).attr("name",hsjeNameId)
            console.log(detail1kmid+"::name::"+kmidNameId+" "+detail1je+"::name::"+jeNameID+" "+detail1sj+"::name::"+sjNameId+" "+detail1hsje+"::name::"+hsjeNameId+" ")
        }
    }

}

function beforeDelete() {
    var num = WfForm.getDetailAllRowIndexStr("detail_1")
   // map = $("#"+mapField).val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        var kmidvalue = $("#"+detail1kmid+"_"+num[i]).attr("id");
        var jeidvalue = $("#"+detail1je+"_"+num[i]).attr("id");
        /**/
        var sjValue = $("#"+detail1sj+"_"+num[i]).attr("id");
        var hsjeValue = $("#"+detail1hsje+"_"+num[i]).attr("id");

        map[kmidvalue] = $("#"+detail1kmid+"_"+num[i]).attr("name");
        map[jeidvalue] = $("#"+detail1je+"_"+num[i]).attr("name");
        /**/
        map[sjValue] = $("#"+detail1sj+"_"+num[i]).attr("name");
        map[hsjeValue] = $("#"+detail1hsje+"_"+num[i]).attr("name");
    }
    console.log("ɾ��֮ǰ������map"+map)
}

function afterDelete() {
    var num = WfForm.getDetailAllRowIndexStr("detail_1")
    //map = $("#"+mapField).val();
    num = num.split(",")
    for (var i = 0; i < num.length; i++) {
        var kmidvalue = $("#"+detail1kmid+"_"+num[i]).attr("id");
        var jeidvalue = $("#"+detail1je+"_"+num[i]).attr("id");
        /**/
        var sjValue = $("#"+detail1sj+"_"+num[i]).attr("id");
        var hsjeValue = $("#"+detail1hsje+"_"+num[i]).attr("id");

        $("#"+detail1kmid+"_"+num[i]).attr("name",map[kmidvalue])
        $("#"+detail1je+"_"+num[i]).attr("name",map[jeidvalue])
        /**/
        $("#"+detail1sj+"_"+num[i]).attr("name",map[sjValue])
        $("#"+detail1hsje+"_"+num[i]).attr("name",map[hsjeValue])
    }
    console.log("ɾ��֮�������map"+map)
}

/*���ݵ�ǰɾ������������������*/
function resetIndex(tableIndex,colIndex) {
    var num = WfForm.getDetailAllRowIndexStr("detail_"+tableIndex)
    num = num.split(",")
    for (var i = colIndex+1; i < num.length; i++) {

    }
}

/* �Ƴ���ϸ��һ�ж�Ӧ������ */
function removeBindField(indexAdd,arg) {
    for (var j = 0; j < arg.length; j++) {
        var kmid = getInputFieldIdByMap("km",indexAdd,arg[j])
        var jeid = getInputFieldIdByMap("je",indexAdd,arg[j])
        /**/
        var sjid = getInputFieldIdByMap("sj",indexAdd,arg[j])
        var hsjeid = getInputFieldIdByMap("hsje",indexAdd,arg[j])

        var num = WfForm.getDetailAllRowIndexStr("detail_1")
        num = num.split(",")
        for (var i = 0; i < num.length; i++) {
            beforeDelete();
            var mark = getMark(num[i]);//�洢��Ӧ��ֵ�ֶε�λ���ø�ֵ�ֶ�id��ʶ
            if(mark.indexOf(kmid)>=0||mark.indexOf(jeid)>=0||mark.indexOf(sjid)>=0||mark.indexOf(hsjeid)>=0){
                //˵����Ӧ���ڽ���ɾ������
                WfForm.delDetailRow("detail_1", num[i]);
                afterDelete();
            }
        }
    }
}

function getMark(i) {
    var kmId = detail1kmid+"_"+i;
    var jeId = detail1je+"_"+i;
    /**/
    var sjId = detail1sj+"_"+i;
    var hsjeId = detail1hsje+"_"+i;

    var v1 = $("#"+kmId).attr("name")==null?"":$("#"+kmId).attr("name")
    var v2 = $("#"+jeId).attr("name")==null?"":$("#"+jeId).attr("name")

    var v3 = $("#"+sjId).attr("name")==null?"":$("#"+sjId).attr("name")
    var v4 = $("#"+hsjeId).attr("name")==null?"":$("#"+hsjeId).attr("name")
    return v1+","+v2+","+v3+","+v4;
}


/* ���ֶ� */
function bindField(indexAdd,index) {
    console.log("���ֶ���ӵ�bindFieldStr")
    var kmfieldId = "kmdetail"+indexAdd
    var jefieldId = "jedetail"+indexAdd
    /**/
    var sjfieldId = "sjdetail"+indexAdd
    var hsjefieldId = "hsjedetail"+indexAdd
    var kmid = GetInputFieldIdById(kmfieldId,index)
    var jeid = GetInputFieldIdById(jefieldId,index)
    /**/
    var sjid = GetInputFieldIdById(sjfieldId,index)
    var hsjeid = GetInputFieldIdById(hsjefieldId,index)
    var formBindFieldStr = $("#"+bindFieldStrField).val();

    if(formBindFieldStr==""){
        formBindFieldStr = formBindFieldStr+kmid+","+jeid+","+sjid+","+hsjeid;
    }else{
        formBindFieldStr = formBindFieldStr+","+kmid+","+jeid+","+sjid+","+hsjeid;
    }
    $("#"+bindFieldStrField).val(formBindFieldStr)
    console.log("��Ӻ�formBindFieldStr::"+formBindFieldStr)
    bindFunction();
}

/* ��ϸ��ָ��Ӱ�촥����ֵ��ϸ��1�¼� */
function bindFunction(){
    console.log("������ֵ�ı��¼�")
    WfForm.bindFieldChangeEvent($("#"+bindFieldStrField).val(), function(obj,id,value){
        console.log("WfForm--valueֵ�ı��¼�����",obj,id,value);
        updateOraddNew(obj,id,value)//�޸Ļ�ֵ
    });
}

function getInputFieldIdByMap(mark,indexAdd,j) {
    var id = "";
    if("km"==mark){
        id=kmidMap[indexAdd]+"_"+j
    }else if("je"==mark){
        id=jeMap[indexAdd]+"_"+j
    }else if("sj"==mark){
        id=sjMap[indexAdd]+"_"+j
    }else{
        id=hsjeMap[indexAdd]+"_"+j
    }
    console.log("map����-----------"+mark+":"+indexAdd+":"+j+"  idΪ "+id)
    return id
}


/* �����ֶ�id�������������Ҷ�ӦinputId */
function GetInputFieldIdById(fieldId,j) {//filedIdΪ��̨�����ֶ�id��jΪ��������
    console.log("����id-----------"+fieldId)
    var fieldmark = $("#"+fieldId).attr("data-fieldmark")
    var id = fieldmark.substring(0,fieldmark.length-1)+""+j
    console.log(id)
    return id
}
/* ʵʱ������ϸ��һ������ */
function updateOraddNew(obj,id,value) {//������ָ����ϸ��
    //�жϴ���Ķ�����ֶ�
    //var divId = $("#"+id).parent().parent().attr("id");//kmdetail3,jedetail3
    var divId = $("#"+id).parents("div[data-fieldmark="+id+"]").attr("id")
    var tableindex = GetIndexByField(divId)
    var otherId = "";
    var mark = divId.substring(0,2)  //���������ֶ�
    console.log("mark::"+mark)
    var formAddOrUpdateMarkStr = $("#"+addOrUpdateMarkStrField).val();
    if(formAddOrUpdateMarkStr.indexOf(id)<0){//����
        var zdmc = ""
        var field=""
        var otherField_One="";
        var otherField_Two=""
        var otherField_Three="";
        var otherField_Four=""

        var otherId_One="";
        var otherId_Two=""
        var otherId_Three="";
        var otherId_Four="";
        console.log("������������")
        if(mark=="km"){
            zdmc=zdmc_kmid;
            //field=detail1kmid;
            otherField_One=detail1kmid;
            otherId_One=id;

            otherField_Two=detail1je
            otherId_Two=$("#"+id).parents("td").siblings("td").find("div[id='jedetail"+tableindex+"']").find("input").attr("id")
            otherField_Three=detail1sj
            otherId_Three=$("#"+id).parents("td").siblings("td").find("div[id='sjdetail"+tableindex+"']").find("input").attr("id")
            otherField_Four=detail1hsje
            otherId_Four=$("#"+id).parents("td").siblings("td").find("div[id='hsjedetail"+tableindex+"']").find("input").attr("id")

        }else if(mark=="je"){
            zdmc=zdmc_je;
            otherField_Two=detail1je;
            otherId_Two=id

            otherField_One=detail1kmid;
            otherId_One=$("#"+id).parents("td").siblings("td").find("div[id='kmdetail"+tableindex+"']").find("input[type='hidden']").attr("id")
            otherField_Three=detail1sj
            otherId_Three=$("#"+id).parents("td").siblings("td").find("div[id='sjdetail"+tableindex+"']").find("input").attr("id")
            otherField_Four=detail1hsje
            otherId_Four=$("#"+id).parents("td").siblings("td").find("div[id='hsjedetail"+tableindex+"']").find("input").attr("id")
        }else if(mark=="sj"){
            zdmc=zdmc_sj;
            //field=detail1sj;
            otherField_Three=detail1sj;
            otherId_Three=id;

            otherField_One=detail1kmid;
            otherId_One=$("#"+id).parents("td").siblings("td").find("div[id='kmdetail"+tableindex+"']").find("input[type='hidden']").attr("id")
            otherField_Two=detail1je
            otherId_Two=$("#"+id).parents("td").siblings("td").find("div[id='jedetail"+tableindex+"']").find("input").attr("id")
            otherField_Four=detail1hsje
            otherId_Four=$("#"+id).parents("td").siblings("td").find("div[id='hsjedetail"+tableindex+"']").find("input").attr("id")
        }else{
            zdmc=zdmc_hsje;
            otherField_Four=detail1hsje;
            otherId_Four=id;

            otherField_One=detail1kmid;
            otherId_One=$("#"+id).parents("td").siblings("td").find("div[id='kmdetail"+tableindex+"']").find("input[type='hidden']").attr("id")
            otherField_Two=detail1je
            otherId_Two=$("#"+id).parents("td").siblings("td").find("div[id='jedetail"+tableindex+"']").find("input").attr("id")
            otherField_Three=detail1sj
            otherId_Three=$("#"+id).parents("td").siblings("td").find("div[id='sjdetail"+tableindex+"']").find("input").attr("id")
        }

        var begindatefield = WfForm.convertFieldNameToId(zdmc, "detail_1");
        var addObj = {};
        addObj[begindatefield] = {value:value};
        WfForm.addDetailRow("detail_1", addObj);
        WfForm.registerAction(WfForm.ACTION_ADDROW+"1", function(index){
        });
        formAddOrUpdateMarkStr=formAddOrUpdateMarkStr+","+otherId_Four+","+otherId_One+","+otherId_Two+","+otherId_Three;
        $("#"+addOrUpdateMarkStrField).val(formAddOrUpdateMarkStr)
        addStr=otherId_One+","+otherId_Two+","+otherId_Three+","+otherId_Four;
        console.log("������������  ��ǰformAddOrUpdateMarkStr::"+formAddOrUpdateMarkStr)
    }else{//�޸�
        $("input[name="+id+"]").val(value)
    }
}

/*function setJson(index,val) {
    arr[index]=val;
    var json = JSON.stringify(arr);//JSON.stringify() �������ڽ� JavaScript ֵת��Ϊ JSON �ַ�����
    console.log("�����֮��::"+json);
    $("#"+mapField).val(json)
}*/


function setJson(index,val) {
    array.push(val);
    //array= quchong(array)
    var json = JSON.stringify(array);//JSON.stringify() �������ڽ� JavaScript ֵת��Ϊ JSON �ַ�����
    //json = quchong(json)
    console.log("�����֮��::"+json);
    $("#"+mapField).val(json)
}


/*ȥ��*/
function quchong(arr){
    var len = arr.length;
    arr.sort();
    for(var i=len-1;i>0;i--){
        if(arr[i]==arr[i-1]){
            arr.splice(i,1);
        }
    }
    return arr;
}
/*function setJson(index,val) {
    var obj = {};
    obj['id'] = index;
    obj['text'] = val;
    array.push(obj);
    array= quchong(array)
    var json = JSON.stringify(array);//JSON.stringify() �������ڽ� JavaScript ֵת��Ϊ JSON �ַ�����
    //json = quchong(json)
    console.log("�����֮��::"+json);
    $("#"+mapField).val(json)
}*/

/*����2*/
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

/**
 * �˷��������ϸ�ֶ�id
 * ͨ��filed��ȡ��ǰ��
 * @param field
 * @constructor
 */
function GetIndexByField(field) {
    if(""!=field&&field!=null){
        index = field.split("detail")[1]
        return index;
    }
    return -1;
}
</script>