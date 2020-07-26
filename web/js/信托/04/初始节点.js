<script>
jQuery.getScript( '/workflow/request/ux/ux.js' );
jQuery.getScript( '/workflow/request/ux/fns.js' );
jQuery.getScript('/workflow/request/js/FnTrans.js');
my_zhaodaiFee="";
my_qitaFee="";
my_dangqianFee="";
my_ifbusiness=false;
var alertFlag=""
//获取所有选择项目
function getXM(){
    var vs = [];
    jQuery.each(jQuery( 'select[name^=field6360]' ),function(i,n){
        var v = jQuery(n).val();
        vs[i]=v;
    });
    return vs;
}
function xmchange(){
    var vs = getXM();
    if(Fns.checkRequest( vs )){
        cTool.setMust( "field5979" );
    }else{
        cTool.setNoMust( "field5979" );
    }
}

function addRow(i){
    addRow0(i);
    //jQuery( 'select[name^=field6360]' ).unbind('change',xmchange).bind( 'change' , xmchange );
}
jQuery(document).ready(function(){

    var objfjzs = 'field5962';
    var detailneedflag=false;
    function initDetail( i , needflag ){
        if(jQuery( "[name^=check_node_" + i + "]" ).size()==0){
        }else{
            //xmchange();
        }
        detailneedflag = needflag;
    }
    //明细必填
    function _detailneed( i ){
        if (jQuery( '#oTable' + i ).size()==1){
            var s = jQuery( '#oTable' + i + ' [name^=dtl_id]' ).size();
            if(s==0)alert("明细数据未填写！");
            return s > 0;
        }
        return true;
    }
    var objyfze='field6331',objbxje = 'field6333',objn1role='field6447',objns=['field6448','field6449','field6450','field6451','field6452','field6453'];
    //处理路径
    function initLocal(){
        var vs =[],ps=[],bqd=(getVal('field6481')=='02'),vbxje=getVal(objyfze)||getVal(objbxje),roles;
        vs = getXM();
        var r = Fns.computeLocation( vs , vbxje , bqd );
        roles = r.role.join(",");
        jQuery( '#' + objn1role ).val(roles);
        jQuery.each( r.flag , function(i,n){
            jQuery( '#' + objns[i] ).val( n );
        })
    }
    //取值
    function getVal( obj ){
        if( jQuery('#'+obj).size() > 0 ){
            if( jQuery( '#' + obj).attr('tagName') == 'select' )
                return jQuery('#'+obj + ' option:selected').val();
            return jQuery('#'+obj).val();
        }
        if( jQuery('#dis'+obj).size() > 0 ){
            if( jQuery( '#dis' + obj).attr('tagName') == 'select' )
                return jQuery('#dis'+obj + ' option:selected').val();
            return jQuery('#dis'+obj).val();
        }
        if( jQuery('#'+obj +'span').size() > 0 ){
            return jQuery('#'+obj +'span').html();
        }
        return '';
    }
    var candetail=false,vjs='80',objcjrjs="field6692",objcbzx="field6414",objcbzxdt="field6473";
    //获取创建人角色
    function initCreateRole(){
        Fns.getCreateRole(function(json){
            if( json.success ){
                cTool.setVal( objcjrjs , json.roles );
                initCbzxDt();
            }
        });
    }
    //设置是否允许更改明细中的成本中心
    function initCbzxDt(){
        //明细中成本中心是否显示
        var v = getVal(objcjrjs),vs=v.split(',');

        candetail = (jQuery.inArray( vjs,vs )>=0);
        if( candetail ){
            jQuery('.cbzx').show();
        }
    }
    //校验是否超过申请金额
    function checkJe(){
        var objsqsqje="field5980",objbxje="field6333";
        var vsq=cTool.getVal( objsqsqje ),vbx=cTool.getVal( objbxje );
        if ( vsq > 0 ){
            if((vbx - vsq) > 0 ){
                alert("超过申请金额，不能提交！");
                return false;
            }
        };
        return true;
    }
    //获取成本中心的相关信息
    function cbzxChange(){
        var uid = cTool.getVal( objcbzx );
        if(uid=="")
            return;
        jQuery.getJSON( "/workflow/request/ajax/getUnitFns.jsp?uid=" + uid,{_t:new Date()},function(json){
            if( json.success ){
                cTool.setVal( "field6481" , json.departmentcode.substr(0,2) );
                cTool.setVal( "field6661" , json.supdepid );
                cTool.setVal( "field6662" , json.coadjutant );
                cTool.setVal( "field6413" , json.cbzxsprjs);
            }else{
                alert("系统错误，请联系管理员。错误说明：" + json.mess);
            }
        })
    }
    var cbzxChangeHandle;
    function _cbzxChange(){
        if( cbzxChangeHandle ){
            clearTimeout( cbzxChangeHandle );
        }
        cbzxChangeHandle  = setTimeout( cbzxChange , 100 );
    }


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

    //表单提交校验函数
    checkCustomize = function(){


        console.log("checkCustomize::")
        showInfo();
        var bxJe_field="#field6331"//报销金额
        var hzJe_field="#field9518";//发票汇总金额
        var purchaser_field="#field9113"//付款方名称
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

        var requestidtemp3 = "0";
        //if(jQuery("#requestid").length){
        //存在
        requestidtemp3 = jQuery("#requestid").val();
        //}
//alert("1       " + requestidtemp3);
        var prerequestidtemp3 ="0";
//alert("1.25 "+jQuery("#field5979").length);
//alert("1.3       " +jQuery("#field5979").val());


        if(jQuery("#field5979").val()!=""){
//alert("1.5 "+jQuery("#field5979").length);

            prerequestidtemp3 = jQuery("#field5979").val();
        }
//alert("2       " + prerequestidtemp3 );

        var checkval3 = checkpreworkflow3(prerequestidtemp3);
//alert("3       " + checkval3 );
        if((checkval3!="nodeerror2")&&(prerequestidtemp3!="0")&&(checkval3!="nodeerror1")&&(checkval3!="notfit")){
            alert("事前申请流程应该在归档节点!");
            return false;
        }
        var checkval4 = checkpreworkflow4(prerequestidtemp3,requestidtemp3);


        var _xm_array111 = jQuery("select[name^='field6360']");
        if(_xm_array111.length<=0){
            alert("必须填写一条明细");
            return false;
        }
        //成本中心赋值到明细
        //if(!candetail) jQuery( '[name^=' + objcbzxdt + ']' ).val(jQuery('#' + objcbzx).val());
        if(checkOldRequest2(jQuery("#field5979").val())){
            return true;
        }

        var flag = true;
        if(detailneedflag){
            flag = _detailneed( 0 );
        };
        if( flag ) initLocal();
        //if (!checkJe()) return;


        var all1 = jQuery("#submitdtlid0").val();
        var allArray = all1.split(',');
        for(var i = 0;i<allArray.length;i++){
            var index = allArray[i];
            var ksje = jQuery("#field6360_"+index).val(); //项目
            var sfz = jQuery.trim(jQuery("#field9014_"+index).val());//业务流程
            if(ksje != '' && ksje != null && ksje != undefined){
                if(ksje ==53 && sfz == ''){//项目为业务招待费，业务流程为空
                    alert('项目为业务招待费时，业务流程必须填写');
                    return false;
                }
            }
        }

        //预提预算：如果申请金额大于事前申请金额，false 如果预算所属年、成本中心、项目跟事前申请流程对应，false
        //事前申请流程=5979  项目=6360  预算所属年=7000 申请部门(成本中心)=6473 明细  项目大类=6998
        if(jQuery("#field6998").val()=="0" || jQuery("#field6998").val()=="1" || jQuery("#field6998").val()=="2" || jQuery("#field6998").val()=="12"){
            if(jQuery("#field5979").val()==""){
                alert("\"事前申请流程\"未填写!");
                return false;
            }

            //申请支付金额=6333  事前申请金额=5980
            //if(parseFloat(jQuery("#field6333").val())>parseFloat(jQuery("#field5980").val())){
            //alert("申请金额大于事前申请金额!");
            //return false;
            //}
            var requestidtemp = jQuery("#field5979").val();
            var fnayeartemp = jQuery("#field7000").val();
            var fnadepttemp = "";
            var projectidtemp = "";
            var numstemp = document.getElementById("indexnum0").value * 1.0 - 1;
            var tempamount = 0;
            var details = 0;u
            var requestidtemp2 = "0";
            if(jQuery("#requestid").length){
                //存在
                requestidtemp2 = jQuery("#requestid").val();
            }
            //for(var i=0;i<=numstemp;i++){
            var _xm_array = jQuery("select[name^='field6360_']");
            var i=0;
            for(var i0=0;i0<_xm_array.length;i0++){
                i = parseInt(jQuery(_xm_array[i0]).attr("name").replace("field6360_",""));
                if(jQuery("#field6360_"+i).length ){
                    projectidtemp = jQuery("#field6360_"+i).val();
                    fnadepttemp = jQuery("#field6473_"+i).val();
                    if(projectidtemp!=33 && projectidtemp!=31 &&
                        projectidtemp!=1 && projectidtemp!=2 && projectidtemp!=3 && projectidtemp!=4 && projectidtemp!=5 &&
                        projectidtemp!=6 && projectidtemp!=7 && projectidtemp!=8 ){
                        alert("明细中存在不需要事前申请的费用项目！");
                        return false;
                    }

                    var prerequestidtemp2 = jQuery("#field5979").val();
                    var fnayeartemp2 = jQuery("#field7000").val();
                    var fnadepttemp2 = jQuery("#field6473_"+i).val();
                    var projectidtemp2 = jQuery("#field6360_"+i).val();
                    var feetemp2 = jQuery("#field6362_"+i).val();
                    feetemp2= getJe_fee_judge_fywbm(i);
                    var checkval2 = checkpreworkflow2(prerequestidtemp2,requestidtemp2,fnayeartemp2,fnadepttemp2,projectidtemp2,feetemp2);
                    if(checkval2=="nodeerror"){
                        alert("第"+(i0+1)+"行明细,事前申请流程应该在会计做账节点!");
                        return false;
                    }else if(checkval2=="nofit"){
                        alert("第"+(i0+1)+"行明细,预算所属年、成本中心、项目跟事前申请流程应该对应!");
                        return false;
                    }else if(checkval2=="over"){
                        alert("第"+(i0+1)+"行明细,申请金额大于可用事前申请金额!");
                        return false;
                    }

                }
            }


        }else if(jQuery("#field6998").val()=="7" && jQuery("#field6999").val()=="2"){
            var numstemp = document.getElementById("indexnum0").value * 1.0 - 1;
            var requestidtemp2 = "0";
            if(jQuery("#requestid").length){
                //存在
                requestidtemp2 = jQuery("#requestid").val();
            }
            //for(var i=0;i<=numstemp;i++){
            var _xm_array = jQuery("select[name^='field6360_']");
            var i=0;
            for(var i0=0;i0<_xm_array.length;i0++){
                i = parseInt(jQuery(_xm_array[i0]).attr("name").replace("field6360_",""));
                if(jQuery("#field6360_"+i).length ){
                    var prerequestidtemp2 = jQuery("#field5979").val();
                    var fnayeartemp2 = jQuery("#field7000").val();
                    var fnadepttemp2 = jQuery("#field6473_"+i).val();
                    var projectidtemp2 = jQuery("#field6360_"+i).val();
                    var feetemp2 = jQuery("#field6362_"+i).val();
                    feetemp2= getJe_fee_judge_fywbm(i);
                    var checkval2 = checkpreworkflow2(prerequestidtemp2,requestidtemp2,fnayeartemp2,fnadepttemp2,projectidtemp2,feetemp2);
                    if(checkval2=="nodeerror"){
                        alert("第"+(i0+1)+"行明细,事前申请流程应该在会计做账节点!");
                        return false;
                    }else if(checkval2=="nofit"){
                        alert("第"+(i0+1)+"行明细,预算所属年、成本中心、项目跟事前申请流程应该对应!");
                        return false;
                    }else if(checkval2=="over"){
                        alert("第"+(i0+1)+"行明细,申请金额大于可用事前申请金额!");
                        return false;
                    }
                }
            }


        }else{//如果金额大于可用预算额不能提交

            for(var ii=0;ii<2;ii++){
                var checktemp = checkIfOver();
                //alert("调试信息：ii="+ii+";;;checktemp="+checktemp);
                var _checkIfOver_error_info_rownumberinfo = "";
                try{
                    if(_checkIfOver_error_info_rownumber!=null&&_checkIfOver_error_info_rownumber!=""){
                        _checkIfOver_error_info_rownumberinfo = "第"+_checkIfOver_error_info_rownumber+"行所属部门：";
                    }
                }catch(ex1){}
                if(checktemp=="1"){
                    alert(_checkIfOver_error_info_rownumberinfo+"业务招待费与其他费用合计总额已超标");
                    if(ii==1){
                        return false;
                    }
                }else if(checktemp=="2"){
                    if(ii<1){
                        alert(_checkIfOver_error_info_rownumberinfo+"业务招待费预算已超额，请注意！");
                    }
                    if(ii==1){
                        return true;
                    }
                }else if(checktemp=="3"){
                    alert(_checkIfOver_error_info_rownumberinfo+"业务招待费与其他费用合计总额已超标");
                    if(ii==1){
                        return false;
                    }
                }else if(checktemp=="4"){
                    alert(_checkIfOver_error_info_rownumberinfo+"项目申请金额大于可用预算额!");
                    if(ii==1){
                        return false;
                    }
                }
            }

        }

        return flag;
    }

    function _pageinit(){
        Fns.initNo();
        initCreateRole();
        if(cTool.isCreate()) _cbzxChange();
        //jQuery( "#" + objcbzx ).bind( 'propertychange' , _cbzxChange );
        jQuery( "#" + objcbzx ).bindPropertyChange( _cbzxChange );
        //jQuery( 'select[name^=field6360]' ).bind( 'change' ,xmchange);
        //xmchange();
        cTool.protect('field5980');
        jQuery('.inputstyle,.Inputstyle').not('select,#field5962').css( { width:"100%","margin-right":"20px" } );
        jQuery( '#' + objfjzs ).css('text-align','center').blur();
        initDetail( 0 , true );
    }
    setTimeout(_pageinit,100);

})

function checkOldRequest2(requestid){
    var returnval=false;
    jQuery.ajax({
        url : "/workflow/request/CheckIfOldRequest2.jsp",
        type : "post",
        async : false,
        processData : false,
        data : "requestid="+requestid,
        dataType : "html",
        success: function do4Success(msg){
            returnval=false;
            if(msg == "true"){
                returnval=true;
            }
        }
    });
    return returnval;
}

function checkOldRequest(requestid){
    var returnval=false;
    jQuery.ajax({
        url : "/workflow/request/CheckIfOldRequest.jsp",
        type : "post",
        async : false,
        processData : false,
        data : "requestid="+requestid,
        dataType : "json",
        success: function do4Success(msg){
            var infos = msg;
            returnval=infos;
        }
    });
    return returnval;
}

</script>
<script>
var yincangZd="#field9497,#field9085,#field9086,#field9088,#field9090,#field9524,#field9499,#field9493,#field9094,#field9096,#field9525,#field9500,#field9535,#field9113,#field9532,#field9092,#field9113";//影藏字段 写法  #field1231,#field1231,#field1231
var detileTabId = "#submitdtlid1";//明细2：submitdtlid1   明细1：submitdtlid0
var dtIdLength = 0;
var oldDtIdLength = 0;

jQuery(document).ready(function(){
    var num = $(detileTabId).val();
    num = num.split(",")
    var zds= yincangZd.split(",")
    for (var j = 0; j < num.length; j++) {
        for (var i = 0; i < zds.length; i++) {
            yingCang(num[j],zds[i]);
        }
    }
    /*
当明细行数量增加时，为增加的明细行添加函数；当明细行数量减少时，重新计算总额
 */
    $(detileTabId).bindPropertyChange(function () {
        console.log("bindPropertyChange")
        dtIdLength = jQuery(detileTabId).val().split(",").length;
        if (oldDtIdLength <= dtIdLength) {
            var num = $(detileTabId).val();
            num = num.split(",")
            var zds= yincangZd.split(",")
            for (var j = num.length-1; j >=0; j--) {
                for (var i = 0; i < zds.length; i++) {
                    yingCang(num[j],zds[i]);
                }
            }
            oldDtIdLength = dtIdLength;
        }
        if (oldDtIdLength > dtIdLength) {
            oldDtIdLength = dtIdLength;
        }
    });
})

/*
当明细行数量增加时，为增加的明细行添加函数；当明细行数量减少时，重新计算总额
 */
/*$(detileTabId).bindPropertyChange(function () {
    console.log("bindPropertyChange")
    dtIdLength = jQuery(detileTabId).val().split(",").length;
    if (oldDtIdLength <= dtIdLength) {
        var num = $(detileTabId).val();
        num = num.split(",")
        var zds= yincangZd.split(",")
        for (var j = num.length-1; j >=0; j--) {
            for (var i = 0; i < zds.length; i++) {
                yingCang(num[j],zds[i]);
            }
        }
        oldDtIdLength = dtIdLength;
    }
    if (oldDtIdLength > dtIdLength) {
        oldDtIdLength = dtIdLength;
    }
});*/

function yingCang(index,col) {
    console.log("yingCang")
    console.log("col+\"_\"+index::"+col+"_"+index)
    var labelId = "labe"+col.replace("#field","")
    $(col+"_"+index).parent("td").attr("style","display:none")
    $(labelId).parent("td").attr("style","display:none")
}

function showInfo() {
    console.log("file showInfo::")
    /*//明细
   var jshjField="#field9099";//价税合计字段
   var invoiceTypeField="#field9484"//费用类型
   var territoryField="#field9523";//境外出差
   var timeField="#field9486";//时间段
   var mobileField="#field9487";//手机号
   var zymcField="#field9108";//摘要名称

   var producerField="#field9531"//监制章
   var sfyzField="#"//是否有章
   //主表
   var bxr="#field6557";//报销人
   var ccrq="#field6009"//出差日期
   var fhrq="#field6010";//
   var ewsm=""//07
   var shiyou=""//07*/
    var fields="#field9084,#field9492,#field9525,#field9493,#field9499,#field9094,#field9532,#field9524";//顺序参照为上述注释明细从上到下 6  7 9     4
    var mainFields="";//顺序参照为上述注释主表从上到下  但是07 只配置ewsm，shiyou ，06，09 只配置bxr，ccrq，fhrq  其他流程不配置
    var errField="#field9535";//失败原因
    var index=4;// 示列： 06 就配置 6
    console.log("fields::"+fields)
    console.log("mainFields::"+mainFields)
    console.log("index::"+index)

    var num = $("#submitdtlid1").val();
    num = num.split(",")
    var jsonArr = new Array();
    var fieldArr = fields.split(",")
    var mainArr = mainFields.split(",")
    for (var i = 0; i < num.length; i++) {//jshj,invoiceType zymc  //bxr  ccrq   fhrq   //territory//time  fksy   ccsy  ewsm  shiyou//mobile
        var count=0;
        var imap={}
        if("9"==index||"6"==index||"7"==index){
            /*console.log("fieldArr[count++]+\"_\"+num[i]  jshj::"+(fieldArr[0]+"_"+num[i]))
                               console.log("fieldArr[count++]+\"_\"+num[i]  zymc::"+(fieldArr[5]+"_"+num[i]))*/
            imap.jshj=$(fieldArr[count++]+"_"+num[i]).val()
            imap.invoiceType=$(fieldArr[count++]+"_"+num[i]).val()
            imap.territory=$(fieldArr[count++]+"_"+num[i]).val()
            imap.time=$(fieldArr[count++]+"_"+num[i]).val()
            imap.mobile=$(fieldArr[count++]+"_"+num[i]).val()
            imap.zymc=$(fieldArr[count++]+"_"+num[i]).val()
            imap.producer=$(fieldArr[count++]+"_"+num[i]).val()
            imap.sfyz=$(fieldArr[count++]+"_"+num[i]).val()
            console.log("imap::"+imap);
            jsonArr[i]=imap;
        }else{
            imap.producer=$(fieldArr[0]+"_"+num[i]).val()
            imap.sfyz=$(fieldArr[1]+"_"+num[i]).val()
            jsonArr[i]=imap;
        }
    }
    var mainMap={}
    if("9"==index||"6"==index){
        mainMap.bxr=$(mainArr[0]).val();
        mainMap.ccrq=$(mainArr[1]).val();
        mainMap.fhrq=$(mainArr[2]).val();
    }else if("7"==index){
        mainMap.ewsm=$(mainArr[0]).val();
        mainMap.shiyou=$(mainArr[1]).val();
    }
    var jsonMain = "["+JSON.stringify(mainMap)+"]";
    var jsonDetail=JSON.stringify(jsonArr);
    console.log("jsonMain::"+jsonMain);
    console.log("jsonDetail::"+jsonDetail);
    findMsg(jsonMain,jsonDetail,index,errField);
}

/**
 * 后台提交查询提示
 * @param val
 */
function findMsg(jsonMain,jsonDetail,type,errField) {///base/findInvoiceTypById.jsp?fieldVal=3
    var msg = "";
    $.ajax({
        type:"GET",
        url:"/aes/getAlertInfo.jsp?",
        data: {'jsonMain':jsonMain,"jsonDetail":jsonDetail,jsType:type,'timeStamp':new Date().getTime()},
        dataType:"text",
        async: false,
        success:function(data){
            var str=JSON.stringify(data);
            console.log("str::"+str)
            msg=str.substring(str.indexOf("<body>")+18,str.indexOf("</body>")-4);
            console.log("msg::"+msg)
            if(msg.length>4){
                //$(errField).val(msg)
                var ms=""
                var msgArr = msg.split("_")
                console.log("msgArr::"+msgArr.length)
                for(var i=0;i<msgArr.length;i++){
                    var msi=msgArr[i];
                    console.log("msi::"+msi)
                    if(msi.indexOf(":")!=-1){
                        var msiArr = msi.split(":");
                        var colIndex = msiArr[0].substring(1,2)
                        var index = $("#oTable1 tbody tr[_target='datarow']").eq(Number(colIndex)-1).attr("_rowindex")
                        console.log("index::"+index)
                        console.log("msiArr[1]"+msiArr[1])
                        $(errField+"_"+index).val(msiArr[1]);
                    }
                    ms=ms+msi+"\n";
                }
                console.log("ms::"+ms)
                alert(ms)
            }
        },
        error:function(jqXHR){
            alert("发生错误："+ jqXHR.status);
        }
    });
}


</script>