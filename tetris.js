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

//Fill function - to make draw and undraw easier to read

Piece.prototype.fill = function(color){
  for(var r=0 ; r<this.activeTetromino.length ; r++){
    for(var c=0 ; c<this.activeTetromino.length ; c++){
      if(this.activeTetromino[r][c]){
        drawSquare(this.x + c, this.y + r, color);
      }
    }
  }
}

//draw a piece to the board

Piece.prototype.draw = function (){
  this.fill(this.colour);
}

//to undraw the shape or to make it dissappear from its current position

Piece.prototype.unDraw = function(){
  this.fill(vacant);
}

//move piece down

Piece.prototype.moveDown = function(){
  if(!this.col_detect(0,1,this.activeTetromino))
  {
    this.unDraw();
    this.y++;
    this.draw();
  }
  else //lock the piece and generate new pieces
  {

  }
}

//move the piece right

Piece.prototype.moveRight = function(){
  if(!this.col_detect(1,0,this.activeTetromino))
  {
    this.unDraw();
    this.x++;
    this.draw();
  }
  else //lock the piece and generate new pieces
  {

  }
}

//move the piece left

Piece.prototype.moveLeft = function(){
  if(!this.col_detect(-1,0,this.activeTetromino))
  {
    this.unDraw();
    this.x--;
    this.draw();
  }
  else //lock the piece and generate new pieces
  {

  }
}

//rotate the piece
Piece.prototype.rotate = function(){
  let n = (this.tetrominoN + 1) % (this.tetromino.length);
  let nextpat = this.tetromino[n];
  if(!this.col_detect(0,0,nextpat))
  {
    this.unDraw();
    this.tetrominoN = (this.tetrominoN + 1) % (this.tetromino.length);
    this.activeTetromino = this.tetromino[this.tetrominoN];
    this.draw();
  }
  else //lock the piece and generate new one
  {

  }
}

//collison detection
Piece.prototype.col_detect = function (x,y,piece){
  for(var r=0 ; r<piece.length ; r++){
    for( var c=0 ; c<piece.length ; c++){
      //if the square is empty, skip it
      if(!piece[r][c])
      {
      continue;
      }
      //coordinates of piece after movement
      let newX = this.x + c + x;
      let newY = this.y + r + y;
      //conditions
      if(newX < 0 || newX >= col || newY >= row){
        return true;
      }
      //skip if newY < 0, as board[-1] will crash the game
      if(newY < 0){
        continue;
      }
      //check if there is locked piece on board
      if(board[newY][newX] != vacant){
        return true;
      }
    }
  }
  return false;
}

//hello, which key you looking for??(inspired by Lionel Richie)
document.addEventListener("keydown", check);

function check(e){
  if(e.keyCode == 37)
  {
    p.moveLeft();
    dropStart = Date.now(); //the piece will not drop while we click the respective arrows
  }
  else if(e.keyCode == 38)
  {
    p.rotate();
    dropStart = Date.now();
  }
  else if(e.keyCode == 39)
  {
    p.moveRight();
    dropStart = Date.now();
  }
  else if(e.keyCode == 40)
  {
    p.moveDown();
    dropStart = Date.now();
  }

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
