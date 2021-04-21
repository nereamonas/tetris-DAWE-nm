////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////PIXELEQUALS // PIXELNOTEQUALS ////////////////////////////////
var _slicer = Array.prototype.slice;

function _getImagePixelData(canvas, x, y) {
    return _slicer.apply(canvas.getContext("2d").getImageData(x, y, 1, 1).data);
}

function _getPushContext(context) {
    var pushContext;

    if (context && typeof context.push === "function") {
        // `context` is an `Assert` context
        pushContext = context;
    }
    else if (context && context.assert && typeof context.assert.push === "function") {
        // `context` is a `Test` context
        pushContext = context.assert;
    }
    else if (
        QUnit && QUnit.config && QUnit.config.current && QUnit.config.current.assert &&
        typeof QUnit.config.current.assert.push === "function"
    ) {
        // `context` is an unknown context but we can find the `Assert` context via QUnit
        pushContext = QUnit.config.current.assert;
    }
    else if (QUnit && typeof QUnit.push === "function") {
        pushContext = QUnit.push;
    }
    else {
        throw new Error("Could not find the QUnit `Assert` context to push results");
    }

    return pushContext;
}

function pixelEqual(canvas, x, y, r, g, b, a, message) {
    if (typeof a === "string" && typeof message === "undefined") {
        message = a;
        a = undefined;
    }

    var actual = _getImagePixelData(canvas, x, y),
        expected = [r, g, b, a],
        pushContext = _getPushContext(this);

    if (typeof a === "undefined") {
        actual.pop();
        expected.pop();
    }

    message = message || "Pixel should be: " + _dumpArray(expected);
    pushContext.push(QUnit.equiv(actual, expected), actual, expected, message);
}

function notPixelEqual(canvas, x, y, r, g, b, a, message) {
    if (typeof a === "string" && typeof message === "undefined") {
        message = a;
        a = undefined;
    }

    var actual = _getImagePixelData(canvas, x, y),
        expected = [r, g, b, a],
        pushContext = _getPushContext(this);

    if (typeof a === "undefined") {
        actual.pop();
        expected.pop();
    }

    message = message || "Pixel should not be: " + _dumpArray(expected);
    pushContext.push(!QUnit.equiv(actual, expected), actual, expected, message);
}


///////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// HTML DOCUMENT /////////////////////////////////////////////////////

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let dom = new JSDOM('<!DOCTYPE html><body><canvas id="canvas" width="150" height="150"></canvas></body>');
let document=dom.window.document;
var canvas =dom.window.document.getElementById("canvas");
var ctx = canvas.getContext("2d");


//////////////////////////////////////////////////////////////////////////////////////////////
///////////////// FICHERO JS ////////////////////////////////////////////////////////////////

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
    //var puntoUno= new Point(x*Block.BLOCK_SIZE, y*Block.BLOCK_SIZE);   //tenemos q multiplicarlo por el tamaño del bloque. por ejemplo. nos llega q quiere el punto 0 - pues 0*30(q será la longitud del cuadrado)=0. empezará el punto en la pos 0. despues el 1. 1*30=30. empezará el cuadrado en la posicion 30, librando justo el bloque 0. si no lo multiplicariamos se solaparian los cubos. y asi sucesivamente.
    var puntoUno= new Point(x*Block.BLOCK_SIZE + Block.OUTLINE_WIDTH,y*Block.BLOCK_SIZE + Block.OUTLINE_WIDTH);  //(sumando eso me pasa el test, sino no :() Se suma el grosor de la linea. Todas las piezas se desplazaran 2 a la derecha y 2 hacia abajo
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


// ************************************
// *      EJERCICIO 2                  *
// ************************************

// ============== Shape ===================================

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




///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////// PRUEBAS ////////////////////////////////////////////////////////////


QUnit.module('EJERCICIO 2.1', function() {
    // clear the canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,canvas.width,canvas.height); //

    var shape = new I_Shape(new Point(3, 1));
    shape.draw();

    QUnit.test( "Subclases", function( assert ) {
        assert.ok( shape instanceof Shape, "Passed!" );
        assert.ok( shape instanceof I_Shape , "Passed!" );
    });

    QUnit.test('pixel equal test', function(assert) {
        // assert.pixelEqual(canvas, x, y, r, g, b, a, message);
        pixelEqual(canvas, 15, 45, 255, 255, 255, 255, "Blanco");
        pixelEqual(canvas, 45, 45, 0, 0, 255, 255, "Azul1");
        pixelEqual(canvas, 75, 45, 0, 0, 255, 255, "Azul2");
        pixelEqual(canvas, 105, 45, 0, 0, 255, 255, "Azul3");
        pixelEqual(canvas, 135, 45, 0, 0, 255, 255, "Azul4");
    });

});

QUnit.module('EJERCICIO 2.2', function() {

    // canvas related variables
    var canvas = document.getElementById("canvas");
    canvas.setAttribute("width",1000);
    var ctx = canvas.getContext("2d");

    // clear the canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,canvas.width,canvas.height); //

    var tetrominos = [I_Shape, J_Shape, L_Shape, O_Shape, S_Shape, T_Shape, Z_Shape];
    x = 3;
    var shapes = [];
    tetrominos.forEach( function ( tetromino ) {
        shape = new tetromino(new Point(x, 1));
        shapes.push(shape);
        shape.draw();
        x += 4;
    });

    QUnit.test( "Subclases", function( assert ) {
        assert.ok( shapes[0] instanceof Shape, "Passed!" );
        assert.ok( shapes[0] instanceof I_Shape , "Passed!" );

        assert.ok( shapes[1] instanceof Shape, "Passed!" );
        assert.ok( shapes[1] instanceof J_Shape , "Passed!" );

        assert.ok( shapes[2] instanceof Shape, "Passed!" );
        assert.ok( shapes[2] instanceof L_Shape , "Passed!" );

        assert.ok( shapes[3] instanceof Shape, "Passed!" );
        assert.ok( shapes[3] instanceof O_Shape , "Passed!" );

        assert.ok( shapes[4] instanceof Shape, "Passed!" );
        assert.ok( shapes[4] instanceof S_Shape , "Passed!" );

        assert.ok( shapes[5] instanceof Shape, "Passed!" );
        assert.ok( shapes[5] instanceof T_Shape , "Passed!" );

        assert.ok( shapes[6] instanceof Shape, "Passed!" );
        assert.ok( shapes[6] instanceof Z_Shape , "Passed!" );
    });

    QUnit.test('pixel equal test', function(assert) {
        // assert.pixelEqual(canvas, x, y, r, g, b, a, message);
        //    ctx.fillStyle = 'black';
        //    ctx.fillRect(15*8*2,45,4,4);
        pixelEqual(canvas, 15, 45, 255, 255, 255, 255, "White");
        pixelEqual(canvas, 15*3*2, 45, 0, 0, 255, 255, "Blue");
        pixelEqual(canvas, 15*8*2, 45, 255, 165, 0, 255, "Orange");
        pixelEqual(canvas, 15*12*2, 45, 0, 255, 255, 255, "Cyan");
        pixelEqual(canvas, 15*16*2, 45, 255, 0, 0, 255, "Red");
        pixelEqual(canvas, 15*21*2, 45, 0, 128, 0, 255, "Green");
        pixelEqual(canvas, 15*24*2, 45, 255, 255, 0, 255, "Yellow");
        pixelEqual(canvas, 15*28*2, 45, 255, 0, 255, 255, "Magenta");
    });


});
