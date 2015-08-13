'use strict';

var React = require('react-native');
var {
  AppRegistry,
  View,
  Text
} = React;

var Main = React.createClass({
  render: function() {
    return (
      <View>
        <Text>{'Hello World'}</Text>
      </View>
    );
  }
});

AppRegistry.registerComponent('RealPrototyping', () => Main);
