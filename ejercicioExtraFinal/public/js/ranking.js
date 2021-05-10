//Creamos un map para guardar los puntos / el nombre de la persona
var mapRanking=new Map();

function getRanking() {
    // Cogeremos el localStorage y lo guardamos en un array para poder ordenar automaticamente
    rText=document.getElementById('ranking');
    for (var i=0; i < localStorage.length; i++) { //Recorremos todos los datos del localStorage
        var key=localStorage.key(i);  //Cogemos el key del elemento numero i
        if (key.includes("tetris")){  //Comprobamos si dentro del key esta la palabra postit para ver si pertenece a alguna que nos interese
            var puntuacion = localStorage.getItem(key); //Cogemos el texto del postit actual
            var split=puntuacion.split(' puntos - ');
            mapRanking.set(' puntos - '+split[1],parseInt(split[0]));
        }
    }

    //Tendremos que ordenar el array por la cantidad de puntos
    mapRanking[Symbol.iterator] = function* () {
        yield* [...this.entries()].sort((a, b) => b[1] - a[1]);
    }
    var i=0;
    //Recorremos los elementos para imprimirlos en la pantalla
    for (let [key, value] of mapRanking) {
        if (i < 10) {
            i++;
            rText.innerText = rText.innerText + (i) + "º : " + value + key + "\n";
        }
    }

};
