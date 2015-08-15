var LabelComponent = {
  defaultAttributes: {
  },

  controller: function(attributes) {
    return {
      title: 'Label',

      isSelected: m.prop(true),
      
      inspectAttributes: [
        {
          key: 'textValue',
          name: '文字',
          type: 'text',
          defaultValue: m.prop('Label')
        },

        {
          key: 'font-size',
          name: '大小',
          type: 'number',
          unit: 'px',
          defaultValue: m.prop(14)
        },

        {
          key: 'color',
          name: '颜色',
          type: 'color',
          unit: '',
          defaultValue: m.prop('#000000')
        },

        {
          key: 'text-align',
          name: '对齐方式',
          type: 'single-select',
          unit: '',
          defaultValue: m.prop('left'),
          values: ['left', 'center', 'right']
        },

        {
          key: 'line-height',
          name: '行高',
          type: 'number',
          unit: 'px',
          defaultValue: m.prop(30)
        },

        {
          key: 'opacity',
          name: '透明度',
          type: 'number',
          unit: '',
          defaultValue: m.prop(100)
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
      },
      onChange: function(e) {
        this.inspectAttributes[0].defaultValue(e.currentTarget.textContent);
      }
    };
  },

  view: function(ctrl) {
    return m('.component-label', {
      contenteditable: true,
      className: ctrl.isSelected() ? 'selected' : '',
      ondragover: ctrl.onDragOver.bind(ctrl),
      ondrop: ctrl.onDragDrop.bind(ctrl),
      onclick: ctrl.onClicked.bind(ctrl),
      style: util.generateCSS(ctrl.inspectAttributes),
      onkeyup: ctrl.onChange.bind(ctrl),
      onpaste: ctrl.onChange.bind(ctrl),
    }, ctrl.inspectAttributes[0].defaultValue());
  }
};



