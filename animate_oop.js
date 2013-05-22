/*
@name: Ninja Animation
@description: Game mechanics for a simple game that allows the player to move a character across a stage
@version: 1.01
@author: Jarne W. Beutnagel (jarne@beutnagel.dk)
@company: Business Academy Aarhus (www.baaa.dk)
@license: Creative Commons Attribution 3.0 Unported License
@year: 2013
@graphics: The graphics used are from www.

@initiator: initiate();

@objects  
	ninja
		initiate()
		hide()
		animate()
		speed
		direction
		hiding
		animation = false
		sprite{}
			height
			width
			frame
			maxFrames
			counter
	stage
		initiate()
		frame
	background
		initiate()
		animate()
		animation
	items
		initiate()
		animate()
		collision()
		animation
		items[]
		initiated
	animation
		start()
		stop()
		run()
		keylogger(e)
	 */ 

// Declare global variables
var 	 
	frameHeight 	=	414, 		// height of frame in sprite sheet 
	character, 						// the container for the animation
	speed, 							// the number of pixels the character moves each frame
	hide			=	false,		// whether the ninja is hiding 
	aniItems		=	null,		// holds the items animation
	aniInitiated	=	false;		// Whether the animation items have been initiated
	var rockCounter = 1;			// count intervals untill next rock is being inserted
	var startPosition = 0; // startposition for rock

	var rock = {};
	rock.initiate = function () {
		var a = document.getElementById ("animation");
		var rock = document.createElement ("div");
		rock.setAttribute("class", "rock");
		a.appendChild(rock);
		rockCounter = 1;
	}
	rock.move = function (){
		rock.speed = 5;
		startPosition += rock.speed;
		var element = document.getElementsByClassName("rock");
		for (var i= 0; i < element.length;i++){
		element[i].style.right += startPosition + "px"; 
		}
		/* if (stage.direction == "right") {
			element = element - rock.speed; // the background has to move towards left, hence the negative x-value
		}
		else {
			element = element + rock.speed; // move background to right, i.e. increase distance to left side
		}
		element.style.backgroundPositionX = rock.speed + "px"; // turn pos back into a text string with the added "px" and assign to element x-value */
	}
	
var	ninja = {};
	ninja.initiate = function () {
		console.info('ninja initiated');
		ninja.character = document.getElementById("ninja"); // get the character
	}
	ninja.hide = function () {}
	ninja.character;
	ninja.speed;
	ninja.hiding = false;
	ninja.interval = false;
	ninja.sprite = {};
		ninja.sprite.animate = function () { // version 1 (working directly with object properties)
			// Set character background position	
				if (stage.direction === "left"){
				document.getElementById("ninja").setAttribute("class", "ninja");
				}
				if (stage.direction === "right") {
				document.getElementById("ninja").removeAttribute("class");
					}
			ninja.character.style.backgroundPositionX = (ninja.sprite.width * ninja.sprite.frame)+"px"; // Change the background-position-x css property to animate the background
			// Go to next sprite frame
			ninja.sprite.frame += ninja.sprite.counter; // Keep track of which frame is displayed
			//console.log('Frame: '+ frame);
			if (ninja.sprite.frame == ninja.sprite.maxFrames) { // if at the last frame
				ninja.sprite.counter = 1;
			}
			if (ninja.sprite.frame == 1) { // if at the first frame
				ninja.sprite.counter = 1;
			}
			// Count the total of frames walked across the stage
			if (stage.direction == "right") {
				stage.frame++;
			}
			else {
				stage.frame--;
			}
			rockCounter++;
		}
		ninja.sprite.height;
		ninja.sprite.frame = 0;			// current frame (from 1 to maxFrames)
		ninja.sprite.maxFrames = 8;		// max number of frames
		ninja.sprite.width = 152;		// width of frame in sprite sheet
		ninja.sprite.counter = 1;		// increment that keeps track of counting the frames
		ninja.interval = null; 		// Keeps track of whether the animation of the ninja is running

var stage = {};
	stage.frame;
	stage.initiate = function () {
		console.info('stage initiated');
		// Properties
		stage.frame = 1;

		// Events
		document.addEventListener('keydown', animation.start, false);
		document.addEventListener('keyup', animation.stop, false);
		
		// Set style upon initiation 
		// Set the opacity of the #animation div so that it will fade in
		document.getElementById('animation').style.opacity = 1;
		document.getElementById("title").style.top = "70px";
	 	document.getElementById("title").style.opacity = 1;
	}
	stage.direction = "right";  // the direction the animation should be facing 

var animation = {};
	animation.start = function (e) {
	 	var keyCode = e.keyCode;
	 	document.getElementById("title").style.top = "-500px"; 	// Move the title out of the frame
	 	document.getElementById("title").style.opacity = 0; 	// Fade it out
		//console.log(keyCode);
		// Animate Right
		if (keyCode == 39 && ninja.interval == null) {
			animation.run();
			stage.direction = "right";
			ninja.character.style.backgroundPositionY = "0px";
		}
		// Animate Left
		if (keyCode == 37 && ninja.interval == null) {
			e = 1;
			animation.run();	
			stage.direction = "left";
			ninja.character.style.backgroundPositionY = frameHeight+"px";
		}
		// Animate hide (use arrow up or down to toggle hide ninja
		if (keyCode == 38 && ninja.interval == null) {
			animation.run();
				ninja.character.style.top = "200px" ; // default + 100
		}	
		if (keyCode == 40 && ninja.interval == null) {
			animation.run();
				ninja.character.style.top = "";
				ninja.character.style.bottom = "300px"; // default + 100
		}	
	}
	animation.stop = function () {
		clearInterval(ninja.interval);
		clearInterval(background.interval);
		clearInterval(items.interval);
		ninja.interval = null; // Set to null to signal that there is no longer an animation set for the ninja
	}
	animation.run = function () {
		ninja.interval = setInterval(ninja.sprite.animate, 1000 / 10); // Animate the ninja
		background.interval = setInterval(   // Animate the background
			function(){ // Anomynous function that performs the calls for animating the background
				background.animate('clouds1',12); // Define which element to move and at which speed (pixels moved)
				background.animate('clouds2',6);
				background.animate('ground-level1',16);
				background.animate('ground-level2',10);
				background.animate('ground-level3',24);
				background.animate('ground-level4',30);
				background.animate('rock', 30);
				/* var test = document.getElementById("rock");
				if (test) {
				background.animate('rock', 30); */
				var test = document.getElementById ("rock");
				if (test){
					rock.move();
				}
			}, 1000 / 10);
			
		items.interval = setInterval(items.animate, 1000/10); // Animate the items that appear
	}

function initiate(){
	/* CONSOLE */ console.groupCollapsed('Initiation');
	ninja.initiate();
	stage.initiate();
	background.initiate();
	items.initiate();
	/* CONSOLE */ console.groupEnd();
	
}	


var background = {};
	background.element;
	background.position;
	background.interval = null; 			// holds the background animation interval
	background.initiate = function () {	
		// set the background position on all div elements so that they can be accessed through js later on
		var divs = document.getElementsByTagName('div');
		for(var i=0; i<divs.length; i++) {
			divs[i].style.backgroundPosition = '0px 0px';
		}
		console.info('background initiated');
	}
	background.animate = function (element, speed) {
		// get element
		background.element = document.getElementById(element);
		background.position = background.element.style.backgroundPositionX;
		background.position = background.position.replace("px",""); // Remove px from value of pos, e.g. "20px" -> "20"
		background.position = parseInt(background.position); // Make pos a number variable instead of a text string, i.e. "20" -> 20
		if (stage.direction == "right") {
			background.position = background.position - speed; // the background has to move towards left, hence the negative x-value
		}
		else {
			background.position = background.position + speed; // move background to right, i.e. increase distance to left side
		}
		background.element.style.backgroundPositionX = background.position + "px"; // turn pos back into a text string with the added "px" and assign to element x-value
	}

var items = {};
	items.list = [];
	items.initiated = false;
	items.interval;										// array for the items that appears in the animation
	items.initiate = function () {
		console.info('items initiated');
		// Initiate items, so that they are placed according to their data-x html attributes before being animated
		items.list = document.getElementsByClassName('item'); 		// Populate the array with html elements that have the class "item"
		if (items.initiated === false) { 							// only do this if not initiated before
			for(var i=0; i<items.list.length; i++) { 				// run through all the elements
				var animent = items.list[i]; 						// get individual element out
				animent.style.backgroundPositionX = animent.getAttribute('data-x')+"px"; // Set the background position to the value in the data-x attribute
				//console.log("new placement: "+animent.style.backgroundPositionX);
				//console.log(animent + ": " + animent.getAttribute('data-x')+"px");
			}
			aniInitiated = true; 									// set to true to prevent code from executing again
		}
	}
	items.animate = function () {
		for(var i=0; i<items.list.length; i++) { 					// run through the list of animated elements
			var animent = items.list[i]; 							// Get the individual element
			var pos = stage.frame*(-parseInt(animent.getAttribute('data-speed'))); // Get speed, use negative modifier to move opposite direction of character
			pos = pos + parseInt(animent.getAttribute('data-x')); 	// Add the x-position offset
			animent.style.backgroundPositionX = pos+"px";
			//console.log("new placement: "+animent.style.backgroundPositionX);
		}
	}
	items.interval = null;
