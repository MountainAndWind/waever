<script language="javascript">


      function listen() {

          addObj[begindatefield] = {value:1};
          WfForm.addDetailRow("detail_1", addObj);
          WfForm.registerAction(WfForm.ACTION_ADDROW+"1", function(index){
              /* //$("#"+otherField+"_"+index).attr("name",otherId)
               $("#"+otherField_One+"_"+index).attr("name",otherId_One)
               $("#"+otherField_Two+"_"+index).attr("name",otherId_Two)
               $("#"+otherField_Three+"_"+index).attr("name",otherId_Three);
               $("#"+otherField_Four+"_"+index).attr("name",otherId_Four);
               var str = otherId_One+","+otherId_Two+","+otherId_Three+","+otherId_Four;
               /!*mapF[index]=id+","+otherId_One+","+otherField_Two+","+otherField_Three;
               console.log("≤Â»ÎMapF∫Û::"+mapF)
               $("#"+mapField).val(mapF);*!/
               indexs=index*/
          });
      }

    
    </script>