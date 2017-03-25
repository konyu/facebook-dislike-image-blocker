
// localStorageのキー
var key = "facebook-image-context-viewer";
// localStorageの文字列をJSONで取得
var getObject = function() {
    var str = localStorage.getItem(key);
    return JSON.parse(str);
};
// JSONを文字列でlocalStorageに保存
var setObject = function(obj) {
    var str = JSON.stringify(obj);
    localStorage.setItem(key, str);
};
// localStorageに保存したデータの表示
var showStorage = function() {
    var obj = getObject();
    $('#ng_keys').empty();

    if(obj['ng_keys'].length > 0){
      $.each(obj['ng_keys'], function(){
        $('#ng_keys').append('<div><input class="ng_key" type="text" value="' + this +'" /></div>');
      });
    }else{
      $('#ng_keys').append('<div><input class="ng_key" type="text" /></div>');
    }
};
$(function(){
    // オプションデータの更新
    $('#put').click(function() {
        var obj = getObject();
        if (!obj) {
            obj = new Object();
        }

        var ng_keys = [];

        $(".ng_key").each(function(){
          var $key = $(this).val();
          if($key != ''){
            ng_keys.push($key);
          }
        });
        debugger
        obj["ng_keys"] = ng_keys;
        setObject(obj);
        showStorage();
    });

    $('#add_key').click(function() {
      $('#ng_keys').append('<div><input class="ng_key" type="text" /></div>');
    });
    // オプションデータの表示
    showStorage();
});
