$(function(){
  $("#input").on('input',function(){
    const shareUrlTw="https://twitter.com/share?ref_src=twsrc%5Etfw";
    var postText=$("#input").val();
    var postQuery="&text="+encodeURI(postText)+"%0a";
    var urlQuery="&url=https://nhpractice.charcon.tk";
    if(postText.length>255){
      $(".btn-tw").css("opacity","0.4");
      $(".btn-tw").html("<i class=\"fa fa-twitter\"></i> Twitterへ投稿:文字数オーバー");
      $("#twitter").attr("href","#");
    }else{
      $(".btn-tw").css("opacity","");
      $(".btn-tw").html("<i class=\"fa fa-twitter\"></i> Twitterへ投稿");
      $("#twitter").attr("href",shareUrlTw+urlQuery+postQuery);
    }
  });
})
