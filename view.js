let graphs, dijkstra
let cnv, val, button, button2, buttonEdge, valEdge, sel, selDest, buttonDijks, tex, texDest, showShort, msg
let lastNodeValue = null
let lastEdgeValue = null
let noOfVertices = 0
let nodes = []
let edges = []
let DiEdges = []
let isNodePressed = false
let pressedNode, src, dest, toBeEdged = false, modeDijkStra = false
let srcSet = false
let Dsrc, Ddest
function setup() {
    graphs = new Graph(5)

    cnv = createCanvas(window.innerWidth, window.innerHeight - 90)
    cnv.mouseReleased(addVertexAndEdgeValue)

    button = createButton('set')
    button.attribute('class', 'button')
    button.hide()

    button2 = createButton('delete')
    button2.attribute('class', 'button')
    button2.hide()

    msg = "Click anywhere to form node"
    showShort = createDiv(msg)
    showShort.position(80, 60);

    tex = createDiv("Source:")
    tex.attribute('class', 'source')
    textAlign(CENTER);
    background(150)
    sel = createSelect();
    sel.attribute('class', 'sel')
    //sel.position(900, 600);
    // tex.position(800, 600);

    texDest = createDiv("Destination:")
    textAlign(CENTER);
    background(150)
    selDest = createSelect();
    texDest.attribute('class', 'texDest')
    selDest.attribute('class', 'selDest')
    // selDest.position(900, 800);
    // texDest.position(800, 800)

    buttonDijks = createButton('Calculate')
    buttonDijks.attribute('class', 'button calc')
    buttonDijks.mouseReleased(calculate)

    buttonEdge = createButton('set')
    buttonEdge.attribute('class', 'button')
    buttonEdge.hide()

    val = createInput(null)
    val.hide()
    val.size(100)
    val.input(addInput)

    valEdge = createInput(null)
    valEdge.hide()
    valEdge.size(100)
    valEdge.input(addEdgeInput)

    noLoop()
}
function Loop(i) {

    setTimeout(() => {
        if (i) {
            console.log(dijkstra.getShortestPath().length - i)
            animateDijkstra(dijkstra.getShortestPath()[dijkstra.getShortestPath().length - i])
        }
        else {
            animateDijkstra(dijkstra.getShortestPath()[0])
        }

        if (--i > 0) {

            Loop(i);
        }
        else {
            modeDijkStra = false
        }
    }, 1000
    )

}

function calculate() {
    DiEdges = []
    Ddest = null
    Dsrc = null
    console.log("Src:", parseInt(sel.value()), " to", parseInt(selDest.value()))
    // console.log(dijkstra.getShortestPath())
    dijkstra = new Dijkstra(graphs, parseInt(sel.value()), parseInt(selDest.value()))
    dijkstra.shortestPathFunction()
    console.log(dijkstra.getShortestPath())
    msg = `Shortest Path:${handleShortestPath(dijkstra.getShortestPath())}`
    Dsrc = parseInt(sel.value())
    modeDijkStra = true
    Loop(dijkstra.getShortestPath().length - 1)
    console.log(modeDijkStra)
    showShort.html(msg)
}
function animateDijkstra(vertex) {
    if (Ddest && Ddest !== parseInt(selDest.value()))
        Dsrc = Ddest
    console.log(vertex)
    Ddest = vertex["vertex"]
    // console.log("Dsrc:", Dsrc)
    console.log("DDesat :", Ddest)
    redraw()
}
function handleShortestPath(shortestPath) {
    var str = new String("")
    // console.log(shortestPath)
    if (shortestPath === null)
        return " Cannot Be Found!!"
    for (let node of shortestPath) {
        str += `${node["vertex"]}->`
    }
    str = str.slice(0, str.length - 2)
    if (shortestPath.length != 0)
        str += `<br> Length:${shortestPath[shortestPath.length - 1]["weight"]}`
    return str
}

//calls everytime.
function draw() {

    //background(255)
    // if (srcSet) {
    //     
    // }
    if (toBeEdged) {
        edges.push(new Edges(src, dest, lastEdgeValue))
        toBeEdged = false
        srcSet = false
    }
    if (lastNodeValue != null) {
        nodes.push(new Nodes(val.position().x, val.position().y, lastNodeValue, '#28fc03'))
        sel.option(nodes[nodes.length - 1].showValue());
        selDest.option(nodes[nodes.length - 1].showValue())
    }
    if (nodes.length != 0) {
        background(150)
        if (srcSet) {
            src.highlight()
        }

        for (var node of nodes) {
            node.display()
        }
        if (edges.length != 0) {
            for (var edge of edges) {
                edge.display()
                graphs.showVertices()
            }
        }
        if (modeDijkStra) {
            // nodes.find((node) => {
            //     return parseInt(node.showValue()) === Ddest
            // }).highlight()
            if (Dsrc !== Ddest) {
                DiEdges.push(edges.find((edge) => {
                    return (parseInt(edge.getSource().showValue()) === Dsrc && parseInt(edge.getDest().showValue()) === Ddest)
                }))
            }
            for (var edge of DiEdges) {
                edge.highlight()
                graphs.showVertices()
            }

        }
    }

}
//calls when user clicks on input
function addInput() {
    lastNodeValue = this.value()
}
function addEdgeInput() {
    lastEdgeValue = this.value()
}
function makeEdgeValue() {
    showShort.html("Click anywhere to form node")
    buttonEdge.hide()
    graphs.addEdge(parseInt(src.showValue()), parseInt(dest.showValue()), parseInt(lastEdgeValue))
    graphs.showVertices()
    toBeEdged = true
    srcSet = false
    redraw()
    valEdge.value(null)
    valEdge.hide()

}
function delPrompt() {
    button.hide()
    button2.hide()
    val.hide()
}
//called by addVertexAndEdgeValue
function addVertex() {
    if (lastNodeValue != null) {
        showShort.html("Click anywhere to form node")
        button.hide()
        button2.hide()
        graphs.addVertex(parseInt(lastNodeValue))
        if (noOfVertices != graphs.showVerticesNumber()) {
            graphs.showVertices()
            redraw()
            val.value(null)
            lastNodeValue = null
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
        showShort.html("Enter Edge's weight:")
        dest = node
        valEdge.position(0.5 * (parseFloat(src.getX()) + parseFloat(dest.getX())), 0.5 * (parseFloat(src.getY()) + parseFloat(dest.getY())))
        valEdge.show()
        buttonEdge.position(parseInt(valEdge.position().x) + 100, parseInt(valEdge.position().y))
        buttonEdge.show()
        buttonEdge.mouseReleased(makeEdgeValue)
    }
}
//called when Clicked
function addVertexAndEdgeValue() {
    for (var node of nodes) {
        if (node.isPressed()) {
            showShort.html("Press any node for destination:")
            isNodePressed = true;
            pressedNode = node;
            handleEdge(node)
            break
        }
    }
    if (!isNodePressed) {
        showShort.html("Enter Node's value:")
        srcSet = false
        val.position(mouseX, mouseY)
        val.show()
        button.position(parseInt(val.position().x) + 100, parseInt(val.position().y))
        button.show()
        button2.position(parseInt(button.position().x) + 90, parseInt(button.position().y))
        button2.show()
        button.mouseReleased(addVertex)
        button2.mouseReleased(delPrompt)
    }
    else {
        isNodePressed = false
    }
}