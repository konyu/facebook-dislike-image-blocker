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
      var ng_keys = [];
      var obj = {};
      if(response.data != undefined) {
        obj = JSON.parse(response.data);
        ng_keys = obj['ng_keys'];
      }

      setInterval(function(){
        detectImage(ng_keys);
      },1000);
    });
  }

  getInvisibleOption();
  loadCss();

  $(document).on('click', 'div.image-content' ,function(){
    var id = $(this).prop('id');
    var $img = $(this).closest('div.userContentWrapper').find('div.uiScaledImageContainer img.img#' + id)
    if ($img.is(':visible')) {
      $img.hide();
    } else {
      $img.show();
    }
  });

  function detectImage(ng_keys){
    var $userContentWrappers =  $('#stream_pagelet div.userContentWrapper');

    if($userContentWrappers.length < 1){
       $userContentWrappers =  $('#recent_capsule_container div.userContentWrapper');
    }
    $userContentWrappers.each(function(i, elm) {
      var $imgContainer = $(this).find('div.uiScaledImageContainer');

      //処理済みの項目はcheck済みのマークを付けておく
      if($(this).prop('image-content-checked') != undefined){
        return;
      }
      $(this).prop('image-content-checked', 'checked');

      if($(this).find('div.image-content')[0] != undefined){
        return
      }

      if($imgContainer.hasClass('profilePic')){
        return;
      }

      var $imgs = $($imgContainer).find('img.img');

      //画像のタグを表示
      $imgs.each(function(j) {
        var $this = $(this);
        if($this.prop('alt') != null && $this.prop('alt') != undefined && $this.prop('alt') != ''){
          $this.prop('id', j + 1);
          var description = $this.prop('alt');

          $(elm).find('.userContent').append('<div class="image-content" id=' + (j + 1) +'>' + (j + 1) + ": " + description +'</div>');

          $.each(ng_keys, function(){
            if ( description.indexOf(this) != -1) {
              $this.hide();
            }
          });
        }
      });
    });
  }
});
