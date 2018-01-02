function Graph(vertexList) {
    this.vertexList = vertexList.split(',');
    this.validVertexList = this.vertexList.reduce(function (res, item) {
        if (item.trim().length > 0 && res.indexOf(item) === -1) {
            res.push(item.trim());
        }
        return res;
    }, []);
    this.vertices = this.validVertexList.length;
    this.edges = 0;
    this.adj = [];
    for (var i = 0; i < this.vertices; ++i) {
        this.adj[i] = [];
        this.adj[i].push("");
    }
    this.addEdge = addEdge;
    this.getVertexIndexByName = getVertexIndexByName;
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
    return this.validVertexList.indexOf(name);
}

function addEdge(vName, wName) {
    var self = this;

    var pushToAdj = function (indexV, indexW) {
        var item = self.adj[indexV];

        if (item.indexOf(indexW) === -1) {
            item.push(indexW);
        }
    };

    var indexV = self.getVertexIndexByName(vName);
    var indexW = self.getVertexIndexByName(wName);

    pushToAdj(indexV, indexW);
    pushToAdj(indexW, indexV);

    self.edges++;
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
    var displayShortPath = document.getElementById('displayShortPath');

    if (displayShortPath.hasChildNodes() === true) {
        while (displayShortPath.firstChild) {
            displayShortPath.removeChild(displayShortPath.firstChild);
        }
    }

    if (paths == undefined) {
        displayShortPath.innerHTML = 'incorrect path';
    }

    while (paths.length > 0) {
        var index = paths.pop();
        var textNode = document.createTextNode(this.validVertexList[index] + '-');
        displayShortPath.appendChild(textNode);
    }
}