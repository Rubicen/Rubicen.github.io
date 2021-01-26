import { Component, Injectable, OnInit } from '@angular/core';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-driving-game',
  templateUrl: './driving-game.component.html',
  styleUrls: ['./driving-game.component.css']
})
export class DrivingGameComponent implements OnInit {
  drivingGameArea: DrivingGameArea;
  drivingGameCar: DrivingGameCar;
  constructor() { 
  }

  ngOnInit(): void {
    
  }

  startGame() {    
    this.drivingGameArea = new DrivingGameArea(270, 480, setInterval(this.updateGameArea, 20, this));
    this.drivingGameArea.start();
    this.drivingGameCar = new DrivingGameCar(this.drivingGameArea, 30, 30, "red", 225, 225);
  }

  updateGameArea(obj: any) {
    if (!obj.drivingGameArea)
      return;
    obj.drivingGameArea.clear();
    obj.drivingGameCar.moveAngle = 0;
    obj.drivingGameCar.speed = 0;
    if (obj.drivingGameArea.keys && obj.drivingGameArea.keys[37]) {obj.drivingGameCar.moveAngle = -1; }
    if (obj.drivingGameArea.keys && obj.drivingGameArea.keys[39]) {obj.drivingGameCar.moveAngle = 1; }
    if (obj.drivingGameArea.keys && obj.drivingGameArea.keys[38]) {obj.drivingGameCar.speed= 1; }
    if (obj.drivingGameArea.keys && obj.drivingGameArea.keys[40]) {obj.drivingGameCar.speed= -1; }
    obj.drivingGameCar.newPos();
    obj.drivingGameCar.update();
  }
}
@Injectable()
export class DrivingGameCar implements OnInit {
  private gameAreaContext: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private color: string;
  private x: number;
  private y: number;
  private type: string;
  angle: number;
  speed: number;
  moveAngle: number;
  constructor(gameArea, width: number, height: number, color: string, x: number, y: number, type: string = null){
    this.gameAreaContext = gameArea.context;
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.type = type;
    this.speed = 0;
    this.angle = 0;
    this.moveAngle = 0;
  }
  ngOnInit(): void {
  }
  update() {
    var ctx = this.gameAreaContext;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = this.color;
    ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
    ctx.restore();    
  }
  newPos() {
    this.angle += this.moveAngle * Math.PI/ 180;
    this.x += this.speed * Math.sin(this.angle);
    this.y -= this.speed * Math.cos(this.angle);
  }
}
@Injectable()
export class DrivingGameArea implements OnInit {
  private canvasHeight: number;
  private canvasWidth: number;
  private interval: any;
  private canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  private frameNo: number;
  keys = new Array(100);

  constructor(height: number, width: number, interval: any){
    this.canvasHeight = height;
    this.canvasWidth = width;
    this.interval = interval;
  }
  ngOnInit(): void {
  }

  start() {
    this.canvas = document.createElement("canvas");
    this.canvas.style.background = 'grey';
    this.canvas.height = this.canvasHeight;
    this.canvas.width = this.canvasWidth;
    this.context = this.canvas.getContext("2d");
    document.getElementById('driving-game-container').appendChild(this.canvas);
    this.frameNo = 0;
    window.addEventListener('keydown', (e) => {
      e.preventDefault();
      this.keys = (this.keys || new Array(100));
      this.keys[e.keyCode] = (e.type == "keydown");
    });
    window.addEventListener('keyup', (e) => {
      this.keys[e.keyCode] = (e.type == "keydown");
    });
  }
  stop() {
    clearInterval(this.interval);
  }
  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

/*
<script>

var myGameArea;
var myGamePiece;
var myObstacles = [];
var myscore;

function restartGame() {
document.getElementById("myfilter").style.display = "none";
document.getElementById("myrestartbutton").style.display = "none";
myGameArea.stop();
myGameArea.clear();
myGameArea = {};
myGamePiece = {};
myObstacles = [];
myscore = {};
document.getElementById("canvascontainer").innerHTML = "";
startGame()
}

function startGame() {
    myGameArea = new gamearea();
    myGamePiece = new component(30, 30, "red", 10, 75);
    myscore = new component("15px", "Consolas", "black", 220, 25, "text");
    myGameArea.start();
}

function gamearea() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = 320;
    this.canvas.height = 180;    
    document.getElementById("canvascontainer").appendChild(this.canvas);
    this.context = this.canvas.getContext("2d");
    this.pause = false;
    this.frameNo = 0;
    this.start = function() {
        this.interval = setInterval(updateGameArea, 20);
    }
    this.stop = function() {
        clearInterval(this.interval);
        this.pause = true;
    }
    this.clear = function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {

    this.type = type;
    if (type == "text") {
        this.text = color;
    }
    this.score = 0;    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, y, min, max, height, gap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            document.getElementById("myfilter").style.display = "block";
            document.getElementById("myrestartbutton").style.display = "block";
            return;
        } 
    }
    if (myGameArea.pause == false) {
        myGameArea.clear();
        myGameArea.frameNo += 1;
        myscore.score +=1;        
        if (myGameArea.frameNo == 1 || everyinterval(150)) {
            x = myGameArea.canvas.width;
            y = myGameArea.canvas.height - 100;
            min = 20;
            max = 100;
            height = Math.floor(Math.random()*(max-min+1)+min);
            min = 50;
            max = 100;
            gap = Math.floor(Math.random()*(max-min+1)+min);
            myObstacles.push(new component(10, height, "green", x, 0));
            myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
        }
        for (i = 0; i < myObstacles.length; i += 1) {
            myObstacles[i].x += -1;
            myObstacles[i].update();
        }
        myscore.text="SCORE: " + myscore.score;        
        myscore.update();
        myGamePiece.x += myGamePiece.speedX;
        myGamePiece.y += myGamePiece.speedY;    
        myGamePiece.update();
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function moveup(e) {
    myGamePiece.speedY = -1; 
}

function movedown() {
    myGamePiece.speedY = 1; 
}

function moveleft() {
    myGamePiece.speedX = -1; 
}

function moveright() {
    myGamePiece.speedX = 1; 
}

function clearmove(e) {
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}
startGame();

</script>
*/