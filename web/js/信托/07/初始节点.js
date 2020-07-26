<script type="text/javascript">
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
    jQuery.each(jQuery( 'select[name^=field6418]' ),function(i,n){
        var v = jQuery(n).val();
        vs[i]=v;
    });
    return vs;
}
function xmchange(){
    var vs = getXM();
    if(Fns.checkRequest( vs )){
        cTool.setMust( "field6036" );
    }else{
        cTool.setNoMust( "field6036" );
    }
}

function addRow(i){
    addRow0(i);
    //jQuery( 'select[name^=field6418]' ).unbind('change',xmchange).bind( 'change' , xmchange );
}
jQuery(document).ready(function(){
    var objfjzs = 'field6033';
    var detailneedflag=false;
    function initDetail( i , needflag ){
        if(jQuery( "[name^=check_node_" + i + "]" ).size()==0){
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

    var objbxje = 'field6039',objn1role='field6459',objns=['field6460','field6461','field6462','field6463','field6464','field6465'];
    //处理路径
    function initLocal(){
        var vs =[],ps=[],bqd=(getVal('field6482')=='02'),vbxje=getVal(objbxje);
        vs = getXM();
        var r = Fns.computeLocation( vs , vbxje , bqd );
        roles = r.role.join(",");
        jQuery( '#' + objn1role ).val(roles);
        jQuery.each( r.flag , function(i,n){
            jQuery( '#' + objns[i] ).val( n );
        })
    }
    //报销金额大小写
    var objbxjedx="field6466";

    //报销金额转换为大写
    function bxjechange(){
        var v = getVal(objbxje );
        var vc = numberChangeToChinese( v );
        setVal( objbxjedx , vc );
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
    function setVal( obj , v ){
        if( jQuery( '#' + obj).size() == 0 ){
            jQuery( '#' + obj+ 'span' ).html(v);
        }else{
            jQuery( '#' + obj).val(v);
            jQuery( '#' + obj).change();
            if( jQuery( '#' + obj).attr('type') == 'hidden' ){
                var span = jQuery( '#' + obj+ 'span' );
                if( span){
                    span.html(v);
                }else{
                    jQuery( '#' + obj).before("<span id='" + '#' + obj + 'span' + "'>" + v + "</span>");
                };
            };
        }
    };

    var candetail=false,vjs='80',objcjrjs="field6693",objcbzx="field6416",objcbzxdt="field6474";

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
        var objsqsqje="field6037",objbxje="field6039";
        var vsq=cTool.getVal( objsqsqje ),vbx=cTool.getVal( objbxje );
        if ( vsq > 0 ){
            if((vbx - vsq) > 0 ){
                alert("超过申请金额，不能提交！");
                return false;
            }
        };
        return true;
    }
//获取创建人角色
//function initCreateRole(){
    //Fns.getCreateRole(function(json){
    //	if( json.success ){
    //		cTool.setVal( objcjrjs , json.roles );
    //		initCbzxDt();
    //	}
    //});
//}
//获取创建人角色
    function initCreateRole(){
        jQuery.ajax({
            url : "/workflow/request/ajax/getUserRole.jsp",
            type : "post",
            async : false,
            processData : false,
            dataType : "html",
            success: function do4Success(json1){
                json1 =  eval("(" + json1.trim() + ")")
                if(json1.success) {
                    var vs1 = json1.roles.split(',');
                    var  candetail1 = (jQuery.inArray( vjs,vs1 )>=0);
                    if(candetail1){
                        jQuery('.cbzx').show();
                    }
                }
            }
        });
    }


    //获取成本中心的相关信息
    // function cbzxChange(){
    //  var uid = cTool.getVal( objcbzx );
    //   if(uid=="")
    //     return;
    //   jQuery.getJSON( "/workflow/request/ajax/getUnitFns.jsp?uid=" + uid,function(json){
    //     if( json.success ){
    //       cTool.setVal( "field6482" , json.departmentcode.substr(0,2) );
    //        cTool.setVal( "field6657" , json.supdepid );
    //       cTool.setVal( "field6658" , json.coadjutant );
    //       cTool.setVal( "field6415" , json.cbzxsprjs);
    //     }else{
    //        alert("系统错误，请联系管理员。错误说明：" + json.mess);
    //      }
    // })
    //}

//获取成本中心的相关信息
    function cbzxChange(){
        var uid = cTool.getVal( objcbzx );
        if(uid=="")
            return;

        jQuery.ajax({
            url : "/workflow/request/ajax/getUnitFns.jsp?uid=" + uid,
            type : "post",
            async : false,
            processData : false,
            dataType : "html",
            success: function do4Success(json1){
                json1 =  eval("(" + json1.trim() + ")");
                if( json1 .success ){
                    cTool.setVal( "field6482" , json1 .departmentcode.substr(0,2) );
                    cTool.setVal( "field6657" , json1 .supdepid );
                    cTool.setVal( "field6658" , json1 .coadjutant );
                    cTool.setVal( "field6415" , json1 .cbzxsprjs);
                }else{
                    alert("系统错误，请联系管理员。错误说明：" + json.mess);
                }

            }
        });
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
        alertFlag="false"
        var bxJe_field="#field6039"//报销金额
        var hzJe_field="#field9515";//发票汇总金额
        var purchaser_field="#field9124"//付款方名称
        var bxje=$(bxJe_field).val();
        var hzje=$(hzJe_field).val();
        console.log("bxje::"+bxje)
        console.log("hzje::"+hzje)
        if(Number(bxje)>Number(hzje)){
            alert("报销总金额不能大于发票汇总金额！！！")
            return false;
        }

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
        var prerequestidtemp3 ="0";


        if(jQuery("#field6036").val()!=""){

            prerequestidtemp3 = jQuery("#field6036").val();
        }

        var checkval3 = checkpreworkflow3(prerequestidtemp3);
        if((checkval3!="nodeerror2")&&(prerequestidtemp3!="0")&&(checkval3!="nodeerror1")&&(checkval3!="notfit")){

            alert("事前申请流程应该在归档节点!");
            return false;
        }
        var checkval4 = checkpreworkflow4(prerequestidtemp3,requestidtemp3);


        var _xm_array111 = jQuery("select[name^='field6418']");
        if(_xm_array111.length<=0){
            alert("必须填写一条明细");
            return false;
        }
        //成本中心赋值到明细
        //if(!candetail) jQuery( '[name^=' + objcbzxdt + ']' ).val(jQuery('#' + objcbzx).val());
        if(checkOldRequest(jQuery("#field6036").val())){
            return true;

        }


        var lclx = getVal( 'field6479' ),spbz=getVal('field6480');
        if(lclx == 41){
            if(spbz!=1){
                alert('事前申请流程未审批结束！');
                return false;
            }
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
            var ksje = jQuery("#field6418_"+index).val(); //项目
            var sfz = jQuery.trim(jQuery("#field9017_"+index).val());//业务流程
            if(ksje != '' && ksje != null && ksje != undefined){
                if(ksje ==53 && sfz == ''){//项目为业务招待费，业务流程为空
                    alert('项目为业务招待费时，业务流程必须填写');
                    return false;
                }
            }
        }



        //预提预算：如果申请金额大于事前申请金额，false 如果预算所属年、成本中心、项目跟事前申请流程对应，false
        //事前申请流程=6036  项目=6418  预算所属年=7005 申请部门(成本中心) 明细成本中心=6474 项目大类=7003
        if(jQuery("#field7003").val()=="0" || jQuery("#field7003").val()=="1" || jQuery("#field7003").val()=="2" || jQuery("#field7003").val()=="12"){
            if(jQuery("#field6036").val()==""){
                alert("\"事前申请流程\"未填写!");
                return false;
            }
            //申请支付金额=6039   事前申请金额=6037
            //if(parseFloat(jQuery("#field6039").val())>parseFloat(jQuery("#field6037").val())){
            //alert("申请金额大于事前申请金额!");
            //return false;
            //}

            var requestidtemp = jQuery("#field6036").val();
            var fnayeartemp = jQuery("#field7005").val();
            var fnadepttemp = "";
            var projectidtemp = "";
            var numstemp = document.getElementById("indexnum0").value * 1.0 - 1;
            var tempamount = 0;
            var details = 0;
            var requestidtemp2 = "0";
            if(jQuery("#requestid").length){
                //存在
                requestidtemp2 = jQuery("#requestid").val();
            }
            //for(var i=0;i<=numstemp;i++){
            var _xm_array = jQuery("select[name^='field6418_']");
            var i=0;
            for(var i0=0;i0<_xm_array.length;i0++){
                i = parseInt(jQuery(_xm_array[i0]).attr("name").replace("field6418_",""));
                if(jQuery("#field6418_"+i).length){
                    projectidtemp = jQuery("#field6418_"+i).val();
                    fnadepttemp = jQuery("#field6474_"+i).val();
                    if(projectidtemp!=33 && projectidtemp!=31 &&
                        projectidtemp!=1 && projectidtemp!=2 && projectidtemp!=3 && projectidtemp!=4 && projectidtemp!=5 &&
                        projectidtemp!=6 && projectidtemp!=7 && projectidtemp!=8 && projectidtemp!=50 && projectidtemp!=51 &&
                        projectidtemp!=52 && projectidtemp!=53 && projectidtemp!=54 ){
                        alert("明细中存在不需要事前申请的费用项目！");
                        return false;
                    }

                    //tagtag
                    var prerequestidtemp2 = jQuery("#field6036").val();
                    var fnayeartemp2 = jQuery("#field7005").val();
                    var fnadepttemp2 = jQuery("#field6474_"+i).val();
                    var projectidtemp2 = jQuery("#field6418_"+i).val();
                    var feetemp2 = jQuery("#field6035_"+i).val();
                    feetemp2= getJe_fee_judge_fywbm(i);
                    var checkval2 = checkpreworkflow2(prerequestidtemp2,requestidtemp2,fnayeartemp2,fnadepttemp2,projectidtemp2,feetemp2);
                    //var tempcheckval = checkworkflow(requestidtemp,fnayeartemp,fnadepttemp,projectidtemp);
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

                    //details=details+1;
                }
            }
            if(details!=1){
                //alert("有且只能有一条明细数据！");
                //return false;
            }


        }else if(jQuery("#field7003").val()=="7" && jQuery("#field7004").val()=="2"){
            var numstemp = document.getElementById("indexnum0").value * 1.0 - 1;
            var requestidtemp2 = "0";
            if(jQuery("#requestid").length){
                //存在
                requestidtemp2 = jQuery("#requestid").val();
            }
            //for(var i=0;i<=numstemp;i++){
            var _xm_array = jQuery("select[name^='field6418_']");
            var i=0;
            for(var i0=0;i0<_xm_array.length;i0++){
                i = parseInt(jQuery(_xm_array[i0]).attr("name").replace("field6418_",""));
                if(jQuery("#field6418_"+i).length ){
                    var prerequestidtemp2 = jQuery("#field6036").val();
                    var fnayeartemp2 = jQuery("#field7005").val();
                    var fnadepttemp2 = jQuery("#field6474_"+i).val();
                    var projectidtemp2 = jQuery("#field6418_"+i).val();
                    var feetemp2 = jQuery("#field6035_"+i).val();
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
        // jQuery( "#" + objcbzx ).bind( 'propertychange' , _cbzxChange );

        jQuery( "#" + objcbzx ).bindPropertyChange( _cbzxChange );
        //jQuery( 'select[name^=field6418]' ).bind( 'change' , xmchange );
        //xmchange();
        // jQuery('#field6677').attr('readonly','true').css( 'border-bottom','none' );
        //jQuery( '#' + objbxje ).bind('propertychange',bxjechange);
        jQuery( '#' + objbxje ).bindPropertyChange(bxjechange);
        jQuery( '#' + objfjzs ).css('text-align','center').blur();
        initDetail( 0 , true );
        jQuery( '#' + objbxjedx ).css( 'border-bottom','none' ).attr( 'readOnly' , 'true' );
        jQuery( '#' + objbxje ).css( 'border-bottom','none' ).attr( 'readOnly' , 'true' );
    }
    setTimeout(_pageinit,100);

})

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