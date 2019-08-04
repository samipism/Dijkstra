class Graph {
    constructor(noOfVertices) {
        this.noOfVertices = noOfVertices
        this.adjList = new Map()
    }
    addVertex(v) {
        this.adjList.set(v, [])
        this.noOfVertices++;
    }
    addEdge(src, dest, value) {
        var nodeObj = new Object()
        nodeObj["vertex"] = dest
        nodeObj["weight"] = value
        this.adjList.get(src).push(nodeObj)
        // this.adjList.get(dest).push(src)
    }
    showVertices() {
        var getKeys = this.adjList.keys()
        for (var i of getKeys) {
            var adj = this.adjList.get(i)
            console.log(`${i} --->` + adj)
        }
    }
    showVerticesNumber() {
        return this.adjList.size
    }
    getVertex() {
        var getKeys = this.adjList.keys()
        return getKeys;
    }
    getEdges(vertex) {
        var getKeys = this.adjList.keys()
        for (var i of getKeys) {
            if (i === vertex)
                return this.adjList.get(i)
        }
    }
}

// var graphs = new Graph(5)
// for (var i = 0; i < 5; i++) {
//     graphs.addVertex(i)
// }
// graphs.addEdge(2, 0, 8)
// graphs.addEdge(0, 1, 5)
// graphs.addEdge(1, 4, 2)
// graphs.addEdge(1, 3, 4)
// //graphs.addEdge(2, , 2)
// //graphs.addEdge(3, 1, 3)
// graphs.addEdge(2, 4, 8)
// graphs.addEdge(4, 3, 2)
// graphs.addEdge(3, 2, 1)





// var Dijs = new Dijkstra(graphs, 3, 0)
// Dijs.shortestPathFunction()
// console.log(Dijs.getShortestPath())