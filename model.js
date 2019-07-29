class Graph {
    constructor(noOfVertices) {
        this.noOfVertices = noOfVertices
        this.adjList = new Map()
    }
    addVertex(v) {
        this.adjList.set(v, [])
        this.noOfVertices++;
    }
    addEdge(src, dest) {
        this.adjList.get(src).push(dest)
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
}
// var graphs = new Graph(5)
// for (var i = 0; i < 5; i++) {
//     graphs.addVertex(i)
// }
// graphs.addEdge(0, 2)
// graphs.addEdge(1, 3)
// graphs.addEdge(1, 4)
// graphs.addEdge(3, 1)
// graphs.addEdge(4, 2)
// graphs.addEdge(4, 3)
// graphs.addEdge(3, 2)
// graphs.showVertices()
