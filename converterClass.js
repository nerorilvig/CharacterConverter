class Converter{
  //ローマ字の入力を別の言語の文字に返すための処理をまとめたクラス
  //対象言語毎のクラスにこのクラスを継承させる
  constructor(romeArr,destinationArr){
    this.convertedText="";      //変換済みの文字列
    this.upperCaseFlag=false;   //trueの時、変換する文字を大文字に変更する
    this.searchString="";       //inputText内に変換表と一致する文字列がないか検索するための文字列
    this.compareLength="";      //検索文字列の長さ
    this.currentPosition=0;     //inputTextからaddedCharを取得する位置
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
    upperCaseMatch = new RegExp("[A-Z]");
    return upperCaseMatch.test(str);
  }
  isDestination(character){//入力文字が変換先の文字かどうか判定するメソッド
    if(!Object.prototype.toString.call(character)==="[object String]"&&character.length!==1){
      return false;
    }
    //以下は継承先のクラスでオーバーライド
  }
  lowerToUpper(lowerChar){ //変換先の文字を大文字に変換するメソッド
    var lowerCode = lowerChar.charCode(0);
    var UpperCode;
    var UpperChar;
    //以下は継承先のクラスでオーバーライド
  }
  simpleSearch(inputString){ //入力文字列が変換元配列の要素に完全一致したら、対応する変換先配列の要素を返すメソッド
    var searchString=inputString.toLowerCase();
    for(var index=0;index<this.rome.length;index++){
      var match=searchString===this.rome[index];
      if(match) return this.destination[index];
    }
    return inputString;
  }
  resetVal(){
    this.searchString="";
    this.compareLength=0;
    this.upperCaseFlag=false;
  }
  holdPartialMatch(inputString){//入力文字列の変換対象が一意に決まっている場合のみ変換対象の文字を返すメソッド
    var searchString=inputString.toLowerCase();
    for(var index=0;index<this.rome.length;index++){
      var match=searchString===this.rome[index];
      var partialMatch=searchString===this.rome[index].substr(0,searchString.length);
      if(match) return this.destination[index];
      if(partialMatch) return inputString;
    }
    return false;
  }
  /*補足:shch⇔щ,sh⇔ш,s⇔сという変換規則がある場合、sやshが入力された時点ではまだユーザーが変換したい文字が一意に決まらない。
  holdPartialMatchはそのような意図しない変換を防ぎつつ、入力文字列に対応する要素を変換元配列から探索するメソッドである。
  なお、shやsのような文字列を変換したい場合、ユーザーがスペースキーを入力するとそこで変換確定するような仕様にしてある。*/
  autoConvert(inputText){
    this.resetVal();
    while(this.currentPosition < inputText.length){
      varsearchChar=inputText.substr(this.currentPosition+this.compareLength,1);
      var nextChar=inputText.substr(this.currentPosition+this.compareLength+1,1);
      this.compareLength=searchChar;
      this.upperCaseFlag=this.hasUpperCase(searchString);
      var addString="";
      var resultPartialMatch=holdPartialMatch(this.rome,this.destination,searchString);
      var resultPartialMatchNext=holdPartialMatch(this.rome,this.destination,searchString+nextChar);
      this.upperCaseFlag ? resultPartialMatch=this.lowerToUpper(resultPartialMatch);
      this.upperCaseFlag ? resultPartialMatchNext=this.lowerToUpper(resultPartialMatchNext);
      if(searchChar==="") return this.convertedText+resultPartialMatch; 
      if(isDestination(searchChar)) this.convertedText=this.convertedText+searchChar;
      if(resultPartialMatch===false&&this.isRome(nextChar)){
        this.convertedText=this.convertedText+searchString+nextChar;
        this.currentPosition+=(this.compareLength+1);
        resetVal();
        continue;
      }
      if(resultPartialMatch===false&&!this.isRome(nextChar)){
        this.convertedText=this.convertedText+searchString.slice(0,1);
        this.currentPosition++;
        resetVal();
        continue;
      }
      if(resultPartialMatch===searchString)continue;
      this.convertedText=this.convertedText+resultPartialMatch;
      this.currentPosition+=this.compareLength;
      this.resetVal();
    }
  }
  manualConvert(){
  }
}

//以下テスト記述。完成後にコメントアウトすること。
testRomeArr=["and","at","a","q"];
testDestinationArr=["&","@","1","?"];
converter = new Converter("abc",testRomeArr,testDestinationArr);
console.log(converter.isRome([1,true,false]));
console.log(converter.isRome("abc"));
console.log(converter.isRome("あいう"));
console.log(converter.isRome(""));
console.log(converter.isDestination(3));
console.log(converter.simpleSearch("at"));
console.log(converter.simpleSearch("q"));
console.log(converter.simpleSearch("a"));
console.log(converter.holdPartialMatch("a"));
console.log(converter.holdPartialMatch("at"));
