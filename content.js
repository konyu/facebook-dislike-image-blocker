$(document).ready(function(){
  function loadCss(){
    //css 読み込み //http://stackoverflow.com/questions/11553600/how-to-inject-css-using-content-script-file-in-chrome-extension
    var style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = chrome.extension.getURL('content.css');
    (document.head||document.documentElement).appendChild(style);
  }

  var getInvisibleOption = function() {
    // オプションで設定したlocalstrageを反映する
     var key = "facebook-image-context-viewer";  
    chrome.runtime.sendMessage({method: "getLocalStorage", key: key}, function(response) {
      console.log(response.data);
      var obj = JSON.parse(response.data);
      var isVisible = obj['invisible'];

      setInterval(function(){
        detectImage(isVisible);
      },1000);
    });
  }

  getInvisibleOption();
  loadCss();
  
  $(document).on('click', 'div.image-content' ,function(){
    var $imgs = $(this).closest('div.userContentWrapper').find('div.uiScaledImageContainer img.img');
    if ($imgs.is(':visible')) {
      $imgs.hide();
    } else {
      $imgs.show();
    }
  });

  function detectImage(isVisible){
    $('#stream_pagelet div.userContentWrapper').each(function(i, elm) {
      var $imgContainer = $(this).find('div.uiScaledImageContainer');
      
      if($imgContainer.hasClass('profilePic')){
        return
      } 

      if($(this).find('div.image-content')[0] != undefined){
        return
      }
      
      var $imgs = $($imgContainer).find('img.img');

      //画像のタグを表示
      $imgs.each(function(j) {
        if($(this).prop('alt') != null && $(this).prop('alt') != undefined && $(this).prop('alt') != ''){
          $(elm).find('.userContent').append('<div class="image-content">' + (j + 1) + ": " + $(this).prop('alt') +'</div>');
          if(isVisible){
            $(this).hide();
          }
        }
      });
    });
  }
});
