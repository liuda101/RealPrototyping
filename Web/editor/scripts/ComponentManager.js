var Components = {};

Components.View = function() {
  this.height = 100;
  this.backgroundColor = '#fefefe';

  this.container = null;
};

Components.View.prototype.render = function() {
  var self = this;


  var div = document.createElement('div');
  div.style.height = this.height + 'px';
  div.style.backgroundColor = this.backgroundColor;

  div.addEventListener('click', function() {
    div.style.backgroundColor = 'rgba(249, 200, 200, 0.5)';

    inspector.inspect(self);

  }, false);


  this.container = div;

  return div;
};


Components.View.prototype.update = function(obj) {
  for(var key in obj) {
    this[key] = obj[key];
  }


  this.container.style.backgroundColor = this.backgroundColor;
};

Components.View.prototype.getDataToInspect = function() {
  return [
    {title: '背景色', defaultValue: 'rgba(249, 200, 200, 0.5)', type: 'color', key: 'backgroundColor'}
  ];
};


var ComponentManager = function() {
  this.dragData = null;

  this.init();
};

ComponentManager.prototype.currentDragData = function() {
  return this.dragData;
};

ComponentManager.prototype.init = function() {
  var self = this;

  var allComponent = document.querySelectorAll('.component');
  for(var i = 0; i < allComponent.length; i ++) {
    allComponent[i].addEventListener('dragstart', function(e) {
      self.dragData = {
        component: e.target.getAttribute('data-component')
      };
    }, false);
  }
};