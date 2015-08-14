var ComponentManager = {

  controller: function() {
    return {
      currentDrag: m.prop(false),

      components: [
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
            }
          ]
        }
      ],

      onDragStart: function(value) {
        this.currentDrag(value);
      }
    }
  },

  view: function(ctrl) {
    return ctrl.components.map(function(component) {
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