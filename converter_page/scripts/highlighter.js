//変換済の文字をハイライトさせるスクリプト
//highlightTextareaプラグインでは文字単位の判定ができないので自作
(function($){
  var methods = {
    init : function(){
      return this;
    },
    highlightArray : function(converted,symbols,convertedInUpper=[]){
      return converted.concat(convertedInUpper).concat(symbols);
    },
    highlightChar : function(highlightArr,$behindInput=$('#behindInput')){
      var highlightHtml="<span>";
      var addString="";
      var bTagFlag=false;
      var hit=false;
      for(var i=0;i<this.val().length;i++){
        var character=this.val()[i];
        if(character===" ")character="&nbsp;";
        if(character==="\n")character="<br />";
        for(var j=0;j<highlightArr.length;j++){
          if(character===highlightArr[j] && bTagFlag===false){
            addString="<b>"+character;
            bTagFlag=true;
            hit=true;
            break;
          }else if(this.val()[i]===highlightArr[j] && bTagFlag===true){
            addString=character;
            hit=true;
            break;
          }
          hit=false;
        }
        if(!hit && bTagFlag===true){
          addString="</b>"+character;
          bTagFlag=false;
        }else if(!hit && bTagFlag===false){
          addString=character;
        }
        highlightHtml=highlightHtml+addString;
      }
      if(bTagFlag===true)highlightHtml=highlightHtml+"</b>";
      if(highlightHtml.slice(-6)==="<br />")highlightHtml=highlightHtml+"<br />";
      highlightHtml=highlightHtml+"</span>";
      $behindInput.html(highlightHtml);
      console.log(highlightHtml);
      return this;
    },
  };
  //プラグイン名 highlighter
  $.fn.highlighter = function(method) {
    if( methods[method] ){
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1));
    }else if ( typeof method === 'object' || method ) {
      return methods.init.apply( this, arguments );
    }else{
      $.error(' Method ' + method + ' does not exist on jQuery.' + plugname );
      return this;
      }
  };
})(jQuery);
