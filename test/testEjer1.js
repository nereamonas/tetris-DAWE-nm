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

    // TU CÓDIGO AQUÍ: este es el constructor de la clase Block. Recibe dos parámetros, pos y color. Pos = posición de la celda, por ejemplo, (9,19).
    // color = color que hay que emplear para pintar el bloque.
    // Internamente este método crea dos puntos (empleando las coordenadas del pixel)
    // y llama al método init de la clase Rectangle, pasándole como parámetro,
    // estos dos puntos.
    // Sería interesante que emplearas las constantes Block.BLOCK_SIZE y Block.OUTLINE_WIDTH,
    // para establecer la anchura del bloque y la anchura de la línea.

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

// TU CÓDIGO: emplea el patrón de herencia (Block es un Rectangle)
Block.prototype = new Rectangle();   //decimos q herede de rectangle
Block.prototype.constructor = Block;  //indicamos q su contructor es block, que sino coge por defecto rectangle


///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////// PRUEBAS ////////////////////////////////////////////////////////////

// cuando hayas implementado los métodos anteriores, las

ctx.fillStyle = 'white';
ctx.fillRect(0,0,canvas.width,canvas.height); //

// siguientes líneas crearán y mostrarán tres bloques en pantalla
var block1 = new Block(new Point(0,0), 'red'),
    block2 = new Block(new Point(1,1), 'blue'),
    block3 = new Block(new Point(2,2), 'green');

block1.draw();
block2.draw();
block3.draw();

QUnit.module('EJERCICIO 1', function() {
    QUnit.test("Subclases", function (assert) {
        assert.ok(block1 instanceof Block, "Passed!");
        assert.ok(block1 instanceof Rectangle, "Passed!");

        assert.ok(block2 instanceof Block, "Passed!");
        assert.ok(block2 instanceof Rectangle, "Passed!");
    });

    var q = require("qunit-assert-canvas");

    QUnit.test('pixel equal test', function (assert) {
        // assert.pixelEqual(canvas, x, y, r, g, b, a, message);
        pixelEqual(canvas, 15, 15, 255, 0, 0, 255, "Passed!");
        pixelEqual(canvas, 45, 45, 0, 0, 255, 255, "Passed!");
        pixelEqual(canvas, 75, 75, 0, 128, 0, 255, "Passed!");

    });
});


