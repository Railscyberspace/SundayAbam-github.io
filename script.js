// declaration of variables
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const instruct = document.querySelector(".instruct");
const finishButton = document.getElementById("finish-btn");
const quiz = document.getElementById("quiz");
const questionSection = document.getElementById("question-holder");
const questionLine = document.getElementById("question");
const answerColumn = document.getElementById("answer");
const scoring = document.getElementById("score");

let shuffledQuestion, currentQuestionIndex;
let score = 0;

// eventlisteners for when an event occurs
startButton.addEventListener("click", startGame);
finishButton.addEventListener("click", endGame);
nextButton.addEventListener("click", () =>
{
    currentQuestionIndex++
    setNextQuestion()
});

// questions array
const questions = [
    {
        question: "What is the full Meaning of DOM?",
        answers: [
            { text: "Document Object Motor", correct: false },
            { text: "Document Object movement", correct: false },
            { text: "Document Object move", correct: false },
            { text: "Document Object Model", correct: true }
        ]
    },
    {
        question: "What is the full meaning of HTML?",
        answers: [
            { text: "Hypertext markup Language", correct: true },
            { text: "hypertubular makrkup Language", correct: false },
            { text: "Hypertext madeup Language", correct: false },
            { text: "Hypertension Markup Language", correct: false }
        ]
    },
    {
        question: "What is the Full meaning of SQL",
        answers: [
            { text: "Structured Quite Language", correct: false },
            { text: "Structure Quick Language", correct: false },
            { text: "Structured Query Language", correct: true },
            { text: "Structive Query Language", correct: false }
        ]
    },
    {
        question: "What are the four Types of Database ?",
        answers: [
            { text: "(1).text databases. (2)desktop database programs,(3)relational database management systems(RDMS). (4)NoSQL and object-oriented databases.", correct: true },
            { text: "(1)NoSQL and object-oriented databases. (2)microsoft Database.(3)Google Database.(4)Amazon Database", correct: false },
            { text: "(1)Alibaba Database. (2)IBm Database. (3)Oracle Database. (4) Windows Database", correct: false },
            { text: "None of the Above", correct: false }
        ]
    },
    {
        question: " 24.4 is a float:True or false",
        answers: [
            { text: "False", correct: false },
            { text: "True", correct: true },
            { text: " False ", correct: false },
            { text: "None of the above", correct: false }
        ]
    }
]

// when start button is clicked
function startGame()
{
    quiz.classList.add("hide");
    startButton.classList.add("hide");
    finishButton.classList.add("hide");
    questionSection.classList.remove("hide");
    shuffledQuestion = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    scoring.innerText = "Score: " + score;
    setNextQuestion();
}

// selecting next question
function setNextQuestion()
{
    resetState();
    showQuestion(shuffledQuestion[currentQuestionIndex]);
}

// the actual option buttons are created here.
// the previous buttons are then removed in the next function.
// the correct option is color coded green when option clicked.

function showQuestion(question)
{
    questionLine.innerText = question.question;
    question.answers.forEach(answer =>
    {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct)
        {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerColumn.appendChild(button);
    });
}

// removing next button and previous children button of the answer div
function resetState()
{
    nextButton.classList.add("hide");
    while (answerColumn.firstChild)
    {
        answerColumn.removeChild(answerColumn.firstChild);
    }
}

function selectAnswer(element)
{
    let selectedButton = element.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);

    // when the buttons are click the color-code status will be assign to each button
    // when the button has been clicked it cannot be clicked again
    Array.from(answerColumn.children).forEach(button =>
    {
        setStatusClass(button, button.dataset.correct);
        button.disabled = true;
    });
    // when answer button clicked, and next button clicked there is a loop 
    // until the end of the 5 questions before the game then finishes, it does not start all over again.

    if (shuffledQuestion.length > currentQuestionIndex + 1)
    {
        nextButton.classList.remove("hide");
        instruct.classList.add("hide");

    } else
    {
        finishButton.classList.remove("hide");
    }

    // if button clicked is the correct option, score is increased by 1.
    // if not it remains unchanged from 0.

    if (selectedButton = correct)
    {
        scoring.innerText = score += 1;
        scoring.innerText = "Score: " + score + "/" + questions.length;
    } else
    {
        scoring.innerText = "Score: " + score + "/" + questions.length;
    }
}

// when options click, the correct one displays green and wrong displays red.
function setStatusClass(element, correct)
{
    clearStatusClass(element);
    if (correct)
    {
        element.classList.add("correct");
    } else
    {
        element.classList.add("wrong");
    }
}

// when next is clicked, the color coding is removed until option clicked again
function clearStatusClass(element)
{
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

// when the finish button is clicked, this function calls the end display of the game, where the total score is displayed.
function endGame()
{
    finishButton.classList.add("hide");
    questionSection.classList.add("hide");
    scoring.classList.add("hide");

    const totalScore = document.createElement("p");
    let end = "TOTAL";
    totalScore.innerText = end;
    totalScore.classList.add("question1");
    quiz.appendChild(totalScore);
    quiz.removeChild(quiz.firstChild);
    quiz.classList.remove("hide");

    const endScore = document.createElement("p");
    endScore.innerText = "You scored" + " " + score + " " + "out of" + " " + questions.length + " " + "correctly.";
    endScore.classList.add("question");
    quiz.appendChild(endScore);

    // an end of game goodbye.

    if (score >= 3)
    {
        const endMsg = document.createElement("p");
        endMsg.innerText = "Congrats!!";
        endMsg.classList.add("question");
        quiz.appendChild(endMsg);
    } else
    {
        const endMsg = document.createElement("p");
        endMsg.innerText = "Try harder next time.";
        endMsg.classList.add("question");
        quiz.appendChild(endMsg);
    }

}

