<script>
/*var ntdima="field10371";//拟投代码
var ntJc="field10370";//拟投简称
var cdztqc="field16339";//承担主体全称
var rzztqc="field16338";//融资主体全称*/

/*var fieldMap={"uf_JYDSK":"field16339,field16338","uf_zqk":"field10371,field10370"};//配置页面field
var dataMap={"uf_JYDSK":"jydsqc,jydsqc","uf_zqk":"zqdm,zqjc"}//配置数据库字段名*/

var showMessage1="拟投债券已在库";
var showMessage2="交易对手在库";
var res="";
var mapField=[{"table":"uf_JYDSK","fields":"field16339,field16338","col":"jydsqc,jydsqc"},
    {"table":"uf_pjkx","fields":"field10371,field10370","col":"ntzqdm,ngzqjc"}]

var mapVal=[{"table":"uf_JYDSK","fields":"-1,-1","col":"jydsqc,jydsqc"},
    {"table":"uf_pjkx","fields":"-1,-1","col":"ntzqdm,ngzqjc"}]


/*
拟投日期：ntrq、评级事项：pjsx 、拟投债券代码、ntzqdm 、拟股债券简称:ngzqjc、担保主体全称 dbztqc1 融资主体全称 rzztqc1 、
融资主体最新外部信用等级 rzztzxwbxydj 、融资主体最新外部信用展望 rzztzxwbxyzw
担保主体最新外部信用等级 dbztzxwbxydj 、担保主体最新外部信用展望 dbztzxwbxyzw 、融资主体内部信用等级 zhrzztxydj 、
融资主体内部信用展望 zhrzztxyzw 、担保主体内部信用等级 zhdbztxydj 、
担保主体内部信用展望 zhdbztxyzw
评审委员会主任意见 pswyhzryj
 */

/*
交易对手方库:评级日期  pjrq  交易对手全称jydsqc  交易对手外部等级 fxrwbdj   交易对手外部评级展望 dbrnbdj
交易对手内部等级 fxrnbdj   交易对手内部评级展望 fxrnbpjzw
担保主体内部等级 dbrnbdj1
担保主体内部评级展望 dbrnbpjzw
备注 rzztbz
*/

jQuery(document).ready(function(){
    console.log("ready::");
    WfForm.registerCheckEvent(WfForm.OPER_SUBMIT,function(callback){
        console.log("OPER_SUBMIT")
        for (var i = 0; i < mapField.length; i++) {
            var mapFields = mapField[i].fields;
            console.log("mapFields::"+mapFields)
            var fields = mapFields.split(",");
            var strVal="";
            for(var j=0;j<fields.length;j++){
                var val = $("#"+fields[j]).val()
                if(val==undefined||""==val||val==null){
                    val=-1;
                }
                if(j==0){
                    strVal+=val
                }else{
                    strVal+=","+val
                }
            }
            mapVal[i].fields=strVal;
        }
        var json = JSON.stringify(mapVal)
        console.log("mapValjson::"+json)
        findValidationId(json);
        if(isExist(res)){
            var msg=""//显示信息
            for(var index=0;index<res.length;index++){
                if(res[index]!=null){
                   if(0==index||1==index){
                       msg+=showMessage2+":</br>";
                   }else{
                       msg+=showMessage1+":</br>";
                   }
                    for(var p in res[index]){
                        msg+=res[index][p]+" "
                    }
                    msg+="</br>";
                }
            }
            WfForm.showConfirm(msg,function(){
                    callback();
                },
                function(){

                },{
                    title:"", //弹确认框的title，仅PC端有效
                    okText:"放行", //自定义确认按钮名称
                    cancelText:"不放行" //自定义取消按钮名称
                });
        }else {
            callback();
        }
    })
});

/**
 * 判断是否存在信息返回
 */
function isExist(res) {
    for(var index=0;index<res.length;index++){
        if(res[index]!=null){
            return true;
        }
    }
    return false;
}

function findValidationId(map) {
    console.log("findValidationId")
    $.ajax({
        type:"GET",
        url:"/aes/findMessage.jsp?",
        data: {'map':map,'timeStamp':new Date().getTime()},
        dataType:"text",
        async: false,
        success:function(data){
            /*var str=JSON.stringify(data);*/
            console.log("data::"+data)
            var str=JSON.stringify(data);
            res=str.substring(str.indexOf('body>')+21,str.indexOf('/body>')-13);
            res=JSON.parse(res.replace(/\\/g,""))
            console.log("res::"+res)
        },
        error:function(jqXHR){
            alert("发生错误："+ jqXHR.status);
        }
    });
}
</script>



