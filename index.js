(function() {
  var G = Graph(GraphData);
  $(document).ready(function() {
    $("#numPapers").text("Number of Papers: " + G.numNodes());

    var sorted = G.sortedByDegrees();
    Common.populateList("citersListGroup", sorted.od, function(pair) {
      return pair[0] + " (num cited = " + pair[1] + ")";
    });
    Common.populateList("citedListGroup", sorted.id, function(pair) {
      return pair[0] + " (num cited by = " + pair[1] + ")";
    });
  });
})();
