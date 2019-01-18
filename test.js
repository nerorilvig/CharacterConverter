//console.log(cyrLowToHigh("щ"));
//convert(rome,cyrillic,"shchShChsh ch s");
/*
const hasHighCase = function(str){
  if(str.match(new RegExp('[A-Z]'))){
    return true;
  }else{
    return false;
  :
}
*/
//console.log(convert(rome,cyrillic,"sHchsH.chsbbbbbsh"));
/*
$(function(){
  $("#input").keyup(function(e){//eはイベント
    console.log(e.keyCode);//keyCodeオブジェクトを取得できる。
    $("#output").val(e.keyCode);
  });
});
*/
/* 上記のjQueryを使わない記述法
window.onload = function(){
  document.getElementById("input").onkeyup = function(e){
    console.log(e.keyCode);
  }
}
*/
//convert(rome,cyrillic,"abcdefg");
$(function(){
});
var toString = Object.prototype.toString;
var inputString="shch chb";
var outputString="";
for(var i=0;i<inputString.length;i++){
  console.log("inputNum="+"\""+i.toString()+"\"");
  console.log("inputStr="+"\""+inputString[i]+"\"");
  outputString=outputString+inputString[i];
  outputString=convert(rome,cyrillic,outputString);
  console.log("outputStr="+"\""+outputString+"\"");
  console.log("------------------------------");
}
console.log("finish");
