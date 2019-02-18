//入力文字を取得する関数
//androidOS等の環境でkeyCodeが利用できないので入力前後のdiffを取る方式を採用。
const difference = function(value1="",value2=""){
  var output = [];
  for ( i=0; i< value2.length; i++){
    if(value1[i] !== value2[i]){
      output.push(value2[i]);
    }
  }
  return output.join("").substr(0,1); 
}
//変数charConは各言語用のクラスのインスタンス
//Languagesフォルダの各jsファイルを参照
//htmlでhighlightTextareaプラグインを読み込み済み
var upperCaseArr=new Array(charCon.converted.length);
charCon.converted.forEach(function(val,index){
  upperCaseArr[index]=charCon.lowerToUpper(val);
});
var highlightArr=charCon.converted.concat(upperCaseArr).concat(symbols);
$(function(){
  var oldValue;
  var newValue;
  var spaceCount=0;
  var enterCount=0;
  var position=0;
  var newPosition=0;
  var highlightList=$('#input').highlighter("highlightArray",charCon.converted,symbols,upperCaseArr);
  $('#input').highlighter("init");
  $('#input').on('focusin',function(){
    position=$(this).get(0).selectionStart;
  });
  $('#input').on('click',function(){
    position=$(this).get(0).selectionStart;
  })
  $('#input').keydown(function(){
    oldValue=$(this).val();
    position=$(this).get(0).selectionStart;
  });
  $('#input').on('input',function(){
    newValue=$(this).val();
    var inputChar=difference(oldValue,newValue)
    if(inputChar===" "&&spaceCount===0){
      //spaceの入力で自動変換呼び出し
      $(this).val($(this).val().slice(0,position)+$(this).val().slice(position+1));
      spaceCount++;
      var convertedText=charCon.manualConvert($(this).val());
    }else if(spaceCount>0){
      spaceCount=0;
      convertedText=newValue;
    }else{
      var convertedText=charCon.autoConvert($(this).val());
    }
    if(newValue.length >= oldValue.length){
      newPosition=convertedText.length-(oldValue.length-position);
      $(this).val(convertedText);
      $(this).get(0).setSelectionRange(newPosition,newPosition);
    }
    $(this).highlighter('highlightChar',highlightList);
    $('#behindInput').scrollTop($(this).scrollTop());
    console.log('input:\"'+inputChar+'\"');
    console.log('position:\"'+position+'\"');
  });
  $('#input').scroll(function(){
    $('#behindInput').scrollTop($(this).scrollTop());
  });
});
