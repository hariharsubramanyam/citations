(function() {
  var G = Graph(GraphData);
  $(document).on("click", "#goBtn", function() {
    var paperId = parseInt($("#paperTxt").val(), 10);
    var cites = G.neighborIds(paperId);
    var citedBy = G.inNeighborIds(paperId);
    Common.populateList("citersListGroup", cites, function(id) {
      return id;
    });
    Common.populateList("citedListGroup", citedBy, function(id) {
      return id;
    });
  });
})();
