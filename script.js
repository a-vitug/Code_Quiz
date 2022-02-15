//  timer box
var timerEl = document.querySelector("#timer");
var timerContent = document.querySelector(".timer-wrapper");

// questions box
var quizEl = document.querySelector(".quizContent");
var questionsEl = document.querySelector(".textQuestions");
var textQuestions = document.querySelector('.textQuestions');
var textChoices = document.querySelector('.textChoices');

// buttons
var startBtn = document.querySelector(".start");
var submitBtn = document.querySelector(".submit");
var resetBtn = document.querySelector(".reset");
var saveScoreBtn = document.querySelector(".enter");

// scores box
var resultEl = document.querySelector(".result");
var scoreEl = document.querySelector(".score-text");
var initialEl = document.querySelector("#initials");
var nameEl = document.querySelector("#nameEl");
var myScores = document.querySelector("#myScores");
var divForm = document.querySelector(".divForm");
var displayScore = document.querySelector(".display-score");


var secondsLeft = 60;
var userScore = 0;
var minus = 15;
var quizInterval = 0;
var questionContent = 0;
var userChoice;
var correctChoice;

// sample questions
var arrayQuestions = [
    {   question: "How do you create a function?",
        choices: [
            "function myFunction()", 
            "function(myFunction)", 
            "function: myFunction()", 
            "function = myFunction()"
            ],
        correct: "function myFunction()",
    },
    {   question: "How do you call a function?",
        choices: [
            "function = call", 
            "call()", 
            "function call()",
            "call = function"
            ],
        correct: "call()",
    },
    {   question: "What is the correct syntax to refer an external javascript?",
        choices: [
            "< script name = 'xxx.js' >", 
            "< script tag = 'xxx.js' >", 
            "< script href = 'xxx.js' >", 
            "< script src = 'xxx.js' >"
            ],
        correct: "< script src = 'xxx.js' >",
    },
    {   question: "How do you create a variable?",
        choices: [
            "create var", 
            "create()", 
            "var myVar", 
            "myVar"
            ],
        correct: "var myVar",
    },
    {   question: "Inside which element do we put JavaScript?",
        choices: [
            "< js >", 
            "< script >", 
            "< element >", 
            "< a >"
            ],
        correct: "< script >",
    }, 
    {   question: "How do you create a new element using JS?",
        choices: [
            ".createElement('div')",
            "createElement = div",
            ".createElement = div"
            ],
        correct: ".createElement('div')",
    }
];

// sets timer function
startBtn.addEventListener("click", function setTimer() {
    quizEl.classList.add("showQuiz");
    setQuestions(0);

    if (quizInterval === 0) {
        quizInterval = setInterval(function () {
            secondsLeft--;
            timerContent.textContent = "Time Left " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(quizInterval);
                // showResults();
                timerContent.textContent = "Time's up!";
                showResults();
            }
        }, 1000);
    }
    
});

// sets the questions to html
function setQuestions(index) {
    // sets the questions and choices\
    var questionDiv = '<span>' + arrayQuestions[index].question + '<span>';
    var choicesDiv = '<div class="choices">' + arrayQuestions[index].choices[0] + '<span></span></div>'
                    + '<div class="choices">'+ arrayQuestions[index].choices[1] +'<span></span></div>'
                    + '<div class="choices">'+ arrayQuestions[index].choices[2] +'<span></span></div>'
                    + '<div class="choices">'+ arrayQuestions[index].choices[3] +'<span></span></div>';
    textQuestions.innerHTML = questionDiv;
    textChoices.innerHTML = choicesDiv;

    // loops the choices
    var choices = document.querySelectorAll('.choices');
    for (var i = 0; i < choices.length; i++) {
        choices[i].setAttribute("onclick", "selectedChoice(this)");
    }
}

//  if choice gets selected
function selectedChoice(correct) {
    var userChoice = correct.textContent;
    var correctChoice = arrayQuestions[questionContent].correct;
    var choicesAll = textChoices.children.length;

    if (userChoice == correctChoice) {
        userScore += 1;
        correct.classList.add("correct");
        console.log("You got it right!");
    } else {
        correct.classList.add("wrong");
        secondsLeft = secondsLeft - minus;       
        console.log("Uh-oh! Try again...");

        for (var i = 0; i < choicesAll; i++) {
            if (textChoices.children[i].textContent == correctChoice) {
                textChoices.children[i].setAttribute("class", "choices correct");
            }
        }
    }

    // if user has clicked a choice
    for (var i = 0; i < choicesAll; i++) {
        textChoices.children[i].classList.add("dismiss");
    } 
    submitBtn.style.display = "inline-block";
}

// next question
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();

    if (questionContent < arrayQuestions.length - 1) {
        questionContent++;
        setQuestions(questionContent);
        submitBtn.style.display = "none";
    } else {
        console.log("Questions completed");
        showResults();
    } 
});

// sets the results
function showResults() {
    quizEl.classList.remove("showQuiz");
    resultEl.classList.add("showResult");
    quizEl.style.display = "none";
    timerContent.style.display = "none";
    displayScore.style.display = "none";

    if (userScore >= 4) {
        var scoreDiv = '<div>Yay! You are a master coder!</div><div class="score-text">Score = <span>' + userScore + '</span> /' + arrayQuestions.length + '</div>';
        scoreEl.innerHTML = scoreDiv;
        
    } else if (userScore <= 3) {
        var scoreDiv =  '<div>Uh-oh! You need to study more.</div><div class="score-text">Score = <span>' + userScore + '</span> /' + arrayQuestions.length + '</div>';
        scoreEl.innerHTML = scoreDiv;
    }
}

// saves the user's highscore
saveScoreBtn.addEventListener("click", function(event) {
    event.preventDefault();

    var userName = initialEl.value;

    displayScore.style.display = "inline-block";
    divForm.style.display = "none";

    localStorage.setItem("name", userName);
    localStorage.setItem("scores", userScore);

    yourScore();
});

//  displays the user scores
function yourScore() {
    nameEl.textContent = localStorage.getItem("name");
    myScores.textContent = localStorage.getItem("scores");
}