Node = function(id) {
  var that = Object.create(Node.prototype);

  // Map from ID to true.
  var neighbors = new Map();

  that.id = function() {
    return id;
  };

  that.addEdge = function(destId) {
    if (id !== destId && !neighbors.has(destId)) {
      neighbors.set(destId, true);
    }
  };

  that.neighborIds = function() {
    return neighbors.keys();
  };

  that.hasNeighbor = function(neighborId) {
    return neighbors.has(neighborId);
  };

  that.numNeighbors = function() {
    return neighbors.size;
  };

  Object.freeze(that);
  return that;
};

Graph = function(data) {
  var that = Object.create(Graph.prototype);

  // Map from id to Node.
  var nodes = new Map();

  // Array of two-element (source, destination) arrays.
  var edges = data.map(function(e) {
    return e;
  });

  that.addEdge = function(sourceId, destId) {
    if (nodes.has(sourceId)) {
      nodes.get(sourceId).addEdge(destId);
    }
  };

  that.getNode  = function(id) {
    return nodes.get(id);
  };

  that.addNode = function(id) {
    if (!nodes.has(id)) {
      nodes.set(id, Node(id));
    }
  };

  that.numNodes = function() {
    return nodes.size;
  };

  that.neighborIds = function(id) {
    return Array.from(nodes.get(id).neighborIds());
  };

  that.inNeighborIds = function(id) {
    var inNeighbor = [];
    for (var n of nodes.values()) {
      if (n.hasNeighbor(id)) {
        inNeighbor.push(n.id());
      }
    }
    return inNeighbor;
  };

  that.sortedByDegrees = function() {
    var outDegreeForId= new Map();
    var inDegreeForId = new Map();
    for (var n of nodes.values()) {
      outDegreeForId.set(n.id(), n.numNeighbors());
      if (!inDegreeForId.has(n.id())) {
        inDegreeForId.set(n.id(), 0);
      }
      for (var neighborId of n.neighborIds()) {
        if (!inDegreeForId.has(neighborId)) {
          inDegreeForId.set(neighborId, 0);
        }
        inDegreeForId.set(
          neighborId, 
          inDegreeForId.get(neighborId) + 1
        );
      }
    }

    var sorted = function(it) {
      return Array.from(it)
        .sort(function(a, b) {
          return b[1] - a[1];
        });
    };

    return {
      "od": sorted(outDegreeForId.entries()),
      "id": sorted(inDegreeForId.entries())
    };
  };

  // Create the graph.
  data.forEach(function(row) {
    var src = row[0];
    var dst = row[1];
    that.addNode(src);
    that.addNode(dst);
    that.addEdge(src, dst);
  });

  Object.freeze(that);
  return that;
};
