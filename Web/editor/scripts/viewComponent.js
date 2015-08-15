var ViewComponent = {
  defaultAttributes: {
    height: 100,
    isSelectable: true,
    isSelected: true,
    'background-color': '#ffffff'
  },

  controller: function(attributes) {
    attributes = attributes || {};
    if (attributes.isSelectable === undefined) {
      attributes.isSelectable = false;
    }
    if (attributes.isSelected === undefined) {
      attributes.isSelected = false;
    }
    return {
      title: 'View',

      isSelected: m.prop(attributes.isSelected),
      isSelectable: m.prop(attributes.isSelectable),
      isDragOver: m.prop(false),

      subComponents: m.prop([]),
      
      inspectAttributes: [

        {
          key: 'height',
          name: '高度',
          type: 'number',
          unit: 'px',
          defaultValue: m.prop(attributes.height || 667)
        },

        {
          key: 'margin',
          name: '外边距',
          type: 'four-number',
          unit: 'px',
          defaultValue: m.prop([0, 0, 0, 0]),
        },

        {
          key: 'padding',
          name: '内边距',
          type: 'four-number',
          unit: 'px',
          defaultValue: m.prop([0, 0, 0, 0]),
        },

        {
          key: 'background-color',
          name: '背景色',
          type: 'color',
          unit: '',
          defaultValue: m.prop(attributes['background-color'] || 'transparent')
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
        e.stopPropagation();

        this.isDragOver(true);
      },
      onDragLeave: function(e) {
        e.stopPropagation();

        this.isDragOver(false);
      },
      onDragDrop: function(e) {
        e.stopPropagation();
        if (currentSelectedComponent) {
          currentSelectedComponent.isSelected(false);
        }

        this.isDragOver(false);

        var ComponentOnDrop = window[componentManager.currentDrag()];

        var newComponent = m.component(ComponentOnDrop, ComponentOnDrop.defaultAttributes);
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

        if (!this.isSelectable()) {
          return;
        }

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
      className: ctrl.isDragOver() ? 'dragover' : (ctrl.isSelected() ? 'selected' : ''),
      ondragover: ctrl.onDragOver.bind(ctrl),
      ondragleave: ctrl.onDragLeave.bind(ctrl),
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



