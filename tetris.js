const cvs =  document.getElementById("tetris");
const ctx = cvs.getContext("2d");

const row = 20;
const col = column = 10;
const sq = squareSize = 20;
const vacant = "WHITE"; //colour of empty square

//drawing squares

function drawSquare(x,y,colour){
  ctx.fillStyle = colour;
  ctx.fillRect(x*sq,y*sq,sq,sq);

  ctx.strokeStyle = "black";
  ctx.strokeRect(x*sq,y*sq,sq,sq);

}

//create board and setting all squares to be vacant

let board = [];
for(var r=0; r<row ; r++){
  board[r] = [];
  for(var c=0; c<col ; c++){
    board[r][c] = vacant;
  }
}

//draw board
//Why new function? We have to call drawboard over and over!!
function drawBoard() {
  for(var r=0 ; r<row ; r++){
    for(var c=0 ; c<col ; c++){
      drawSquare(c,r,board[r][c]);
    }
  }
}

drawBoard();


//associating pieces with their colours

const pieces = [
  [Z,"red"],
  [S,"green"],
  [T,"yellow"],
  [O,"blue"],
  [L,"purple"],
  [I,"cyan"],
  [J,"orange"]
];
//initate pieces

let p = new Piece( pieces[0][0], pieces[0][1]);

//creating piece object

function Piece (tetromino, colour){
  this.tetromino = tetromino ;
  this.colour = colour;
  this.tetrominoN = 0; //beginning with the zeroth pattern
  this.activeTetromino = this.tetromino[this.tetrominoN];
  //to control the pieces
  this.x = 0;
  this.y = 0;
}

//draw a piece to the board

Piece.prototype.draw = function (){
  for(var r=0 ; r<this.activeTetromino.length ; r++){
    for(var c=0 ; c<this.activeTetromino.length ; c++){
      //draw only the occupied squares, i.e, which return 1
      if(this.activeTetromino[r][c]){
        drawSquare(this.x + c, this.y + r, this.colour); //drawing the appropriate tetris shape
      }
    }
  }
}

//to undraw the shape or to make it dissappear from its current position

Piece.prototype.undraw = function(){
  for(var r=0 ; r<this.activeTetromino.length ; r++){
    for(var c=0 ; c<this.activeTetromino.length ; c++){
      if(this.activeTetromino[r][c]){
        drawSquare(this.x + c, this.y + r, vacant);
      }
    }
  }

}

//move piece down

Piece.prototype.moveDown = function(){
  this.undraw();
  this.y++;
  this.draw();
}

//1sec interval for dropping the pieces
let dropStart = Date.now();
function drop(){
  let now = Date.now();
  let delta = now - dropStart;
  if(delta >= 1000){
    p.moveDown();
    dropStart = Date.now();
  }
  requestAnimationFrame(drop);
}

drop();
