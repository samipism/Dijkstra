class PriorityQueue {
    constructor(maxSize) {
        // Set default max size if not provided
        if (isNaN(maxSize)) {
            maxSize = 10;
        }
        this.maxSize = maxSize;
        // Init an array that'll contain the queue values.
        this.container = [];
    }
    // Helper function to display all values while developing
    display() {
        console.log(this.container);
    }
    // Checks if queue is empty
    isEmpty() {
        return this.container.length === 0;
    }
    // checks if queue is full
    isFull() {
        return this.container.length >= this.maxSize;
    }
    enqueue(data, priority) {
        // Check if Queue is full
        if (this.isFull()) {
            console.log("Queue Overflow!");
            return;
        }
        let currElem = new this.Element(data, priority);
        let addedFlag = false;
        // Since we want to add elements to end, we'll just push them.
        for (let i = 0; i < this.container.length; i++) {
            if (currElem.priority < this.container[i].priority) {
                this.container.splice(i, 0, currElem);
                addedFlag = true; break;
            }
        }
        if (!addedFlag) {
            this.container.push(currElem);
        }
    }
    dequeue() {
        // Check if empty
        if (this.isEmpty()) {
            console.log("Queue Underflow!");
            return;
        }
        return this.container.pop();
    }
    peek() {
        if (isEmpty()) {
            console.log("Queue Underflow!");
            return;
        }
        return this.container[this.container.length - 1];
    }
    clear() {
        this.container = [];
    }
}
// Create an inner class that we'll use to create new nodes in the queue
// Each element has some data and a priority
PriorityQueue.prototype.Element = class {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority;
    }
};
class Dijkstra {
    constructor(graph, source, destination) {
        this.graph = graph
        this.source = source
        this.destination = destination
        this.distances = {};
        this.nodes = []
        this.shortestPath = []
        for (var vertex of this.graph.getVertex()) {
            this.nodes.push(vertex)
        }
        // Stores the reference to previous nodes
        this.prev = {};
        this.pq = new PriorityQueue(this.nodes.length * this.nodes.length);

        // Set distances to all nodes to be infinite except startNode
        this.distances[source] = 0;
        this.pq.enqueue(source, 0);
        this.nodes.forEach(node => {
            if (node !== this.source) this.distances[node] = Infinity;
            this.prev[node] = null;
        });
        // console.log(this.nodes)

        // this.destination = destination
        // this.shortestPath = []
        // this.nodes = []
        // this.latestMin = null
        // this.minlength = 0
        // this.rejected = []

        // for (var node of this.nodes) {
        //     if (node["vertex"] === this.source) {
        //         node["weight"] = 0
        //         this.shortestPath.push(node)
        //     }
        // }
        // for (node of this.nodes) {
        //     if (this.graph.getEdges().indexOf(node) !== -1) {
        //         this.edges.push({
        //             "vertex": node["vertex"], "weight": Infinity
        //         })
        //     }
        // }
    }

    shortestPathFunction() {
        while (!this.pq.isEmpty()) {
            let minNode = this.pq.dequeue();
            //console.log(minNode)
            let currNode = minNode.data;
            let weight = minNode.priority;
            // console.log(this.graph.getEdges(currNode))
            this.graph.getEdges(currNode).forEach(neighbor => {
                let alt = this.distances[currNode] + neighbor.weight;
                if (alt < this.distances[neighbor.vertex]) {
                    this.distances[neighbor.vertex] = alt;
                    this.prev[neighbor.vertex] = currNode;
                    this.pq.enqueue(neighbor.vertex, this.distances[neighbor.vertex]);
                }
            });

        }

        // while (this.shortestPath.indexOf[this.shortestPath.length - 1]["vertex"] !== this.destination) {
        //     this.latestMin = this.shortestPath[this.shortestPath.length - 1]

        //     for (var edge of edges) {
        //         if (this.latestMin["weight"] + edge["weight"] < this.nodes.find((obj) => { return obj["vertex"] === edge["vertex"] })["weight"]) {
        //             this.nodes.find((obj) => { return obj["vertex"] === edge["vertex"] })["weight"] = this.latestMin["weight"] + edge["weight"]
        //         }
        //     }
        //     edges.sort((a, b) => { return a["weight"] - b["weight"] })
        //     // if (edges.length !== 0)
        //     //     this.minlength = this.nodes.find((obj) => { return obj["vertex"] === edges[0]["vertex"] })["weight"]
        //     for (var edge of edges) {
        //         let shortNode = this.nodes.find((obj) => { return obj["vertex"] === edge["weight"] })
        //         if (this.rejected.indexOf(shortNode) !== -1) {
        //             this.minlength = this.nodes.find((obj) => { return obj["vertex"] === edge["vertex"] })["weight"]
        //             break;
        //         }
        //     }
        //     this.shortestPath.push(this.nodes.find((obj) => { return obj["weight"] === this.minlength }))

        // }
        // if (this.destination !== this.shortestPath[this.shortestPath.length - 1]["vertex"])
        //     this.rejected.push(this.shortestPath.splice(this.shortestPath.length - 1, 1))
        // console.log(this.shortestPath)
        // console.log(this.rejected)
        let now = this.destination
        while (now !== this.source && now !== null) {
            this.shortestPath.push({ "vertex": now, "weight": this.distances[now] })
            console.log(this.shortestPath)
            now = this.prev[now]
        }
        this.shortestPath.push({ "vertex": this.source, "weight": this.distances[`${this.source}`] })
        this.shortestPath.reverse()
        console.log(this.distances)
        console.log(this.shortestPath)
    }
    getShortestPath() {
        return this.shortestPath;
    }

}
