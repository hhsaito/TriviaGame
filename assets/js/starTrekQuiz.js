var counter = 0,
    score = 0,
    current = 0,
    incorrect = 0,
    unanswered = 0,
    seconds;

var quiz = [{
    question: "The Vulcan ritual that is performed to eliminate all emotion is called the:",
    answers: ["Macaroon", "Mind Meld", "Kolinahr", "Jibaltra"],
    correctAnswer: 2,
    resultImage: "spock.gif",
    tidbits: "The Kolinahr is credited for turning the Vulcan race from a savage war like race, saving them from the brink of their own destruction."
}, {
    question: "Captain Kirk's full name was?",
    answers: ["James Tee Kirk", "James Lee Kirk", "James Edward Kirk", "James Tiberius Kirk"],
    correctAnswer: 3,
    resultImage: "khan.gif",
    tidbits: "In the 2009 film Star Trek, George and Winona Kirk name their son James Tiberius after his maternal and paternal grandfathers, respectively."
}, {
    question: "On Voyager, how many children were born?",
    answers: ["1", "2", "3", "7"],
    correctAnswer: 2,
    resultImage: "paris_marriage_toast.jpg",
    tidbits: "3 children were born on Voyager: Naomi Wildman, One (Seven of Nine's baby), and Tom Paris and B'Elana's baby in the last episode."
}, {
    question: "Star Trek was the brain child of which great visionary?",
    answers: ["Gene Roddenberry", "Steven Spielberg", "George Lucas", "Walt Disney"],
    correctAnswer: 0,
    resultImage: "gene.jpg",
    tidbits: "Gene Roddenberry originally sold the idea to network executives by telling them it would be a show about a wagon train to the stars to appeal to the then popular westerns that were being shown in the 60's."
}, {
    question: "In the Next Generation, Captain Picard was the captain of which ships?",
    answers: ["Enterprise A and the Daedalus", "Enterprise C and the Reliant", "Enterprise B and the Defiant", "Enterprise D and the Star Gazer"], 
    correctAnswer: 3,
    resultImage: "picard.gif",
    tidbits: "Captain Picard was the captain of the Enterprise D and the Star Gazer."
}];

$(document).ready(function () {
	$('#start').on('click', function () {
		displayQuestion();
		timer();
		$('#start').hide();
	});

	$(document).on('click', '.quiz-choice', function() {
		var clicked = $(this),
		 userAnswer = clicked.prevAll().length;

		if ( userAnswer === quiz[current].correctAnswer ) {
            score++;
            $('#quiz-question').html('<p>You are correct.</p><p>' + quiz[current].tidbits + '</p><img src="assets/images/' + quiz[current].resultImage + '"/>');
            $('#choices').empty();
            clearInterval(counter);
            // pause for 7 seconds before continuing game.
            setTimeout(continueGame, 7000);
		}
		else {
			console.log( 'incorrect' );
            incorrect++;
            $('#quiz-question').html('<p>Sorry, that is not correct.</p><p>' + quiz[current].tidbits + '</p><img src="assets/images/' + quiz[current].resultImage + '"/>');
            $('#choices').empty();
            clearInterval(counter);
            setTimeout(continueGame, 7000);
		}
	});
    $(document).on('click', '#restart', function() {
        counter = 0,
        score = 0,
        current = 0,
        unanswered = 0,
        incorrect = 0;   
        displayQuestion();
        timer();
    });
});

function displayQuestion() {
    console.log(current);
	var question = quiz[current].question;
    $('#choices').empty();

    $('#remaining').html('<p>Time remaining: 30</p>');
    $('#quiz-question').html('<p>' + question + '</p>');
    console.log(quiz[current].answers.length);

    for ( var i = 0; i < quiz[current].answers.length; i++ ) {
        var choice = quiz[current].answers[i];
        $('<li class="quiz-choice"><a href="#">' + choice + '</a></li>').appendTo('#choices');
    }
}

function continueGame () {
    current++;
    
    if ( current < quiz.length ) {
        timer();
        displayQuestion();
    }
    else {

        endGame();
    }
}

function endGame() {
    //$('#remaining').empty();
	$('#quiz-question').html('<h2>Here is how you did.</h2><p><strong>Correct Answers: </strong>' + score + '</p><p><strong>Incorrect Answers: </strong>' + incorrect + '</p><p><strong>Unanswered: </strong>' + unanswered + '</p><button id="restart">Restart</button>');
	$('#choices').empty();
    
    clearInterval(counter);
}
function timer() {
    seconds = 30;
    counter = setInterval(decrement, 1000);
}
function decrement(){
    // Decrease number by one.
    seconds--;
    // Show the number in the #show-number tag.
    $('#remaining').html('<p>Time remaining: ' + seconds + '</p>');

    // Once number hits zero...
    if ( seconds == 0 && quiz[current+1] ) {

        $('#quiz-question').html('<p>Sorry. Time is up</p><p>' + quiz[current].tidbits + '</p><img src="assets/images/' + quiz[current].resultImage + '"/>');
        $('#choices').empty();
        clearInterval(counter);
        unanswered++;
        setTimeout(continueGame, 7000);

    }
    else if ( seconds == 0 ) {
        $('#quiz-question').html('<p>Sorry. Time is up</p><p>' + quiz[current].tidbits + '</p><img src="assets/images/' + quiz[current].resultImage + '"/>');
        $('#choices').empty();
        clearInterval(counter);
        unanswered++;
        setTimeout(endGame, 7000);
    }
}