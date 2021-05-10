
var serverURL = window.location.host;
var desktopId=generateID();
document.addEventListener('DOMContentLoaded', function(){
        var socket=io.connect(serverURL);
        socket.emit('desktop-connect',desktopId);
	socket.on('empezarJ1',empezar);
	socket.on('esperar',esperar);
	socket.on('lleno',lleno);
	socket.on('empezarJ2',empezarJ2);
	socket.on('next-current-shape',nextCurrentShape);
	socket.on('move',move);
	socket.on('rotate',rotate);
	socket.on('nextShape',nextShape);
	socket.on('pausarJuego',pausarJuego);
	socket.on('reanudarJuego',reanudarJuego);
	socket.on('abandonar',abandonar);
});
var game;
var gameJ2;
var onlineJ1;
var onlineJ2;

function pausarJuego(jugador){
	if(jugador=="J1"){
		onlineJ1.pausarJuego();
	}else{
		onlineJ2.pausarJuego();
	}
}
function reanudarJuego(jugador){
	if(jugador=="J1"){
		onlineJ1.reanudarJuego();
	}else{
		onlineJ2.reanudarJuego();
	}
	
}
function nextShape(jugador,next){
	if(jugador=="J1"){
		onlineJ1.nueva_pieza(next);
	}else{
		onlineJ2.nueva_pieza(next);
	}
	
}

function rotate(jugador){
	if(jugador=="J1"){
		onlineJ1.do_rotate();
	}else{
		onlineJ2.do_rotate();
	}
	
}


function move(jugador,direction){
	if(jugador=="J1"){
		onlineJ1.do_move(direction);
	}else{
		onlineJ2.do_move(direction);
	}
	
}
function nextCurrentShape(jugador,next,current){
	console.log("NEXTTCURRENTSHAPE");
	if(jugador=="J1"){
		console.log("CREAR TABLERO");
		onlineJ1= new TetrisOnlineJ1();
		onlineJ1.init(next,current);
	}else{

	console.log("CREAMOS EL TABLERO DEL JUGADOR 2");
		onlineJ2= new TetrisOnlineJ2();
		onlineJ2.init(next,current);
	}
	
}

function abandonar(jugador){
if(jugador=="J1"){
	gameJ2=null;
	onlineJ1=null;
	document.getElementById('informacion').innerHTML="El jugador 1 ha abandonado la partida.";

}else{
	game=null;
      	onlineJ2=null;
        document.getElementById('informacion').innerHTML="El jugador 2 ha abandonado la partida.";
}
location.reload();//Actualizamos las paginas, para que así el que este en espera detecte que se ha ido uno y pueda empezar a jugar el

document.getElementById('tableroTetris').style.visibility="hidden";

}

function empezarJ2(){
document.getElementById('tableroTetris').style.visibility="visible";
        document.getElementById('informacion').innerHTML="Eres el jugador 2";
	console.log("EMPEZAR J2");

	gameJ2=new TetrisJ2();
    gameJ2.init();
  }
function empezar(){
	document.getElementById('tableroTetris').style.visibility="visible";
	document.getElementById('informacion').innerHTML="Eres el jugador 1";

	game= new Tetris();
	game.init();
}



function esperar(){
document.getElementById('informacion').innerHTML = "Estas solo en la sala, otra persona tiene que unirse";
}

function lleno(){
        document.getElementById('informacion').innerHTML = "La sala se encuentra llena en estos momentos. <br>Espere hasta que alguien abandone la sala o vuelve a intentarlo más tarde.";
}



function generateID(){
    // generate random 5 character id for the session
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now();
    }
    var uuid = 'xxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}
