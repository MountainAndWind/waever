/**
 * <script type="text/javascript" src="/workflow/request/js/calculateWorkingDate.js"></script>
 * 根据选择的日期联动计算出 工作日天数,双休日天数，节假日天数
 */

var _START_DATE_FIELDID = 6320; //开始日期字段的id
var _END_DATE_FIELDID = 6321; // 结束日期字段的id
var _ZSTS_FIELDID = 7590; //住宿天数字段的id
var _CCTS_FIELDID = 6322; //出差天数字段的id
var _DETAIL_INDEX = 1; // 明细表的索引
var _CLEAR_DEFAULT_VAL = ""; // 清空日期以后工作日天数，双休日天数等的默认显示值

var _START_DATE_FLAG = "_START_DATE_FLAG";
var _END_DATE_FLAG = "_END_DATE_FLAG";


/**
 * 根据输入的内容生成感叹号
 */
jQuery(document).ready(function () {
	
	WfForm.bindDetailFieldChangeEvent("field"+_END_DATE_FIELDID,function(id,rowIndex,value){
		controlDateChoice();
	});
	WfForm.bindDetailFieldChangeEvent("field"+_START_DATE_FIELDID,function(id,rowIndex,value){
		controlDateChoice();
	});
	WfForm.registerAction(WfForm.ACTION_ADDROW+"1", function(index){

	   controlDateChoice();
	  
	});
	//WfForm.bindFieldAction("onclick", "field"+_END_DATE_FIELDID, function(){
    		WfForm.bindDetailFieldChangeEvent("field"+_END_DATE_FIELDID,function(id,rowIndex,value){
		 // alert(rowIndex);
	var _START_DATE_FIELIDfieldvalue = WfForm.getFieldValue("field"+_START_DATE_FIELDID+"_"+rowIndex);
        var _END_DATE_FIELDIDfieldvalue = WfForm.getFieldValue("field"+_END_DATE_FIELDID+"_"+rowIndex);
	//console.log('parseInt(rowIndex)+1',parseInt(rowIndex)+1);
	//console.log('"field"+_END_DATE_FIELDID+"_"+(parseInt(rowIndex)+1)',"field"+_END_DATE_FIELDID+"_"+(parseInt(rowIndex)+1));
	var _END_DATE_FIELDIDfieldnextvalue = WfForm.getFieldValue("field"+_END_DATE_FIELDID+"_"+(parseInt(rowIndex)+1));
	//console.log('_END_DATE_FIELDIDfieldnextvalue',_END_DATE_FIELDIDfieldnextvalue);
	//console.log('_START_DATE_FIELIDfieldvalue',_START_DATE_FIELIDfieldvalue);
	//console.log('"field"+_END_DATE_FIELDID+"_"+rowIndex',"field"+_END_DATE_FIELDID+"_"+rowIndex);
		WfForm.controlDateRange("field"+_END_DATE_FIELDID+"_"+rowIndex, _START_DATE_FIELIDfieldvalue, '2099-12-21');  
	});
//	});
	WfForm.bindDetailFieldChangeEvent("field"+_START_DATE_FIELDID,function(id,rowIndex,value){
		 //alert(666);
		 // alert(rowIndex);
	var _START_DATE_FIELIDfieldvalue = WfForm.getFieldValue("field"+_START_DATE_FIELDID+"_"+rowIndex);
        var _END_DATE_FIELDIDfieldvalue = WfForm.getFieldValue("field"+_END_DATE_FIELDID+"_"+rowIndex);
//	console.log('parseInt(rowIndex)+1',parseInt(rowIndex)+1);
//	console.log('"field"+_END_DATE_FIELDID+"_"+(parseInt(rowIndex)+1)',"field"+_END_DATE_FIELDID+"_"+(parseInt(rowIndex)+1));
	var _END_DATE_FIELDIDfieldnextvalue = WfForm.getFieldValue("field"+_END_DATE_FIELDID+"_"+(parseInt(rowIndex)+1));
	//console.log('_END_DATE_FIELDIDfieldnextvalue',_END_DATE_FIELDIDfieldnextvalue);
	//console.log('_START_DATE_FIELIDfieldvalue',_START_DATE_FIELIDfieldvalue);
	//console.log('"field"+_END_DATE_FIELDID+"_"+rowIndex',"field"+_END_DATE_FIELDID+"_"+rowIndex);
		WfForm.controlDateRange("field"+_END_DATE_FIELDID+"_"+rowIndex, _START_DATE_FIELIDfieldvalue,  '2099-12-21'); 
	});

  /*
        绑定明细表数据,明细表开始日期变更，计算天数赋值给字段联动计算天数
     */

	WfForm.bindDetailFieldChangeEvent("field"+_START_DATE_FIELDID,function(id,rowIndex,value){
        var _START_DATE_FIELIDfieldvalue = WfForm.getFieldValue("field"+_START_DATE_FIELDID+"_"+rowIndex);
        var _END_DATE_FIELDIDfieldvalue = WfForm.getFieldValue("field"+_END_DATE_FIELDID+"_"+rowIndex);
	 var correct = 1;
 	if(rowIndex>=1){
		//alert(777)
	 	var _END_DATE_FIELDIDfieldvaluewww = WfForm.getFieldValue("field"+_END_DATE_FIELDID+"_"+(rowIndex-1));
		 	//  console.log('_END_DATE_FIELDIDfieldvaluewww',_END_DATE_FIELDIDfieldvaluewww);
			  if(_END_DATE_FIELDIDfieldvaluewww === _START_DATE_FIELIDfieldvalue){
                	correct = 0;
            		}else{
			correct = 1;
			}
	 }
	 

	// console.log('_START_DATE_FIELIDfieldvalue',_START_DATE_FIELIDfieldvalue);
	// console.log('_END_DATE_FIELDIDfieldvalue',_END_DATE_FIELDIDfieldvalue);

	  if(_START_DATE_FIELIDfieldvalue === _END_DATE_FIELDIDfieldvalue){
                correct = 1;
            }
	    //controlDateCal();
		var days;
	  if(_START_DATE_FIELIDfieldvalue==_END_DATE_FIELDIDfieldvalue){
          days=1;
	  }else{
          days=calculateDays(_START_DATE_FIELIDfieldvalue,_END_DATE_FIELDIDfieldvalue)+correct;
	  }
        WfForm.changeFieldValue("field"+_CCTS_FIELDID+"_"+rowIndex, {value:days});
	  var daysw=calculateDays(_START_DATE_FIELIDfieldvalue,_END_DATE_FIELDIDfieldvalue);
        WfForm.changeFieldValue("field"+_ZSTS_FIELDID+"_"+rowIndex, {value:daysw});
    });
    	    /*
        绑定明细表数据,明细表结束日期变更，计算天数赋值给字段联动计算天数
     */
    	WfForm.bindDetailFieldChangeEvent("field"+_END_DATE_FIELDID,function(id,rowIndex,value){
        var _START_DATE_FIELIDfieldvalue = WfForm.getFieldValue("field"+_START_DATE_FIELDID+"_"+rowIndex);
        var _END_DATE_FIELDIDfieldvalue = WfForm.getFieldValue("field"+_END_DATE_FIELDID+"_"+rowIndex);
	 var correct = 1;
 	if(rowIndex>=1){
		//alert(777)
	 	var _END_DATE_FIELDIDfieldvaluewww = WfForm.getFieldValue("field"+_END_DATE_FIELDID+"_"+(rowIndex-1));
		 	//  console.log('_END_DATE_FIELDIDfieldvaluewww',_END_DATE_FIELDIDfieldvaluewww);
			  if(_END_DATE_FIELDIDfieldvaluewww === _START_DATE_FIELIDfieldvalue){
                	correct = 0;
            		}else{
			correct = 1;
			}
	 }
	 

	// console.log('_START_DATE_FIELIDfieldvalue',_START_DATE_FIELIDfieldvalue);
	// console.log('_END_DATE_FIELDIDfieldvalue',_END_DATE_FIELDIDfieldvalue);

	  if(_START_DATE_FIELIDfieldvalue === _END_DATE_FIELDIDfieldvalue){
                correct = 0;
            }
	    //controlDateCal();
	var days;
	if(_START_DATE_FIELIDfieldvalue==_END_DATE_FIELDIDfieldvalue){
		days=1;
	}else{
		days=calculateDays(_START_DATE_FIELIDfieldvalue,_END_DATE_FIELDIDfieldvalue)+correct;
	}
      //var days=calculateDays(_START_DATE_FIELIDfieldvalue,_END_DATE_FIELDIDfieldvalue)+correct;
        WfForm.changeFieldValue("field"+_CCTS_FIELDID+"_"+rowIndex, {value:days});
	  var daysw=calculateDays(_START_DATE_FIELIDfieldvalue,_END_DATE_FIELDIDfieldvalue);
        WfForm.changeFieldValue("field"+_ZSTS_FIELDID+"_"+rowIndex, {value:daysw});
    });
    setTimeout(function () {
        //_initBindDetailFieldEvent(window._DETAIL_INDEX);
		
    }, 10); // 绑定开始日期事件
});

function  controlDateChoice(){
		try{
	//	alert(111);
			var allindexss=WfForm.getDetailAllRowIndexStr("detail_1");//detail_1是明细表1，detail_2是明细表2一次类推
			var allindex=allindexss.split(",");
			if(allindex.length>1){
				for(var i=1;i<allindex.length;i++){
					var lastindex=allindex[i-1];//上一行下标
					var currindex=allindex[i];//当前行下标
					var nextindex=allindex[i+1];
					var lastendvalue=WfForm.getFieldValue("field"+_END_DATE_FIELDID+"_"+lastindex);//上一行结束日期
					var currendvalue=WfForm.getFieldValue("field"+_END_DATE_FIELDID+"_"+currindex);//这一行结束日期
					var currbeginvalue=WfForm.getFieldValue("field"+_START_DATE_FIELDID+"_"+currindex);//这一行的开始日期
					var nextendvalue=WfForm.getFieldValue("field"+_END_DATE_FIELDID+"_"+nextindex);//下一行的结束日期
					//alert(lastendvalue);
					//alert(currendvalue);
					//console.log(lastendvalue);
					//console.log('nextendvalue',nextendvalue);
					//console.log("field"+_START_DATE_FIELDID+"_"+currindex);
					WfForm.controlDateRange("field"+_START_DATE_FIELDID+"_"+currindex, lastendvalue, '2999-12-21'); 
				
					WfForm.controlDateRange("field"+_END_DATE_FIELDID+"_"+currindex, currbeginvalue, '2999-12-21'); 
					
				
				}
				var currindex1=allindex[1];//当前行下标	
				var currendvalue1=WfForm.getFieldValue("field"+_END_DATE_FIELDID+"_"+currindex1);//这一行结束日期
				//WfForm.controlDateRange("field"+_START_DATE_FIELDID+"_"+currindex1, '1971-01-01', currendvalue1); 
				//allindex[i]是明细表的行下标
			}else{
				if(allindex.length==1){
					var currindex=allindex;
					var currendvalue=WfForm.getFieldValue("field"+_END_DATE_FIELDID+"_"+currindex);//这一行结束日期
					var currbeginvalue=WfForm.getFieldValue("field"+_START_DATE_FIELDID+"_"+currindex);//这一行的开始日期
					WfForm.controlDateRange("field"+_START_DATE_FIELDID+"_"+currindex, '1971-01-01', '2099-12-21'); 
					WfForm.controlDateRange("field"+_END_DATE_FIELDID+"_"+currindex, currbeginvalue, '2099-12-21'); 
				}
			}
			
		}catch(e){
			
		}
	
}













/**
*计算两个时间之间的间隔天数
*/
function calculateDays(startDate,endDate){
    var stime = Date.parse(startDate.replace(/-/g, "/"));  
    var etime = Date.parse(endDate.replace(/-/g, "/"));  
    var usedTime = etime - stime;  //两个时间戳相差的毫秒数  
    return Math.floor(usedTime/(24*3600*1000));  
}










/**
 * 日志记录
 * @param {*} msg 
 */
function log(msg) {
    if (window.console && window.console.log) {
        console.log(msg);
    }
}
