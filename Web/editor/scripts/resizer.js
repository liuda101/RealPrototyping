var resizer = {
  controller: function() {

  },

  view: function(ctrl) {
    return m('.resizer', [
      m('.resizer-tl', {
        
      }),
      m('.resizer-t'),
      m('.resizer-tr'),
      m('.resizer-r'),
      m('.resizer-br'),
      m('.resizer-b'),
      m('.resizer-bl'),
      m('.resizer-l')
    ]);
  }
};