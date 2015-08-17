var resizer = {

  DIRECTION: {
    LEFT_TOP: 1,
    TOP: 2,
    RIGHT_TOP: 3,
    RIGHT: 4,
    BOTTOM_RIGHT: 5,
    BOTTOM: 6,
    BOTTOM_LEFT: 7,
    LEFT: 8
  },

  controller: function(opts) {
    return {
      startX: 0,
      startY: 0,

      draggingEle: '',

      tlDragging: m.prop(false),
      tDragging: m.prop(false),
      trDragging: m.prop(false),
      rDragging: m.prop(false),
      brDragging: m.prop(false),
      bDragging: m.prop(false),
      blDragging: m.prop(false),
      lDragging: m.prop(false),

      width: opts.width,
      height: opts.height,


      resizeComponent: opts.component,

      onMouseDown: function(cPoint, direction, e) {
        this.draggingEle = cPoint + 'Dragging';

        this[this.draggingEle](true);

        this.startX = e.clientX;
        this.startY = e.clientY;
      },

      onMouseUp: function(e) {

        if (this.draggingEle && this[this.draggingEle]()) {

          this[this.draggingEle](false);


          var deltaX = e.clientX - this.startX;
          var deltaY = e.clientY - this.startY;

          var nowWidth = this.width + deltaX;
          var nowHeight = this.height + deltaY;


          if (nowWidth < 10) {
            nowWidth = 10
          }

          if (nowHeight < 10) {
            nowHeight = 10;
          }

          this.width = nowWidth;
          this.height = nowHeight;

          this.mithrilElement.style.width = nowWidth + 'px';
          this.mithrilElement.style.height = nowHeight + 'px';

          this.resizeComponent.updateRect({
            width: nowWidth,
            height: nowHeight
          });
        }
      },

      onMouseMove: function(e) {
        if (this.draggingEle && this[this.draggingEle]()) {
          var deltaX = e.clientX - this.startX;
          var deltaY = e.clientY - this.startY;

          var nowWidth = this.width + deltaX;
          var nowHeight = this.height + deltaY;

          if (nowWidth < 10) {
            nowWidth = 10
          }

          if (nowHeight < 10) {
            nowHeight = 10;
          }


          this.mithrilElement.style.width = nowWidth + 'px';
          this.mithrilElement.style.height = nowHeight + 'px';
        }
      }
    };
  },

  view: function(ctrl) {
    return m('.resizer', {
        style: 'width: ' + ctrl.width + 'px;' + 'height: ' + ctrl.height + 'px',
        config: function(elem) {
          ctrl.mithrilElement = elem;
        }
      }, [
      m('.resizer-bg', {
        style: 'pointer-events:' + (ctrl.brDragging() ? 'all' : 'none') + ';',
        onmousemove: ctrl.onMouseMove.bind(ctrl),
        onmouseup: ctrl.onMouseUp.bind(ctrl)
      }),
      // m('.resizer-tl', {
      //   className: ctrl.tlDragging() ? 'dragging' : '',
      //   onmousedown: ctrl.onMouseDown.bind(ctrl, 'tl', resizer.DIRECTION.LEFT_TOP)
      // }),
      // m('.resizer-t'),
      // m('.resizer-tr'),
      // m('.resizer-r'),
      m('.resizer-br', {
        className: ctrl.brDragging() ? 'dragging' : '',
        onmousedown: ctrl.onMouseDown.bind(ctrl, 'br', resizer.DIRECTION.BOTTOM_RIGHT),
        onmouseup: ctrl.onMouseUp.bind(ctrl)
      }),
      // m('.resizer-b'),
      // m('.resizer-bl'),
      // m('.resizer-l')
    ]);
  }
};