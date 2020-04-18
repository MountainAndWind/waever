<script language="javascript">
/**
 *
 * 版本3：此版本是针对一个是输入框一个是浏览框类型赋值
 * 使用前所需配置：
 *   1、将明细表1中设置金额字段id为jedetail、明细科目为kmdetail以及指定赋值明细触动时间的明细表中同样需要设置对应的字段id
 *      格式为je或者km作为前缀 +detail+表的索引值
 *   2、配置kmidMap，jeMap
 *   3、detail1je、detail1kmid分别为金额字段输入框前缀与明细科目字段输入框前缀
 *   4、zdmc最为前缀的变量为表单里的字段
 */
var tables=8//明细表个数
var excludeTableIndex="2,4"//排除的明细表索引
var detail1kmid="field10823"
var detail1je="field7366"
/*含税金额*/
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
/*新增时临时数据*/
var addStr=""
var mapF=[];
var array = [];
var arr = new Array(20);
/*需求2初始化*/
/**
 * 此处id的值都需要在前加上#
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
    var excludeArr;//定义变量用于接收排除索引对象
    if(excludeTableIndex!=""&&excludeTableIndex!=null){
        excludeArr = excludeTableIndex.split(",")//讲字符串类型转换成int类型并且封装到数组中
        console.log("excludeArr数组::"+excludeArr)
    }
    resetDeatil1ColName();

    WfForm.registerAction(WfForm.ACTION_ADDROW+""+1, function(index){ //绑定新增事件
        console.log("明细"+1+"绑定新增事件触发"+"触发下标为::"+index);
        var addStrs = addStr.split(",");

        $("#"+detail1kmid+"_"+index).attr("name",addStrs[0])
        $("#"+detail1je+"_"+index).attr("name",addStrs[1])
        $("#"+detail1sj+"_"+index).attr("name",addStrs[2]);
        $("#"+detail1hsje+"_"+index).attr("name",addStrs[3]);
        setJson(index,addStr);
    });

    console.log("明细表"+3+"进入事件绑定设置")
    WfForm.registerAction(WfForm.ACTION_ADDROW+""+3, function(index){ //绑定新增事件
        console.log("明细"+3+"绑定新增事件触发"+"触发下标为::"+index);
        bindField(3,index);
    });
    WfForm.registerAction(WfForm.ACTION_DELROW+""+3, function(arg){ //绑定删除事件
        console.log("明细"+3+"绑定删除事件触发"+"触发下标为::"+arg.join(","));
        removeBindField(3,arg);
    });
    console.log("明细表"+5+"进入事件绑定设置")
    WfForm.registerAction(WfForm.ACTION_ADDROW+""+5, function(index){ //绑定新增事件
        console.log("明细"+5+"绑定新增事件触发"+"触发下标为::"+index);
        bindField(5,index);
    });
    WfForm.registerAction(WfForm.ACTION_DELROW+""+5, function(arg){ //绑定删除事件
        console.log("明细"+5+"绑定删除事件触发"+"触发下标为::"+arg.join(","));
        removeBindField(5,arg);
    });
    console.log("明细表"+6+"进入事件绑定设置")
    WfForm.registerAction(WfForm.ACTION_ADDROW+""+6, function(index){ //绑定新增事件
        console.log("明细"+6+"绑定新增事件触发"+"触发下标为::"+index);
        bindField(6,index);
    });
    WfForm.registerAction(WfForm.ACTION_DELROW+""+6, function(arg){ //绑定删除事件
        console.log("明细"+6+"绑定删除事件触发"+"触发下标为::"+arg.join(","));
        removeBindField(6,arg);
    });
    console.log("明细表"+7+"进入事件绑定设置")
    WfForm.registerAction(WfForm.ACTION_ADDROW+""+7, function(index){ //绑定新增事件
        console.log("明细"+7+"绑定新增事件触发"+"触发下标为::"+index);
        bindField(7,index);
    });
    WfForm.registerAction(WfForm.ACTION_DELROW+""+7, function(arg){ //绑定删除事件
        console.log("明细"+7+"绑定删除事件触发"+"触发下标为::"+arg.join(","));
        removeBindField(7,arg);
    });
    console.log("明细表"+8+"进入事件绑定设置")
    WfForm.registerAction(WfForm.ACTION_ADDROW+""+8, function(index){ //绑定新增事件
        console.log("明细"+8+"绑定新增事件触发"+"触发下标为::"+index);
        bindField(8,index);
    });
    WfForm.registerAction(WfForm.ACTION_DELROW+""+8, function(arg){ //绑定删除事件
        console.log("明细"+8+"绑定删除事件触发"+"触发下标为::"+arg.join(","));
        removeBindField(8,arg);
    });
    bindFunction();

});

function replaceAll(str){
    if(str!=null&&""!=str){
        str=str.replace(/＂/g,"'")
        str=str.replace(/＂/g,"'" )
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
    console.log("删除之前操作：map"+map)
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
    console.log("删除之后操作：map"+map)
}

/*根据当前删除的行重新设置索引*/
function resetIndex(tableIndex,colIndex) {
    var num = WfForm.getDetailAllRowIndexStr("detail_"+tableIndex)
    num = num.split(",")
    for (var i = colIndex+1; i < num.length; i++) {

    }
}

/* 移除明细表一中对应的数据 */
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
            var mark = getMark(num[i]);//存储对应赋值字段的位置用赋值字段id标识
            if(mark.indexOf(kmid)>=0||mark.indexOf(jeid)>=0||mark.indexOf(sjid)>=0||mark.indexOf(hsjeid)>=0){
                //说明对应存在进行删除操作
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


/* 绑定字段 */
function bindField(indexAdd,index) {
    console.log("将字段添加到bindFieldStr")
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
    console.log("添加后formBindFieldStr::"+formBindFieldStr)
    bindFunction();
}

/* 明细表指定影响触发赋值明细表1事件 */
function bindFunction(){
    console.log("绑定属性值改变事件")
    WfForm.bindFieldChangeEvent($("#"+bindFieldStrField).val(), function(obj,id,value){
        console.log("WfForm--value值改变事件触发",obj,id,value);
        updateOraddNew(obj,id,value)//修改或赋值
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
    console.log("map查找-----------"+mark+":"+indexAdd+":"+j+"  id为 "+id)
    return id
}


/* 根据字段id与所在行数查找对应inputId */
function GetInputFieldIdById(fieldId,j) {//filedId为后台设置字段id，j为所在行数
    console.log("查找id-----------"+fieldId)
    var fieldmark = $("#"+fieldId).attr("data-fieldmark")
    var id = fieldmark.substring(0,fieldmark.length-1)+""+j
    console.log(id)
    return id
}
/* 实时跟新明细表一中数据 */
function updateOraddNew(obj,id,value) {//新增到指定明细表
    //判断传入的对象的字段
    //var divId = $("#"+id).parent().parent().attr("id");//kmdetail3,jedetail3
    var divId = $("#"+id).parents("div[data-fieldmark="+id+"]").attr("id")
    var tableindex = GetIndexByField(divId)
    var otherId = "";
    var mark = divId.substring(0,2)  //用于区分字段
    console.log("mark::"+mark)
    var formAddOrUpdateMarkStr = $("#"+addOrUpdateMarkStrField).val();
    if(formAddOrUpdateMarkStr.indexOf(id)<0){//新增
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
        console.log("进入新增操作")
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
        console.log("结束新增操作  当前formAddOrUpdateMarkStr::"+formAddOrUpdateMarkStr)
    }else{//修改
        $("input[name="+id+"]").val(value)
    }
}

/*function setJson(index,val) {
    arr[index]=val;
    var json = JSON.stringify(arr);//JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。
    console.log("添加行之后::"+json);
    $("#"+mapField).val(json)
}*/


function setJson(index,val) {
    array.push(val);
    //array= quchong(array)
    var json = JSON.stringify(array);//JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。
    //json = quchong(json)
    console.log("添加行之后::"+json);
    $("#"+mapField).val(json)
}


/*去重*/
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
    var json = JSON.stringify(array);//JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。
    //json = quchong(json)
    console.log("添加行之后::"+json);
    $("#"+mapField).val(json)
}*/

/*需求2*/
$(document).bind('click',function(){
    console.log("进入点击事件")
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
 * JS 判断 1、当字段明细表字段近距离/远距离= 0 //近距离
 当字段“地点”=0,1,2,3,4, 赋值 早津贴 15 中津贴 15   晚津贴 15   日津贴 45
 else 赋值 早津贴 10 中津贴 10   晚津贴 10   日津贴 30
 */
function closeFunction(colIndex) {
    console.log("进入近距离事件")
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
 * 2、当字段明细表字段近距离/远距离 = 1 //远距离
 */
function farFunction(colIndex) {
    console.log("进入远距离事件")
    var mainCctypeVal = $(mainCctype).val();
    var startTime = $(startTimeField+"_"+colIndex).val();
    var endTime = $(endTimeField+"_"+colIndex).val();
    var qtFieldValue = $(qtField+"_"+colIndex).val();
    /*if(startTime>endTime){
        window.top.Dialog.alert("开始日期不能大于结束时间,请重新填写！");
        return;
    }*/
    if(mainCctypeVal==0){//主表字段出差类型= 0
        valJinTie(qtFieldValue,startTime,endTime,colIndex,80,40);
    }else if(mainCctypeVal==1){//主表字段出差类型= 1
        valJinTie(qtFieldValue,startTime,endTime,colIndex,55,40);
    }else if(mainCctypeVal==2){//主表字段出差类型= 2
        valJinTie(qtFieldValue,startTime,endTime,colIndex,280,140);
    }else if(mainCctypeVal==3){//主表字段出差类型= 3
        valJinTie(qtFieldValue,startTime,endTime,colIndex,210,105);
    }
}



/**
 * 给津贴赋值
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
            window.top.Dialog.alert("开始时间、结束时间不允许大于12:00,请重新填写！");
            return;
        }*/
        swapVal(colIndex);
        $(dayField+"_"+colIndex).val(halfValue)
    }else if("2"==qtFieldValue){
        /*if(startTime<comPareTime){
            window.top.Dialog.alert("开始时间不允许小于12:00,请重新填写！");
            return;
        }*/
        swapVal(colIndex);
        $(dayField+"_"+colIndex).val(halfValue)
    }
}

/**
 * 清除原理的赋值
 * @param colIndex
 */
function  swapVal(colIndex){
    $(morningField+"_"+colIndex).val("");
    $(midField+"_"+colIndex).val("");
    $(eveField+"_"+colIndex).val("");
    $(dayField+"_"+colIndex).val("");
}

/**
 * 此方法针对明细字段id
 * 通过filed获取当前列
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