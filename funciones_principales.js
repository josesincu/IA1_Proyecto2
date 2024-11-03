// Implementar
/*
Linear Regression
Polynomial Regression
Decision Tree
Naive Bayes
Neuronal Network
KMeans
K-Nearest Neighbor
*/


/*
    Regresion Lineal
    K-Means
    Albol de desicion
*/
//Variables
let contenidoCSV = [];


//funcion para cargar archivo csv
function handleFile(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        // Cuando el archivo se carga, mostrar el contenido en consola o en la página
        reader.onload = function(e) {
            const content = e.target.result;
            const rows = content.split('\n');
            contenidoCSV = rows.map(row => row.split(';'));
            //console.log(contenidoCSV); // Aquí tienes el arreglo con los datos del CSV
        };
        reader.readAsText(file);
        alert("Archivo cargado correctamente!!!");

    } else {
        alert("No se seleccionó ningún archivo.");
    }
}

// Cambiar los paneles de los algoritmos
function showPanel(panelId) {
    document.querySelectorAll('.panel').forEach(panel => {
        panel.classList.remove('active');
    });
    document.getElementById(panelId).classList.add('active');
    console.log(contenidoCSV);
    if(panelId === "DecisionTrees"){
        
        document.getElementById("header").value = contenidoCSV[1][0].slice(1, -1).split(',');
        //const isTwoDimensional = Array.isArray(contenidoCSV) && contenidoCSV.every(row => Array.isArray(row));
       
        let tempData = "";
        JSON.parse(contenidoCSV[1][1]).forEach(arr => {
            tempData += arr +"\n";
        });

        document.getElementById("textarea").value = tempData;
        document.getElementById("data").value = contenidoCSV[1][2].slice(1, -1).split(',');
    }
    
}

// Panel para Regresion Lineal
function showPanelLineal(panelId) {
    document.querySelectorAll('.panelLineal').forEach(panel => {

        panel.classList.remove('activeLineal');
    });
    
    document.getElementById(panelId).classList.add('activeLineal');

    //Cargando los datos con cada modelo 
    //Variable SelectX
    const selectX = document.getElementById('dataSelectX');
    selectX.innerHTML = ''; // Limpiar opciones anteriores

    //Variable SelectX
    const selectY = document.getElementById('dataSelectY');
    selectY.innerHTML = ''; // Limpiar opciones anteriores

    // Obteniendo los encabezados
    let encabezado = contenidoCSV[0];

    // Agregar opciones al select para X
    encabezado.forEach(row => {
        const option = document.createElement('option');
        option.value = row; // Usar XEntrenamiento como valor
        option.textContent = row; // Mostrar ambos valores
        selectX.appendChild(option);
    });

    // Agregar opciones al select para Y
    encabezado.forEach(row => {
        const option = document.createElement('option');
        option.value = row; // Usar XEntrenamiento como valor
        option.textContent = row; // Mostrar ambos valores
        selectY.appendChild(option);
    });
}

// Panel para KMeans
function showPanelKmeans(panelId) {
    document.querySelectorAll('.panelKmeans').forEach(panel => {

        panel.classList.remove('activeKmeans');
    });
    
    document.getElementById(panelId).classList.add('activeKmeans');

    if(panelId === "KmeansLineal"){
        document.getElementById("cluster_count").value = contenidoCSV[1][0];
        document.getElementById("linear_data").value = JSON.parse(contenidoCSV[1][1]);
        document.getElementById("iterations").value = contenidoCSV[1][2];
    }else if(panelId === "Kmeans2D"){
        document.getElementById("2d_cluster_count").value = contenidoCSV[1][0];
        console.log(contenidoCSV[1][1]);
        document.getElementById("2d_data").value = contenidoCSV[1][1];
        document.getElementById("2d_iterations").value = contenidoCSV[1][2];
    }else{
        alert("Error, este modelo no posee entradas aun!!!");
    }
}
