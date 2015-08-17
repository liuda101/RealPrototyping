var InspectorComponent = {

  controller: function() {
    return {
      title: m.prop(''),

      inspectAttributes: m.prop([]),

      inspectingComponent: null,

      inspect: function(component) {
        this.title(component.title);

        this.inspectingComponent = component;

        this.inspectAttributes(component.inspectAttributes);
      },

      onChange: function(inputAttribute, index, e) {
        inputAttribute.defaultValue(e.currentTarget.value);
        this.inspectingComponent.update(inputAttribute, index);
      },

      fourNumberOnChange: function(inputAttribute, index, valueIndex, e) {
        console.log(e);
        inputAttribute.defaultValue()[valueIndex] = e.currentTarget.value;
        this.inspectingComponent.update(inputAttribute, index);
      }
    };
  },



  view: function(ctrl) {
    return m('.inspector-main', [
      m('.inspector-title', ctrl.title()),
      m('.inspector-items', ctrl.inspectAttributes().map(function(theAttribute, index) {
          return m('.inspector-item', [
            m('.inspector-label', theAttribute.name),
            m('.inspector-content', InspectorComponent.inputGenerator(ctrl, theAttribute, index))
          ])
        })
      )
    ]);
  },

  inputGenerator: function(ctrl, inputAttribute, index) {
    switch(inputAttribute.type) {
      case 'number':
      return m('input', {type: 'number', value: inputAttribute.defaultValue(), onchange: ctrl.onChange.bind(ctrl, inputAttribute, index)})
      break;

      case 'text':
      return m('input', {type: 'text', value: inputAttribute.defaultValue(), onchange: ctrl.onChange.bind(ctrl, inputAttribute, index)})
      break;

      case 'color':
      return m('input', {type: 'color', value: inputAttribute.defaultValue(), onchange: ctrl.onChange.bind(ctrl, inputAttribute, index)})
      break;

      case 'single-select':
      return m('select', {onchange: ctrl.onChange.bind(ctrl, inputAttribute, index)}, inputAttribute.values.map(function(item) {
        return m('option', {value: item}, item)
      }));
      break;

      case 'url':
      return m('.inspector-input-url', [
        m('input', {type: 'text', placeholder: '请输入图片地址', value: inputAttribute.defaultValue(), onchange: ctrl.onChange.bind(ctrl, inputAttribute, index)})
      ]);
      break;

      case 'check':
      return m('input', {type: 'checkbox', onchange: ctrl.onChange.bind(ctrl, inputAttribute, index)});
      break;

      case 'four-number':
      return m('.inspector-four-input', {className: inputAttribute.key}, [
        inputAttribute.defaultValue().map(function(item, valueIndex) {
          return m('input', {type: 'text', value: inputAttribute.defaultValue()[valueIndex], onchange: ctrl.fourNumberOnChange.bind(ctrl, inputAttribute, index, valueIndex)});
        })
      ]);
      break;
    }
  }
};