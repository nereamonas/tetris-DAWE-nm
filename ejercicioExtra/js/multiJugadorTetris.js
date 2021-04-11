// ************************************
// *     EJERCICIO 1                   *
// ************************************

//Sonido
function loadAudio(url){
    return new Promise(resolve => {
        const audio= new Audio(url);
        audio.load();
        resolve(audio);
    });
}

function cambiarModoSonido(){
    audioFondo=document.getElementById('audioFondo');
    if(audioFondo.paused){
        sonidoActivado=true;
        audioFondo.play();
        document.getElementById('sonidoJ2').src="imagen/sonidoActivado.png";
        document.getElementById('sonido').src="imagen/sonidoActivado.png";
    }else{
        sonidoActivado=false;
        audioFondo.pause();
        document.getElementById('sonidoJ2').src="imagen/sonidoDesactivado.png";
        document.getElementById('sonido').src="imagen/sonidoDesactivado.png";
    }

}

// ============== Point =======================

function PointJ2 (x, y) {
    this.x = x;
    this.y = y;
}

// ============== Rectangle ====================
function RectangleJ2() {}

RectangleJ2.prototype.init = function(p1, p2) {
    this.px = p1.x;
    this.py = p1.y;
    this.width = p2.x - p1.x;
    this.height = p2.y - p1.y;
    this.lineWidth= 1;
    this.color = 'black';
}

RectangleJ2.prototype.draw = function() {

    // TU CÓDIGO AQUÍ:
    // pinta un rectángulo del color actual en pantalla en la posición px,py, con
    // la anchura y altura actual y una línea de anchura=lineWidth. Ten en cuenta que
    // en este ejemplo la variable ctx es global y que guarda el contexto (context)
    // para pintar en el canvas.

    ctxJ2.beginPath(); //preparamos para empezar a pintar el camino
    ctxJ2.rect(this.px,this.py,this.width,this.height); //crear un cuadrado. x: desde la raiz x cuanto s separa de la pos 0. y: desde la raiz y cuanto se separa de la pos 0. width: la anchura q cogerá el cuadrado. heigth: la altura q cogerá el cuadrado
    ctxJ2.closePath(); //Cerramos
    ctxJ2.fillStyle=this.color;  //ponerle color al fondo
    ctxJ2.lineWidth=this.lineWidth; //Asignamos la anchura del borde
    ctxJ2.strokeStyle='black';   //ejer 4 - Ahora es necesario agregar está linea, ya q sino pierde el marco y se queda de color blanco
    ctxJ2.fill();  //Rellenar el cuadrado
    ctxJ2.stroke(); //bordear el cuadrado. por defecto es color negro y no dice nada d color

}
RectangleJ2.prototype.draw_next = function() {
    ctxNextPiezaJ2.beginPath(); //preparamos para empezar a pintar el camino
    ctxNextPiezaJ2.rect(this.px-90,this.py,this.width,this.height); //crear un cuadrado. x: desde la raiz x cuanto s separa de la pos 0. y: desde la raiz y cuanto se separa de la pos 0. width: la anchura q cogerá el cuadrado. heigth: la altura q cogerá el cuadrado
    ctxNextPiezaJ2.closePath(); //Cerramos
    ctxNextPiezaJ2.fillStyle=this.color;  //ponerle color al fondo
    ctxNextPiezaJ2.lineWidth=this.lineWidth; //Asignamos la anchura del borde
    ctxNextPiezaJ2.strokeStyle='black';   //ejer 4 - Ahora es necesario agregar está linea, ya q sino pierde el marco y se queda de color blanco
    ctxNextPiezaJ2.fill();  //Rellenar el cuadrado
    ctxNextPiezaJ2.stroke(); //bordear el cuadrado. por defecto es color negro y no dice nada d color
}


RectangleJ2.prototype.setLineWidth = function(width) { this.lineWidth=width}
RectangleJ2.prototype.setFill = function(color) { this.color = color}

/** Método introducido en el EJERCICIO 4 */

RectangleJ2.prototype.move = function(x, y){
    this.px += x;
    this.py += y;
    this.draw();
}

/** Método introducido en el EJERCICIO 4 */

RectangleJ2.prototype.erase = function(){
    ctxJ2.beginPath();
    ctxJ2.lineWidth = this.lineWidth+2;
    ctxJ2.strokeStyle = TetrisJ2.BOARD_COLOR;
    ctxJ2.rect(this.px, this.py, this.width, this.height);
    ctxJ2.stroke();
    ctxJ2.fillStyle = TetrisJ2.BOARD_COLOR;
    ctxJ2.fill()

}


// ============== Block ===============================

function BlockJ2 (pos, color) {

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
    var puntoUno= new PointJ2(this.x*BlockJ2.BLOCK_SIZE + BlockJ2.OUTLINE_WIDTH,this.y*BlockJ2.BLOCK_SIZE + BlockJ2.OUTLINE_WIDTH);  //(sumando eso me pasa el test, sino no :() Se suma el grosor de la linea. Todas las piezas se desplazaran 2 a la derecha y 2 hacia abajo
    var puntoDos= new PointJ2(puntoUno.x+BlockJ2.BLOCK_SIZE,puntoUno.y+BlockJ2.BLOCK_SIZE); //Ya tenemos el punto 1 que será el principio del cuadrado, punto superior izq. Ahora crearemos el punto 2 que será el final, punto inferior derecho. X esta razon cogeremos el valos¡r x y del anterior punto, sumandole la lonjitud q tendrá el bloque. como antes si entra el punto 0. el puntoUno crearia la posicion (0,0) y aqui quedaria (30,30) sumando la lonjitud. si entra el 1, el puntoUno crearia (30,30) y el puntoDos(60,60). si entra el 2 - se crearia (60,60) y (90,90). asi sucesivamente

    this.init(puntoUno, puntoDos); //Llamamos al metodo init pasandole los dos puntos. para q cree el cuadrado

    //Una vez creado, se inicializa con LineWidth=1 y color=black por defecto. Asique con estos dos metodos ya implementados editaremos dichos valores

    this.setLineWidth(BlockJ2.OUTLINE_WIDTH); //El metodo ya creado para editar la anchura del borde. Tenemos el atr con dicho valor. Sino s podria usar this.lineWidth=Block.OUTLINE_WIDTH;

    this.setFill(color); //el metodo ya creado para establecer el color sino podriamos usar this.color=color;

}

BlockJ2.BLOCK_SIZE = 30;
BlockJ2.OUTLINE_WIDTH = 2;

// TU CÓDIGO AQUÍ: emplea el patrón de herencia (Block es un Rectangle)
BlockJ2.prototype = new RectangleJ2();   //decimos q herede de rectangle
BlockJ2.prototype.constructor = BlockJ2;  //indicamos q su contructor es block, que sino coge por defecto rectangle

/** Método introducido en el EJERCICIO 4 */

BlockJ2.prototype.move = function(dx, dy) {
    this.x += dx;
    this.y += dy;

    RectangleJ2.prototype.move.call(this, dx * BlockJ2.BLOCK_SIZE, dy * BlockJ2.BLOCK_SIZE);
}

/**************************************************
 *	 Código que se da dado para el EJERCICIO 5 *
 ***************************************************/

BlockJ2.prototype.can_move = function(board, dx, dy) {
    // TU CÓDIGO AQUÍ: toma como parámetro un increment (dx,dy)
    // e indica si es posible mover el bloque actual si
    // incrementáramos su posición en ese valor
    canmove= board.can_move(this.x+dx, this.y+dy); // en this.x y this.y tenemos la posicion actual que hemos guardado al crear el bloque, asique incrementamos el dx y dy ha esas posiciones y llamamos al metodo de comprobar del board
    return canmove
}

// ************************************
// *      EJERCICIO 2                  *
// ************************************

function ShapeJ2() {}


ShapeJ2.prototype.init = function(coords, color) {

    // TU CÓDIGO AQUÍ: método de inicialización de una Pieza del tablero
    // Toma como parámetros: coords, un array de posiciones de los bloques
    // que forman la Pieza y color, un string que indica el color de los bloques
    // Post-condición: para cada coordenada, crea un bloque de ese color y lo guarda en un bloque-array
    //Se tiene que llamar blocks. porq los otros metodos ya implementados sino no lo cogen bien
    this.blocks=[]; //Creamos una lista que tendrá todos los bloques

    // Recorremos con forEarch todas las coordenadas q tiene el array coords, Con cada cordenada del array,
    // añadimos en la array de blockes un nuevo blocke con la cordenada y el color(q será para todos igual);
    coords.forEach(cordenada => this.blocks.push(new BlockJ2(cordenada,color)));

    /*8 Atributo introducido en el EJERCICIO 8*/
    this.rotation_dir = 1;

};

ShapeJ2.prototype.draw = function() {

    // TU CÓDIGO AQUÍ: método que debe pintar en pantalla todos los bloques
    // que forman la Pieza
    this.blocks.forEach(block => block.draw());   //Recorremos todos los blockes y con el metodo .draw() los pintaremos.

};
ShapeJ2.prototype.draw_next = function() {
    this.blocks.forEach(block => block.draw_next());

};

/**************************************************
 *	 Código que se da dado para el EJERCICIO 5 *
 ***************************************************/

ShapeJ2.prototype.can_move = function(board, dx, dy) {
// TU CÓDIGO AQUÍ: comprobar límites para cada bloque de la pieza
    for (var i=0; i<this.blocks.length;i++){  //Tendremos q recorrer todos los bloques q forman la pieza
        canmove=this.blocks[i].can_move(board,dx,dy); //Llamamos al metodo del blocke para q nos diga si esa pieza se puede mover
        if (!canmove ) { //Si no se puede mover, automaticamente hacemos return false. no se seguira mirando
            return false;
        }
    }
    return true; //Si llegamos hasta aqui es porque to do ha ido correcto asique devolvemos true, es decir q la pieza se podra mover

};

/* Método introducido en el EJERCICIO 8 */
ShapeJ2.prototype.can_rotate = function(board) {

//  TU CÓDIGO AQUÍ: calcula la fórmula de rotación para cada uno de los bloques de
// la pieza. Si alguno de los bloques no se pudiera mover a la nueva posición,
// devolver false. En caso contrario, true.

    //Parecido al can_move, pero aplicando la formula de x y
    for (var i=0;i<this.blocks.length;i++){  //Tendremos q recorrer todos los bloques q forman la pieza
        var block=this.blocks[i];
        var x = this.center_block.x -this.rotation_dir*this.center_block.y + this.rotation_dir*block.y   //la fórmula que nos permite rotar una casilla alrededor de otra un ángulo de 90 grados. Esta fórmula nos da las nuevas coordenadas del objeto block de tipo Bloque, cuando se rota alrededor del otro objeto center
        var y = this.center_block.y + this.rotation_dir*this.center_block.x -this.rotation_dir*block.x
        var canmove=board.can_move(x,y);
        if(!canmove){//Si no se puede mover, return false
            return false;
        }
    }
    return true;

};

/* Método introducido en el EJERCICIO 8 */

ShapeJ2.prototype.rotate = function() {

// TU CÓDIGO AQUÍ: básicamente tienes que aplicar la fórmula de rotación
// (que se muestra en el enunciado de la práctica) a todos los bloques de la pieza
    //Cogemos el metodo move ya q será parecido. pero aplicando la formula de x y
    for (block of this.blocks) {
        block.erase();
    }

    for (block of this.blocks) {
        var x = this.center_block.x -this.rotation_dir*this.center_block.y + this.rotation_dir*block.y  //la fórmula que nos permite rotar una casilla alrededor de otra un ángulo de 90 grados. Esta fórmula nos da las nuevas coordenadas del objeto block de tipo Bloque, cuando se rota alrededor del otro objeto center
        var y = this.center_block.y + this.rotation_dir*this.center_block.x -this.rotation_dir*block.x
        block.move(x-block.x,y-block.y);
    }


    /* Deja este código al final. Por defecto las piezas deben oscilar en su
       movimiento, aunque no siempre es así (de ahí que haya que comprobarlo) */
    if (this.shift_rotation_dir)
        this.rotation_dir *= -1
};

/* Método introducido en el EJERCICIO 4 */

ShapeJ2.prototype.move = function(dx, dy) {

    for (block of this.blocks) {
        block.erase();
    }

    for (block of this.blocks) {
        block.move(dx,dy);
    }
};


// ============= I_Shape ================================
function I_ShapeJ2(center) {
    var coords = [new PointJ2(center.x - 2, center.y),
        new PointJ2(center.x - 1, center.y),
        new PointJ2(center.x , center.y),
        new PointJ2(center.x + 1, center.y)];

    ShapeJ2.prototype.init.call(this, coords, "blue");

    /* Atributo introducido en el ejercicio 8*/

    this.shift_rotation_dir = true;
    this.center_block = this.blocks[2];

}

// TU CÓDIGO AQUÍ: La clase I_Shape hereda de la clase Shape
I_ShapeJ2.prototype = new ShapeJ2();   //decimos q herede de Shape
I_ShapeJ2.prototype.constructor = I_ShapeJ2;  //indicamos q su contructor es I_Shape, que sino coge por defecto Shape


// =============== J_Shape =============================
function J_ShapeJ2(center) {

    // TU CÓDIGO AQUÍ: Para programar J_Shape toma como ejemplo el código de la clase I_Shape
    var coords = [new PointJ2(center.x - 1, center.y),
        new PointJ2(center.x , center.y),//centro
        new PointJ2(center.x+1 , center.y),
        new PointJ2(center.x+1 , center.y+1)];  //curiosamente es +

    ShapeJ2.prototype.init.call(this, coords, "orange");

    /* atributo introducido en el EJERCICIO 8 */
    this.shift_rotation_dir = false;  //Esta pieza siempre rota en el mismo sentido. asiq pondremos a false el shift_rotation_dir
    this.center_block = this.blocks[1];

}

// TU CÓDIGO AQUÍ: La clase J_Shape hereda de la clase Shape
J_ShapeJ2.prototype = new ShapeJ2();   //decimos q herede de Shape
J_ShapeJ2.prototype.constructor = J_ShapeJ2;  //indicamos q su contructor es J_Shape, que sino coge por defecto Shape

// ============ L Shape ===========================
function L_ShapeJ2(center) {

    // TU CÓDIGO AQUÍ: Para programar L_Shape toma como ejemplo el código de la clase I_Shape
    var coords = [new PointJ2(center.x - 1, center.y),
        new PointJ2(center.x-1 , center.y+1),
        new PointJ2(center.x , center.y),//centro
        new PointJ2(center.x+1 , center.y)];

    ShapeJ2.prototype.init.call(this, coords, "cyan");

    /* atributo introducido en el EJERCICIO 8 */
    this.shift_rotation_dir = false;  //Esta pieza siempre rota en el mismo sentido. asiq pondremos a false el shift_rotation_dir
    this.center_block = this.blocks[1];

}

// TU CÓDIGO AQUÍ: La clase L_Shape hereda de la clase Shape
L_ShapeJ2.prototype = new ShapeJ2();   //decimos q herede de Shape
L_ShapeJ2.prototype.constructor = L_ShapeJ2;  //indicamos q su contructor es L_Shape, que sino coge por defecto Shape


// ============ O Shape ===========================
function O_ShapeJ2(center) {

    // TU CÓDIGO AQUÍ: Para programar O_Shape toma como ejemplo el código de la clase I_Shape
    var coords = [new PointJ2(center.x - 1, center.y),
        new PointJ2(center.x-1 , center.y+1),
        new PointJ2(center.x , center.y),//centro
        new PointJ2(center.x , center.y+1)];

    ShapeJ2.prototype.init.call(this, coords, "red");

    /* atributo introducido en el EJERCICIO 8 */

    this.center_block = this.blocks[0];

}

// TU CÓDIGO AQUÍ: La clase O_Shape hereda de la clase Shape
O_ShapeJ2.prototype = new ShapeJ2();   //decimos q herede de Shape
O_ShapeJ2.prototype.constructor = O_ShapeJ2;  //indicamos q su contructor es O_Shape, que sino coge por defecto Shape

/* Código introducido en el EJERCICIO 8*/
// O_Shape la pieza no rota. Sobreescribiremos el método can_rotate que ha heredado de la clase Shape

O_ShapeJ2.prototype.can_rotate = function(board){
    return false;
};

// ============ S Shape ===========================
function S_ShapeJ2(center) {

    // TU CÓDIGO AQUÍ: Para programar S_Shape toma como ejemplo el código de la clase I_Shape
    var coords = [new PointJ2(center.x - 1, center.y+1),
        new PointJ2(center.x , center.y+1),
        new PointJ2(center.x , center.y), //centro
        new PointJ2(center.x + 1, center.y)];

    ShapeJ2.prototype.init.call(this, coords, "green");

    /* atributo introducido en el EJERCICIO 8 */


    this.shift_rotation_dir = true;
    this.center_block = this.blocks[0];


}

// TU CÓDIGO AQUÍ: La clase S_Shape hereda de la clase Shape
S_ShapeJ2.prototype = new ShapeJ2();   //decimos q herede de Shape
S_ShapeJ2.prototype.constructor = S_ShapeJ2;  //indicamos q su contructor es S_Shape, que sino coge por defecto Shape

// ============ T Shape ===========================
function T_ShapeJ2(center) {

    // TU CÓDIGO AQUÍ: Para programar S_Shape toma como ejemplo el código de la clase I_Shape
    var coords = [new PointJ2(center.x - 1, center.y),
        new PointJ2(center.x , center.y),//centro
        new PointJ2(center.x , center.y+1),
        new PointJ2(center.x + 1, center.y)];

    ShapeJ2.prototype.init.call(this, coords, "yellow");

    /* atributo introducido en el EJERCICIO 8 */
    this.shift_rotation_dir = false;    //Esta pieza siempre rota en el mismo sentido. asiq pondremos a false el shift_rotation_dir
    this.center_block = this.blocks[1];


}

// TU CÓDIGO AQUÍ: La clase T_Shape hereda de la clase Shape
T_ShapeJ2.prototype = new ShapeJ2();   //decimos q herede de Shape
T_ShapeJ2.prototype.constructor = T_ShapeJ2;  //indicamos q su contructor es T_Shape, que sino coge por defecto Shape


// ============ Z Shape ===========================
function Z_ShapeJ2(center) {

    // TU CÓDIGO AQUÍ: Para programar S_Shape toma como ejemplo el código de la clase I_Shape
    var coords = [new PointJ2(center.x - 1, center.y),
        new PointJ2(center.x , center.y),//centro
        new PointJ2(center.x , center.y+1),
        new PointJ2(center.x + 1, center.y+1)];

    ShapeJ2.prototype.init.call(this, coords, "magenta");

    /* atributo introducido en el EJERCICIO 8 */

    this.shift_rotation_dir = true;
    this.center_block = this.blocks[1];
}

// TU CÓDIGO AQUÍ: La clase Z_Shape hereda de la clase Shape
Z_ShapeJ2.prototype = new ShapeJ2();   //decimos q herede de Shape
Z_ShapeJ2.prototype.constructor = Z_ShapeJ2;  //indicamos q su contructor es Z_Shape, que sino coge por defecto Shape


// ************************************
// *     EJERCICIO 3               *
// ************************************

// ====================== BOARD ================

function BoardJ2(width, height) {
    this.width = width;
    this.height = height;
    this.grid = {}; /* 6. Estructura de datos introducida en el EJERCICIO 6 */
}


// Si la pieza nueva puede entrar en el tablero, pintarla y devolver true.
// Si no, devoler false

BoardJ2.prototype.draw_shape = function(shape){
    if (shape.can_move(this,0,0)){
        shape.draw();
        return true;
    }
    return false;
}
BoardJ2.prototype.draw_next_shape = function(shape){
    shape.draw_next();
}

/*****************************
 *	 EJERCICIO 6          *
 *****************************/

BoardJ2.prototype.add_shape = function(shape){

// TU CÓDIGO AQUÍ: meter todos los bloques de la pieza que hemos recibido por parámetro en la estructura de datos grid
    for (var i=0;i<shape.blocks.length;i++){
        var block=shape.blocks[i];
        var x= block.x;
        var y= block.y;
        var tuplaxy=""+x+","+y+"";
        this.grid[tuplaxy]=block;
    }
}

// ****************************
// *     EJERCICIO 5          *
// ****************************

BoardJ2.prototype.can_move = function(x, y){

    // TU CÓDIGO AQUÍ:
    // hasta ahora, este método siempre devolvía el valor true. Ahora,
    // comprueba si la posición que se le pasa como párametro está dentro de los
    // límites del tablero y en función de ello, devuelve true o false.

    /* EJERCICIO 7 */
    // TU CÓDIGO AQUÍ: código para detectar colisiones. Si la posición x,y está en el diccionario grid, devolver false y true en cualquier otro caso.

    var canmove=false;
    if ((x<this.width && x>=0)&&(y>=0 && y<this.height) ){//Comprobamos q el punto x e y que nos pasan está dentro de los limites del tablero. es decir entre 0 y la anchura max o altura max
        var item=""+x+","+y+""; //Creamos el item igual q cuando los añadimos al grid
        if (!(item in this.grid)){ //si el elemento no esta en grid, la piezsa podrá moverse a esa posicion asiq ponemos canmove=true
            canmove= true;
        }

    }
    return canmove;
};

BoardJ2.prototype.is_row_complete = function(y){
// TU CÓDIGO AQUÍ: comprueba si la línea que se le pasa como parámetro
// es completa o no (se busca en el grid).

    for (var x = 0; x < this.width; x++) { //Recorreremos todas las x
        item = x + "," + y;  //Sacamos el item
        if (!( item in this.grid )) {  //Comprobamos si el item no esta en el grid
            return false;  //Como el item no está dentro devolvemos false directamente. no hay q seguir mirando
        }
    }

    return true; //Si ha recorrido to do el for y ha llegado hasta aqui es que la linea esta completa

};

BoardJ2.prototype.delete_row = function(y){
// TU CÓDIGO AQUÍ: Borra del grid y de pantalla todos los bloques de la fila y
    for (var x = 0; x < this.width; x++) { //Recorreremos todas las x
        item = x + "," + y;  //Sacamos el item
        removeBloquesActualesJ2(this.grid[item]);//Eliminamos tambien de la lista de bloques pintados actualmente en el canvas
        this.grid[item].erase();  //Importante borramos el actual elemento del dibujo
        delete this.grid[item]; //Lo eliminamos del grid
    }


};

BoardJ2.prototype.move_down_rows = function(y_start){
/// TU CÓDIGO AQUÍ:
//  empezando en la fila y_start y hasta la fila 0
    for ( var y = y_start; y >= 0; y-- ) {
//    para todas las casillas de esa fila
        for (var x = 0; x < this.width; x++) {
//       si la casilla está en el grid  (hay bloque en esa casilla)
            item = x + "," + y;  //Aplicamos el patron que tienen los elementos del grid
            if (item in this.grid) {
                var block = this.grid[item];
//            borrar el bloque del grid
                delete this.grid[item];
//          mientras se pueda mover el bloque hacia abajo
                dx = TetrisJ2.DIRECTION['Down'][0];
                dy = TetrisJ2.DIRECTION['Down'][1];
                if (block.can_move(this,dx,dy)){
//              mover el bloque hacia abajo
                    block.erase(); //lo borramos del sitio donde esta. importante
                    block.move(dx,dy); //lo movemos una casilla hacia abajo
                }
//          meter el bloque en la nueva posición del grid
                this.grid[block.x+','+block.y] = block;  //cogemos la posicion x y actual del bloque

            }
        }
    }
};

var puntos=[0,10,30,60,100]
BoardJ2.prototype.remove_complete_rows = function(){
// TU CÓDIGO AQUÍ:
// Para toda fila y del tablero
    var combo=0;  //Puntuacion. contará las lineas eliminadas
    for (var y=0; y<=this.height; y++) {
//   si la fila y está completa
        if (this.is_row_complete(y)) {
//      borrar fila y
            this.delete_row(y);
//      mover hacia abajo las filas superiores (es decir, move_down_rows(y-1) )
            this.move_down_rows(y - 1);

            //Actualizamos puntuacion
            combo++; //Si entra aqui es porq se ha completado una linea . asique sumamos el combo

        }
    }
    //Ya ha recorrido todas asique sumamos a la puntuación optenida: 10*combo.
    //1 linea - 10+2 puntos. / 2lineas - 20+4  /  3lineas: 20+9  / 4lineas: 20+16
    if (combo!=0) {
        var puntosASumar=(puntos[combo]*nivelJ2)  //Segun el combo cogemos la puntuacion que corresponde y lo multiplicamos por el nivel en el que esté el usuario
        if ((puntuacionJ2<200 && (puntuacionJ2+puntosASumar)>=200)||(puntuacionJ2<500 && (puntuacionJ2+puntosASumar)>=500)||(puntuacionJ2<1000 && (puntuacionJ2+puntosASumar)>=1000)||(puntuacionJ2<2000 && (puntuacionJ2+puntosASumar)>=2000)||(puntuacionJ2<4000 && (puntuacionJ2+puntosASumar)>=4000)||(puntuacionJ2<5000 && (puntuacionJ2+puntosASumar)>=5000)){  //Cuando haya cambio de nivel
            nivelJ2++; //Aumentamos el nivel
            clearInterval(intervalJ2);  //Tenemos que parar el interval porq sino siue intenetando sacar piezas.
            tetrisJ2.animate_shape();
            textNivelJ2.innerHTML="Nivel: "+nivelJ2;
        }
        puntuacionJ2 += puntosASumar;
        textPuntuacionJ2.innerHTML = "Puntuación: " + puntuacionJ2;

    }
};

var gameOverJ2=false;

BoardJ2.prototype.game_over = function() {
    loadAudio("audio/sonido_gameover.mp3").then( audio => audio.play());
    clearInterval(intervalJ2);  //Tenemos que parar el interval porq sino siue intenetando sacar piezas.
    // Mostrar mensaje de game over en el canvas
    document.getElementById('gameOverJ2').style.visibility='visible';  //Ponemos visible la foto de game over
    gameOverJ2=true;
    //ctx.font = "50px UnJugadorTetris";
    //ctx.fillStyle = "black";
    //ctx.textAlign = "center";
    //ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2);


}


BoardJ2.prototype.juego_pausado = function() {
    clearInterval(intervalJ2);  //Tenemos que parar el interval porq sino siue intenetando sacar piezas.
    // Si escribimos en el canvas luego no podemos borrarlo entonces usare una imagen, que la pondre en visible o invidible
    document.getElementById('pauseJ2').style.visibility='visible';

}

// ==================== UnJugadorTetris ==========================

function TetrisJ2() {
    this.board = new BoardJ2(TetrisJ2.BOARD_WIDTH, TetrisJ2.BOARD_HEIGHT);
}

TetrisJ2.SHAPES = [I_ShapeJ2, J_ShapeJ2, L_ShapeJ2, O_ShapeJ2, S_ShapeJ2, T_ShapeJ2, Z_ShapeJ2];
TetrisJ2.DIRECTION = {'Left':[-1, 0], 'Right':[1, 0], 'Down':[0, 1]};
TetrisJ2.BOARD_WIDTH = 10;
TetrisJ2.BOARD_HEIGHT = 20;
TetrisJ2.BOARD_COLOR='white';

TetrisJ2.prototype.create_new_shape = function(){

    // TU CÓDIGO AQUÍ:
    // Elegir un nombre de pieza al azar del array UnJugadorTetris.SHAPES
    // Crear una instancia de ese tipo de pieza (x = centro del tablero, y = 0)
    // Devolver la referencia de esa pieza nueva

    var randomNumber=Math.floor(Math.random()*TetrisJ2.SHAPES.length);  //Cogemos un numero random del 0 al 6. La longitud del array es 7. pero el ultimo no lo coge https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    var shape= TetrisJ2.SHAPES[randomNumber]  //Devolvemos el shapes referente a la posicion del numero aleatorio

    var center=Math.trunc(TetrisJ2.BOARD_WIDTH/2);  //el centro del x será la largura del tablero / 2. como puede dar un numero con comas, con esta funcion devolvera el entero.
    var newpoint= new PointJ2(center,0); //Creamos la pieza con la x=centro, y=0

    var piezaNueva= new shape(newpoint);  //shape cogera valor x ejemplo de I_Shape. Asique crearemos un I_shape como atributo pasandole el punto central
    //var piezaNueva= new S_Shape(newpoint);  //Para pasar el test del ejercicio 4, 5 y 6(parte 1) - Para este ejercicio creamos una S_SHAPE SIEMPRE.  tendremos q descomentar esta linea

    return piezaNueva  //Devolvemos la referencia a la nueva pieza

}

var tetrisJ2;
var centroS = Math.trunc(TetrisJ2.BOARD_WIDTH/2);
var centroNextShape = 4;
TetrisJ2.prototype.init = function(){
    tetrisJ2=this;
    /**************
     EJERCICIO 4
     ***************/

    // gestor de teclado

    document.addEventListener('keydown', this.key_pressed.bind(this), false);

    // Obtener una nueva pieza al azar y asignarla como pieza actual
    this.next_shape = this.create_new_shape(centroNextShape);
    // obtener una nueva pieza al azar y asignarla como pieza actual
    this.current_shape = this.create_new_shape(centroS);

    // TU CÓDIGO AQUÍ:
    // Pintar la pieza actual en el tablero
    // Aclaración: (Board tiene un método para pintar)
    //this.board.draw_shape(this.current_shape);  //Dibujar la nueva pieza en el tablero. Ya no llamaremos a este metodo porque se llama automaticamente para evitar los fallos de dibujado
    pushBloquesActualesJ2(this.current_shape); //Añadimos la nueva pieza a la lista de piezas dibujadas actualmente

    //Tendremos q crear un metodo draw para los next
    this.board.draw_next_shape(this.next_shape);

    // Crea el código del método UnJugadorTetris.animate_shape (más abajo lo verás)
    this.animate_shape();

}

var tetris_pausedJ2=false;
var sonidoActivado=false;
TetrisJ2.prototype.key_pressed = function(e) {

    var key = e.keyCode ? e.keyCode : e.which;

    // TU CÓDIGO AQUÍ:
    // en la variable key se guardará el código ASCII de la tecla que
    // ha pulsado el usuario. ¿Cuál es el código key que corresponde
    // a mover la pieza hacia la izquierda, la derecha, abajo o a rotarla?
    //console.log("Tecla pulsada: "+e.key+"  key: "+key);

    /* Introduce el código para realizar la rotación en el EJERCICIO 8. Es decir, al pulsar la flecha arriba, rotar la pieza actual */
    if(!gameOverJ2) {
        if (!tetris_pausedJ2) {  //Si el tetris no está pausado
            if (key==68){  //d - Derecha
                this.do_move("Right");
            }else if (key==65){  //a - Izquierda
                this.do_move("Left");
            }else if (key==83){  //s - Abajo
                this.do_move("Down");
            }else if (key==88){  //x - Barra espaciadora
                this.do_move("Space");
            }else if (key==87){  //w - Arriba
                loadAudio("audio/sonido_rotar.mp3").then( audio => audio.play());
                this.do_rotate();
            }else if (key==90){  //z  - pausar juego
                console.log("Juego pausado");
                this.board.juego_pausado();
                tetris_pausedJ2 = true;
                clearInterval(intervalJ2);  //Tenemos que parar el interval porq sino sigue intenetando sacar piezas.
                //Mirar si el audio estaba activado, en ese caso pausarlo
                if (sonidoActivado) {
                    document.getElementById('audioFondo').pause();
                }
            }
        } else {
            if (key == 90) {  //Z  - pausar juego
                console.log("Reanudar juego");
                document.getElementById('pauseJ2').style.visibility = 'hidden';
                tetris_pausedJ2 = false;
                tetrisJ2.animate_shape();
                //Mirar si el audio estaba activado antes de pausarlo, en ese caso se habra pausado, por lo que tenemos q volver a activarlo
                if (sonidoActivado) {
                    document.getElementById('audioFondo').play();
                }
            }
        }
    }




}

TetrisJ2.prototype.do_move = function(direction) {

    // TU CÓDIGO AQUÍ: el usuario ha pulsado la tecla Left, Right o Down (izquierda,
    // derecha o abajo). Tenemos que mover la pieza en la dirección correspondiente
    // a esa tecla. Recuerda que el array UnJugadorTetris.DIRECTION guarda los desplazamientos
    // en cada dirección, por tanto, si accedes a UnJugadorTetris.DIRECTION[direction],
    // obtendrás el desplazamiento (dx, dy). A continuación analiza si la pieza actual
    // se puede mover con ese desplazamiento. En caso afirmativo, mueve la pieza.

    var piezaFinal=false;
    if (direction=='Space'){

        while(this.current_shape.can_move(this.board, 0, 1)) {  //Iteramos bajando hasta llegar hasta abajo//Tenemos un metodo que nos devolverá true si ese shape puede moverse, pasandole el board y las direcciones de movimiento.
            this.current_shape.move(0, 1); //Llamamos al metodo para que nos mueva la piza actual pasandole las direcciones de movimiento
        }
        piezaFinal=true;//Una vez hemos llegado abajo ponemos este atributo a true para fijar la pieza

    }else {

        dx = TetrisJ2.DIRECTION[direction][0];
        dy = TetrisJ2.DIRECTION[direction][1];

        if (this.current_shape.can_move(this.board, dx, dy)) {  //Tenemos un metodo que nos devolverá true si ese shape puede moverse, pasandole el board y las direcciones de movimiento.
            this.current_shape.move(dx, dy); //Llamamos al metodo para que nos mueva la piza actual pasandole las direcciones de movimiento
        }

            /* Código que se pide en el EJERCICIO 6 */
            // else if(direction=='Down')
        // TU CÓDIGO AQUÍ: añade la pieza actual al grid. Crea una nueva pieza y dibújala en el tablero.
        else if (direction == 'Down') { //Si cuando la pieza falla el ultimo movimiento es down.
            piezaFinal=true; //un atributo para fijar la pieza luego
        }
    }
    if (piezaFinal){
        loadAudio("audio/sonido_espacio.mp3").then( audio => audio.play());
        this.board.add_shape(this.current_shape); //Añadimos la pieza actual al tablero;
        var pieza = this.next_shape.constructor;
        this.next_shape = this.create_new_shape(centroNextShape);
        //this.current_shape = new pieza(centroS);
        this.current_shape = new pieza(new PointJ2(centroS,0));
        // crear nueva pieza y asignarla a 'next_shape'

        //this.board.draw_shape(this.current_shape); //Dibujar la nueva pieza en el tablero. Ya no llamaremos a este metodo porque se llama automaticamente para evitar los fallos de dibujado
        pushBloquesActualesJ2(this.current_shape); //Añadimos la nueva pieza a la lista de piezas dibujadas actualmente
        ctxNextPiezaJ2.clearRect(0,0,200,200);
        this.board.draw_next_shape(this.next_shape);
        //Llamar a remove_complete_rows
        this.board.remove_complete_rows();
        // Comprobamos si la nueva pieza puede entrar o ha terminado el juego
        if(!this.current_shape.can_move(this.board, 0, 0)){  //Como cuando pintamos una pieza. primero comprobamos que se pueda mover ahi para pintar. si no se puede mover, es que se ha acabado el huego porq no hay huevo libre
            this.board.game_over();
            this.dialogoFinPartida();
        }

    }

}

/***** EJERCICIO 8 ******/
TetrisJ2.prototype.do_rotate = function(){

    // TU CÓDIGO AQUÍ: si la pieza actual se puede rotar, rótala. Recueda que Shape.can_rotate y Shape.rotate ya están programadas.
    if (this.current_shape.can_rotate(this.board)){
        this.current_shape.rotate(this.board);
    }
}

var intervalJ2
TetrisJ2.prototype.animate_shape = function(){
// TU CÓDIGO AQUÍ: genera un timer que mueva hacia abajo la pieza actual cada segundo
    var tetrisJ2 = this;
    intervalJ2=setInterval(function(){tetrisJ2.do_move('Down')},1000/nivelJ2);
}

TetrisJ2.prototype.dialogoFinPartida=function(){
    console.log("FIN PARTIDA J2");
    var nombre = prompt("Indica tu nombre para guardar la puntuación obtenida");  //Le pedimos al usuario que diga un nombre para guardar su puntuacion en el ranking

    if (nombre!=="") {  //Si es distinto de null, significa que ha insertado un nombre para guardar la puntuacion
        localStorage.setItem("tetris"+localStorage.length, puntuacionJ2+" puntos - "+nombre);  //Añadimos al localStorage el valor que queremos almacenar. he puesto tetris+localStorage.length, para ponerle como un identificador y que aunq pongas el mismo nombre y mismos puntos siempre lo guarde
    }
}

var bloquesActualesJ2 = new Array();  //Array donde guardaremos todos los bloques que están actualmente pintados en el tablero

function pushBloquesActualesJ2(newshape){ //Le pasamos una pieza y guardaremos cada bloque de la pieza en el array bloquesActuales
    newshape.blocks.forEach(block => bloquesActualesJ2.push(block));
}

function removeBloquesActualesJ2(removeBlock){ //Le pasamos una pieza y guardaremos cada bloque de la pieza en el array bloquesActuales
    posicion = bloquesActualesJ2.indexOf(removeBlock); //Buscamos la posicion del array donde esta ese bloque
    bloquesActualesJ2.splice(posicion, 1); //Con splice borramos el elemento de una posicion concreta
}

function pintarBloquesActualesJ2(){
    ctx.clearRect(0, 0, ctx.width, ctx.height); //Borramos el canvas
    bloquesActualesJ2.forEach(block => block.draw()); //Recorremos todos los bloques del array bloquesActuales y lo pintamos en el canvas
    requestAnimationFrame(pintarBloquesActuales); //Volvemos a llamar al metodo pintar, para que este continuamente llamandolo
}

requestAnimationFrame(pintarBloquesActualesJ2);