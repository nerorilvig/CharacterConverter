class Cyr extends Converter{
  //変換に記号を使うのでisRomeもオーバーライドする
  isRome(str=""){
    var romeMatch = new RegExp("^[A-Za-z\\'\\^]*$");
    return romeMatch;
  }
  isConverted(character){
    if(Object.prototype.toString.call(character)!=="[object String]"&&character.length!==1)return false; var code=character.charCodeAt(0);
    return (code>=1040 && code<=1103)||code===1025||code===1105;
  }
  lowerToUpper(lowerChar){
    if(Object.prototype.toString.call(lowerChar)!=="[object String]")return false;
    var lowerCode = lowerChar.charCodeAt(0);
    var upperCode = 0;
    if(!this.isConverted(lowerChar)) return lowerChar;
    if(lowerCode===1105) return "Ё";
    return String.fromCharCode(lowerCode-32);
  }
}
var rome=new Array(40);
var cyrillic=new Array(40);
rome[0]="shch"; cyrillic[0]="щ" ;
rome[1]="ye"  ; cyrillic[1]="е" ;
rome[2]="yo"  ; cyrillic[2]="ё" ;
rome[3]="i^"  ; cyrillic[3]="й" ;
rome[4]="kh"  ; cyrillic[4]="х" ;
rome[5]="ts"  ; cyrillic[5]="ц" ;
rome[6]="ch"  ; cyrillic[6]="ч" ;
rome[7]="sh"  ; cyrillic[7]="ш" ;
rome[8]="\'\'"; cyrillic[8]="ъ" ;
rome[9]="yu"  ; cyrillic[9]="ю" ;
rome[10]="ya" ; cyrillic[10]="я";
rome[11]="zh" ; cyrillic[11]="ж";
rome[12]="e'" ; cyrillic[12]="э";
rome[13]="a"  ; cyrillic[13]="а";
rome[14]="b"  ; cyrillic[14]="б";
rome[15]="v"  ; cyrillic[15]="в";
rome[16]="g"  ; cyrillic[16]="г";
rome[17]="d"  ; cyrillic[17]="д";
rome[18]="z"  ; cyrillic[18]="з";
rome[19]="i"  ; cyrillic[19]="и";
rome[20]="k"  ; cyrillic[20]="к";
rome[21]="l"  ; cyrillic[21]="л";
rome[22]="m"  ; cyrillic[22]="м";
rome[23]="n"  ; cyrillic[23]="н";
rome[24]="o"  ; cyrillic[24]="о";
rome[25]="p"  ; cyrillic[25]="п";
rome[26]="r"  ; cyrillic[26]="р";
rome[27]="s"  ; cyrillic[27]="с";
rome[28]="t"  ; cyrillic[28]="т";
rome[29]="u"  ; cyrillic[29]="у";
rome[30]="f"  ; cyrillic[30]="ф";
rome[31]="y"  ; cyrillic[31]="ы";
rome[32]="\'" ; cyrillic[32]="ь";
rome[33]=".." ; cyrillic[33]="..";
rome[34]=".." ; cyrillic[34]="..";
rome[35]=".." ; cyrillic[35]="..";
rome[36]=".." ; cyrillic[36]="..";
rome[37]=".." ; cyrillic[37]="..";
rome[38]=".." ; cyrillic[38]="..";
rome[39]=".." ; cyrillic[39]="..";
var charCon=new Cyr(rome,cyrillic);//textboxController.jsで呼び出すインスタンスを生成
//rome[40]=".." ; cyrillic[40]="..";
//以下Test
var cyrCon=new Cyr(rome,cyrillic);
