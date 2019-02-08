class Converter{
  //ローマ字の入力を別の言語の文字に返すための処理をまとめたクラス
  //対象言語毎のクラスにこのクラスを継承させる
  constructor(romeArr,convertedArr){
    this.rome=romeArr;          //romeは変換表における変換元(ローマ字)を格納した配列
    this.converted=convertedArr; //convertedは変換先(キリル字や かな文字を実装予定)を格納した配列
    //holdPartialMatchを機能させるため、romeとconvertedの要素の順番に注意。
    //変換に必要なローマ字の文字数が多い程、若いインデックス番号を割り当てる事。
  }
  isRome(str=""){ //入力文字列がローマ字かどうか判定するメソッド。空文字や文字列型でない入力にはfalseを返す
    var romeMatch = new RegExp('^[A-Za-z]*$');
    return  romeMatch.test(str) && str!=="";
  }
  hasUpperCase(str){
    var upperCaseMatch = new RegExp("[A-Z]");
    return upperCaseMatch.test(str);
  }
  isConverted(character){//入力文字が変換先の文字かどうか判定するメソッド
    if(Object.prototype.toString.call(character)!=="[object String]"&&character.length!==1){
      return false;
    }
    //以下は継承先のクラスでオーバーライド
  }
  lowerToUpper(lowerChar){ //変換先の文字を大文字に変換するメソッド
    var lowerCode = lowerChar.charCodeAt(0);
    var UpperCode;
    var UpperChar;
    //以下は継承先のクラスでオーバーライド
  }
  simpleSearch(inputString){ 
    var searchString=inputString.toLowerCase();
    var upperCaseFlag=this.hasUpperCase(inputString);
    var result;
    for(var index=0;index<this.rome.length;index++){
      var isMatch=searchString===this.rome[index];
      if(isMatch){ 
        result=this.converted[index];
        break;
      }
      result=inputString;
    }
    if(isMatch && upperCaseFlag) result = this.lowerToUpper(result);
    return result;
  }
  holdPartialMatch(inputString){
    var upperCaseFlag=this.hasUpperCase(inputString);
    var searchString=inputString.toLowerCase();
    var result;
    for(var index=0;index<this.rome.length;index++){
      var isMatch=searchString===this.rome[index];
      var isPartialMatch=searchString===this.rome[index].substr(0,searchString.length);
      if(isMatch||isPartialMatch){
        break;
      }
      result=false;
    }
    if(isMatch)result=this.converted[index];
    if(isPartialMatch&&!isMatch)result=inputString;
    if(upperCaseFlag) result=this.lowerToUpper(result);
    return result;
  }
  /*補足:shch⇔щ,sh⇔ш,s⇔сという変換規則がある場合、sやshが入力された時点ではまだユーザーが変換したい文字が一意に決まらない。
  holdPartialMatchはそのような意図しない変換を防ぎつつ、入力文字列に対応する要素を変換元配列から探索するメソッドである。
  なお、shやsのような文字列を途中で変換したい場合、ユーザーがスペースキーを入力すると手動で変換するような仕様にしてある。*/
  recursiveSearch(inputString){
    var convertedString=inputString;
    if(this.isConverted(this.simpleSearch(inputString))||inputString.length===1){
      convertedString=this.simpleSearch(inputString);
    }else{
      var matsubi = !this.holdPartialMatch(inputString.substr(-1,1))? inputString.substr(-1,1):this.holdPartialMatch(inputString.substr(-1,1));
      convertedString=this.recursiveSearch(inputString.slice(0,-1))+matsubi;
    }
    return convertedString;
  }
  autoConvert(inputText){
    var convertedText="";
    var currentPosition=0;
    var searchString="";
    var compareLength=0;
    while(currentPosition < inputText.length){
      var searchChar=inputText.substr(currentPosition+compareLength,1);
      searchString=searchString+searchChar;
      compareLength=searchString.length;
      var addString="";
      var resultSimpleSearch=this.simpleSearch(searchString);
      var resultPartialMatch=this.holdPartialMatch(searchString);
      if(searchChar==="") return convertedText+resultPartialMatch; 
      if(resultPartialMatch===searchString)continue;
      if(this.isConverted(searchChar)) addString=searchChar;
      if(this.isConverted(resultPartialMatch)) addString=resultPartialMatch;
      if(!resultPartialMatch && this.isRome(searchChar)){
        if(searchString.length>1){
          addString=this.recursiveSearch(searchString.slice(0,-1));
          compareLength--;
        }else{
          addString=searchString;
        }
      }
      if(!resultPartialMatch && !this.isRome(searchChar)){
        addString=searchString;
      }
      convertedText=convertedText+addString;
      currentPosition+=compareLength;
      compareLength=0;
      searchString="";
      addString="";
    }
    return convertedText;
  }
  manualConvert(preInputText){
    var inputText=this.autoConvert(preInputText);
    var convertedText="";
    var currentPosition=0;
    var compareLength=0;
    var searchString="";
    while(currentPosition < inputText.length){
      var searchChar=inputText.substr(currentPosition+compareLength,1);
      var nextChar=inputText.substr(currentPosition+compareLength+1,1);
      searchString=searchString+searchChar;
      compareLength=searchString.length;
      var addString="";
      var resultPartialMatch=this.holdPartialMatch(searchString);
      if(this.isConverted(searchChar)){
        addString=searchChar;
      }else if(searchChar===""){
        addString=this.recursiveSearch(searchString);
      }else if(resultPartialMatch===false){
        addString=searchString.slice(0,1);
        compareLength=1;
      }else if(this.isConverted(resultPartialMatch)){
        addString=resultPartialMatch;
      }else{
        continue;
      }
      convertedText=convertedText+addString;
      currentPosition+=compareLength;
      compareLength=0;
      searchString="";
    }
    return convertedText;
  }
}
