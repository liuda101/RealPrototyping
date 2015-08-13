// var ViewComponent = {
//   viewModel: {
//     title: m.prop('View'),
//     inspectProperties: m.prop({
//       width: 100,
//       height: 100,
//       backgroundColor: '#cdcdcd',
//       borderRadius: 3,
//       border: '1px solid #ccc'
//     })
//   },

//   view: function() {
//     return m('.component', [
//       m('.component-icon'),
//       m('.component-title')
//     ]);
//   }
// };



// var ComponentManager = {
//   viewModel: {

//   },

//   controller: function() {

//   },

//   view: function() {
//     return [
//       m('.component-search', [
//       ]),
//       m('.component-container', [
//         m.component(ViewComponent)
//       ])
//     ];
//   }
// };



// m.mount(document.getElementById('componentManager'), ComponentManager);

var inspector = m.mount(document.getElementById('inspector'), InspectorComponent);
var currentSelectedComponent = null;
currentSelectedComponent = m.mount(document.getElementById('simulator'), ViewComponent);
inspector.inspect(currentSelectedComponent);