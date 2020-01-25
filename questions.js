var sec = 75;
var time = setInterval(myTimer, 1000);

function myTimer() {
    document.getElementById('timer').innerHTML = sec;
    sec--;
    if (sec == -1) {
        clearInterval(time);
        alert("Time's Up!!!");
    }
}

function Quiz(questions) {
    this.score = 0;
    this.questions = questions; 
    this.questionIndex = 0;
}
 
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
 
Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
 
    this.questionIndex++;
}
 
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}
 
 
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
 
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}
 
 
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
 
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
 
        showProgress();
    }
};
 
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};
 
 
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};
 
function showScores() {
    var gameOverHTML = "<h1>End of Pop Quiz</h1>";
    gameOverHTML += "<h2 id='score'> Score: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};
 
var questions = [
    new Question("What are the small test files called that are stored in a computer and get created when the user visits the websites to store information that they need?", ["Donuts", "Muffins","Cookies", "Cakes"], "Cookies"),
    new Question("What is one of the two basic groups of dataypes in JavaScript?", ["Primitive", "Primeval", "Primordial", "Ancient"], "Primitive"),
    new Question("Which keyword is used to print the text in the screen?", ["if", "document.write","else", "var"], "document.write"),
    new Question("Which method is used to add or append one or more elements to the end of an Array?", ["Pull", "Twist", "Bopit", "Push"], "Push"),
    new Question("Which JavaScript event allows DOM elements to be nested inside each other?", ["bubbling", "bubbled", "bubblehead", "bubbleheaded"], "bubbling")
];
 
var quiz = new Quiz(questions);

populate();