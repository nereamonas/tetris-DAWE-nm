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
}


Rectangle.prototype.setLineWidth = function(width) { this.lineWidth=width}
Rectangle.prototype.setFill = function(color) { this.color = color}

/** Método introducido en el EJERCICIO 4 */

Rectangle.prototype.move = function(x,y){
	this.px += x;
	this.py += y;
	this.draw();
}

/** Método introducido en el EJERCICIO 4 */

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
}

Block.BLOCK_SIZE = 30;
Block.OUTLINE_WIDTH = 2;

// TU CÓDIGO AQUÍ: emplea el patrón de herencia (Block es un Rectangle)

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

	/*8 Atributo introducido en el EJERCICIO 8*/
	this.rotation_dir = 1;

};

Shape.prototype.draw = function() {

	// TU CÓDIGO AQUÍ: método que debe pintar en pantalla todos los bloques
	// que forman la Pieza
};

 /**************************************************
 *	 Código que se da dado para el EJERCICIO 5 *
 ***************************************************/

Shape.prototype.can_move = function(board, dx, dy) {
// TU CÓDIGO AQUÍ: comprobar límites para cada bloque de la pieza
};

/* Método introducido en el EJERCICIO 8 */

Shape.prototype.can_rotate = function(board) {

//  TU CÓDIGO AQUÍ: calcula la fórmula de rotación para cada uno de los bloques de
// la pieza. Si alguno de los bloques no se pudiera mover a la nueva posición,
// devolver false. En caso contrario, true.
};

/* Método introducido en el EJERCICIO 8 */

Shape.prototype.rotate = function() {

// TU CÓDIGO AQUÍ: básicamente tienes que aplicar la fórmula de rotación
// (que se muestra en el enunciado de la práctica) a todos los bloques de la pieza 
   

  /* Deja este código al final. Por defecto las piezas deben oscilar en su
     movimiento, aunque no siempre es así (de ahí que haya que comprobarlo) */
    if (this.shift_rotation_dir)
            this.rotation_dir *= -1
};

/* Método introducido en el EJERCICIO 4 */

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

	/* Atributo introducido en el ejercicio 8*/

	this.shift_rotation_dir = true;
	this.center_block = this.blocks[2];

}

// TU CÓDIGO AQUÍ: La clase I_Shape hereda de la clase Shape


// =============== J_Shape =============================
function J_Shape(center) {

	// TU CÓDIGO AQUÍ: Para programar J_Shape toma como ejemplo el código de la clase I_Shape

	/* atributo introducido en el EJERCICIO 8 */
	this.shift_rotation_dir = true;
	this.center_block = this.blocks[1];
	
}

// TU CÓDIGO AQUÍ: La clase J_Shape hereda de la clase Shape

// ============ L Shape ===========================
function L_Shape(center) {

	// TU CÓDIGO AQUÍ: Para programar L_Shape toma como ejemplo el código de la clase I_Shape

	/* atributo introducido en el EJERCICIO 8 */
	this.shift_rotation_dir = true;
       this.center_block = this.blocks[1];
 
}

// TU CÓDIGO AQUÍ: La clase L_Shape hereda de la clase Shape


// ============ O Shape ===========================
function O_Shape(center) {

	// TU CÓDIGO AQUÍ: Para programar O_Shape toma como ejemplo el código de la clase I_Shape

	/* atributo introducido en el EJERCICIO 8 */

       this.center_block = this.blocks[0];

}

// TU CÓDIGO AQUÍ: La clase O_Shape hereda de la clase Shape

/* Código introducido en el EJERCICIO 8*/
// O_Shape la pieza no rota. Sobreescribiremos el método can_rotate que ha heredado de la clase Shape

O_Shape.prototype.can_rotate = function(board){
	return false;
};

// ============ S Shape ===========================
function S_Shape(center) {

	// TU CÓDIGO AQUÍ: Para programar S_Shape toma como ejemplo el código de la clase I_Shape

	/* atributo introducido en el EJERCICIO 8 */


	this.shift_rotation_dir = true;
	this.center_block = this.blocks[0];


}

// TU CÓDIGO AQUÍ: La clase S_Shape hereda de la clase Shape

// ============ T Shape ===========================
function T_Shape(center) {

	// TU CÓDIGO AQUÍ: Para programar S_Shape toma como ejemplo el código de la clase I_Shape


	/* atributo introducido en el EJERCICIO 8 */
	this.shift_rotation_dir = true;
       this.center_block = this.blocks[1];


}

// TU CÓDIGO AQUÍ: La clase T_Shape hereda de la clase Shape


// ============ Z Shape ===========================
function Z_Shape(center) {

	// TU CÓDIGO AQUÍ: Para programar S_Shape toma como ejemplo el código de la clase I_Shape

	/* atributo introducido en el EJERCICIO 8 */

       this.shift_rotation_dir = true;
       this.center_block = this.blocks[1];
}

// TU CÓDIGO AQUÍ: La clase Z_Shape hereda de la clase Shape


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
}

// ****************************
// *     EJERCICIO 5          *
// ****************************

Board.prototype.can_move = function(x,y){

 	// TU CÓDIGO AQUÍ: 
 	// hasta ahora, este método siempre devolvía el valor true. Ahora,
 	// comprueba si la posición que se le pasa como párametro está dentro de los  
	// límites del tablero y en función de ello, devuelve true o false.

	/* EJERCICIO 7 */
	// TU CÓDIGO AQUÍ: código para detectar colisiones. Si la posición x,y está en el diccionario grid, devolver false y true en cualquier otro caso.
 
	return true;
};

Board.prototype.is_row_complete = function(y){
// TU CÓDIGO AQUÍ: comprueba si la línea que se le pasa como parámetro
// es completa o no (se busca en el grid).
};

Board.prototype.delete_row = function(y){
// TU CÓDIGO AQUÍ: Borra del grid y de pantalla todos los bloques de la fila y 
};

Board.prototype.move_down_rows = function(y_start){
/// TU CÓDIGO AQUÍ: 
//  empezando en la fila y_start y hasta la fila 0
//    para todas las casillas de esa fila
//       si la casilla está en el grid  (hay bloque en esa casilla)
//          borrar el bloque del grid
//          
//          mientras se pueda mover el bloque hacia abajo
//              mover el bloque hacia abajo
//          
//          meter el bloque en la nueva posición del grid
};

Board.prototype.remove_complete_rows = function(){
// TU CÓDIGO AQUÍ:
// Para toda fila y del tablero
//   si la fila y está completa
//      borrar fila y
//      mover hacia abajo las filas superiores (es decir, move_down_rows(y-1) )
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


}

Tetris.prototype.key_pressed = function(e) { 

	var key = e.keyCode ? e.keyCode : e.which;

        // TU CÓDIGO AQUÍ:
	// en la variable key se guardará el código ASCII de la tecla que
	// ha pulsado el usuario. ¿Cuál es el código key que corresponde 
	// a mover la pieza hacia la izquierda, la derecha, abajo o a rotarla?

	/* Introduce el código para realizar la rotación en el EJERCICIO 8. Es decir, al pulsar la flecha arriba, rotar la pieza actual */
}

Tetris.prototype.do_move = function(direction) {

	// TU CÓDIGO AQUÍ: el usuario ha pulsado la tecla Left, Right o Down (izquierda,
	// derecha o abajo). Tenemos que mover la pieza en la dirección correspondiente
	// a esa tecla. Recuerda que el array Tetris.DIRECTION guarda los desplazamientos 
	// en cada dirección, por tanto, si accedes a Tetris.DIRECTION[direction], 
	// obtendrás el desplazamiento (dx, dy). A continuación analiza si la pieza actual 
	// se puede mover con ese desplazamiento. En caso afirmativo, mueve la pieza. 

	/* Código que se pide en el EJERCICIO 6 */
	// else if(direction=='Down')
	// TU CÓDIGO AQUÍ: añade la pieza actual al grid. Crea una nueva pieza y dibújala en el tablero.
}

/***** EJERCICIO 8 ******/
Tetris.prototype.do_rotate = function(){

	// TU CÓDIGO AQUÍ: si la pieza actual se puede rotar, rótala. Recueda que Shape.can_rotate y Shape.rotate ya están programadas.
}



