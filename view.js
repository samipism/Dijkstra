let graphs
let cnv, val, button
let lastValue = null
let noOfVertices = 0
let nodes = []
let edges = []
let isNodePressed = false
let pressedNode, src, dest, toBeEdged = false
let srcSet = false
function setup() {
    graphs = new Graph(5)
    cnv = createCanvas(5000, 5000)
    cnv.mouseReleased(addVertexValue)
    val = createInput(null)
    button = createButton('set')
    button.hide()
    val.hide()
    val.size(100)
    val.input(addInput)
    noLoop()
}

//calls everytime.
function draw() {
    //background(255)
    if (srcSet) {
        noFill()
        ellipse(src.getX(), src.getY(), 30, 30)
    }
    if (toBeEdged) {
        edges.push(new Edges(src, dest, 10))
        console.log("Edge created")
        edges[parseInt(edges.length) - 1].display()
        toBeEdged = false
        srcSet = false
    }
    if (lastValue != null) {
        nodes.push(new Nodes(val.position().x, val.position().y, lastValue, '#28fc03'))
        nodes[parseInt(nodes.length) - 1].display()
    }

}
//calls when user clicks on input
function addInput() {
    lastValue = this.value()
}
//called by addVertexValue
function addVertex() {
    if (lastValue != null) {
        button.hide()
        graphs.addVertex(parseInt(lastValue))
        if (noOfVertices != graphs.showVerticesNumber()) {
            graphs.showVertices()
            redraw()
            val.value(null)
            lastValue = null
            val.hide()
            noOfVertices = graphs.showVerticesNumber()
        }

    }

}
function handleEdge(node) {
    if (!srcSet) {
        src = node
        srcSet = true
        redraw()
    }
    else {
        dest = node
        graphs.addEdge(parseInt(src.showValue()), parseInt(dest.showValue()))
        graphs.showVertices()
        toBeEdged = true
        srcSet = false
        redraw()
    }
}
//called when Clicked
function addVertexValue() {
    for (var node of nodes) {
        if (node.isPressed()) {
            isNodePressed = true;
            pressedNode = node;
            handleEdge(node)
            break
        }
    }
    if (!isNodePressed) {
        srcSet = false
        val.position(mouseX, mouseY)
        val.show()
        button.position(parseInt(val.position().x) + 100, parseInt(val.position().y))
        button.show()
        button.mouseReleased(addVertex)
    }
    else {
        isNodePressed = false
    }
}