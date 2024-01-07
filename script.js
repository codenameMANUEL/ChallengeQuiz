//Getting all necessary id from html
// let schoolName = document.getElementById("schoolName");
// let studentName = document.getElementById("studentName");
// let btnEnroll = document.getElementById("btnEnroll");
const countdownEl = document.getElementById("countdown");

const questionElement =  document.getElementById("question");
const answerButtons =  document.getElementById("answer-buttons")
const nextButton =  document.getElementById("next-btn")
const toBeDeleted = document.getElementById("toBeDeleted");


//Necessary variable
//let competitors = [];
var registrationDeadline = new Date("October 1, 2023 00:00:00");

let currentQuestionIndex = 0;
let score = 0;

// timer countdown
const startingMinutes = 2;
let time = startingMinutes * 60;
setInterval(updateCountDown, 1000)
function updateCountDown() {
    if (time > 0) {
      const minutes = Math.floor(time / 60);
      let seconds = time % 60;
      seconds = seconds < 10 ? '0' + seconds : seconds;
  
      countdownEl.innerHTML = `${minutes}:${seconds}`;
      
      time--;
    } else {
      clearInterval(); // Stop the interval when time reaches 0
      countdownEl.innerHTML = "Time's up!";
    }
  }

const questions = [
    {
        question: "what is the largest animal in the world?",
        answers: [
            {text: "shark", correct: "false"},
            {text: "goat", correct: "false"},
            {text: "blue whale", correct: "true"},
            {text: "lamb", correct: "false"}
        ]
    }, 
    {
        question: "Where was the first example of paper money used?",
        answers: [
            {text: "China", correct: "true"},
            {text: "Turkey", correct: "false"},
            {text: "Greece", correct: "false"},
            {text: "nigeria", correct: "false"}
        ]
    },
    {
        question: "Which of the following languages has the longest alphabet?",
        answers: [
            {text: "Greek", correct: "false"},
            {text: "Russian", correct: "true"},
            {text: "Arabic", correct: "false"},
            {text: "English", correct: "false"}
        ]
    },
    {
        question: " What spirit is used in making a Tom Collins?",
        answers: [
            {text: "Gin", correct: "true"},
            {text: "Vodka", correct: "false"},
            {text: "Rum", correct: "false"},
            {text: "wine", correct: "false"}
        ]
    },
    {
        question: "What is the capital city of France?",
        answers: [
            {text: "Berlin", correct: "false"},
            {text: "Paris", correct: "true"},
            {text: "Rome", correct: "false"},
            {text: "Madrid", correct: "false"}
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            {text: "Jupiter", correct: "false"},
            {text: "Mars", correct: "true"},
            {text: "Venus", correct: "false"},
            {text: "Saturn", correct: "false"}

        ]
    },
    {
        question: "What is the powerhouse of the cell?",
        answers: [
            {text: "Nucleus", correct: "false"},
            {text: "Mitochondria", correct: "true"},
            {text: "Ribosome", correct: "false"},
            {text: "Endoplasmic reticulum", correct: "false"}
        ]
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        answers: [
            {text: "William Wordsworth", correct: "false"},
            {text: "William Shakespeare", correct: "true"},
            {text: "Jane Austen", correct: "false"},
            {text: "Charles Dickens", correct: "false"}
        ]
    },
    {
        question: "In what year did the United States declare its independence?",
        answers: [
            {text: "1776", correct: "true"},
            {text: "1789", correct: "false"},
            {text: "1800", correct: "false"},
            {text: "1607", correct: "false"}
        ]
    },
    {
        question: "Which gas do plants absorb during photosynthesis?",
        answers: [
            {text: "Oxygen", correct: "false"},
            {text: "Carbon Monoxide", correct: "false"},
            {text: "Carbon Dioxide", correct: "true"},
            {text: "Nitrogen", correct: "false"}
        ]
    }
]

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

let count = 0;
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = count + 1;
    count++;
    questionElement.innerHTML = questionNo + ". " +currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
        
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block"

}

function handleNextButton(){
    currentQuestionIndex ++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();


