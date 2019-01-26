//debugのためのコンソールが非常に重いので完成後に削除(コメントアウト)すること
const isRome = function(str){
  var toString = Object.prototype.toString;
  if(toString.call(str)!=="[object String]"){
    return false;
  }
  if(str.match(new RegExp('^[A-Za-z]*$'))&&str!==""){
    return true;
  }else{
    return false;
  }
}
const isCyrillic = function(character){
  var toString = Object.prototype.toString;
  if(toString.call(character)!=="[object String]"||character.length!=1){
    return false;
  }
  var code=character.charCodeAt(0);
  //1025Ёと1105ёのペアは例外的に処理する
  if ((code>=1040 && code<=1103)||code==1025||code==1105){
    return true;
  }else{
    return false;
  }
}
const hasUpperCase = function(str){
  UpperCaseMatch = new RegExp("[A-Z]");
  return UpperCaseMatch.test(str);
}
const cyrLowerToUpper = function(lowerChar){
  var lowerCode = lowerChar.charCodeAt(0);
  var UpperCode = 0;
  var UpperChar = "";
  if (!isCyrillic(lowerChar)){
    UpperChar = lowerChar;//キリル文字じゃなければそのまま出力
  }else if(lowerCode===1105){
  //1025Ёと1105ёのペアは例外的に処理する
    UpperChar = "Ё"
  }else{
    var UpperCode = lowerCode-32;
    var UpperChar = String.fromCharCode(UpperCode);
  }
  return UpperChar;
}
const simpleSearch = function(rome,convertTo,inputText){
  var searchText=inputText.toLowerCase();
  //forEachでreturnできないのでforを使用
  for (var index=0;index<rome.length;index++){
    if(searchText==rome[index]){
      return convertTo[index];
    }
  }
  //ヒットしなければそのまま返す
  return inputText;
}
const holdPartialMatch = function(rome,convertTo,inputText){
  var compareLength=inputText.length;
  var searchText=inputText.toLowerCase();
  for (var index=0;index<rome.length;index++){
    if(searchText===rome[index].substr(0,compareLength)&&compareLength!==rome[index].length){
      return inputText;
    }else if(searchText===rome[index]){
      return convertTo[index];
    }else{
      continue;
    }
  }
  return false;
}
const difference = function(value1="",value2=""){
  var output = [];
  for ( i=0; i< value2.length; i++){
    if(value1[i] !== value2[i]){
      output.push(value2[i]);
    }
  }
  return output.join("").substr(0,1); 
}
const convert = function(rome,converTo,inputText){
  var currentPosition=0;
  var convertedText="";
  var upperCaseFlag=false;
  var searchChars="";
  var searchChar;
  var testLoopNum=0;
  var compareLength=0;
  var nextChar="";
  while(currentPosition <= inputText.length){
    console.log("testLoopNum="+testLoopNum.toString());//Debug
    testLoopNum++;//Debug
   /* 
    if(testLoopNum>=20){
      return("error.now convertedText="+convertedText);
    }
    */
    
    searchChar=inputText.substr(currentPosition+compareLength,1);
    nextChar=inputText.substr(currentPosition+compareLength+1,1);
    searchChars=searchChars+searchChar;
    compareLength=searchChars.length;
    upperCaseFlag=hasUpperCase(searchChars);
    console.log("searchChars="+"\""+searchChars+"\"");//debug
    console.log("nextChar="+"\""+nextChar+"\"");//
    console.log("compareLength:"+compareLength);//debug
    var resultPartialMatchNext=holdPartialMatch(rome,cyrillic,searchChars+nextChar);
    var resultPartialMatchNextOne=holdPartialMatch(rome,cyrillic,nextChar);
    var resultPartialMatch=holdPartialMatch(rome,cyrillic,searchChars);
    var resultSimpleSearch=simpleSearch(rome,cyrillic,searchChars);
    var resultSimpleSearchNext=simpleSearch(rome,cyrillic,searchChars+nextChar);
    var upperCaseFlag=hasUpperCase(searchChars);
    var upperCaseFlagNext=hasUpperCase(nextChar);
    console.log("upperCaseFlag="+upperCaseFlag);
    if(isCyrillic(searchChar)&&compareLength===1){
      convertedText=convertedText+searchChar;
      currentPosition++;
      searchChars="";
      compareLength=0;
      continue;
    }
    if(isCyrillic(resultPartialMatch)){
      console.log("mode1");//debug
      if(upperCaseFlag){
        resultPartialMatch=cyrLowerToUpper(resultPartialMatch);
        upperCaseFlag=false;
      }
      convertedText=convertedText+resultPartialMatch;
      currentPosition+=compareLength;
      compareLength=0;
      searchChars="";
      console.log("--------");//debug
    }else if(resultPartialMatch===searchChars){
      console.log("mode2");//debug
      console.log("--------");//debug
      if(searchChar===""){
        convertedText=convertedText+searchChars;
        break;
      }
      continue;
    }else if(resultPartialMatch===false){
      if(!isRome(nextChar)){
        console.log("mode3-1");//debug
        convertedText=convertedText+searchChars+nextChar;
        currentPosition+=compareLength;
        currentPosition++;
        console.log("now,currentPosition="+currentPosition.toString());
        compareLength=0;
        searchChars="";
        console.log("--------");//debug
      }else{
        console.log("mode3-2");//debug
        convertedText=convertedText+searchChars.slice(0,1);
        currentPosition++;
        compareLength=0;
        searchChars="";
        console.log("--------");//debug
      }
    }
  }
  return convertedText;
}
const forcedConvert=function(rome,cyrillic,inputText){
  var currentPosition=0;
  var convertedText="";
  var UpperCaseFlag=false;
  var searchChars="";
  var searchChar;
  var testLoopNum=0;
  var compareLength=0;
  var nextChar="";
  while(currentPosition < inputText.length){
    console.log("testLoopNum="+testLoopNum.toString());//Debug
    testLoopNum++;//Debug
    /*
    if(testLoopNum>=20){
      return("error.now convertedText="+convertedText);
    }
    */
    searchChar=inputText.substr(currentPosition+compareLength,1);
    nextChar=inputText.substr(currentPosition+compareLength+1,1);
    searchChars=searchChars+searchChar;
    compareLength=searchChars.length;
    upperCaseFlag=hasUpperCase(searchChars);
    console.log("searchChars="+"\""+searchChars+"\"");//debug
    console.log("nextChar="+"\""+nextChar+"\"");//
    console.log("compareLength:"+compareLength);//debug
    var resultPartialMatchNext=holdPartialMatch(rome,cyrillic,searchChars+nextChar);
    var resultPartialMatch=holdPartialMatch(rome,cyrillic,searchChars);
    var resultSimpleSearch=simpleSearch(rome,cyrillic,searchChars);
    upperCaseFlag=hasUpperCase(searchChars);
    console.log("upperCaseFlag="+upperCaseFlag);
    if(nextChar==="" || resultPartialMatchNext===false){
      if(upperCaseFlag){
        resultSimpleSearch=cyrLowerToUpper(resultSimpleSearch);
        upperCaseFlag=false;
      }
      convertedText=convertedText+resultSimpleSearch;
      currentPosition+=compareLength;
      searchChars="";
      compareLength=0;
    }else if(isCyrillic(resultPartialMatchNext)){
      convertedText=convertedText+resultPartialMatchNext;
      currentPosition+=compareLength;
      currentPosition++;
      searchChars="";
      compareLength=0;
    }else{
      continue;
    }
  }
  return convertedText;
}
