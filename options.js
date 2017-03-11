
// localStorageのキー
var key = "facebook-image-detector";  
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
    debugger;
    if(obj['invisible']){
      $('#value').prop('checked', 'checked');
    }
};
$(function(){
    // オプションデータの更新
    $('#put').click(function() {
        var key = $('#key').val();

        var value = false;
        if($("#value").prop('checked')) {
          value = true
        }

        var obj = getObject();
        if (!obj) {
            obj = new Object();
        }
        obj[key] = value;
        setObject(obj);
        showStorage();
    });
    // オプションデータの表示
    showStorage();
});