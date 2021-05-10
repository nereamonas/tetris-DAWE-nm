const express = require('express')
const app = express()
const fs = require('fs')
const https = require('https')
const http = require('http')

app.use(express.static(__dirname + '/public', { dotfiles : 'allow' }))

app.get('/', (req, res) => {
	res.send('Hello HTTPS!');

})

http.createServer(app).listen(8080, () => {
	console.log('Listening...')
})

var server=https.createServer({
	key: fs.readFileSync('/etc/letsencrypt/live/dawenereamonas.me/privkey.pem'),
	cert: fs.readFileSync('/etc/letsencrypt/live/dawenereamonas.me/fullchain.pem')
}, app);
server.listen(4433, () => {
	console.log('Listening to https...')
});

var usuarios=0;
const realtimeListener=require('socket.io')(server);

var usuarioUno=null;
var usuarioDos=null;

   realtimeListener.on('connection', function(socket){

        

        socket.on("desktop-connect", function(){
                console.log("Desktop connected");
                desktopSocket=socket;
		usuarios=usuarios+1;	
		if (usuarios==1){
			if(usuarioUno==null){
				usuarioUno=socket;
			}else{
				usuarioDos=socket;
			}
			socket.emit('esperar');
			console.log("Estas solo, otra persona tiene que unirse");
		}else{
			if(usuarios==2){
				if(usuarioDos==null){
				        usuarioDos=socket;
				}else{
					usuarioUno=socket;
				}
				usuarioDos.emit('empezarJ2');
				usuarioUno.emit('empezarJ1');
				console.log("Ya estan dos, se puede empexasr");
			}else{
				usuarios=usuarios-1;
				socket.emit('lleno');
				//En cuanto una persona se libere, automaticamente empezará a jugar el jugador que está en espera
				console.log("Ya hay dos personas en la sala");
			}
		}




        });


	socket.on("nextCurrent-shape", function(data){
		console.log("next-current-shape "+data.jugador);
		if(data.jugador=="J1"){
			if(usuarioDos){
				usuarioDos.emit('next-current-shape',data.jugador,data.nextShape,data.currentShape);
			}
		}else{
			if(usuarioUno){
				usuarioUno.emit('next-current-shape',data.jugador,data.nextShape,data.currentShape);
			}
		}
		
	});

	socket.on("move",function(data){
		console.log("move "+data.jugador);
		if(data.jugador=="J1"){
			if(usuarioDos){
				usuarioDos.emit('move',data.jugador,data.direction);
			}
		}else{
			if(usuarioUno){
				usuarioUno.emit('move',data.jugador,data.direction);
			}
		}
	});

	socket.on("rotate",function(data){
		console.log("rotate "+data.jugador);
		if(data.jugador=="J1"){
			if(usuarioDos){
				usuarioDos.emit('rotate',data.jugador);
			}
		}else{
			if(usuarioUno){
				usuarioUno.emit('rotate',data.jugador);
			}
		}
	});

	socket.on("nextShape",function(data){
		console.log("next_shape "+data.jugador);
		if(data.jugador=="J1"){
			if(usuarioDos){
				usuarioDos.emit('nextShape',data.jugador,data.nextShape);
			}
		}else{
			if(usuarioUno){
				usuarioUno.emit('nextShape',data.jugador,data.nextShape);
			}
		}
	});

	socket.on("pausarJuego",function(data){
		console.log("Pausar juego "+data.jugador);
		if(data.jugador=="J1"){
			if(usuarioDos){
				usuarioDos.emit('pausarJuego',data.jugador);
			}
		}else{
			if(usuarioUno){
				usuarioUno.emit('pausarJuego',data.jugador);
			}
		}
	});

	socket.on("reanudarJuego",function(data){
		console.log("Reanudar juego "+data.jugador);
		if(data.jugador=="J1"){
			if(usuarioDos){
				usuarioDos.emit('reanudarJuego',data.jugador);
			}
		}else{
			if(usuarioUno){
				usuarioUno.emit('reanudarJuego',data.jugador);
			}
		}
	});

	socket.on('abandonar',function(data){
		console.log("HA ABANDONADO: "+data.jugador);
		if(data.jugador==1){
			usuarioDos=null;
			usuarioUno.emit('abandonar',data.jugador);
		}else{
			usuarioUno=null;
			usuarioDos.emit('abandonar',data.jugador);
		}
	});
var id=socket.id;
	socket.on('disconnect',function(data){
		if(usuarioDos){
		if (id==usuarioDos.id){
			realtimeListener.emit('abandonar',"J2");
			usuarioDos=null;
			console.log("El otro usuario ha abandonado. Estas solo, otra persona tiene q unirse");
			usuarios=usuarios-1;
		}
		}
		if(usuarioUno){
		if(id==usuarioUno.id){
			realtimeListener.emit('abandonar',"J1");
			usuarioUno=null;
			console.log("El otro usuario ha abandonado. Estas solo, otra persona tiene q unirse");
			usuarios=usuarios-1;
		}
		}
		
	});
   });
