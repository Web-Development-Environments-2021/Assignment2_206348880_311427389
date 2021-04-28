var lblup = "ArrowUp";
var lbldown = "ArrowDown";
var lblright = "ArrowRight";
var lblleft = "ArrowLeft";

/**
 * change the amount of food according to the slider
 */
function updateFoodAmount(){
  let slider = document.getElementById("foodAmount");
  let output = document.getElementById("foodValue");
  output.innerHTML = slider.value;
}

function changeVolume() {
	let slider = document.getElementById("soundValue");
	let output = document.getElementById("volumeValue");
	output.innerHTML = slider.value;
}

/**
 * set up key for the game according to user choice
 * @param {*} upEvent 
 */
function setUserUp(upEvent) {
	if(checkValidKey(upEvent.keyCode)){
		up = upEvent.keyCode;
		lblup = upEvent.key;
		document.getElementById("up").value = upEvent.key;
	}
}

/**
 * set down key for the game according to user choice
 * @param {*} downEvent 
 */
function setUserDown(downEvent) {
	if(checkValidKey(upEvent.keyCode)){
		down = downEvent.keyCode;
		lbldown = downEvent.key;
		document.getElementById("down").value = downEvent.key;
	}
}  

/**
 * set left key for the game according to user choice
 * @param {*} leftEvent 
 */
function setUserLeft(leftEvent) {
	if(checkValidKey(upEvent.keyCode)){
		left = leftEvent.keyCode;
		lblleft = leftEvent.key;
		document.getElementById("left").value = leftEvent.key;
	}
} 

/**
 * set right key for the game according to user choice
 * @param {*} rightEvent 
 */
function setUserRight(rightEvent) {
	if(checkValidKey(upEvent.keyCode)){
		right = rightEvent.keyCode;
		lblright = rightEvent.key;
		document.getElementById("right").value = rightEvent.key;
	}

} 

/**
 * collect all the settings that the user set to the game.
 */
function userSettings(){
	//Food user inputs
	ballsCount = document.getElementById("foodAmount").value;
	color5 = document.getElementById("5").value;
	color15 = document.getElementById("15").value;
	color25 = document.getElementById("25").value;
	$("#foodLbl").text("Food Amount: "+ ballsCount);

	//Monsters user inputs
	numOfMonsters = document.getElementById("monstersAmount").value;
	monsters = new Array();
	for (var i = 0; i < numOfMonsters; i++){
		monsters[i] = new Object();
	}
	$("#monstersLbl").text("Monsters Amount: " + numOfMonsters);


	//Time user inputs
	let minutes = parseInt(document.getElementById("minutes").value);
	let seconds = parseInt(document.getElementById("seconds").value);
	timeLimit = minutes * 60 + seconds;
	$("#timeLbl").text("Play Time: " + timeLimit + "s");
	$("#upLbl").text("Up: "+lblup);
	$("#downLbl").text("Down: "+lbldown);
	$("#leftLbl").text("Left: "+lblleft);
	$("#rightLbl").text("Up: "+lblright);

	
	backgroundSound.volume = parseInt(document.getElementById("soundValue").value)/ 100;
	loserSound.volume = parseInt(document.getElementById("soundValue").value)/ 100;
	winnerSound.volume = parseInt(document.getElementById("soundValue").value)/ 100;
	soundOff = $('#soundOff').is(':checked');

	if (!soundOff) {
		document.getElementById("un-mute").checked = false;
		playMusic();
	}
	else{
		document.getElementById("un-mute").checked = true;
	}

}

/**
 * turn the music on
 */
function playMusic() {
	backgroundSound.muted = false;
	backgroundSound.play();
	backgroundSound.loop = true;
}

/**
 * turn the musis on/off whan user push the button on game page
 */
function muteUnmute(){
	let soundOn = $('#un-mute').is(':checked')
	if (soundOn) {
		soundOff = false;
		playMusic();
	}
	else{
		soundOff = true;
		backgroundSound.muted = true;
	}
}

/**
 * set default keys to play with.
 */
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

/**
 * set default settings to game
 */
function setDefaultSettings(){
	//default keyboard
	setDefaultKeyboard();

	//default food number
	document.getElementById("foodAmount").value = 70;
	document.getElementById("foodValue").innerHTML = 70;

	//default food colors
	document.getElementById("5").value = "#e66465";
	document.getElementById("15").value = "#1c4fe9";
	document.getElementById("25").value = "#d925fd";


	//default time
	document.getElementById("minutes").value = 1;
	document.getElementById("seconds").value = 0;


	//default num of monsters
	document.getElementById("monstersAmount").value = 1;

	//default sound
	document.getElementById("soundValue").value = 50;
	document.getElementById("volumeValue").innerHTML = 50;
}

/**
 * set random settings to game
 */
function setRandomSettings(){
	//Random keyboard
	setDefaultKeyboard();

	//Random food number
	let randomFoodAmount = Math.floor(Math.random() * 41) + 50;
	document.getElementById("foodAmount").value = randomFoodAmount;
	document.getElementById("foodValue").innerHTML = randomFoodAmount;

	//Random food colors
	let randomColor5 = '#'+Math.floor(Math.random()*16777215).toString(16);
	document.getElementById("5").value = randomColor5;
	let randomColor15 = '#'+Math.floor(Math.random()*16777215).toString(16);
	document.getElementById("15").value = randomColor15;
	let randomColor25 = '#'+Math.floor(Math.random()*16777215).toString(16);
	document.getElementById("25").value = randomColor25;

	//Random time
	let randomMinutes =  Math.floor(Math.random() * 5) + 1;
	document.getElementById("minutes").value = randomMinutes;
	let randomSeconds =  Math.floor(Math.random() * 12) * 5;
	document.getElementById("seconds").value = randomSeconds;


	//Random num of monsters
	let randomMonstersAmount =  Math.floor(Math.random() * 4) + 1;
	document.getElementById("monstersAmount").value = randomMonstersAmount;
}

/**
 * it's impossible to choose the same key to two different diractions, so we block it.
 * @param {*} key 
 * @returns 
 */
function checkValidKey(key){
	if (key == up || key == down || key == right || key == left){
		return false;
	}
	return true;
}
