$(function(){
  var clipboard = new Clipboard('#copyText');
  clipboard.on('success',function(e){
    $("#notice").text("コピーしました");
    $("#notice").css("color","blue");
    $("#notice").css("font-weight","bold");
  });
  clipboard.on('error',function(e){
    $("#notice").text("コピーできませんでした");
    $("#notice").css("color","red");
    $("#notice").css("font-weight","bold");
  });
  $('#input').focusin(function(e){
    $('#notice').text("...");
    $("#notice").css("color","");
    $("#notice").css("font-weight","");
  });
});
