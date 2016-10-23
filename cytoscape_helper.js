(function() {
  var CyImpl = function() {
    var that = Object.create(CyImpl.prototype);

    that.create  = function(divId, graph) {

      var nodes = graph.nodes.map(function(n) {
        return {
          "data": {
            "id": n
          }
        };
      });

      var edges = graph.edges.map(function(e) {
        return {
          "data": {
            "id": "edge" + e[0] + "_" + e[1],
            "source": e[0],
            "target": e[1]
          }
        };
      });

      var elements = nodes.concat(edges);

      var cy = cytoscape({
        container: document.getElementById(divId), // container to render in
        elements: elements,
        style: [ // the stylesheet for the graph
          {
            selector: 'node',
            style: {
              'background-color': 'red',
              'label': 'data(id)'
            }
          },
          {
            selector: 'edge',
            style: {
              'width': 3,
              'line-color': '#9dbaea',
              'target-arrow-color': '#9dbaea',
              'target-arrow-shape': 'triangle',
              'curve-style': 'bezier'
            }
          }
        ],
        layout: {
          name: 'breadthfirst'
        }
      });
    };

    Object.freeze(that);
    return that;
  };
  CyHelper = CyImpl();
})();
