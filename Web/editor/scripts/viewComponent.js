var ViewComponent = {
  defaultAttributes: {
    height: 100,
    width: 100
  },

  controller: function(attributes) {
    attributes = attributes || {};
    return {
      title: 'View',

      isSelected: m.prop(true),
      subComponents: m.prop([]),
      
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
          defaultValue: m.prop('#ffffff')
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
          key: '-webkit-box-orient',
          name: '排列方式',
          type: 'single-select',
          unit: '',
          defaultValue: m.prop('vertical'),
          values: ['vertical', 'horizontal']
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
        if (currentSelectedComponent) {
          currentSelectedComponent.isSelected(false);
        }

        var newComponent = m.component(ViewComponent, ViewComponent.defaultAttributes);
        var newComponentCtrl = new newComponent.controller();

        this.subComponents().push({
          controller: newComponentCtrl,
          view: newComponent.view
        });
        inspector.inspect(newComponentCtrl);

        currentSelectedComponent = newComponentCtrl;
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
    return m('.component-view', {
      className: ctrl.isSelected() ? 'selected' : '',
      ondragover: ctrl.onDragOver.bind(ctrl),
      ondrop: ctrl.onDragDrop.bind(ctrl),
      onclick: ctrl.onClicked.bind(ctrl),
      style: util.generateCSS(ctrl.inspectAttributes)

    }, [

      ctrl.subComponents().map(function(component) {
        return component.view(component.controller);
      })

    ]);
  }
};



