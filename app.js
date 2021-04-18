var canvas;
var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;


var life;
var monsters;
var numOfMonsters;
var monsterImage;
//need to add 4 monsters images
var movingScoreImage;
var movingScore;
var isMovingEaten;

var keysDown;
// user inputs for settings
var ballsCount;
var counter5;
var counter15;
var counter25;

var timeLimit = 60

//variables for movment from user
var up;
var down;
var left;
var right;




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
	numOfMonsters = 4; // user input
	for (var i = 0; i < numOfMonsters; i++){
		monsters[i] = {};
	}

	movingScore = {};
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
	life = 5;
	score = 0;
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
			monsters[0].x = 0;
			monsters[0].y = 0;
		}
		else if (i == 1){
			monsters[1].x = 60*9;
			// monsters[1].x = 9;
			monsters[1].y = 0;
		
		}
		else if (i == 2){
			monsters[2].x = 0;
			monsters[2].y = 60*9;
		}

		else if (i == 3){
			monsters[3].x = 60*9;
			monsters[3].y = 60*9;
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
	movingScore.x = 5*60;
	movingScore.y = 4*60;
}

function prepareBoard(){
	board = new Array();
	pac_color = "yellow";
	// var cnt = 100; //?
	// food_remain = 50;
	// var pacman_remain = 1;

	ballsCount = 50; // user
	counter5 = Math.floor(ballsCount * 0.6);
	counter15 = Math.floor(ballsCount * 0.3);
	counter25 = Math.floor(ballsCount * 0.1);

	// check if need to add sum of balls equal to ballsCount and change the perecentages

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
		let colsDist = Math.abs(shape.i*60 - movingScore.x);
		let rowsDist = Math.abs(shape.j*60 - movingScore.y);
	
		if (colsDist < 60 && rowsDist < 60){
			alert("colsDist: " + colsDist);
			alert("rowsDist: " + rowsDist);
			alert("x: " +movingScore.x);
			alert(movingScore.y);
			alert("shape i: "+shape.i);
			alert("shape j: "+shape.j);
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
		xIndex = Math.floor(monsters[i].x/60);
		yIndex = Math.floor(monsters[i].y/60);

		let colsDist = Math.abs(shape.i - xIndex);
		let rowsDist = Math.abs(shape.j - yIndex);

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
		}
	}
	//down
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 1) {
			shape.j++;
		}
	}
	//left
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 1) {
			shape.i--;
		}
	}
	//right
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 1) {
			shape.i++;
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

	updateMonstersPosition();

	updateMovingScorePosition();

	// if (score >= 20 && time_elapsed <= 10) {
	// 	pac_color = "green";
	// }
	if (score == 400) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} 
}

// need to fix
function updateMonstersPosition(){
	for (var i = 0; i < numOfMonsters; i++){

		xIndex = Math.floor(monsters[i].x/60);
		yIndex = Math.floor(monsters[i].y/60);

		let colsDist = shape.i - xIndex;
		let rowsDist = shape.j - yIndex;

		// monster need to move up-down
		if (Math.abs(rowsDist) > Math.abs(colsDist)){
			// // monster need to move down
			if (rowsDist > 0 && board[xIndex][yIndex+1] != 1){
				moveMonsterDown(monsters[i]);
			}
			// monster need to move up
			else if(rowsDist <= 0 && board[xIndex][yIndex-1] != 1){
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
			if (colsDist > 0 && board[xIndex+1][yIndex] != 1){
				moveMonsterRight(monsters[i]);
			}
			// monster need to move left
			else if(colsDist <= 0 && board[xIndex-1][yIndex] != 1) {
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
	monster.x -= 5;
}
function moveMonsterRight(monster){
	monster.x += 5;
}

function moveMonsterUp(monster){
	monster.y -= 5;
}

function moveMonsterDown(monster){
	monster.y += 5;
}

function updateMovingScorePosition(){
	let direction =  Math.floor(Math.random() * 4);
	let xPosition = Math.floor(movingScore.x/60);
	let yPosition = Math.floor(movingScore.y/60);

	// up
	if (direction == 0 && yPosition-1 > 0 && board[xPosition][yPosition-1] != 1){
		movingScore.y -= 20;
	}

	// down
	else if (direction == 1 && yPosition+1 < 9 && board[xPosition][yPosition+1] != 1){
		movingScore.y += 20;
	}

	// left
	else if (direction == 2 && xPosition-1 > 0 && board[xPosition-1][yPosition] != 1){
		movingScore.x -= 20;
	}

	// right
	else if (direction == 3 && xPosition+1 < 9 && board[xPosition+1][yPosition] != 1){
		movingScore.x += 20;
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
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 5) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				// context.fillStyle = "user color"; //
				context.fill();
			} else if (board[i][j] == 15) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "red"; //color
				// context.fillStyle = "user color"; //
				context.fill();
			} else if (board[i][j] == 25) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "blue"; //color
				// context.fillStyle = "user color"; //
				context.fill();
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}

			else if (board[i][j] == 3) {
				for (var k = 0; k < numOfMonsters; k++){
					context.drawImage(monsterImage, monsters[k].x, monsters[k].y, 60, 60);
					// context.drawImage(monsterImage, monsters[k].x*60, monsters[k].y*60, 60, 60);
				}
			}

			else if (board[i][j] == 50) {
				context.drawImage(movingScoreImage, movingScore.x, movingScore.y, 60, 60);
			}
		}
	}
}
