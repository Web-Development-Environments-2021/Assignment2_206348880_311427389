var canvas;
var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var intervalTimer;


var life;
var monsters;
var numOfMonsters;
var monsterImage;
var moveIterator;
//need to add 4 monsters images
var movingScoreImage;
var movingScore = new Object();
var isMovingEaten;

var keysDown;
var dirPacman;
// user inputs for settings
var ballsCount;
var counter5;
var counter15;
var counter25;
var color5;
var color15;
var color25;

var timeLimit;

//variables for movment from user
var up;
var down;
var left;
var right;


//toggle test - need to fix
$(document).ready(function(){
	$("#newGame").click(function(){
	  $("#settings").toggle();
	});
  });


window.addEventListener("load", setUpGame, false);

function setUpGame(){
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	document.getElementById("newGame").addEventListener("click", newGame, false)
	// add backgorund
	// add music
	// add images
	movingScoreImage = document.getElementById("movingScore")
	monsterImage = document.getElementById("monster1");
	monsters = new Array();
	moveIterator = 0;

	isMovingEaten = false;
	
	keysDown = {};


	addEventListener("keydown", function (e) {keysDown[e.keyCode] = true;}, false);
	addEventListener("keyup", function (e) {delete keysDown[e.keyCode];}, false);
}

function newGame(){
	// decide where to put settings
	reset();
	prepareBoard();
	start_time = new Date();
	intervalTimer = setInterval(main, 150);
}

// need to add settings inside
function reset(){
	isMovingEaten = false;
	keysDown = {};
	life = 5;
	score = 0;
	moveIterator = 0;
	if (intervalTimer != undefined){
		window.clearInterval(intervalTimer);
	}
	//settings
	//move to settings
}

function monstersLocations(){
	board[0][0] = 3;
	board[0][9] = 3;
	board[9][0] = 3;
	board[9][9] = 3;

	for(var i = 0; i < numOfMonsters; i++){
		if (i == 0){
			monsters[0].i = 0;
			monsters[0].j = 0;
		}
		else if (i == 1){
			monsters[1].i = 9;
			monsters[1].j = 0;
		
		}
		else if (i == 2){
			monsters[2].i = 0;
			monsters[2].j = 9;
		}

		else if (i == 3){
			monsters[3].i = 9;
			monsters[3].j = 9;
		}
	}
}

function randomLocatePacman(){
	if (shape.i != undefined && shape.j != undefined){
		board[shape.i][shape.j] = 0;
	}

	let pacmanCell = findRandomEmptyCell(board);
	board[pacmanCell[0]][pacmanCell[1]] = 2;
	shape.i = pacmanCell[0];
	shape.j = pacmanCell[1];
}

function movingScoreLocation(){
	board[5][4] = 50;
	movingScore.i = 5;
	movingScore.j = 4;
}

function prepareBoard(){
	board = new Array();
	pac_color = "yellow";

	userSettings();

	// ballsCount = document.getElementById("foodAmount").value; // user
	counter5 = Math.floor(ballsCount * 0.6);
	counter15 = Math.floor(ballsCount * 0.3);
	counter25 = Math.floor(ballsCount * 0.1);

	// complete balls to user's amount
	let diff = ballsCount - (counter5+counter15+counter25);
	if (diff > 0){
		counter5 += diff;
	}


	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
	}

	// monsters
	monstersLocations();

	// moving score sponge?
	movingScoreLocation()

	// walls
	var i = 5;
	while (i > 0){
		let emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		i--;
	}

	//25 point food
	while (counter25 > 0){
		let emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 25;
		counter25--;
	}

	//15 point food
	while (counter15 > 0){
		let emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 15;
		counter15--;
	}

	//5 point food
	while (counter5 > 0){
		let emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 5;
		counter5--;
	}

	// pacman's random location
	randomLocatePacman();

}


function userSettings(){
	//Food user inputs
	ballsCount = document.getElementById("foodAmount").value;
	color5 = document.getElementById("5").value;
	color15 = document.getElementById("15").value;
	color25 = document.getElementById("25").value;

	//Monsters user inputs
	numOfMonsters = document.getElementById("monstersAmount").value;
	for (var i = 0; i < numOfMonsters; i++){
		monsters[i] = new Object();
	}

	//Time user inputs
	let minutes = parseInt(document.getElementById("minutes").value);
	let seconds = parseInt(document.getElementById("seconds").value);

	timeLimit = minutes * 60 + seconds;
	// alert(timeLimit);

}

function main(){
	checkTimeLimit();
	UpdatePosition();
	Draw();
	detectMonstersCollisions();
	detectMovingScoreCollisions();
}


function checkTimeLimit(){
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (time_elapsed >= timeLimit){
		window.clearInterval(intervalTimer);
	}
}

function detectMovingScoreCollisions(){
	if (isMovingEaten == false){
		let colsDist = Math.abs(shape.i - movingScore.i);
		let rowsDist = Math.abs(shape.j - movingScore.j);
	
		if (colsDist < 1 && rowsDist < 1){
			score += 50;
			isMovingEaten = true;
			//check
			// board[shape.i][shape.j] = 0;
			//need add sound
		}
	}
}

function detectMonstersCollisions(){
	for (var i = 0; i < numOfMonsters; i++){

		let colsDist = Math.abs(shape.i - monsters[i].i);
		let rowsDist = Math.abs(shape.j - monsters[i].j);

		if (colsDist < 1 && rowsDist < 1){
			life--;
			score -= 10;
			//need add sound
			if (life > 0){
				randomLocatePacman();
				monstersLocations();
				if (isMovingEaten == false){
					movingScoreLocation();
				}
			}
			//need to add pop window with summary og score
			else{
				window.clearInterval(intervalTimer);
				alert("your score is: " + score);
				newGame();
			}
		}
	}
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 10);
	var j = Math.floor(Math.random() * 10);
	while (board[i][j] != undefined) {
		i = Math.floor(Math.random() * 10);
		j = Math.floor(Math.random() * 10);
	}
	return [i, j];
}

function GetKeyPressed() {
	//up
	if (keysDown[38]) {
		return 1;
	}
	//down
	if (keysDown[40]) {
		return 2;
	}
	//left
	if (keysDown[37]) {
		return 3;
	}
	//right
	if (keysDown[39]) {
		return 4;
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	//up
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 1) {
			shape.j--;
			dirPacman = "up";
		}
	}
	//down
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 1) {
			shape.j++;
			dirPacman = "down";
		}
	}
	//left
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 1) {
			shape.i--;
			dirPacman = "left";
		}
	}
	//right
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 1) {
			shape.i++;
			dirPacman = "right";
		}
	}
	if (board[shape.i][shape.j] == 5) {
		score += 5;
	}
	else if(board[shape.i][shape.j] == 15){
		score += 15;
	}

	else if(board[shape.i][shape.j] == 25){
		score += 25;
	}

	board[shape.i][shape.j] = 2;

	//slower movement of monsters and movingScore
	if (moveIterator % 5 == 0){
		updateMonstersPosition();
		updateMovingScorePosition();
		// moveIterator = 0;
	}
	++moveIterator;

	// if (score >= 20 && time_elapsed <= 10) {
	// 	pac_color = "green";
	// }
	if (score == 400) {
		window.clearInterval(intervalTimer);
		window.alert("Game completed");
	} 
}

// need to fix
function updateMonstersPosition(){
	for (var i = 0; i < numOfMonsters; i++){

		let colsDist = shape.i -  monsters[i].i;
		let rowsDist = shape.j - monsters[i].j;

		// monster need to move up-down
		if (Math.abs(rowsDist) > Math.abs(colsDist)){
			// // monster need to move down
			if (rowsDist > 0 && board[monsters[i].i][monsters[i].j+1] != 1){
				moveMonsterDown(monsters[i]);
			}
			// monster need to move up
			else if(rowsDist <= 0 && board[monsters[i].i][monsters[i].j-1] != 1){
				moveMonsterUp(monsters[i]);
			}
			// else if(rowsDist == 0){
			// 	if (colsDist > 0 && board[xIndex+1][yIndex] != 1){
			// 		moveMonsterRight(monsters[i]);
			// 	}
			// 	else if(board[xIndex][yIndex] != 1) {
			// 		moveMonsterLeft(monsters[i]);
			// 	}
			// }
		}
		// monster need to move left-right
		else{
			// // monster need to move right
			if (colsDist > 0 && board[monsters[i].i+1][monsters[i].j] != 1){
				moveMonsterRight(monsters[i]);
			}
			// monster need to move left
			else if(colsDist <= 0 && board[monsters[i].i-1][monsters[i].j] != 1) {
				moveMonsterLeft(monsters[i]);
			}
			// else if (colsDist == 0){
			// 	if (rowsDist > 0 && board[xIndex][yIndex+1] != 1){
			// 		moveMonsterDown(monsters[i]);
			// 	}
			// 	else if(board[xIndex][yIndex-1] != 1) {
			// 		moveMonsterUp(monsters[i]);
			// 	}
			// }
		}
	}
}

function moveMonsterLeft(monster){
	monster.i--;
}

function moveMonsterRight(monster){
	monster.i++;
}

function moveMonsterUp(monster){
	monster.j--;
}

function moveMonsterDown(monster){
	monster.j++;
}

function updateMovingScorePosition(){
	let direction =  Math.floor(Math.random() * 4);
	let xPosition = movingScore.i;
	let yPosition = movingScore.j;

	// up
	if (direction == 0 && yPosition-1 > 0 && board[xPosition][yPosition-1] != 1){
		movingScore.j--;
	}

	// down
	else if (direction == 1 && yPosition+1 < 9 && board[xPosition][yPosition+1] != 1){
		movingScore.j++;
	}

	// left
	else if (direction == 2 && xPosition-1 > 0 && board[xPosition-1][yPosition] != 1){
		movingScore.i--;
	}

	// right
	else if (direction == 3 && xPosition+1 < 9 && board[xPosition+1][yPosition] != 1){
		movingScore.i++;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				if (dirPacman == "up"){
					drawDirectedPacman(1.65, 1.35, center.x, center.y, -15, -5);
				}
				else if (dirPacman == "down"){
					drawDirectedPacman(0.65, 0.35, center.x, center.y, 15, 5);
				}
				else if (dirPacman == "left"){
					drawDirectedPacman(1.15, 0.85, center.x, center.y, -5, -15);
				}

				else {
					drawDirectedPacman(0.15, 1.85, center.x, center.y, 5, -15);
				}
				
			} else if (board[i][j] == 5) {
				drawCircles(center.x, center.y, 0, 0, color5, 5);

			} else if (board[i][j] == 15) {
				drawCircles(center.x, center.y, 0, 0, color15, 10);

			} else if (board[i][j] == 25) {
				drawCircles(center.x, center.y, 0, 0, color25, 15);

			} else if (board[i][j] == 1) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}

			else if (board[i][j] == 3) {
				for (var k = 0; k < numOfMonsters; k++){
					// alert(monsters[k].i);
					context.drawImage(monsterImage, monsters[k].i*60, monsters[k].j*60, 60, 60);
					// context.drawImage(monsterImage, monsters[k].x*60, monsters[k].y*60, 60, 60);
				}
			}

			else if (board[i][j] == 50 && isMovingEaten == false) {
				context.drawImage(movingScoreImage, movingScore.i*60, movingScore.j*60, 60, 60);
			}
		}
	}
}

function drawDirectedPacman(startAngle, endAngle, xCenter, yCenter, xDist, yDist){
	context.beginPath();
	context.arc(xCenter, yCenter, 30, startAngle * Math.PI, endAngle * Math.PI); // half circle
	context.lineTo(xCenter, yCenter);
	context.fillStyle = pac_color;
	context.fill();
	drawCircles(xCenter, yCenter, xDist, yDist, "black", 5) //pac eye
}

function drawCircles(xCenter, yCenter, xDist, yDist, color, radius){
	context.beginPath();
	context.arc(xCenter + xDist, yCenter + yDist, radius, 0, 2 * Math.PI);
	context.fillStyle = color;
	context.fill();
}
