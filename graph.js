Node = function(id) {
  var that = Object.create(Node.prototype);

  // Map from ID to true.
  var neighbors = new Map();

  var reverseNeighbors = new Map();

  that.id = function() {
    return id;
  };

  that.addReverseEdge = function(destId) {
    if (id !== destId && !reverseNeighbors.has(destId)) {
      reverseNeighbors.set(destId, true);
      return true;
    } else {
      return false;
    }
  };

  that.addEdge = function(destId) {
    if (id !== destId && !neighbors.has(destId)) {
      neighbors.set(destId, true);
      return true;
    } else {
      return false;
    }
  };

  that.neighborIds = function() {
    return neighbors.keys();
  };

  that.reverseNeighborIds = function() {
    return reverseNeighbors.keys();
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

  // Contains [src, dst] pairs.
  var edges = [];


  that.addEdge = function(sourceId, destId) {
    if (nodes.has(sourceId)) {
      var addedEdge = nodes.get(sourceId).addEdge(destId);
      if (addedEdge) {
        edges.push([sourceId, destId]);
      }
      nodes.get(destId).addReverseEdge(sourceId);
    }
  };

  that.hasNode = function(id) {
    return nodes.has(id);
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

  that.graphWithinDepth = function(sourceId, depth) {
    // Default the depth to the whole graph.
    depth = depth || nodes.size;

    // Create a stack to hold the nodes to process.
    var toProcess = [[sourceId, 0]];
    var doneIds = new Map();

    // Do a BFS up to the given depth.
    while (toProcess.length > 0) {
      var procMe = toProcess.shift();
      var id = procMe[0];
      var dep = procMe[1];
      doneIds.set(id, true);

      if (dep < depth) {
        var nid;
        for (nid of nodes.get(id).neighborIds()) {
          if (!doneIds.has(nid)) {
            toProcess.push([nid, dep+1]);
          }
        }
        for (nid of nodes.get(id).reverseNeighborIds()) {
          if (!doneIds.has(nid)) {
            toProcess.push([nid, dep+1]);
          }
        }
      }

    }

    // Create an array of the node IDs and the edges.
    var gNodes = Array.from(doneIds.keys());
    var gEdges = edges.filter(function(edge) {
      return doneIds.has(edge[0]) && doneIds.has(edge[1]);
    });
    return {
      "nodes": gNodes,
      "edges": gEdges
    };
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
