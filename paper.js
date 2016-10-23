(function() {
  var G = Graph(GraphData);
  $(document).on("click", "#goBtn", function() {
    var paperId = parseInt($("#paperTxt").val(), 10);
    var graphDepth = parseInt($("#graphDepthTxt").val(), 10);
    var dirSearch = $("#dirOnlyTxt").val() === "Y";
    if (!G.hasNode(paperId)) {
      alert("Could not find paper with given ID");
      return;
    }
    var cites = G.neighborIds(paperId);
    var citedBy = G.inNeighborIds(paperId);
    Common.populateList("citersListGroup", cites, function(id) {
      return id;
    });
    Common.populateList("citedListGroup", citedBy, function(id) {
      return id;
    });
    $("#citesHeading").text("Cites " + cites.length + " paper(s)");
    $("#citedByHeading").text("Cited by " + citedBy.length + " paper(s)");
    console.log(dirSearch);

    var g = G.graphWithinDepth(paperId, graphDepth, dirSearch);
    CyHelper.create("cy", g);
  });
})();
