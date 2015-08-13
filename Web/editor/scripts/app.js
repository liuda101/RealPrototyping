;(function() {


var componentManager = new ComponentManager();

window.componentManager = componentManager;



var inspector = new Inspector();
window.inspector = inspector;


var mainScreen = new Screen();

document.getElementById('simulator').appendChild(mainScreen.render());

})();