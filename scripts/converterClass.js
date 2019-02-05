class Converter{
  //ローマ字の入力を別の言語の文字に返すための処理をまとめたクラス
  //対象言語毎のクラスにこのクラスを継承させる
  constructor(romeArr,destinationArr){
    this.rome=romeArr;          //romeは変換表における変換元(ローマ字)を格納した配列
    this.destination=destinationArr; //destinationは変換先(キリル字や かな文字を実装予定)を格納した配列
    //holdPartialMatchを機能させるため、romeとdestinationの要素の順番に注意。
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
  isDestination(character){//入力文字が変換先の文字かどうか判定するメソッド
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
        result=this.destination[index];
        break;
      }
      result=inputString;
    }
    if(isMatch && upperCaseFlag) result = this.lowerToUpper(result);
    return result;
  }
  resetVal(){
    this.searchString="";
    this.compareLength=0;
  }
  holdPartialMatch(inputString){
    var upperCaseFlag=this.hasUpperCase(inputString);
    var searchString=inputString.toLowerCase();
    var result;
    for(var index=0;index<this.rome.length;index++){
      var isMatch=searchString===this.rome[index];
      var isPartialMatch=searchString===this.rome[index].substr(0,searchString.length);
      if(isMatch){
        result=this.destination[index];
        break;
      }else if(isPartialMatch){
        result=inputString;
        break;
      }
      result=false;
    }
    if(isMatch && upperCaseFlag) result=this.lowerToUpper(result);
    return result;
  }
  /*補足:shch⇔щ,sh⇔ш,s⇔сという変換規則がある場合、sやshが入力された時点ではまだユーザーが変換したい文字が一意に決まらない。
  holdPartialMatchはそのような意図しない変換を防ぎつつ、入力文字列に対応する要素を変換元配列から探索するメソッドである。
  なお、shやsのような文字列を途中で変換したい場合、ユーザーがスペースキーを入力すると手動で変換するような仕様にしてある。*/
  recursiveSearch(inputString){
    var convertedString=inputString;
    if(this.isDestination(this.simpleSearch(inputString))||inputString.length===1){
      convertedString=this.simpleSearch(inputString);
    }else{
      convertedString=this.recursiveSearch(inputString.slice(0,-1))+this.holdPartialMatch(inputString.substr(-1,1));
    }
    return convertedString;
  }
  autoConvert(inputText){
    var convertedText="";
    var currentPosition=0;
    var searchString="";
    var compareLength=0;
    while(currentPosition < inputText.length){
      //console.log("loop"+loopNum);
      var searchChar=inputText.substr(currentPosition+compareLength,1);
      searchString=searchString+searchChar;
      compareLength=searchString.length;
      var addString="";
      var resultSimpleSearch=this.simpleSearch(searchString);
      //console.log("rss="+resultSimpleSearch);//debug
      var resultPartialMatch=this.holdPartialMatch(searchString);
      //console.log("rpm="+resultPartialMatch);//debug
      if(searchChar==="") return convertedText+resultPartialMatch; 
      if(resultPartialMatch===searchString)continue;
      if(this.isDestination(searchChar)) addString=searchChar;
        //console.log("mode1:"+"addString="+addString);//debug
      if(this.isDestination(resultPartialMatch)) addString=resultPartialMatch;
        //console.log("Hit:"+"addString="+addString);
      if(resultPartialMatch===false&&!this.isRome(searchChar)) addString=searchString;
        //console.log("mode2:"+"addString="+addString);//debug
      if(resultPartialMatch===false&&this.isRome(searchChar)){
        if(searchString.length>1){
          addString=this.recursiveSearch(searchString.slice(0,-1));
          compareLength--;
        }else{
          addString=searchString;
        }
        //console.log("mode3:"+"addString="+addString);//debug
      }
      convertedText=convertedText+addString;
      //console.log("convertedText="+convertedText);//debug
      currentPosition+=compareLength;
      //this.resetVal();
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
      var resultSimpleSearch=this.simpleSearch(searchString);
      var resultPartialMatch=this.holdPartialMatch(searchString);
      var resultPartialMatchNext=this.holdPartialMatch(searchString+nextChar);
      if(this.isDestination(searchChar)){
        addString=searchChar;
      }else if(searchChar==="" || resultPartialMatchNext===false){
        addString=resultSimpleSearch;
      }else if(this.isDestination(resultPartialMatchNext)){
        addString=resultPartialMatchNext;
        compareLength++;
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
