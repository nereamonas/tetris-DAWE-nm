// ************************************
// *     EJERCICIO 1                   *
// ************************************

// ============== Point =======================

function Point (x, y) {
	this.x = x;
	this.y = y;
}

// ============== Rectangle ====================
function Rectangle() {}

Rectangle.prototype.init = function(p1,p2) {
	this.px = p1.x;
	this.py = p1.y;
	this.width = p2.x - p1.x;
	this.height = p2.y - p1.y;
	this.lineWidth= 1;
	this.color = 'black';
}

Rectangle.prototype.draw = function() {

	// TU CÓDIGO AQUÍ:
	// pinta un rectángulo del color actual en pantalla en la posición px,py, con
	// la anchura y altura actual y una línea de anchura=lineWidth. Ten en cuenta que 
	// en este ejemplo la variable ctx es global y que guarda el contexto (context) 
	// para pintar en el canvas.

	ctx.beginPath(); //preparamos para empezar a pintar el camino
	ctx.rect(this.px,this.py,this.width,this.height); //crear un cuadrado. x: desde la raiz x cuanto s separa de la pos 0. y: desde la raiz y cuanto se separa de la pos 0. width: la anchura q cogerá el cuadrado. heigth: la altura q cogerá el cuadrado
	ctx.closePath(); //Cerramos
	ctx.fillStyle=this.color;  //ponerle color al fondo
	ctx.lineWidth=this.lineWidth; //Asignamos la anchura del borde
	ctx.strokeStyle='black';   //ejer 4 - Ahora es necesario agregar está linea, ya q sino pierde el marco y se queda de color blanco
	ctx.fill();  //Rellenar el cuadrado
	ctx.stroke(); //bordear el cuadrado. por defecto es color negro y no dice nada d color

}


Rectangle.prototype.setLineWidth = function(width) { this.lineWidth=width}
Rectangle.prototype.setFill = function(color) { this.color = color}

//** Método introducido en el EJERCICIO 4 */

Rectangle.prototype.move = function(x,y){
	this.px += x;
	this.py += y;
	this.draw();
}

//** Método introducido en el EJERCICIO 4 */

Rectangle.prototype.erase = function(){
	ctx.beginPath();
	ctx.lineWidth = this.lineWidth+2;
	ctx.strokeStyle = Tetris.BOARD_COLOR;
	ctx.rect(this.px, this.py, this.width, this.height);
	ctx.stroke();
	ctx.fillStyle = Tetris.BOARD_COLOR;
	ctx.fill()

}


// ============== Block ===============================

function Block (pos, color) {

	// TU CÓDIGO AQUÍ: este es el constructor de la clase Block. Recibe dos parámetros, pos y color. Pos = posición de la casilla, por ejemplo, (9,19).
	// color = color que hay que emplear para pintar el bloque.
	// Internamente este método crea dos puntos (empleando las coordenadas del pixel)
	// y llama al método init de la clase Rectangle, pasándole como parámetro,
	// estos dos puntos.
	// Sería interesante que emplearas las constantes Block.BLOCK_SIZE y Block.OUTLINE_WIDTH,
	// para establecer la anchura del bloque y la anchura de la línea, respectivamente.

	this.x=pos.x; //cogemos la posicion x. Ejer5: Tenemos q guardarlo en this, xq en Block.prototype.can_move necesitamos coger la posicion actual. si no lo guardo en local, no podre coger esa informacion
	this.y=pos.y; //cogemos la posicion y. Ejer5: Tenemos q guardarlo en this, xq en Block.prototype.can_move necesitamos coger la posicion actual. si no lo guardo en local, no podre coger esa informacion

	//El punto1 tendra q ser la posicion dnd empezara el cuadrado(el punto de arriba a la izq) y el punto2 donde terminará(el punto de abajo a la derecha.
	//var puntoUno= new Point(this.x*Block.BLOCK_SIZE+Block.OUTLINE_WIDTH, this.y*Block.BLOCK_SIZE+Block.OUTLINE_WIDTH);   //tenemos q multiplicarlo por el tamaño del bloque. por ejemplo. nos llega q quiere el punto 0 - pues 0*30(q será la longitud del cuadrado)=0. empezará el punto en la pos 0. despues el 1. 1*30=30. empezará el cuadrado en la posicion 30, librando justo el bloque 0. si no lo multiplicariamos se solaparian los cubos. y asi sucesivamente.
	var puntoUno= new Point(this.x*Block.BLOCK_SIZE + Block.OUTLINE_WIDTH,this.y*Block.BLOCK_SIZE + Block.OUTLINE_WIDTH);  //(sumando eso me pasa el test, sino no :() Se suma el grosor de la linea. Todas las piezas se desplazaran 2 a la derecha y 2 hacia abajo
	var puntoDos= new Point(puntoUno.x+Block.BLOCK_SIZE,puntoUno.y+Block.BLOCK_SIZE); //Ya tenemos el punto 1 que será el principio del cuadrado, punto superior izq. Ahora crearemos el punto 2 que será el final, punto inferior derecho. X esta razon cogeremos el valos¡r x y del anterior punto, sumandole la lonjitud q tendrá el bloque. como antes si entra el punto 0. el puntoUno crearia la posicion (0,0) y aqui quedaria (30,30) sumando la lonjitud. si entra el 1, el puntoUno crearia (30,30) y el puntoDos(60,60). si entra el 2 - se crearia (60,60) y (90,90). asi sucesivamente

	this.init(puntoUno, puntoDos); //Llamamos al metodo init pasandole los dos puntos. para q cree el cuadrado

	//Una vez creado, se inicializa con LineWidth=1 y color=black por defecto. Asique con estos dos metodos ya implementados editaremos dichos valores

	this.setLineWidth(Block.OUTLINE_WIDTH); //El metodo ya creado para editar la anchura del borde. Tenemos el atr con dicho valor. Sino s podria usar this.lineWidth=Block.OUTLINE_WIDTH;

	this.setFill(color); //el metodo ya creado para establecer el color sino podriamos usar this.color=color;

}

Block.BLOCK_SIZE = 30;
Block.OUTLINE_WIDTH = 2;

// TU CÓDIGO AQUÍ: emplea el patrón de herencia (Block es un Rectangle)
Block.prototype = new Rectangle();   //decimos q herede de rectangle
Block.prototype.constructor = Block;  //indicamos q su contructor es block, que sino coge por defecto rectangle


/** Método introducido en el EJERCICIO 4 */


Block.prototype.move = function(dx, dy) {
	this.x += dx;
	this.y += dy;

	Rectangle.prototype.move.call(this, dx * Block.BLOCK_SIZE, dy * Block.BLOCK_SIZE);
}

 /**************************************************
 *	 Código que se da dado para el EJERCICIO 5 *
 ***************************************************/

Block.prototype.can_move = function(board, dx, dy) {
	// TU CÓDIGO AQUÍ: toma como parámetro un increment (dx,dy)
	// e indica si es posible mover el bloque actual si
	// incrementáramos su posición en ese valor
	canmove= board.can_move(this.x+dx, this.y+dy); // en this.x y this.y tenemos la posicion actual que hemos guardado al crear el bloque, asique incrementamos el dx y dy ha esas posiciones y llamamos al metodo de comprobar del board
	return canmove


}

// ************************************
// *      EJERCICIO 2                  *
// ************************************

function Shape() {}


Shape.prototype.init = function(coords, color) {

	// TU CÓDIGO AQUÍ: método de inicialización de una Pieza del tablero
	// Toma como parámetros: coords, un array de posiciones de los bloques
	// que forman la Pieza y color, un string que indica el color de los bloques
	// Post-condición: para cada coordenada, crea un bloque de ese color y lo guarda en un bloque-array

	//Se tiene que llamar blocks. porq los otros metodos ya implementados sino no lo cogen bien
	this.blocks=[]; //Creamos una lista que tendrá todos los bloques

	// Recorremos con forEarch todas las coordenadas q tiene el array coords, Con cada cordenada del array,
	// añadimos en la array de blockes un nuevo blocke con la cordenada y el color(q será para todos igual);
	coords.forEach(cordenada => this.blocks.push(new Block(cordenada,color)));

};

Shape.prototype.draw = function() {

	// TU CÓDIGO AQUÍ: método que debe pintar en pantalla todos los bloques
	// que forman la Pieza
	this.blocks.forEach(block => block.draw());   //Recorremos todos los blockes y con el metodo .draw() los pintaremos.

};

 /**************************************************
 *	 Código que se da dado para el EJERCICIO 5 *
 ***************************************************/

Shape.prototype.can_move = function(board, dx, dy) {
	// TU CÓDIGO AQUÍ: comprobar límites para cada bloque de la pieza
	for (var i=0; i<this.blocks.length;i++){  //Tendremos q recorrer todos los bloques q forman la pieza
		canmove=this.blocks[i].can_move(board,dx,dy); //Llamamos al metodo del blocke para q nos diga si esa pieza se puede mover
		if (!canmove ) { //Si no se puede mover, automaticamente hacemos return false. no se seguira mirando
			return false;
		}
	}
	return true; //Si llegamos hasta aqui es porque to do ha ido correcto asique devolvemos true, es decir q la pieza se podra mover
};

/** Método introducido en el EJERCICIO 4 */

Shape.prototype.move = function(dx, dy) {

	for (block of this.blocks) {
		block.erase();
	}

	for (block of this.blocks) {
		block.move(dx,dy);
	}
};


// ============= I_Shape ================================
function I_Shape(center) {
	var coords = [new Point(center.x - 2, center.y),
		new Point(center.x - 1, center.y),
		new Point(center.x , center.y),
		new Point(center.x + 1, center.y)];

	Shape.prototype.init.call(this, coords, "blue");

}

// TU CÓDIGO AQUÍ: La clase I_Shape hereda de la clase Shape
I_Shape.prototype = new Shape();   //decimos q herede de Shape
I_Shape.prototype.constructor = I_Shape;  //indicamos q su contructor es I_Shape, que sino coge por defecto Shape


// =============== J_Shape =============================
function J_Shape(center) {

	// TU CÓDIGO AQUÍ: Para programar J_Shape toma como ejemplo el código de la clase I_Shape
	var coords = [new Point(center.x - 1, center.y),
		new Point(center.x , center.y),//centro
		new Point(center.x+1 , center.y),
		new Point(center.x+1 , center.y+1)];  //curiosamente es +

	Shape.prototype.init.call(this, coords, "orange");
}

// TU CÓDIGO AQUÍ: La clase J_Shape hereda de la clase Shape
J_Shape.prototype = new Shape();   //decimos q herede de Shape
J_Shape.prototype.constructor = J_Shape;  //indicamos q su contructor es J_Shape, que sino coge por defecto Shape

// ============ L Shape ===========================
function L_Shape(center) {

	// TU CÓDIGO AQUÍ: Para programar L_Shape toma como ejemplo el código de la clase I_Shape
	var coords = [new Point(center.x - 1, center.y),
		new Point(center.x-1 , center.y+1),
		new Point(center.x , center.y),//centro
		new Point(center.x+1 , center.y)];

	Shape.prototype.init.call(this, coords, "cyan");
}

// TU CÓDIGO AQUÍ: La clase L_Shape hereda de la clase Shape
L_Shape.prototype = new Shape();   //decimos q herede de Shape
L_Shape.prototype.constructor = L_Shape;  //indicamos q su contructor es L_Shape, que sino coge por defecto Shape


// ============ O Shape ===========================
function O_Shape(center) {

	// TU CÓDIGO AQUÍ: Para programar O_Shape toma como ejemplo el código de la clase I_Shape
	var coords = [new Point(center.x - 1, center.y),
		new Point(center.x-1 , center.y+1),
		new Point(center.x , center.y),//centro
		new Point(center.x , center.y+1)];

	Shape.prototype.init.call(this, coords, "red");
}

// TU CÓDIGO AQUÍ: La clase O_Shape hereda de la clase Shape
O_Shape.prototype = new Shape();   //decimos q herede de Shape
O_Shape.prototype.constructor = O_Shape;  //indicamos q su contructor es O_Shape, que sino coge por defecto Shape

// ============ S Shape ===========================
function S_Shape(center) {

	// TU CÓDIGO AQUÍ: Para programar S_Shape toma como ejemplo el código de la clase I_Shape
	var coords = [new Point(center.x - 1, center.y+1),
		new Point(center.x , center.y+1),
		new Point(center.x , center.y), //centro
		new Point(center.x + 1, center.y)];

	Shape.prototype.init.call(this, coords, "green");
}

// TU CÓDIGO AQUÍ: La clase S_Shape hereda de la clase Shape
S_Shape.prototype = new Shape();   //decimos q herede de Shape
S_Shape.prototype.constructor = S_Shape;  //indicamos q su contructor es S_Shape, que sino coge por defecto Shape

// ============ T Shape ===========================
function T_Shape(center) {

	// TU CÓDIGO AQUÍ: Para programar T_Shape toma como ejemplo el código de la clase I_Shape
	var coords = [new Point(center.x - 1, center.y),
		new Point(center.x , center.y),//centro
		new Point(center.x , center.y+1),
		new Point(center.x + 1, center.y)];

	Shape.prototype.init.call(this, coords, "yellow");
}

// TU CÓDIGO AQUÍ: La clase T_Shape hereda de la clase Shape
T_Shape.prototype = new Shape();   //decimos q herede de Shape
T_Shape.prototype.constructor = T_Shape;  //indicamos q su contructor es T_Shape, que sino coge por defecto Shape


// ============ Z Shape ===========================
function Z_Shape(center) {

	// TU CÓDIGO AQUÍ: : Para programar Z_Shape toma como ejemplo el código de la clase I_Shape
	var coords = [new Point(center.x - 1, center.y),
		new Point(center.x , center.y),//centro
		new Point(center.x , center.y+1),
		new Point(center.x + 1, center.y+1)];

	Shape.prototype.init.call(this, coords, "magenta");
}

// TU CÓDIGO AQUÍ: La clase Z_Shape hereda de la clase Shape
Z_Shape.prototype = new Shape();   //decimos q herede de Shape
Z_Shape.prototype.constructor = Z_Shape;  //indicamos q su contructor es Z_Shape, que sino coge por defecto Shape


// ************************************
// *     EJERCICIO 3               *
// ************************************

// ====================== BOARD ================

function Board(width, height) {
	this.width = width;
	this.height = height;
	this.grid = {}; /* 6. Estructura de datos introducida en el EJERCICIO 6 */

}


// Si la pieza nueva puede entrar en el tablero, pintarla y devolver true.
// Si no, devoler false

Board.prototype.draw_shape = function(shape){
	if (shape.can_move(this,0,0)){
		shape.draw();
		return true;
    	}
	return false;
}

 /*****************************
 *	 EJERCICIO 6          *
 *****************************/

Board.prototype.add_shape = function(shape){
	// TU CÓDIGO AQUÍ: meter todos los bloques de la pieza que hemos recibido por parámetro en la estructura de datos grid
	for (var i=0;i<shape.blocks.length;i++){
		var block=shape.blocks[i];
		var x= block.x;
		var y= block.y;
		var tuplaxy="("+x+","+y+")";
		this.grid[tuplaxy]=block;
		console.log(shape.blocks[i]);
		console.log(this.grid);

	}
}


// ****************************
// *     EJERCICIO 5          *
// ****************************

Board.prototype.can_move = function(x,y){

 	// TU CÓDIGO AQUÍ:
 	// hasta ahora, este método siempre devolvía el valor true. Ahora,
 	// comprueba si la posición que se le pasa como párametro está dentro de los
	// límites del tablero y en función de ello, devuelve true o false.
	var canmove=false;
	if ((x<this.width && x>=0)&&(y>=0 && y<this.height) ){  //Comprobamos q el punto x e y que nos pasan está dentro de los limites del tablero. es decir entre 0 y la anchura max o altura max
		canmove= true;
	}
	return canmove;
};

// ==================== Tetris ==========================

function Tetris() {
	this.board = new Board(Tetris.BOARD_WIDTH, Tetris.BOARD_HEIGHT);
}

Tetris.SHAPES = [I_Shape, J_Shape, L_Shape, O_Shape, S_Shape, T_Shape, Z_Shape];
Tetris.DIRECTION = {'Left':[-1, 0], 'Right':[1, 0], 'Down':[0, 1]};
Tetris.BOARD_WIDTH = 10;
Tetris.BOARD_HEIGHT = 20;
Tetris.BOARD_COLOR='white';

Tetris.prototype.create_new_shape = function(){

	// TU CÓDIGO AQUÍ:
	// Elegir un nombre de pieza al azar del array Tetris.SHAPES
	// Crear una instancia de ese tipo de pieza (x = centro del tablero, y = 0)
	// Devolver la referencia de esa pieza nueva

	var randomNumber=Math.floor(Math.random()*Tetris.SHAPES.length);  //Cogemos un numero random del 0 al 6. La longitud del array es 7. pero el ultimo no lo coge https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	var shape= Tetris.SHAPES[randomNumber]  //Devolvemos el shapes referente a la posicion del numero aleatorio

	var center=Math.trunc(Tetris.BOARD_WIDTH/2);  //el centro del x será la largura del tablero / 2. como puede dar un numero con comas, con esta funcion devolvera el entero.
	var newpoint= new Point(center,0); //Creamos la pieza con la x=centro, y=0

	var piezaNueva= new shape(newpoint);  //shape cogera valor x ejemplo de I_Shape. Asique crearemos un I_shape como atributo pasandole el punto central
	return piezaNueva  //Devolvemos la referencia a la nueva pieza

}

Tetris.prototype.init = function(){

	/**************
	EJERCICIO 4
	***************/

	// gestor de teclado

	document.addEventListener('keydown', this.key_pressed.bind(this), false);

	// Obtener una nueva pieza al azar y asignarla como pieza actual

	this.current_shape = this.create_new_shape()

	// TU CÓDIGO AQUÍ:
	// Pintar la pieza actual en el tablero
	// Aclaración: (Board tiene un método para pintar)
	this.board.draw_shape(this.current_shape);  //Llamamos al metodo de pintar de board y le pasamoa la pieza actual para q la pinte

}

Tetris.prototype.key_pressed = function(e) {

	var key = e.keyCode ? e.keyCode : e.which;

        // TU CÓDIGO AQUÍ:
	// en la variable key se guardará el código ASCII de la tecla que
	// ha pulsado el usuario. ¿Cuál es el código key que corresponde
	// a mover la pieza hacia la izquierda, la derecha, abajo o a rotarla?
	console.log("Tecla pulsada: "+e.key+"  key: "+key);

	if (key==39){  //Derecha
		this.do_move("Right");
	}else if (key==37){  //Izquierda
		this.do_move("Left");
	}else if (key==40){  //Abajo
		this.do_move("Down");
	}else if (key==32){  //Barra espaciadora
		this.do_move("Space");
	}

}

Tetris.prototype.do_move = function(direction) {

	// TU CÓDIGO AQUÍ: el usuario ha pulsado la tecla Left, Right o Down (izquierda,
	// derecha o abajo). Tenemos que mover la pieza en la dirección correspondiente
	// a esa tecla. Recuerda que el array Tetris.DIRECTION guarda los desplazamientos
	// en cada dirección, por tanto, si accedes a Tetris.DIRECTION[direction],
	// obtendrás el desplazamiento (dx, dy). A continuación analiza si la pieza actual
	// se puede mover con ese desplazamiento. En caso afirmativo, mueve la pieza.

	if (direction=='Space'){

		while(this.current_shape.can_move(this.board, 0, 1)) {  //Iteramos bajando hasta llegar hasta abajo//Tenemos un metodo que nos devolverá true si ese shape puede moverse, pasandole el board y las direcciones de movimiento.
			this.current_shape.move(0, 1); //Llamamos al metodo para que nos mueva la piza actual pasandole las direcciones de movimiento
		}
		//Una vez hemos llegado abajo hacemos lo mismo q con el down
		this.board.add_shape(this.current_shape); //Añadimos la pieza actual al tablero;
		this.current_shape = this.create_new_shape();//Actualizamos el valor del atributo a una nueva pieza al azar
		this.board.draw_shape(this.current_shape); //Dibujar la nueva pieza en el tablero
	}else {

		dx = Tetris.DIRECTION[direction][0];
		dy = Tetris.DIRECTION[direction][1];

		if (this.current_shape.can_move(this.board, dx, dy)) {  //Tenemos un metodo que nos devolverá true si ese shape puede moverse, pasandole el board y las direcciones de movimiento.
			this.current_shape.move(dx, dy); //Llamamos al metodo para que nos mueva la piza actual pasandole las direcciones de movimiento
		}

			/* Código que se pide en el EJERCICIO 6 */
			// else if(direction=='Down')
		// TU CÓDIGO AQUÍ: añade la pieza actual al grid. Crea una nueva pieza y dibújala en el tablero.
		else if (direction == 'Down') { //Si cuando la pieza falla el ultimo movimiento es down.
			this.board.add_shape(this.current_shape); //Añadimos la pieza actual al tablero;
			this.current_shape = this.create_new_shape();//Actualizamos el valor del atributo a una nueva pieza al azar
			this.board.draw_shape(this.current_shape); //Dibujar la nueva pieza en el tablero
		}
	}
}
