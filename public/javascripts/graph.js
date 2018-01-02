function Graph(vertexList) {
    this.vertexList = vertexList.trim().split(',');
    this.vertices = this.vertexList.length;
    this.edges = 0;
    this.adj = [];
    for (var i = 0; i < this.vertices; ++i) {
        this.adj[i] = [];
        this.adj[i].push("");
    }
    this.addEdge = addEdge;
    this.getVertexIndexByName = getVertexIndexByName;
    this.showGraph = showGraph;
    this.bfsByIndex = bfsByIndex;
    this.bfsByName = bfsByName;
    this.edgeTo = [];
    this.marked = [];
    this.pathToByIndex = pathToByIndex;
    this.pathToByName = pathToByName;
    this.hasPathTo = hasPathTo;
    this.printPath = printPath;
    for (var j = 0; j < this.vertices; ++j) {
        this.marked[j] = false;
    }
}

function getVertexIndexByName(name) {
    return this.vertexList.indexOf(name);
}

function addEdge(vName, wName) {
    var self = this;

    var pushToAdj = function (indexV, indexW) {
        var item = self.adj[indexV];

        if(item.indexOf(indexW) === -1){
            item.push(indexW);
        }
    };

    var indexV = self.getVertexIndexByName(vName);
    var indexW = self.getVertexIndexByName(wName);

    pushToAdj(indexV, indexW);
    pushToAdj(indexW, indexV);

    console.log('adj', this.adj);
    self.edges++;
}

function showGraph() {
    var visited = [];
    for (var i = 0; i < this.vertices; ++i) {
        console.log(this.vertexList[i] + " -> ");
        visited.push(this.vertexList[i]);
        for (var j = 0; j < this.vertices; ++j) {
            if ((this.adj[i][j] !== '') && (this.adj[i][j] != undefined)) {
                if (visited.indexOf(this.vertexList[this.adj[i][j]]) < 0) {
                    console.log(this.vertexList[this.adj[i][j]] + ' ');
                }
            }
        }
        visited.pop();
    }
}

function bfsByIndex(s) {
    var queue = [];
    this.marked[s] = true;
    queue.unshift(s);
    while (queue.length > 0) {
        var v = queue.shift();
        if (typeof(v) == "string") {
            return;
        }
        console.log('Visited vertex: ' + v);

        for (var i = 0; i < this.adj[v].length; ++i) {
            var w = this.adj[v][i];
            if (!this.marked[w]) {
                this.edgeTo[w] = v;
                this.marked[w] = true;
                queue.unshift(w);
            }
        }
    }
}

function bfsByName(sName) {
    var indexS = this.getVertexIndexByName(sName);
    return this.bfsByIndex(indexS);
}

function pathToByIndex(v, source) {
    if (!this.hasPathTo(v)) {
        return undefined;
    }
    var path = [];
    for (var i = v; i !== source; i = this.edgeTo[i]) {
        path.push(i);
    }
    path.push(source);
    return path;
}

function pathToByName(vName, sourceName) {
    var vIndex = this.getVertexIndexByName(vName);
    var sourceIndex = this.getVertexIndexByName(sourceName);

    return this.pathToByIndex(vIndex, sourceIndex);
}

function hasPathTo(v) {
    return this.marked[v];
}

function printPath(paths) {
    if(paths == undefined){
        console.log('incorrect path')
    }
    while (paths.length > 0) {
        var index = paths.pop();
        console.log(this.vertexList[index] + '->');
    }
}