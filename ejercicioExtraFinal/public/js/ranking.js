
var ranking=[]
function getRanking() {
    // Cogeremos el localStorage y lo guardamos en un array para poder ordenar automaticamente
    rText=document.getElementById('ranking');
    for (var i=0; i < localStorage.length; i++) { //Recorremos todos los datos del localStorage

        var key=localStorage.key(i);  //Cogemos el key del elemento numero i
        if (key.includes("tetris")){  //Comprobamos si dentro del key esta la palabra postit para ver si pertenece a alguna que nos interese
            var puntuacion = localStorage.getItem(key); //Cogemos el texto del postit actual
            ranking.push(puntuacion);
        }
    }
    ranking=ranking.sort();  //Ordenamos
    ranking=ranking.reverse(); //Revertimos el orden porque lo guarda de manera ascendente
    var i=0;
    for (i=0;i<ranking.length;i++){ //Recorremos los elementos y guardaremos los 10 primeros en el texto que se escribira en pantalla
        if(i<10){
            rText.innerText=rText.innerText+(i+1)+"º : "+ranking[i]+"\n";
        }
    }

};
