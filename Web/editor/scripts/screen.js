var Screen = function() {

  this.container = null;

  this.height = 667;
  this.width = 375;

  this.subItems = [];
};

Screen.prototype.addSubItem = function(component) {
  this.subItems.push(component);
  this.container.appendChild(component.render());
};

Screen.prototype.render = function() {

  var self = this;


  var div = document.createElement('div');
  div.style.height = self.height + 'px';
  div.style.width = self.width + 'px';
  div.style.backgroundColor = '#ccc';

  self.container = div;

  div.addEventListener('dragenter', function(e) {
    e.stopPropagation();

    div.style.backgroundColor = 'rgba(249, 200, 200, 0.5)';
  }, false);

  div.addEventListener('dragover', function(e) {
    e.preventDefault();
  }, false);

  div.addEventListener('drop', function(e) {
    e.stopPropagation();

    div.style.backgroundColor = '#ccc';

    self.addSubItem(new Components.View());

  }, false);

  return div;
};