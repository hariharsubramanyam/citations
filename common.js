(function() {
  var CommonImpl = function() {
    var that = Object.create(CommonImpl.prototype);

    that.populateList = function(listId, content, textConstructor) {
      var items = content.map(function(item) {
        return "<li class='list-group-item'>" + textConstructor(item) + "</li>";
      });
      var list = $("#" + listId);
      list.html("");
      items.forEach(function(item) {
        list.append(item);
      });
    };

    Object.freeze(that);
    return that;
  };

  Common = CommonImpl();
})();
