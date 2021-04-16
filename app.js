var canvas;
var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;



var keysDown;
// user inputs for settings
var ballsCount;
var counter5;
var counter15;
var counter25;

var timeLimit = 10

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


function reset(){
	score = 0;
	//settings
	//move to settings
}

function prepareBoard(){
	board = new Array();
	pac_color = "yellow";
	var cnt = 100; //?
	food_remain = 50;
	var pacman_remain = 1;
	// for (var i = 0; i < 10; i++) {
	// 	board[i] = new Array();
	// 	//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
	// 	for (var j = 0; j < 10; j++) {
	// 		if (
	// 			(i == 3 && j == 3) ||
	// 			(i == 3 && j == 4) ||
	// 			(i == 3 && j == 5) ||
	// 			(i == 6 && j == 1) ||
	// 			(i == 6 && j == 2)
	// 		) {
	// 			board[i][j] = 4;
	// 		} else {
	// 			var randomNum = Math.random();
	// 			if (randomNum <= (1.0 * food_remain) / cnt) {
	// 				food_remain--;
	// 				board[i][j] = 1;
	// 			} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
	// 				shape.i = i;
	// 				shape.j = j;
	// 				pacman_remain--;
	// 				board[i][j] = 2;
	// 			} else {
	// 				board[i][j] = 0;
	// 			}
	// 			cnt--;
	// 		}
	// 	}
	// }
	// while (food_remain > 0) {
	// 	var emptyCell = findRandomEmptyCell(board);
	// 	board[emptyCell[0]][emptyCell[1]] = 1;
	// 	food_remain--;
	// }

	ballsCount = 50; // user
	counter5 = Math.floor(ballsCount * 0.6);
	counter15 = Math.floor(ballsCount * 0.3);
	counter25 = Math.floor(ballsCount * 0.1);

	// check if need to add sum of balls equal to ballsCount and change the perecentages

	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
	}

	var i = 5;
	while (i > 0){
		let emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		i--;
	}

	while (counter25 > 0){
		let emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 25;
		counter25--;
	}

	while (counter15 > 0){
		let emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 15;
		counter15--;
	}

	while (counter5 > 0){
		let emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 5;
		counter5--;
	}

	let pacmanCell = findRandomEmptyCell(board);
	board[pacmanCell[0]][pacmanCell[1]] = 2;
	shape.i = pacmanCell[0];
	shape.j = pacmanCell[1];

	// start_time = new Date();
}

function main(){
	checkTimeLimit();
	UpdatePosition();
	Draw();
}


function checkTimeLimit(){
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (time_elapsed >= timeLimit){
		window.clearInterval(intervalTimer);
	}
}


// $(document).ready(function() {
// 	context = canvas.getContext("2d");
// 	Start();
// });

// function Start() {
// 	board = new Array();
// 	score = 0;
// 	pac_color = "yellow";
// 	var cnt = 100;
// 	var food_remain = 50;
// 	var pacman_remain = 1;
// 	start_time = new Date();
// 	for (var i = 0; i < 10; i++) {
// 		board[i] = new Array();
// 		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
// 		for (var j = 0; j < 10; j++) {
// 			if (
// 				(i == 3 && j == 3) ||
// 				(i == 3 && j == 4) ||
// 				(i == 3 && j == 5) ||
// 				(i == 6 && j == 1) ||
// 				(i == 6 && j == 2)
// 			) {
// 				board[i][j] = 4;
// 			} else {
// 				var randomNum = Math.random();
// 				if (randomNum <= (1.0 * food_remain) / cnt) {
// 					food_remain--;
// 					board[i][j] = 1;
// 				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
// 					shape.i = i;
// 					shape.j = j;
// 					pacman_remain--;
// 					board[i][j] = 2;
// 				} else {
// 					board[i][j] = 0;
// 				}
// 				cnt--;
// 			}
// 		}
// 	}
// 	while (food_remain > 0) {
// 		var emptyCell = findRandomEmptyCell(board);
// 		board[emptyCell[0]][emptyCell[1]] = 1;
// 		food_remain--;
// 	}
// 	keysDown = {};
// 	addEventListener(
// 		"keydown",
// 		function(e) {
// 			keysDown[e.keyCode] = true;
// 		},
// 		false
// 	);
// 	addEventListener(
// 		"keyup",
// 		function(e) {
// 			keysDown[e.keyCode] = false;
// 		},
// 		false
// 	);
// 	interval = setInterval(UpdatePosition, 150);
// }

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
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
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
		}
	}
}

// function Draw() {
// 	canvas.width = canvas.width; //clean board
// 	lblScore.value = score;
// 	lblTime.value = time_elapsed;
// 	for (var i = 0; i < 10; i++) {
// 		for (var j = 0; j < 10; j++) {
// 			var center = new Object();
// 			center.x = i * 60 + 30;
// 			center.y = j * 60 + 30;
// 			if (board[i][j] == 2) {
// 				context.beginPath();
// 				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
// 				context.lineTo(center.x, center.y);
// 				context.fillStyle = pac_color; //color
// 				context.fill();
// 				context.beginPath();
// 				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
// 				context.fillStyle = "black"; //color
// 				context.fill();
// 			} else if (board[i][j] == 1) {
// 				context.beginPath();
// 				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
// 				context.fillStyle = "black"; //color
// 				context.fill();
// 			} else if (board[i][j] == 4) {
// 				context.beginPath();
// 				context.rect(center.x - 30, center.y - 30, 60, 60);
// 				context.fillStyle = "grey"; //color
// 				context.fill();
// 			}
// 		}
// 	}
// }

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 1) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 1) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 1) {
			shape.i--;
		}
	}
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

	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 400) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} 

}
