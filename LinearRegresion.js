
//Variables

let xTrain = [];
let yTrain = [];

//let xTrain = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
//let yTrain = [1, 4, 1, 5, 3, 7, 2, 7, 4, 9];
let yPredict;

//Creacion de instancia
let linear = new LinearRegression()

//Entrenamiento
function EntrenarLineal(){
    
    //Obteniendo datos relacionados con el header X
    const selectedHeaderX = document.getElementById('dataSelectX').value; // Obtener encabezado seleccionado
    const headerIndexX = contenidoCSV[0].findIndex((header) => header === selectedHeaderX); // Encontrar el índice del encabezado
    
    for (let index = 1; index < contenidoCSV.length; index++){
        xTrain.push(Number(contenidoCSV[index][headerIndexX]));       
    }
    
    //xTrain = contenidoCSV.map(row => row[headerIndexX]);

    //Obteniendo datos relacionados con el header Y
    const selectedHeaderY = document.getElementById('dataSelectY').value; // Obtener encabezado seleccionado
    const headerIndexY = contenidoCSV[0].findIndex((header) => header === selectedHeaderY); // Encontrar el índice del encabezado

    for (let index = 1; index < contenidoCSV.length; index++){
        yTrain.push(Number(contenidoCSV[index][headerIndexY]));       
    }
    //yTrain = contenidoCSV.map(row => row[headerIndexY]);

    if(xTrain.length !== 0 & yTrain !== 0){
        //document.getElementById("log").innerHTML+='<br>X Train:   '+xTrain+'<br>Y Train:
        linear.fit(xTrain, yTrain);
        document.getElementById("entrenamientoLineal").innerHTML = '<br>X Train:   '+xTrain+'<br>Y Train:   '+yTrain+'<br>';
        alert("EntrenamientoLineal Exitosamente");
    }else{
        alert("Error, no contienes datos para entrenar al modelo");
    }
    
}


//Predicir
function PredecirLineal(){
     // Pedir un Entrada al usuario
     let entrada = prompt("Por favor, ingresa una lista de números separados por comas (por ejemplo: 1,2,3):");

     if (entrada) {
        // Convertir la entrada en un arreglo de números
        let numeros = entrada.split(',')            // Dividir por comas
                             .map(num => num.trim()) // Quitar espacios en blanco
                             .filter(num => !isNaN(num) && num !== "") // Filtrar entradas no numéricas
                             .map(Number);           // Convertir a números

        // Mostrar el arreglo de números si es válido

        if (numeros.length > 0) {
            yPredict = linear.predict(numeros);
            document.getElementById("prediccionLineal").innerHTML ='<br>X Train:   '+xTrain+'<br>Y Train:   '+yTrain+'<br>Y Predict: '+yPredict;
            alert("Datos predecidos correctamente!!");
        } else {
            alert("No ingresaste números válidos.");
        }
    } else {
        alert("No ingresaste nada.");
    }
    
}

//Graficar
function GraficarLineal(){
    
    if (yPredict.length !== 0){
        var a = joinArrays('x',xTrain,'yTrain',yTrain,'yPredict',yPredict)

        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(() => drawChart(a));
        
        alert("Datos Graficados correctamente");    
    }else{
        alert("No tienes datos predecibles");
    }
      
}

function drawChart(a) {
    var data = google.visualization.arrayToDataTable(a);
    var options = {
        seriesType : 'scatter',
        series: {1: {type: 'line'}}
    };  
    var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
    chart.draw(data, options);         
}  