<script>
jQuery.getScript( '/workflow/request/ux/ux.js' );
jQuery.getScript( '/workflow/request/ux/fns.js' );
jQuery(document).ready(function(){
    //报销金额大小写
    var objbxje="field6012",objbxjedx="field6335";

    //报销金额转换为大写
    function bxjechange(){
        var v = getVal(objbxje );
        var vc = numberChangeToChinese( v );
        setVal( objbxjedx , vc );
    }

    //出差日期天数
    var objccrq="field6009",objfhrq="field6010",objccts="field6011";
    //出差天数计算
    function cctscompute(){
        //  	var d1 = getVal( objccrq );
        //  	var d2 = getVal( objfhrq );
        // 	var d = 0;
        //	if( d1 != '' && d2 != '' ){
        // 		d = Days( d2 , d1 );
        //		if(d<0) d=-1;
        //		d++;
        //	}
        // 	setVal(objccts , d);
    }
    //报销人数
    var objsqraqjb = "field6344",objtxryaqjb="field6377",objzcdsz="field6391",objggrs="field6339",objfzrs="field6340",objybyg="field6341";
    jQuery ('#' + objsqraqjb).bindPropertyChange(initbxrs);
    jQuery ('#' + objtxryaqjb).bindPropertyChange(initbxrs);
    jQuery ("#field6376").bindPropertyChange(initbxrs);

    //初始化人数
    function initbxrs(){
        var v,txry=getVal( objtxryaqjb ),txrya = txry.split(',');
        var zcdsz=0;ggrs=0,fzrs=0,ybyg=0;
        for( var i=0;i<txrya.length;i++ ){
            v = txrya[i];
            if (v=='') continue;
            if( v>=80) zcdsz++;
            if( v >= 60 && v<80) ggrs++;
            if( v>=40 && v < 60  ) fzrs++;
            if( v < 40  ) ybyg++;
        }
        setVal(objzcdsz,zcdsz);
        setVal(objggrs,ggrs);
        setVal(objfzrs,fzrs);
        setVal(objybyg,ybyg);
    }
    //费用校验
    var objsfhy='field6342',objcclx='field6382',objzsf = 'sumvalue6023',objwcf='sumvalue6024';
    function zsfcompute(){
        var mess='';
        var sfhy = getVal( objsfhy ),cclx = getVal( objcclx );
        if( sfhy == '2' && cclx == '0' ){
            var d = getVal( objccts ),v = getVal( objzsf );
            var n0=getVal(objzcdsz),n1 = getVal( objggrs ),n2 = getVal( objfzrs ),n3=getVal( objybyg );
            if(d!='' && v!=''&&( n1 != '' || n2 != '' || n3 != '' )){
                d = parseFloat(d)||0;
                n0 = parseFloat(n0)||0;
                n1 = parseFloat(n1)||0;
                n2 = parseFloat(n2)||0;
                n3 = parseFloat(n3)||0;
                v = parseFloat(v)||0;
                //alert("jhjjj"+v);
                if(n0==0){
                    var s = (d==0)?0:((n1 * 1500 + n2 * 800 + n3 * 500)*(d-1));
                    if(s<v){
                        mess = "住宿费已超标，当前人员标准为:" + s.toFixed(2) + "元,申请报销金额为:" + v.toFixed(2) + "元。"
                    };
                }
            }
        }
        jQuery( '#messzsf' ).empty().append( mess );
    }
    function wcfcompute(){
        var mess='';
        var sfhy = getVal( objsfhy ),cclx = getVal( objcclx );
        if( sfhy == '2' && cclx == '0' ){
            var d = getVal( objccts ),v = getVal( objwcf );
//alert("d:"+d+"-----------v"+v);
            var n0=getVal(objzcdsz),n1 = getVal( objggrs ),n2 = getVal(objfzrs ),n3=getVal( objybyg );
//alert("n0:"+n0 +"--------------n1:"+n1+"-----------n2:"+n2+"---------n3:"+n3);
            if(d!='' && v!=''&&( n1 != '' || n2 != '' || n3 != '' )){
                d = parseFloat(d)||0;
                n0 = parseFloat(n0)||0;
                n1 = parseFloat(n1)||0;
                n2 = parseFloat(n2)||0;
                n3 = parseFloat(n3)||0;
                v = parseFloat(v)||0;
                if(n0==0 && n1==0){
                    var s = (d==0)?0:((n2 * 200 + n3 * 160) * (d - 1) + (n2 * 120 + n3 * 100));
                    if(s<v){
                        mess = "餐饮或误餐费已超标，当前人员标准为:" + s.toFixed(2) + "元,申请报销金额为:" + v.toFixed(2) + "元。"
                    };
                }
            }
        }
        jQuery( '#messwcf' ).empty().append( mess );
    }
    //明细必填
    function _detailneed( i ){
        var s = jQuery( '[name^=dtl_id]' ).size();
        if(s==0)alert("明细数据未填写！");
        return s > 0;
    }
    function _pageinit(){
        Fns.initNo();
        cTool.setInputCenter("field6704");
        cTool.protect( "field6011" );
        cTool.protect( "field6385" );
        cTool.protect( "field6676" );
        //cTool.protect( objbxje );
        cTool.protect( objbxjedx );
        jQuery("#field6384").val("4");
        jQuery("#field6384span").html("上海总部-人力资源部");
        //自动新增一行
        if(jQuery( "[name^=check_node_0]" ).size()==0){
            addRow0(0);
        }

        jQuery("#field6382").change(function(){
            var fnayear = jQuery("#field7008").val();
            var fnadept = jQuery("#field6384").val();
            var feeprojectid = "";
            var areatype = "";
            if(jQuery("#field6382").length){
                areatype = jQuery("#field6382").val();
            }else{
                areatype = jQuery("#disfield6382").val();
            }
            if(areatype=="0"){
                feeprojectid = "52";
            }
            if(areatype=="1"){
                feeprojectid = "52";
            }
            if(feeprojectid!="" && fnayear!="" && fnadept!=""){
                var requestid = "0";
                if(jQuery("#requestid").length){
                    //存在
                    requestid = jQuery("#requestid").val();
                }
                getFnaInfo(fnayear,fnadept,requestid,feeprojectid);
            }
        });
        jQuery ('#' + objbxje ).bindPropertyChange(bxjechange);
        jQuery ('#' + objccrq ).bindPropertyChange(cctscompute);
        jQuery ('#' + objfhrq).bindPropertyChange(cctscompute);
        jQuery ('#' + objccts).bindPropertyChange(zsfcompute);
        jQuery ('#' + objggrs).bindPropertyChange(zsfcompute);
        jQuery ('#' + objfzrs).bindPropertyChange(zsfcompute);
        jQuery ('#' + objybyg).bindPropertyChange(zsfcompute);
        jQuery ('#' + objzsf).bindPropertyChange(zsfcompute);
        jQuery ('#' + objsfhy).bindPropertyChange(zsfcompute);
        jQuery ('#' + objcclx).bindPropertyChange(zsfcompute);
        jQuery ('#' + objccts ).bindPropertyChange(wcfcompute);
        jQuery ('#' + objggrs ).bindPropertyChange(wcfcompute);
        jQuery ('#' + objfzrs ).bindPropertyChange(wcfcompute);
        jQuery ('#' + objybyg ).bindPropertyChange(wcfcompute);
        jQuery ('#' + objwcf ).bindPropertyChange(wcfcompute);
        jQuery ('#' + objsfhy ).bindPropertyChange(wcfcompute);
        jQuery ('#' + objcclx ).bindPropertyChange(wcfcompute);


        zsfcompute();
        wcfcompute();

        var tt = jQuery( '#sum6336' );
        var ths = tt.html() + tt.nextAll().html();
        tt.parent().empty().append( '小计' + ths );
        jQuery.each(jQuery( 'select:disabled' ), function(i,n){jQuery(n).after( jQuery(n).children("option:selected").html() ).hide();} );
    }
    //用正则
    function Days(day1, day2){
        var reg = /-|年|月|日 |\/|:| /;
        //dayinfo -  用正则分割
        var DI1 = day1.split(reg);
        var DI2 = day2.split(reg);

        var date1 = new Date(DI1[0], DI1[1]-1, DI1[2]);
        var date2 = new Date(DI2[0], DI2[1]-1, DI2[2]);

        //用距标准时间差来获取相距时间
        var minsec = Date.parse(date1) - Date.parse(date2);
        var days = minsec / 1000 / 60 / 60 / 24; //factor: second / minute / hour / day

        return days;
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
    function checkJe(){
        var objsqsqje="field6385",objbxje="field6012";
        var vsq=cTool.getVal( objsqsqje ),vbx=cTool.getVal( objbxje );
        if ( vsq > 0 ){
            if((vbx - vsq) > 0 ){
                alert("超过申请金额，不能提交！");
                return false;
            }
        };
        return true;
    }
//合计强制计算
    var arrDetailObj = ["field6019","field6020","field6021","field6022","field6023","field6024","field6025"],objDetailSum="field6026";
    function reCmpDetai(){
        jQuery.each( jQuery( "[name^=" + objDetailSum + "]" ) , function(i,n){
            var id = jQuery( n).attr("id"),index = id.split("_")[1];
            var sum = 0;
            jQuery.each( arrDetailObj , function(j,jn){
                var v = jQuery( "#" + jn + "_" + index ).val();
                if(v=="") v = "0";
                v = parseFloat(v);
                sum += v;
            });
            cTool.setVal(id,sum.toFixed(2));
        });
    }
    function getIfBussiness(deptId){
        var returnval=false;
        jQuery.ajax({
            url : "/workflow/request/CheckIfBussiness.jsp",
            type : "post",
            async : false,
            processData : false,
            data : "deptId="+deptId,
            dataType : "json",
            success: function do4Success(msg){
                var infos = msg.result;
                returnval=infos;
            }
        });
        return returnval;
    }


    function getFnaKeYong(fnayear,fnadept,requestid,feeprojectid,mainfeeprojectid,detailfnadept){
        var returnval=0;
        jQuery.ajax({
            url : "/workflow/request/FnaApplyGetBudgetInfo2.jsp",
            type : "post",
            async : false,
            processData : false,
            data : "fnayear="+fnayear+"&fnadept="+fnadept+"&requestid="+requestid+"&feeprojectid="+feeprojectid
            +"&mainfeeprojectid="+mainfeeprojectid+"&detailfnadept="+detailfnadept,
            dataType : "html",
            success: function do4Success(msg){
                var infos = msg.trim().split("_");
                returnval=infos[2];
            }
        });
        return returnval;
    }

    checkCustomize = function(){
        reCmpDetai();//合计强制重新计算
        //var lclx = getVal( 'field6477' ),spbz=getVal('field6478');
        //if(lclx != 41){
        //  alert('事前申请流程请选择【经营性支出申请】！');
        //  return false;
        //}
        //if(spbz!=1){
        //  alert('事前申请流程未审批结束！');
        //  return false;
        //}
        //if (!checkJe()) return;
        //if(checkPreWorkflow()){
        //alert("申请金额大于可用事前申请金额!");
        //return false;
        //}
        //tagtag
        var my_fnayear= jQuery("#field7008").val();
        var my_fnadept= jQuery("#field6384").val();
        var my_requestid = "0";
        if(jQuery("#requestid").length){
            //存在
            my_requestid = jQuery("#requestid").val();
        }
        var my_feeprojectid = "";
        var my_areatype = "";
        if(jQuery("#field6382").length){
            my_areatype = jQuery("#field6382").val();
        }else{
            my_areatype = jQuery("#disfield6382").val();
        }
        if(my_areatype=="0"){
            my_feeprojectid = "52";
        }
        if(my_areatype=="1"){
            my_feeprojectid = "52";
        }


        getFnaInfo(my_fnayear,my_fnadept,my_requestid,my_feeprojectid);
        var ifBussiness=getIfBussiness(my_fnadept);
        if(ifBussiness==true||ifBussiness=="true"){

            var my_dangqianfee= jQuery("#field6012").val();
            var my_qitafee= jQuery("#feelast").val();

            var my_zhaodaifee= getFnaKeYong(my_fnayear,my_fnadept,my_requestid,53,7,my_fnadept);

            if(parseFloat(my_dangqianfee)>parseFloat(my_qitafee)){
                alert("项目申请金额大于可用预算额!");
                return false;
            }
            if(parseFloat(my_dangqianfee)>(parseFloat(my_qitafee)+ parseFloat(my_zhaodaifee))){
                alert("业务招待费与其他费用合计总额已超标");
                return false;
            }
        }



        //报销金额=6012
        if(jQuery("#fnacontrol").val()=="0" && (parseFloat(jQuery("#field6012").val())>parseFloat(jQuery("#feelast").val()))){
            alert("预算不足不能提交!");
            return false;
        }else{
            return true;
        }
        return _detailneed(0);
    }
    setTimeout(_pageinit,300);
});
</script>
<script>
var invoiceType="#field9484";//费用类型
var jshj="#field9099"//价税合计
var zy="#field9108"//摘要
var shuiE="#field9101"//税额

var bxje="#field6028"//报销金额
var ysc="#field6014"//应收款
var jxdk="#field8507"//进项抵扣
var txf="#field8508"//通行费抵扣
var ninePages="#field8932"//9%
var threePages="#field8935"//3%
var airAndTrainJe="#field8933"//航空铁路服务金额
var roadJe="#field8936"//公路水路金额

var typeA="2";//增值税专用发票
var typeB="15";//所有电子发票
var typeC="10"//客运汽车发票
var typeD="24"//船票
var typeE="14"//飞机票的张数
var typeF="8"//火车票
var alertFlag=""
var purchaser_field="#field9106"//付款方名称
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

$(document).ready(function() {
    console.log("ready2")
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
        if((typeB==invoiceTypeVal&&zyVal!=""&&zyVal.indexOf("交通服务")!=-1)||typeC==invoiceTypeVal||typeD==invoiceTypeVal){//份数（3%）
            pageThree++;
        }
        if(typeA==invoiceTypeVal){//进项抵扣：所有增值税专用发票的税额合计
            jxdkCount=Number(jxdkCount)+Number(shuiEVal);
        }
        if(typeB==invoiceTypeVal&&zyVal!=""&&zyVal.indexOf("通行费")!=-1){//通行费抵扣：所有电子发票的摘要中包含“通行费”三个字的税额合计
            txfCount=Number(txfCount)+Number(shuiEVal);
        }
        if((typeB==invoiceTypeVal&&zyVal!=""&&zyVal.indexOf("交通服务")!=-1)||typeC==invoiceTypeVal||typeD==invoiceTypeVal){//公路水路服务金额
            roadCount=Number(roadCount)+Number(shuiEVal);
        }
    }
    console.log("jxdkCount::"+jxdkCount)
    console.log("txfCount::"+txfCount)
    console.log("pageNine::"+pageNine)
    console.log("pageThree::"+pageThree)
    console.log("airAndTrianCount::"+airAndTrianCount)
    console.log("roadCount::"+roadCount)
    $(jxdk).val(jxdkCount);
    $(txf).val(txfCount);
    $(ninePages).val(pageNine);
    $(threePages).val(pageThree);
    $(airAndTrainJe).val(airAndTrianCount);
    $(roadJe).val(roadCount);
}
</script>













