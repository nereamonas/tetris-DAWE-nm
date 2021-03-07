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
	ctx.fill();  //Rellenar el cuadrado
	ctx.stroke(); //bordear el cuadrado. por defecto es color negro y no dice nada d color

}


Rectangle.prototype.setLineWidth = function(width) { this.lineWidth=width}
Rectangle.prototype.setFill = function(color) { this.color = color}

// ============== Block ===============================

function Block (pos, color) {

	// TU CÓDIGO AQUÍ: este es el constructor de la clase Block. Recibe dos parámetros, pos y color. Pos = posición de la casilla, por ejemplo, (9,19).
	// color = color que hay que emplear para pintar el bloque.
	// Internamente este método crea dos puntos (empleando las coordenadas del pixel)
	// y llama al método init de la clase Rectangle, pasándole como parámetro,
	// estos dos puntos.
	// Sería interesante que emplearas las constantes Block.BLOCK_SIZE y Block.OUTLINE_WIDTH,
	// para establecer la anchura del bloque y la anchura de la línea, respectivamente.

	var x=pos.x; //cogemos la posicion x
	var y=pos.y; //cogemos la posicion y

	//El punto1 tendra q ser la posicion dnd empezara el cuadrado(el punto de arriba a la izq) y el punto2 donde terminará(el punto de abajo a la derecha.
	var puntoUno= new Point(x*Block.BLOCK_SIZE, y*Block.BLOCK_SIZE);   //tenemos q multiplicarlo por el tamaño del bloque. por ejemplo. nos llega q quiere el punto 0 - pues 0*30(q será la longitud del cuadrado)=0. empezará el punto en la pos 0. despues el 1. 1*30=30. empezará el cuadrado en la posicion 30, librando justo el bloque 0. si no lo multiplicariamos se solaparian los cubos. y asi sucesivamente.
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

Block.prototype.can_move = function(board, dx, dy) {
	return true;
}


// ************************************
// *      EJERCICIO 2                  *
// ************************************

function Shape() {}


Shape.prototype.init = function(coords, color) {

	// TU CÓDIGO AQUÍ: método de inicialización de una Pieza del tablero
	// Toma como parámetros: coords, un array de posiciones de los bloques
	// que forman la Pieza y color, un string que indica el color de los bloques
	// Post-condición: para cada coordenada, crea un bloque de ese color y lo guarda en un bloque-array.

	this.blockArray=[]; //Creamos una lista que tendrá todos los bloques

	// Recorremos con forEarch todas las coordenadas q tiene el array coords, Con cada cordenada del array,
	// añadimos en la array de blockes un nuevo blocke con la cordenada y el color(q será para todos igual);
	coords.forEach(cordenada => this.blockArray.push(new Block(cordenada,color)));


};

Shape.prototype.draw = function() {

	// TU CÓDIGO AQUÍ: método que debe pintar en pantalla todos los bloques
	// que forman la Pieza
	this.blockArray.forEach(block => block.draw());   //Recorremos todos los blockes y con el metodo .draw() los pintaremos.

};

// Por ahora, siempre devolverá true

Shape.prototype.can_move = function(board, dx, dy) {
	return true;
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

	// TU CÓDIGO AQUÍ: : Para programar T_Shape toma como ejemplo el código de la clase I_Shape
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


// En esta parte de la práctica devolveremos siempre 'true'
// pero, más adelante, tendremos que implementar este método
// que toma como parámetro la posición (x,y) de una casilla
// (a la que queremos mover una pieza) e indica si es posible
// ese movimiento o no (porque ya está ocupada o porque se sale
// de los límites del tablero)

Board.prototype.can_move = function(x,y){
	return true;
}

// ==================== Tetris ==========================

function Tetris() {
	this.board = new Board(Tetris.BOARD_WIDTH, Tetris.BOARD_HEIGHT);
}

Tetris.SHAPES = [I_Shape, J_Shape, L_Shape, O_Shape, S_Shape, T_Shape, Z_Shape];
Tetris.DIRECTION = {'Left':[-1, 0], 'Right':[1, 0], 'Down':[0, 1]};
Tetris.BOARD_WIDTH = 10;
Tetris.BOARD_HEIGHT = 20;
Tetris.BOARD_COLOR='ivory';

Tetris.prototype.create_new_shape = function(){

	// TU CÓDIGO AQUÍ: 
	// Elegir un nombre de pieza al azar del array Tetris.SHAPES
	// Crear una instancia de ese tipo de pieza (x = centro del tablero, y = 0)
	// Devolver la referencia de esa pieza nueva

	var randomNumber=Math.floor(Math.random()*Tetris.SHAPES.length);  //Cogemos un numero random del 0 al 6. La longitud del array es 7. pero el ultimo no lo coge
	var shape= Tetris.SHAPES[randomNumber]  //Devolvemos el shapes referente a la posicion del numero aleatorio

    var center=Math.trunc(Tetris.BOARD_WIDTH/2);  //el centro del x será la largura del tablero / 2. como puede dar un numero con comas, con esta funcion devolvera el entero.
	var newpoint= new Point(center,0); //Creamos la pieza con la x=centro, y=0

	var piezaNueva= new shape(newpoint);  //shape cogera valor x ejemplo de I_Shape. Asique crearemos un I_shape como atributo pasandole el punto central
	return piezaNueva  //Devolvemos la referencia a la nueva pieza

}

Tetris.prototype.init = function(){

	// Obtener una nueva pieza al azar y asignarla como pieza actual

	this.current_shape = this.create_new_shape()

	// TU CÓDIGO AQUÍ: 
	// Pintar la pieza actual en el tablero
	// Aclaración: (Board tiene un método para pintar)
	this.board.draw_shape(this.current_shape);  //Llamamos al metodo de pintar de board y le pasamoa la pieza actual para q la pinte

}

