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
var pillImage;
var pillCell;
var pillIterator;

var monsters;
var numOfMonsters;
var monsterImage;
var moveIterator;
//need to add 4 monsters images
var movingScoreImage;
var movingScore = new Object();
var isMovingEaten;

var clockImage;
var clockCell;
var isClockEaten;
var clockIterator;

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

//variables for sound
var soundOff;
var loserSound;
var backgroundSound;

var endGameModal;


window.addEventListener("load", setUpGame, false);

function setUpGame(){
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	// add backgorund

	// add music
	loserSound = document.getElementById("loserSound");
	backgroundSound = document.getElementById("backgroundSound");


	// add images
	movingScoreImage = document.getElementById("movingScore");
	clockImage = document.getElementById("clock");
	pillImage = document.getElementById("cure");

	
	keysDown = {};


	addEventListener("keydown", function (e) {keysDown[e.keyCode] = true;}, false);
	addEventListener("keyup", function (e) {delete keysDown[e.keyCode];}, false);

	setDefaultSettings();

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
	isClockEaten = false;
	isPillEaten = false;
	keysDown = {};
	life = 5;
	score = 0;
	shape.i = undefined;
	shape.j = undefined;
	moveIterator = 0;
	clockIterator = 0;
	pillIterator = 0;
	if (intervalTimer != undefined){
		window.clearInterval(intervalTimer);
	}
	//settings
	//move to settings
}

function monstersLocations(){
	for(let i = 0; i < numOfMonsters; i++){
		if (i == 0){
			monsters[0].i = 0;
			monsters[0].j = 0;
			monsters[0].monsterImage = document.getElementById("monster1");
		}
		else if (i == 1){
			monsters[1].i = 9;
			monsters[1].j = 9;
			monsters[1].monsterImage = document.getElementById("monster2");
		}
		else if (i == 2){
			monsters[2].i = 0;
			monsters[2].j = 9;
			monsters[2].monsterImage = document.getElementById("monster3");
		}

		else if (i == 3){
			monsters[3].i = 9;
			monsters[3].j = 0;
			monsters[3].monsterImage = document.getElementById("monster4");
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
	movingScore.i = 5;
	movingScore.j = 4;
}

function prepareBoard(){
	board = new Array();

	for (let i = 0; i < 10; i++) {
		board[i] = new Array();
		for (let j = 0; j < 10; j++) {
			board[i][j] = 0;
		}
	}
	pac_color = "yellow";

	userSettings();

	counter5 = Math.floor(ballsCount * 0.6);
	counter15 = Math.floor(ballsCount * 0.3);
	counter25 = Math.floor(ballsCount * 0.1);

	// complete balls to user's amount
	let diff = ballsCount - (counter5+counter15+counter25);
	if (diff > 0){
		counter5 += diff;
	}

	// monsters
	monstersLocations();

	// moving score sponge?
	movingScoreLocation()

	initWalls();
	
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

function initWalls(){
	board[2][3] = 1;
	board[2][4] = 1;
	board[3][7] = 1;
	board[4][7] = 1;
	board[5][7] = 1;
	board[6][3] = 1;
	board[7][3] = 1;
	board[7][4] = 1;
}

function anotherRound(){
	if (!backgroundSound.paused){
		backgroundSound.pause();
		backgroundSound.currentTime = 0;
	}
	window.clearInterval(intervalTimer);
	toggleNewGameSettings();
}

function toggleNewGameSettings(){
	$("#settingsPage").toggle();
	$("#gamePage").toggle();
}

function dinamicModalDialog(title ,content){	
	// inject message according game over specific reason
	$("#modalContent").text(content);
    $("#endGameModal").dialog({
		open: function() {
			// click outside close
			$('.ui-widget-overlay').bind('click', function(){
				$("#endGameModal").dialog('close');
			})
			},
		resizable: false,
		height: "auto",
		title: title,
		width: 400,
		modal: true,
		show: {effect: 'fade', duration: 250},
		hide: { effect: "explode", duration: 1000 },
		buttons: {
		Close: function() {
			$( this ).dialog( "close" );
		}
	}
  	});
}

function endGame(reason){
	Draw();
	backgroundSound.pause();
	backgroundSound.currentTime = 0;
	window.clearInterval(intervalTimer);
	if (reason == "life"){
		if (!soundOff) {
			loserSound.play();
		}
		dinamicModalDialog("GAME OVER!", "Loser! Just a few rounds and you will be better...");
	}
	else if (reason == "time" && score < 100){
		let message = "You are better than " + score + " points!";
		dinamicModalDialog("GAME OVER!", message);
	}
	else if (reason == "time" && score >= 100){
		dinamicModalDialog("GAME OVER!", "Winner!!!");
	}
	else if(reason == "food"){
		dinamicModalDialog("GAME OVER!", "You are the best!!!");
	}
	// toggleNewGameSettings();
}

function startNewGame(){
	toggleNewGameSettings();
	newGame();
}

function main(){
	checkTimeLimit();
	UpdatePosition();
	Draw();
	detectCollisions();
}

function checkTimeLimit(){
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (time_elapsed >= timeLimit){
		endGame("time");
	}
}

function detectCollisions(){
	detectMonstersCollisions();
	detectMovingScoreCollisions();
	detectClockCollisions();
	detectPillCollisions();
	if (ballsCount == 0){
		endGame("food");
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
				endGame("life");
			}
		}
	}
}

function detectClockCollisions(){
	if (isClockEaten == false && clockCell != undefined){
		let colsDist = Math.abs(shape.i - clockCell[0]);
		let rowsDist = Math.abs(shape.j - clockCell[1]);


		if (colsDist < 1 && rowsDist < 1){
			timeLimit += 10;
			isClockEaten= true;
			//check
			//need add sound
		}
	}
}

function detectPillCollisions(){
	if(isPillEaten == false && pillCell != undefined){
		let colsDist = Math.abs(shape.i - pillCell[0]);
		let rowsDist = Math.abs(shape.j - pillCell[1]);

		if (colsDist < 1 && rowsDist < 1){
			life++;
			isPillEaten = true;
			//need add sound
		}
	}
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 10);
	var j = Math.floor(Math.random() * 10);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 10);
		j = Math.floor(Math.random() * 10);
	}
	return [i, j];
}

function GetKeyPressed() {
	//up
	if (keysDown[up]) {
		return 1;
	}
	//down
	if (keysDown[down]) {
		return 2;
	}
	//left
	if (keysDown[left]) {
		return 3;
	}
	//right
	if (keysDown[right]) {
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
		ballsCount--;
	}
	else if(board[shape.i][shape.j] == 15){
		score += 15;
		ballsCount--;
	}

	else if(board[shape.i][shape.j] == 25){
		score += 25;
		ballsCount--;
	}

	board[shape.i][shape.j] = 2;

	//slower movement of monsters and movingScore
	if (moveIterator % 5 == 0){
		updateMonstersPosition();
		updateMovingScorePosition();
	}
	++moveIterator;
}

// need to fix
function updateMonstersPosition(){
	for (var i = 0; i < numOfMonsters; i++){
		let prob = Math.random() * 4;
		if (prob<3){
			let colsDist = shape.i -  monsters[i].i;
			let rowsDist = shape.j - monsters[i].j;
	
			// monster need to move up-down
			if (Math.abs(rowsDist) > Math.abs(colsDist)){
				// // monster need to move down
				if (monsters[i].j+1 < 10 && rowsDist > 0 && board[monsters[i].i][monsters[i].j+1] != 1){
					moveMonsterDown(monsters[i]);
				}
				// monster need to move up
				else if(monsters[i].j-1 >= 0 && rowsDist <= 0 && board[monsters[i].i][monsters[i].j-1] != 1){
					moveMonsterUp(monsters[i]);
				}
			}
			// monster need to move left-right
			else{
				//monster need to move right
				if (monsters[i].i+1 < 10 && colsDist > 0 && board[monsters[i].i+1][monsters[i].j] != 1){
					moveMonsterRight(monsters[i]);
				}
				// monster need to move left
				else if(monsters[i].i-1 >= 0 && colsDist <= 0 && board[monsters[i].i-1][monsters[i].j] != 1) {
					moveMonsterLeft(monsters[i]);
				}
			}
		}
		else{
			monsterMoveRandomly(monsters[i]);
		}
	}

}

function monsterMoveRandomly(monster){
	let move = false;
	while(!move){
		let dir = Math.floor(Math.random() * 4);
		if(dir == 0 && monster.j+1 < 10 && board[monster.i][monster.j+1] != 1){
			moveMonsterDown(monster);
			move = true;
		}
		else if(dir == 1 && monster.j-1 >= 0 && board[monster.i][monster.j-1] != 1){
			moveMonsterUp(monster);
			move = true;
		}
		else if (dir == 2 && monster.i+1 < 10 && board[monster.i+1][monster.j] != 1){
			moveMonsterRight(monster);
			move = true;
		}
		else if (dir == 3 && monster.i-1 >= 0 && board[monster.i-1][monster.j] != 1){
			moveMonsterLeft(monster);
			move = true;
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
	lblTime.value = (timeLimit - time_elapsed).toPrecision(5);
	if (lblTime.value < 0){
		lblTime.value = 0.000;
	}
	lblLife.value = life;
	var toDelete = 0;
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
				toDelete++;

			} else if (board[i][j] == 15) {
				drawCircles(center.x, center.y, 0, 0, color15, 10);
				toDelete++;

			} else if (board[i][j] == 25) {
				drawCircles(center.x, center.y, 0, 0, color25, 15);
				toDelete++;

			} else if (board[i][j] == 1) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "black";
				context.fill();
			}

			if (isMovingEaten == false) {
				context.drawImage(movingScoreImage, movingScore.i*60, movingScore.j*60, 60, 60);		
			}

			for (var k = 0; k < numOfMonsters; k++){
				context.drawImage(monsters[k].monsterImage, monsters[k].i*60, monsters[k].j*60, 60, 60);
			}
		}
	}

	if (clockIterator % 13 > 11 && isClockEaten == false){
		drawClock();
	}
	else{
		clockCell = undefined;
		if (clockIterator % 13 < 11){
			isClockEaten = false;
		}
	}
	clockIterator += 0.1;

	if (pillIterator % 15 > 12 && isPillEaten == false){
		drawPill();
	}
	pillIterator += 0.1;
}

function drawClock(){
	if (clockCell == undefined){
		clockCell = findRandomEmptyCell(board);
	}
	context.drawImage(clockImage, clockCell[0]*60, clockCell[1]*60, 60, 60);
}

function drawPill(){
	if (pillCell == undefined){
		pillCell = findRandomEmptyCell(board);
	}
	context.drawImage(pillImage, pillCell[0]*60, pillCell[1]*60, 60, 60);
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
