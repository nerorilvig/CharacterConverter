$(function(){
  $('#input').keyup(function(){
    var inputText = $(this).val();
    var convertedText=""
    for (var i=0; i< inputText.length; i++){
      convertedText+="a";
    
    //以下負荷テスト
      for(var j=0; j< 100000 ; j++){
        var x=j*100;
        var y=j*1000;
        var z=j*10000;
        var w=x+y+z+j;
      }
      //console.log(w);
    }
    $('#input').val(convertedText);
    //$('#output').val(inputText);
  });  
});
