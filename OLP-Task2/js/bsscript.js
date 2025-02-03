const questions= [
    {
        question: "What is Bootstrap primarily used for?",
        answers: [
           {text: "Creating responsive websites", correct: true},
           {text: "Building mobile applications", correct: false},
           {text: "Editing images", correct: false},
           {text: "Developing desktop software", correct: false}
        ]
     },
     {
        question: "Which class in Bootstrap is used to create a button with primary styling?",
        answers: [
           {text: "btn-primary", correct: true},
           {text: "btn-main", correct: false},
           {text: "button-primary", correct: false},
           {text: "btn-blue", correct: false}
        ]
     },
     {
        question: "Which class is used to create a responsive container in Bootstrap?",
        answers: [
           {text: "container-fluid", correct: true},
           {text: "container-responsive", correct: false},
           {text: "container-fixed", correct: false},
           {text: "responsive-container", correct: false}
        ]
     },
     {
        question: "What is the correct class to apply a grid column in Bootstrap?",
        answers: [
           {text: "col", correct: true},
           {text: "grid-col", correct: false},
           {text: "column", correct: false},
           {text: "row-col", correct: false}
        ]
     },
     {
        question: "Which Bootstrap class is used to align text to the center?",
        answers: [
           {text: "text-center", correct: true},
           {text: "center-text", correct: false},
           {text: "align-center", correct: false},
           {text: "text-align-center", correct: false}
        ]
     }
     
 ];
 
 const  questionElement = document.getElementById("question");
 const answerButtons = document.getElementById("answer-buttons");
 const nextButton = document.getElementById("next-btn");
 let currentQuestionIndex = 0;
 let score = 0;
 
 function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
 }
 
 function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
 
    currentQuestion.answers.forEach(answer => {
       const button = document.createElement("button");
       button.innerHTML = answer.text;
       button.classList.add("btn2");
       answerButtons.appendChild(button);
       if(answer.correct){
        button.dataset.correct = answer.correct;
       }
       button.addEventListener("click", selectAnswer)
    })
 }
 
 function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
       answerButtons.removeChild(answerButtons.firstChild);
    }
 }

 function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct == "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
 }

 function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML = "Start Again";
    nextButton.style.display = "block";
 }

 function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
 }

 nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex< questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
 })
 
 startQuiz();