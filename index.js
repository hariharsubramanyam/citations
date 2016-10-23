(function() {
  var G = Graph(GraphData);
  $(document).ready(function() {
    $("#numPapers").text("Number of Papers: " + G.numNodes());

    var sorted = G.sortedByDegrees();
    var populateList = function(listId, msg, content) {
      var items = content.map(function(pair) {
        var id = pair[0];
        var degree = pair[1];
        return "<li class='list-group-item'>" + id + " (" + msg + " " + degree + ") </li>";
      });
      var list = $("#" + listId);
      list.html("");
      items.forEach(function(item) {
        list.append(item);
      });
    };

    populateList("citersListGroup", "num cited = ", sorted.od);
    populateList("citedListGroup", "num cited by = ", sorted.id);
  });
})();
