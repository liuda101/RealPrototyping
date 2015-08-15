var ImageComponent = {
  defaultAttributes: {
    height: 100,
    width: 100
  },

  controller: function(attributes) {
    attributes = attributes || {};
    return {
      title: 'Image',

      isSelected: m.prop(true),
      
      inspectAttributes: [
        {
          key: ' width',
          name: '宽度',
          type: 'number',
          unit: 'px',
          defaultValue: m.prop(attributes. width || 375)
        },

        {
          key: 'height',
          name: '高度',
          type: 'number',
          unit: 'px',
          defaultValue: m.prop(attributes.height || 667)
        },

        {
          key: 'background-color',
          name: '背景色',
          type: 'color',
          unit: '',
          defaultValue: m.prop('#cdcdcd')
        },

        {
          key: 'opacity',
          name: '透明度',
          type: 'number',
          unit: '',
          defaultValue: m.prop(100)
        },

        {
          key: 'border-radius',
          name: '圆角',
          type: 'number',
          unit: 'px',
          defaultValue: m.prop(0)
        },

        {
          key: 'background-image',
          name: '图片',
          type: 'url',
          unit: '',
          defaultValue: m.prop('')
        },

        {
          key: 'background-image-type',
          name: '伸展方式',
          type: 'single-select',
          unit: '',
          defaultValue: m.prop('normal'),
          values: ['normal', 'stretch']
        }
      ],

      update: function(attributeMap, index) {
        var thisAttribute = this.inspectAttributes[index];
        thisAttribute.defaultValue(attributeMap.defaultValue());
      },


      onDragOver: function(e) {
        e.preventDefault();
      },
      onDragDrop: function(e) {
        e.stopPropagation();
      },
      onClicked: function(e) {
        e.stopPropagation();

        if (currentSelectedComponent) {
          currentSelectedComponent.isSelected(false);
        }

        currentSelectedComponent = this;

        this.isSelected(true);

        inspector.inspect(this);
      }
    };
  },

  view: function(ctrl) {
    return m('.component-image', {
      className: ctrl.isSelected() ? 'selected' : '',
      ondragover: ctrl.onDragOver.bind(ctrl),
      ondrop: ctrl.onDragDrop.bind(ctrl),
      onclick: ctrl.onClicked.bind(ctrl),
      style: util.generateCSS(ctrl.inspectAttributes)
    }, ctrl.isSelected() ? m.component(resizer) : null);
  }
};



