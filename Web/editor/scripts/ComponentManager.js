var ComponentManager = {

  controller: function() {
    return {
      currentDrag: m.prop(false),

      components: [
        {
          groupTitle: 'Layout',
          items: [
            {
              key: 'ColumnLayout',
              icon: 'component_icon_column',
              title: 'Column'
            },

            {
              key: 'ColumnLayout',
              icon: 'component_icon_row',
              title: 'Row'
            }
          ]
        },
        {
          groupTitle: 'View',
          items: [
            {
              key: 'ViewComponent',
              icon: 'component_icon_view',
              title: 'View'
            },
            {
              key: 'ImageComponent',
              icon: 'component_icon_image',
              title: 'Image'
            },
            {
              key: 'LabelComponent',
              icon: 'component_icon_label',
              title: 'Label'
            },
            {
              key: 'ButtonComponent',
              icon: 'component_icon_button',
              title: 'Button'
            },
            {
              key: 'ToggleComponent',
              icon: 'inspector_icon_toggle',
              title: 'Toggle'
            },
            {
              key: 'SegmentComponent',
              icon: 'component_icon_segment',
              title: 'Segment'
            }
          ]
        },
        {
          groupTitle: 'Components',
          items: [
          ]
        }
      ],

      onDragStart: function(value) {
        this.currentDrag(value);
      }
    }
  },

  view: function(ctrl) {
    return ctrl.components.map(function(component, groupIndex) {
      return m('.component-manager-group', [
        m('.component-manager-group-title', component.groupTitle),
        m('.component-manager-group-content', component.items.map(function(item) {
          return m('.drag-component', {
              draggable: true,
              ondragstart: ctrl.onDragStart.bind(ctrl, item.key)
            },[
              m('.drag-component-icon', [
                m('img', {src: 'images/' + item.icon + '.png', draggable: false})
              ]),
              m('.drag-component-title', item.title)
            ]);
        }))
      ]);
    });
  }

};