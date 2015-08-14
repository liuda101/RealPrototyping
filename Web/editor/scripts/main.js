var componentManager = m.mount(document.getElementById('componentManager'), ComponentManager);

var inspector = m.mount(document.getElementById('inspector'), InspectorComponent);

var currentSelectedComponent = null;
m.mount(document.getElementById('simulator'), ViewComponent);