function generator(screen) {
  var result = ["var React = require('react-native');"];

  result.push('var MainApp = React.create({render: function() {');

    result.push('<View></View>');

  result.push('}});')


  console.log(result.join('\n'));

}