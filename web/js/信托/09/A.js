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


$(document).ready(function() {
    console.log("ready2")
    resetHjData();
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
