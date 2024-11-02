//Graficar Kmeans Lineal
document.getElementById('btnLineal').onclick = function () {
    var linear_data = document.getElementById('linear_data').value
    var k = document.getElementById('cluster_count').value
    var iterations = document.getElementById('iterations').value
    var data = []
    var split = linear_data.split(',')
    // <!--pendiente añadir cantidad de pasos -->
    split.forEach(d => {
        data.push(parseInt(d))
    });

    if (data.length < k) {
        alert(`El numero de clusters (${k}) no puede ser menor a la cantidad de datos (${data.length})`)
    }
    var kmeans = new LinearKMeans(k, data)
    let clusterized_data = kmeans.clusterize(k, data, iterations)

    let clusters = new Set([...clusterized_data.map(a => a[1])])

    clusters = Array.from(clusters)


    clusters.forEach((cluster, i) => {
        clusters[i] = [cluster, "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); })]
    });

    // console.log('clusters set: ', clusters)
    //Graficada

    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(function () { drawChart(clusters) });

    function drawChart(clusters) {
        //let y = Array(data.length).fill(0)
        var graph_data = new google.visualization.DataTable();
        graph_data.addColumn('number', 'X')
        graph_data.addColumn('number', 'Y')
        graph_data.addColumn({ type: 'string', role: 'style' }); // style col.
        let a = clusterized_data.map(e => [e[0], 0, `point { size: 7; shape-type: diamond; fill-color: ${clusters[clusters.findIndex(a => a[0] == e[1])][1]}}`])

        // console.log(a)
        graph_data.addRows(a)

        clusters.forEach(c => {
            graph_data.addRow([c[0], 0, `point { size: 3; shape-type: square; fill-color: #ff0000`])
        });



        var options = {
            title: 'Puntos',
            seriesType: 'scatter',
            series: { 1: { type: 'line' } },
            hAxis: { title: 'X', minValue: 0, maxValue: Math.max(this.data) + 10 },
            yAxis: { title: 'Y', minValue: 0, maxValue: 5 },
            legend: 'none'
        };

        var chart = new google.visualization.ScatterChart(document.getElementById('chart_div_kmeans'));

        chart.draw(graph_data, options);
    }



}

//Graficar Kmeans 2D
document.getElementById('btnKmeans_2D').onclick = function () {
    var linear_data = document.getElementById('2d_data').value
    var k = document.getElementById('2d_cluster_count').value
    var iterations = document.getElementById('2d_iterations').value
    var data = []
    var split = linear_data.replaceAll(/\s/g, '').replaceAll('[', '').split('],')
    // <!--pendiente añadir cantidad de pasos -->
    split.forEach(d => {
        var point = d.replace(']', '').split(',')
        data.push([parseInt(point[0]), parseInt(point[1])])
    });

    if (data.length < k) {
        alert(`El numero de clusters (${k}) no puede ser menor a la cantidad de datos (${data.length})`)
    }

    var kmeans = new _2DKMeans(k, data)

    let clusterized_data = kmeans.clusterize(k, data, iterations)


    let clusters = clusterized_data.map(a => [a[1][0], a[1][1]])


    clusters = clusters.filter((v, i, a) => a.findIndex(t => (JSON.stringify(t) === JSON.stringify(v))) === i)





    //console.log(clusterized_data)
    //console.log(clusters)

    clusters.forEach((cluster, i) => {
        clusters[i] = [cluster, "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); })]
    });

    // console.log('clusters set: ', clusters)
    //Graficada

    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(function () { drawChart(clusters) });

    function drawChart(clusters) {
        //let y = Array(data.length).fill(0)
        var graph_data = new google.visualization.DataTable();
        graph_data.addColumn('number', 'X')
        graph_data.addColumn('number', 'Y')
        graph_data.addColumn({ type: 'string', role: 'style' }); // style col.
        let a = clusterized_data.map(e => [e[0][0], e[0][1], `point { size: 7; shape-type: diamond; fill-color: ${clusters[clusters.findIndex(a => JSON.stringify(a[0]) == JSON.stringify(e[1]))][1]}}`])

        // console.log(a)
        graph_data.addRows(a)

        clusters.forEach(c => {
            graph_data.addRow([c[0][0], c[0][1], `point { size: 3; shape-type: square; fill-color: #ff0000`])
        });



        var options = {
            title: 'Puntos',
            seriesType: 'scatter',
            series: { 1: { type: 'line' } },
            hAxis: { title: 'X' },
            yAxis: { title: 'Y' },
            legend: 'none'
        };

        var chart = new google.visualization.ScatterChart(document.getElementById('chart_div_kmeans_2D'));

        chart.draw(graph_data, options);
    }



}