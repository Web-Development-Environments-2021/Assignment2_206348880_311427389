
// food settings
// Update the current slider value (each time you drag the slider handle)
function updateFoodAmount(){
  let slider = document.getElementById("foodAmount");
  let output = document.getElementById("foodValue");
  // let slider = $("#foodAmount");
  // let output = $("#foodValue");
  output.innerHTML = slider.value;
}



function setUserUp(upEvent) {
	up = upEvent.keyCode;
	document.getElementById("up").value = upEvent.key;
}
  
function setUserDown(downEvent) {
	down = downEvent.keyCode;
	document.getElementById("down").value = downEvent.key;
}  

function setUserLeft(leftEvent) {
	left = leftEvent.keyCode;
	document.getElementById("left").value = leftEvent.key;
} 

function setUserRight(rightEvent) {
	right = rightEvent.keyCode;
	document.getElementById("right").value = rightEvent.key;
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
}

function setDefaultKeyboard(){
	up = 38;
	document.getElementById("up").value = "ArrowUp"
	down = 40;
	document.getElementById("down").value = "ArrowDown"
	left = 37;
	document.getElementById("left").value = "ArrowLeft"
	right = 39;
	document.getElementById("right").value = "ArrowRight"

}


function setDefaultSettings(){
	//default keyboard
	setDefaultKeyboard();

	//default food number
	document.getElementById("foodAmount").value = 70;
	document.getElementById("foodValue").innerHTML = 70;

	//default food colors
	document.getElementById("5").value = "#e66465";
	document.getElementById("15").value = "#f6b73c";
	document.getElementById("25").value = "#d925fd";


	//default time
	document.getElementById("minutes").value = 1;
	document.getElementById("seconds").value = 0;


	//default num of monsters
	document.getElementById("monstersAmount").value = 1;


	//default sound
}

function setRandomSettings(){
	//default keyboard
	setDefaultKeyboard();

	//default food number
	let randomFoodAmount = Math.floor(Math.random() * 41) + 50;
	document.getElementById("foodAmount").value = randomFoodAmount;
	document.getElementById("foodValue").innerHTML = randomFoodAmount;

	//default food colors
	let randomColor5 = '#'+Math.floor(Math.random()*16777215).toString(16);
	document.getElementById("5").value = randomColor5;
	// document.getElementById("5").value = "#e66465";
	let randomColor15 = '#'+Math.floor(Math.random()*16777215).toString(16);
	document.getElementById("15").value = randomColor15;
	let randomColor25 = '#'+Math.floor(Math.random()*16777215).toString(16);
	document.getElementById("25").value = randomColor25;


	//default time
	// max time for game???
	let randomMinutes =  Math.floor(Math.random() * 5) + 1;
	document.getElementById("minutes").value = randomMinutes;
	let randomSeconds =  Math.floor(Math.random() * 12) * 5;
	document.getElementById("seconds").value = randomSeconds;


	//default num of monsters
	let randomMonstersAmount =  Math.floor(Math.random() * 4) + 1;
	document.getElementById("monstersAmount").value = randomMonstersAmount;
}