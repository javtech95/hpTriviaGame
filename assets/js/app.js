$(document).ready(function () {

    //QUESTIONS
    var examQuestions = [{
        question: "What does Professor Dumbledore find in the Room of Requirement?",
        answerOptions: ["A room full of chamber pots", "A study full of telescopes", "A cupboard full of feather dusters", "A wardrobe full of clean pyjamas"],
        answer: 0,
    }, {
        question: "Who was Headmaster of Hogwarts before Albus Dumbledore?",
        answerOptions: ["Phineus Nigellus Black", "Galatea Merrythought", "Armando Dippet", "Silvanus Kettleburn"],
         answer: 2,
    },  {
        question: "Which mode of transport do first-year students use when arriving at Hogwarts for the first time?",
        answerOptions: ["Magical boats", "Apparition", "Broomsticks", "Hippogriffs"],
        answer: 0,
    }, {
         question: "Where in the Hogwarts grounds is Hagrid’s hut located?",
        answerOptions: ["On the shore of the lake", "Next to Hogsmeade Station", "Next door to the greenhouse", "By the Forbidden Forest"],
        answer: 3,
    }, {
        question: "Which subject at Hogwarts is taught by Professor Binns?",
         answerOptions: ["Ancient Runes", "Arithmancy", "History of Magic", "Muggle Studies"],
        answer: 2,
    
    }]; // end of questions


    var resultMessages = {
        right: "Interesting... next",
        wrong: "WRONG!!!! You filthy MudBlood",
        timeOut: "You're late",
        done: "Let's see how you did"
    }

    var currentQuestion; // Holds current question
    var userChoice; // Holds user's choice
    var correctAnswer;
    var wrongAnswer;
    var answered;
    var unanswered;
    var seconds;
    var time;

    // Start Button
    $('#startBtn').on('click', function () {
        $(this).hide();
        newGame();
    });

    // Reset Button
    $('#restartBtn').on('click', function () {
        $(this).hide();
        newGame();
    });

    //Everything is cleared for new game to start
    function newGame() {
        $('#finalMessage').empty();
        $('#rightAnswers').empty();
        $('#wrongAnswers').empty();
        $('#notAnswered').empty();
        currentQuestion = 0;
        correctAnswer = 0;
        wrongAnswer = 0;
        unanswered = 0;
        newQuestion();
    }

    //Question is generated
    function newQuestion() {
        $('#message').empty();
        $('#correctAnswer').empty();
        $('#gif').empty();
        answered = true;

        //sets up new questions & answerList
        $('#currentQuestion').html('Question #' + (currentQuestion + 1) + '/' + examQuestions.length);
        $('#question').html('<h2>' + examQuestions[currentQuestion].question + '</h2>');
        for (var i = 0; i < 4; i++) {
            var choices = $('<div>');
            choices.text(examQuestions[currentQuestion].answerOptions[i]);
            choices.attr({
                'data-index': i
            });
            choices.addClass('thisChoice');
            $('#answerChoices').append(choices);
        }

        timer();
        //clicking an answer will pause the time and setup answerPage
        $('.thisChoice').on('click', function () {
            userChoice = $(this).data('index');
            clearInterval(time);
            resultsPage();
        });
    }

    //TIMER
    function timer() {
        seconds = 10;
        $('#timer').html('<h3>Time Remaining: ' + seconds + '</h3>');
        answered = true;
        //countdown
        time = setInterval(showTimer, 1000);
    }

    function showTimer() {
        seconds--;
        $('#timer').html('<h3>Time Remaining: ' + seconds + '</h3>');
        if (seconds < 1) {
            clearInterval(time);
            answered = false;
            resultsPage(); //switch to answer page
        }
    }

    //Quiz Results
    function resultsPage() {
        $('#currentQuestion').empty();
        $('.thisChoice').empty(); //Clears question page
        $('#question').empty();

        var rightAnswerText = examQuestions[currentQuestion].answerOptions[examQuestions[currentQuestion].answer];
        var rightAnswerIndex = examQuestions[currentQuestion].answer;
        //checks to see correct, incorrect, or unanswered
        if ((userChoice == rightAnswerIndex) && (answered == true)) {
            correctAnswer++;
            $('#message').html(resultMessages.right);
        } else if ((userChoice != rightAnswerIndex) && (answered == true)) {
            wrongAnswer++;
            $('#message').html(resultMessages.wrong);
            $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        } else {
            unanswered++;
            $('#message').html(resultMessages.timeOut);
            $('#correctAnswer').html('The correct answer was: ' + rightAnswerText);
            answered = true;
        }

        if (currentQuestion == (examQuestions.length - 1)) {
            setTimeout(scores, 5000)
        } else {
            currentQuestion++;
            setTimeout(newQuestion, 5000);
        }
    }

    function scores() {
        $('#timer').empty();
        $('#message').empty();
        $('#correctAnswer').empty();
        $('#gif').empty();

        $('#finalMessage').html(resultMessages.done);
        $('#rightAnswers').html("Answers Correct: " + correctAnswer);
        $('#wrongAnswers').html("Answers Incorrect: " + wrongAnswer);
        $('#notanswered').html("Not Answered: " + unanswered);
        $('#restartBtn').addClass('reset');
        $('#restartBtn').show();
        $('#restartBtn').html('Retry?');
    }

});