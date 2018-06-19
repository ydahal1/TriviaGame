$('#start-game').on('click', function() {
	$('#start-game').remove();
	game.loadQuestion();
});
// check if clicked option is correct one
$(document).on('click', '.answer-button', function(event) {
	game.clicked(event);
});
//click to play again
$(document).on('click', '#reset', function() {
	game.reset();
});
//Object with questions and options
var questions = [{
	question: "Which branch of mathematics deals with the sides and angles of triangles, and their relationship to each other?",
	choices: ["Geometry", "Trigonometry", "Algebra", "Calculus"],
	correctAnswer: "Trigonometry",
	description: "Trigonometry (from Greek trigōnon, 'triangle' and metron, 'measure') is a branch of mathematics that studies relationships involving lengths and angles of triangles."
}, {
	question: "At a party, everyone shook hands with everybody else. There were 66 handshakes. How many people were at the party?",
	choices: ["30", "14", "12", "25"],
	correctAnswer: "12",
	description: "Too hard to expalin without white board, but here is the formula total handshakes will be = (n-1) + (n-2) + (n-3) +…… 0;"
}, {
	question: "My brother was 4 years old when I was 8. Now I am 24 years old, how old is my brother?",
	choices: ["20", "30", "12", "10"],
	correctAnswer: "20",
	description: "My brother is 4 years younger then me, if I am 24 my brother is 24 - 4 = 20"
}, {
	question: "A lily pad is growing in a pond and it doubles in size every day. after 30 days it covers the entire pond. on what day does it cover half pond?",
	choices: ["15", "29", "27", "14"],
	correctAnswer: "29",
	description: "If the lily pad covered the pond in 30 days, on 29th day it was hald the size of lake"
}, {
	question: "You're 3rd place right now in a race. What place are you in when you pass the person in 2nd place?",
	choices: ["3rd", "1st", "none", "2nd"],
	correctAnswer: "2nd",
	description: "Basically passing someone is taking their place, so you are in second place now"
}, {
	question: "A bat and a ball cost $1.10. The bat costs one dollar more than the ball. How much does the ball cost?",
	choices: ["5c", "10c", "15c", "20c"],
	correctAnswer: "5c",
	description: "The ball costs 5c. Not 10c. One dollar more than 10c is $1.10, $1.10 + 10c is $1.20  One dollar more than 5c is $1.05. The sum of which is $1.10"
}];
//lines to print on  screen 
var line = $('<hr>');
line.attr('width', '50%');
var game = {
	questions: questions,
	//counters 
	currentQuestion: 0,
	correct: 0,
	incorrect: 0,
	counter: 20,
	unanswered: 0,
	// functions to call later   
	//run the timers call timeUp 
	countdown: function() {
		game.counter--;
		$("#counter").html(game.counter);
		if (game.counter <= 0) {
			//  console.log("time up");
			game.timeUp();
		}
	},
	loadQuestion: function() {
		//Display questions and options
		//count down timer
		timer = setInterval(game.countdown, 1000);
		//Dispalying remaing time in page
		$('#game-action').html("<h2>Time Remaining <span id='counter' class='timerStyle' >30</span> Seconds</h2>");
		$('#game-action').append(line);
		//print  question to page 
		$("#game-action").append('<h2>' + questions[game.currentQuestion].question + '</h2>');
		//print options in page 
		for (var i = 0; i < questions[game.currentQuestion].choices.length; i++) {
			//create the button and storing answer to it 
			$("#game-action").append('<button class="btn btn-default answer-button"  id="button-' + i + '"data-name="' + questions[game.currentQuestion].choices[i] + '">' + questions[game.currentQuestion].choices[i] + '</button>');
		}
	},
	nextQuestion: function() {
		//Resets counter for new question
		game.counter = 20;
		//Displaying counter 
		$('#counter').html(game.counter);
		//ask the new question by incrementing by 1 
		game.currentQuestion++;
		//Print new question in the page
		game.loadQuestion();
	},
	timeUp: function() {
		clearInterval(timer);
		game.unanswered++;
		$('#game-action').html('<h2>Time up </h2>');
		$('#game-action').append('<h3>The correct answer is: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
		$('#game-action').append(line);
		$('#game-action').append('<h2>' + questions[game.currentQuestion].description + '<h2>');
		if (game.currentQuestion == questions.length - 1) {
			//wait 3 sec , then if last question go to results screen if not go to next question 
			setTimeout(game.results, 3 * 1000);
		} else {
			setTimeout(game.nextQuestion, 3 * 1000);
		}
	},
	results: function() {
		clearInterval(timer);
		$('#game-action').html("<h3>Game Over</h3>");
		$('#game-action').append(line);
		$('#game-action').append("<h3>Correct: " + game.correct + "</h3>");
		$('#game-action').append("<h3>Incorrect: " + game.incorrect + "</h3>");
		$('#game-action').append("<h3>Unanswered: " + game.unanswered + "</h3>");
		$('#game-action').append("<button id='reset' class='btn btn-success'>Play Again</button>");
		$('#game-action').append('<br/>');
	},
	// use to clear the interval ,pass the button value for 'event'
	clicked: function(event) {
		// clear the interval so timer stops when button is clicked
		clearInterval(timer);
		//click passes the value of the button clicked- name references  the data name that is the correct answer created above 
		if ($(event.target).data("name") == questions[game.currentQuestion].correctAnswer) {
			//then run the game answerorrectly and answeredIncorrectly to check answer. 
			game.answeredCorrectly();
		} else {
			game.answeredIncorrectly();
		}
	},
	answeredCorrectly: function() {
		//stop timer
		clearInterval(timer);
		game.correct++;
		$('#game-action').html('<h2> Correct!</h2>');
		$('#game-action').append('<h3>The Correct Answer is: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
		$('#game-action').append(line);
		$('#game-action').append('<h2>' + questions[game.currentQuestion].description + '<h2>');
		// check where we are in the array of questions 
		if (game.currentQuestion == questions.length - 1) {
			//wait and if last question go to results screen else roll to  next question 
			setTimeout(game.results, 3 * 1000);
		} else {
			setTimeout(game.nextQuestion, 3 * 1000);
		}
	},
	answeredIncorrectly: function() {
		// console.log("wrong");
		clearInterval(timer);
		game.incorrect++;
		$('#game-action').html('<h2> Wrong</h2>');
		$('#game-action').append('<h3>The Correct Answer is: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
		$('#game-action').append(line);
		$('#game-action').append('<h2>' + questions[game.currentQuestion].description + '<h2>');
		// check where we are in the array of questions 
		if (game.currentQuestion == questions.length - 1) {
			//wait and if last question go to results screen else roll to  next question 
			setTimeout(game.results, 3 * 1000);
		} else {
			setTimeout(game.nextQuestion, 3 * 1000);
		}
	},
	reset: function() {
		game.currentQuestion = 0;
		game.counter = 0;
		game.correct = 0;
		game.incorrect = 0;
		game.unanswered = 0;
		game.loadQuestion();
	}
}