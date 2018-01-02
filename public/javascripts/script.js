var g, vg;

function setDefaultGraph() {
    document.getElementById('vertex-list').value = 'v0,v1,v2,v3,v4,v5,v6,v7,v8,v9,v10';
    submitGraph();
}

function submitGraph() {
    var enteredGraph = document.getElementById('vertex-list');
    var selects = document.querySelectorAll('#add-edges select');

    if (!enteredGraph.value || !enteredGraph.value.trim()) {
        clear(enteredGraph);
        return;
    }

    g = new Graph(enteredGraph.value);
    vg = Viva.Graph.graph();
    addNodeVG();

    selects.forEach(function (item) {
        item.length = 0;

        g.vertexList.forEach(function (element) {
            var opt = document.createElement('option');
            opt.innerHTML = element;
            item.appendChild(opt);
        });
    });
}

function addNodeVG() {
    for (var i = 0; i < g.vertices; i++) {
        vg.addNode(g.vertexList[i]);
    }
}

function addEdgeGraph() {
    var v1 = document.getElementById("firstVert");
    var v2 = document.getElementById("secondVert");
    var valueV1 = v1.options[v1.selectedIndex].value;
    var valueV2 = v2.options[v2.selectedIndex].value;

    g.addEdge(valueV1, valueV2);
    vg.addLink(valueV1, valueV2);

    for (var i = 0; i < v2.length; i++) {
        v2[i].style.display = 'block';
    }
}

function clear(el) {
    el.value = null;
    return;
}

function onChangeFirstVert(item) {
    var selectedValue = item.value,
        v2 = document.getElementById("secondVert");

    for (var i = 0; i < v2.length; i++) {
        if (v2[i].value === selectedValue) {
            v2[i].style.display = 'none';
        }
    }
}

function drawGraph() {
    var graphics = Viva.Graph.View.svgGraphics(),
        nodeSize = g.vertices,
        layout = Viva.Graph.Layout.forceDirected(vg, {
            springLength: 100,
            springCoeff: 0.0002,
            dragCoeff: 0.08,
            gravity: -0.6
        }),
        renderer = Viva.Graph.View.renderer(vg, {
            container: document.getElementById('graphDiv'),
            layout: layout,
            graphics: graphics
        });

    graphics.node(function (node) {
        var ui = Viva.Graph.svg('g'),
            svgText = Viva.Graph.svg('text')
                .attr('y', '-4px')
                .attr('x', '-' + (nodeSize / 4) + 'px')
                .text(node.id),

            img = Viva.Graph.svg('rect')
                .attr('width', nodeSize)
                .attr('height', nodeSize)
                .attr('fill', '#00a2e8');

        ui.append(svgText);
        ui.append(img);

        return ui;
    }).placeNode(
        function (nodeUI, pos) {
            nodeUI.attr('transform', 'translate(' + (pos.x - nodeSize / 2)
                + ',' + (pos.y - nodeSize / 2) + ')');
        });


    renderer.run();
}

function findShortPath() {
    var v1 = document.getElementById("firstVertShortPath");
    var v2 = document.getElementById("secondVertShortPath");
    var valueV1 = v1.options[v1.selectedIndex].value;
    var valueV2 = v2.options[v2.selectedIndex].value;

    g.bfsByName(valueV1);
    var paths = g.pathToByName(valueV2, valueV1);
    g.printPath(paths);
}
