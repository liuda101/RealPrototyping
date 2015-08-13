;(function() {

  var util = {};


  util.generateCSS = function(items) {
    var result = [];

    items.map(function(item) {
      if (item.key == 'opacity') {
        result.push(item.key + ':' + item.defaultValue() / 100 + item.unit);
      } else {
        result.push(item.key + ':' + item.defaultValue() + item.unit);
      }
    });


    return result.join(';');
  };


  window.util = util;

})();