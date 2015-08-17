;(function() {

  var util = {};


  util.generateCSS = function(items) {
    var result = [];

    items.map(function(item) {
      if (item.key == 'opacity') {
        result.push(item.key + ':' + item.defaultValue() / 100);
      } else if (item.key == 'background-image') {
        result.push(item.key + ': url(' + item.defaultValue() + ')');
      } else if (item.key == 'background-image-type') {

        switch (item.defaultValue()) {
          case 'normal':
          result.push('background-size' + ': auto');
          break;
          case 'stretch':
          result.push('background-size' + ': 100% 100%');
          break;
        }

      } else if (item.key == 'textValue') {
        
      } else if (item.key == 'margin' || item.key == 'padding') {
        result.push(item.key + ':' + item.defaultValue().join(item.unit + ' ') + item.unit);
      } else if (item.key == 'flex') {
        if (item.defaultValue() === 1) {
          result.push('flex: 1');
        }
      } else {
        result.push(item.key + ':' + item.defaultValue() + item.unit);
      }
    });


    return result.join(';');
  };


  window.util = util;

})();