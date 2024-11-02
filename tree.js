


document.getElementById('generate').onclick = function () {
    var chart = document.getElementById("tree");
    var {
        dotStr,
        predictNode
    } = testWithChart()
    if (predictNode != null) {
        var header = document.getElementById('header').value;
        var arrHeader = header.split(",")
        document.getElementById('prediction').innerText = arrHeader[arrHeader.length-1] + ": " + predictNode.value
    } else {
        document.getElementById('prediction').innerText = ""
    }
    var parsDot = vis.network.convertDot(dotStr);
    var data = {
        nodes: parsDot.nodes,
        edges: parsDot.edges
    }
    var options = {
        layout: {
            hierarchical: {
                levelSeparation: 100,
                nodeSpacing: 100,
                parentCentralization: true,
                direction: 'UD', // UD, DU, LR, RL
                sortMethod: 'directed', // hubsize, directed
                //shakeTowards: 'roots' // roots, leaves                        
            },
        },
    };
    var network = new vis.Network(chart, data, options);

    var chart = document.getElementById("tree");
    var {
        dotStr,
        predictNode
    } = testWithChart()
    if (predictNode != null) {
        var header = document.getElementById('header').value;
        var arrHeader = header.split(",")
        document.getElementById('prediction').innerText = arrHeader[arrHeader.length-1] + ": " + predictNode.value
    } else {
        document.getElementById('prediction').innerText = ""
    }
    var parsDot = vis.network.convertDot(dotStr);
    var data = {
        nodes: parsDot.nodes,
        edges: parsDot.edges
    }
    var options = {
        layout: {
            hierarchical: {
                levelSeparation: 100,
                nodeSpacing: 100,
                parentCentralization: true,
                direction: 'UD', // UD, DU, LR, RL
                sortMethod: 'directed', // hubsize, directed
                //shakeTowards: 'roots' // roots, leaves                        
            },
        },
    };
    var network = new vis.Network(chart, data, options);
}
testWithChart = () => {
    var header = document.getElementById('header').value;
    var arrHeader = header.split(",")
    var training = document.getElementById('textarea').value;
    var arrTraining = training.split("\n")
    var arrData = [arrHeader]
    for (var i = 0; i < arrTraining.length; i++) {
        arrData.push(arrTraining[i].split(","))
    }
    //class="display-6 text-center mb-5" 
    let dtSt = arrData

    let dTree = new DecisionTreeID3(dtSt);
    let root = dTree.train(dTree.dataset);
    var pred = document.getElementById('data').value;
    var arrPred = pred.split(",")
    var predHeader = []
    for(var i = 0; i<arrHeader.length-1;i++){
        predHeader.push(arrHeader[i])
    }
    let predict = pred != "" ? dTree.predict([predHeader,arrPred], root) : null;
    return {
        dotStr: dTree.generateDotString(root),
        predictNode: predict
    };
}