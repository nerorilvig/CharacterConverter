const difference2 = function(value1="",value2=""){
  var output = [];
  for ( var i=0; i< value2.length; i++){
    if(value1[i] !== value2[i]){
      output.push(value2[i]);
      break;
    }
  }
  returnobj = { position:i, input: output.join("")};
  return returnobj
}
$(function(){
  var oldValue;
  var newValue;
  var spaceCount=0;
  var enterCount=0;
  $("#input").keydown(function(){
    oldValue=$("#input").val();
  });
  $("#input").on("input",function(){
    newValue=$("input").val();
    console.log("diff_pos:"+difference2(oldValue,newValue).position);
    console.log("diff_input:"+difference2(oldValue,newValue).input);
  });
});
