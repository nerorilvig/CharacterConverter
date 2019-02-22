var clipboard = new Clipboard('#copyText');
clipboard.on('success',function(e){
  alert("コピーしました");
});
clipboard.on('error',function(e){
  alert("コピーできませんでした");
});
