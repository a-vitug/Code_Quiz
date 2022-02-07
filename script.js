var startBtn = document.querySelector(".start");
var quizEl = document.querySelector(".quizContent");
var questionsEl = document.querySelector(".textQuestions");
var submitBtn = document.querySelector(".submit");
var choicesEl = document.querySelector(".textChoices");
var textQuestions = document.querySelector('.textQuestions');
var textChoices = document.querySelector('.textChoices');
var timerEl = document.querySelector("#timer");
var timerContent = document.querySelector(".timer-wrapper");
var resultEl = document.querySelector(".result");
var resetEl = document.querySelector(".reset");

var secondsLeft = 60;
var userScore = 0;
var minus = 5;
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
            "function()", 
            "function call()",
            "call = function()"
            ],
        correct: "function()",
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
// function setTimer() {
//     var timeInterval = setInterval(function() {
//         secondsLeft--;
//         timeEl.textContent = (secondsLeft + " seconds left...");
//         if (secondsLeft === 0) {
//             clearInterval (timeInterval);
//             timeEl.textContent = ("");
//             // ----> proceed to next question;
//         }

//     }, 1000);
// }


startBtn.addEventListener("click", function setTimer() {
    quizEl.classList.add("showQuiz");
    setQuestions(0);

    if (quizInterval === 0) {
        quizInterval = setInterval(function () {
            secondsLeft--;
            timerContent.textContent = "Time Left " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(quizInterval);
                showResults();
                timerContent.textContent = "Time's up!";
            }
        }, 1000);
    // } if (userChoice !== correctChoice) {
    //     secondsLeft = secondsLeft - minus;
    };
    
});

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

function selectedChoice(correct) {
    var userChoice = correct.textContent;
    var correctChoice = arrayQuestions[questionContent].correct;
    var choicesAll = textChoices.children.length;

    if (userChoice == correctChoice) {
        correct.classList.add("correct");
        console.log("You got it right!");
    } else {
        correct.classList.add("wrong");
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
submitBtn.onclick = ()=> {
    if (questionContent < arrayQuestions.length - 1) {
        questionContent++;
        setQuestions(questionContent);
        submitBtn.style.display = "none";
    } else {
        console.log("Questions completed");
        showResults();
    } 

};

// function questionCount(index) {
//     var quizCount = document.querySelector(".quiz-count");
//     var totalCount = '<span><p>' + index + '</p>out of<p>' + arrayQuestions.length + '</p><p>Questions</p></span>';
//     quizCount.innerHTML = totalCount;

// }

// // sets the submit button
function showResults() {
    resultEl.classList.add("showResultBox");
    quizEl.classList.remove("showQuiz");
}