<script>
jQuery.getScript( '/workflow/request/ux/ux.js' );
jQuery.getScript( '/workflow/request/ux/fns.js' );
jQuery.getScript('/workflow/request/js/FnTrans.js');
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
    // addRow0(i);
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
    /*function checkJe(){
          var objsqsqje="field5980",objbxje="field6333";
          var vsq=cTool.getVal( objsqsqje ),vbx=cTool.getVal( objbxje );
          if ( vsq > 0 ){
            if((vbx - vsq) > 0 ){
              alert("超过申请金额，不能提交！");
              return false;
            }
          };
          return true;
    }*/
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

    //表单提交校验函数
    checkCustomize = function(){
        //成本中心赋值到明细
        if(!candetail) jQuery( '[name^=' + objcbzxdt + ']' ).val(jQuery('#' + objcbzx).val());

        var flag = true;
        if(detailneedflag){
            flag = _detailneed( 0 );
        };
//    if( flag ) initLocal();
//    if (!checkJe()) return;


//    //预提预算：如果申请金额大于事前申请金额，false 如果预算所属年、成本中心、项目跟事前申请流程对应，false
//    //事前申请流程=5979  项目=6360  预算所属年=7000 申请部门(成本中心)=6414
//    if(jQuery("#field5979").val()!=""){
//    	//申请支付金额=6333  事前申请金额=5980
//			//if(parseFloat(jQuery("#field6333").val())>parseFloat(jQuery("#field5980").val())){
//				//alert("申请金额大于事前申请金额!");
//				//return false;
//			//}
//			var requestidtemp = jQuery("#field5979").val();
//  	var fnayeartemp = jQuery("#field7000").val();
//    	var fnadepttemp = jQuery("input[name='field6414']").val();
//    	var projectidtemp = "";
//			var numstemp = document.getElementById("indexnum0").value * 1.0 - 1;
//			var tempamount = 0;
//			for(var i=0;i<=numstemp;i++){
//				if(jQuery("#field6360_"+i).length ){
//					projectidtemp = jQuery("#field6360_"+i).val();
//					if(projectidtemp!=33 && projectidtemp!=31 &&
//					projectidtemp!=1 && projectidtemp!=2 && projectidtemp!=3 && projectidtemp!=4 && projectidtemp!=5 &&
//					projectidtemp!=6 && projectidtemp!=7 && projectidtemp!=8 ){
//						alert("明细中存在不需要事前申请的费用项目！");
//						return false;
//					}
//					i=numstemp+1;
//				}
//			}
//    	if(checkworkflow(requestidtemp,fnayeartemp,fnadepttemp,projectidtemp)!="true"){
//    		alert("预算所属年、成本中心、项目跟事前申请流程应该对应!");
//    		return false;
//    	}
//    }else{//如果金额大于可用预算额不能提交
//			if(checkIfOver()){
//    		alert("项目申请金额大于可用预算额!");
//    		return false;
//			}
//		}

        return flag;
    }

    function _pageinit(){
        Fns.initNo();
        initCreateRole();
        if(cTool.isCreate()) _cbzxChange();
        jQuery( "#" + objcbzx ).bindPropertyChange(_cbzxChange );

        //jQuery( 'select[name^=field6360]' ).bind( 'change' ,xmchange);
        //xmchange();
        cTool.protect('field5980');
        jQuery('.inputstyle,.Inputstyle').not('select,#field5962').css( { width:"80%","margin-right":"20px" } );
        jQuery( '#' + objfjzs ).css('text-align','center').blur();
        initDetail( 0 , true );
    }
    setTimeout(_pageinit,100);
    function _pageinit1(){
        jQuery('.cbzx').show();
    };
    setTimeout(_pageinit1,100);
})

</script>


<script>
var invoiceType="#field9492";//费用类型
var jshj="#field9084"//价税合计
var zy="#field9094"//摘要
var shuiE="#field9086"//税额

var jxdk="#field8512"//进项抵扣
var ninePages="#field8939"//9%
var airAndTrainJe="#field8940"//航空铁路服务金额

var typeA="2";//增值税专用发票
var typeB="15";//所有电子发票
var typeC="10"//客运汽车发票
var typeD="24"//船票
var typeE="14"//飞机票的张数
var typeF="8"//火车票
var purchaser_field="#field9113"//付款方名称
var alertFlag=""
$(document).ready(function() {
    showInfo();
    console.log("ready2")


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



    resetHjData();

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
})

/**
 * 是否存在
 * @param str
 */
function isExist(str,val) {
    if(!isNull(str)){
        var arr = str.split(",")
        for (var i = 0; i < arr.length; i++) {
            if(arr[i]==val){
                return true;
            }
        }
        return false;
    }else{
        return false;
    }
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

/**
 设置合计明细1
 进项抵扣：所有增值税专用发票的税额合计
 通行费抵扣：所有电子发票的摘要中包含“通行费”三个字的税额合计
 份数（3%）
 电子发票在摘要中包含“交通服务类”，
 客运汽车发票
 船票
 的数量合计
 份数（9%）：是飞机票和火车票的张数
 航空铁路服务金额=所有飞机票和火车票的价税合计，每张飞机票减50
 公路水路服务金额=电子发票在摘要中包含“交通服务类”，
 客运汽车发票
 船票
 的价税合计
 */
function resetHjData() {
    console.log("resetHjData::")
    var pageNine=0;
    var pageThree=0;
    var jxdkCount=0;
    var txfCount=0;
    var airAndTrianCount=0;
    var roadCount=0
    var num = $("#submitdtlid1").val();
    num = num.split(",")

    $(ysc).val($(bxje).val())

    for (var i = 0; i < num.length; i++) {
        var invoiceTypeVal=$(invoiceType+"_"+num[i]).val();
        var jshjVal=$(jshj+"_"+num[i]).val();
        var zyVal=$(zy+"_"+num[i]).val();
        var shuiEVal=$(shuiE+"_"+num[i]).val();
        console.log("invoiceTypeVal::"+invoiceTypeVal)
        console.log("jshjVal::"+jshjVal)
        console.log("zyVal::"+zyVal)
        console.log("shuiEVal::"+shuiEVal)
        if(typeE==invoiceTypeVal||typeF==invoiceTypeVal){//航空铁路服务金额=所有飞机票和火车票的价税合计，每张飞机票减50  份数（9%）：是飞机票和火车票的张数
            pageNine++;
            if(typeE==invoiceTypeVal){
                airAndTrianCount=Number(airAndTrianCount)+Number(jshjVal)-50;
            }
        }
        if(typeA==invoiceTypeVal){//进项抵扣：所有增值税专用发票的税额合计
            jxdkCount=Number(jxdkCount)+Number(shuiEVal);
        }
    }
    console.log("jxdkCount::"+jxdkCount)
    console.log("txfCount::"+txfCount)
    console.log("pageNine::"+pageNine)
    console.log("pageThree::"+pageThree)
    console.log("airAndTrianCount::"+airAndTrianCount)
    console.log("roadCount::"+roadCount)
    $(jxdk).val(jxdkCount);
    $(ninePages).val(pageNine);
    $(airAndTrainJe).val(airAndTrianCount);
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
<script>
var invoiceType="#field9492";//发票类型#field1231
//明细只要中存在“其他”类型的发票，在财务节点提醒，“第几行存在手工录入发票，请注意”
$(document).ready(function(){
    console.log("readyshow")
    var num = $("#submitdtlid1").val();
    num = num.split(",")
    var showInfo="";
    var alertFlag=false
    for (var i = 0; i < num.length; i++) {
        var type = $(invoiceType+"_"+num[i]).val()
        if("30"==type){
            alertFlag=true;
            showInfo+="第"+(Number(num[i])+1)+"行存在手工录入发票，请注意。"+"\n";
        }
    }
    console.log("alertFlag::"+alertFlag)
    console.log("showInfo::"+showInfo)
    if(alertFlag){
        alert(showInfo)
    }
})

</script>
