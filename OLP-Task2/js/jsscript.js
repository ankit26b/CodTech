const questions= [
    {
        question: "What does 'var' keyword in JavaScript do?",
        answers: [
           {text: "Declares a variable", correct: true},
           {text: "Defines a function", correct: false},
           {text: "Creates a constant", correct: false},
           {text: "Starts a loop", correct: false}
        ]
     },
     {
        question: "How do you write 'Hello, World!' in an alert box?",
        answers: [
           {text: "alert('Hello, World!');", correct: true},
           {text: "msg('Hello, World!');", correct: false},
           {text: "alertBox('Hello, World!');", correct: false},
           {text: "print('Hello, World!');", correct: false}
        ]
     },
     {
        question: "Which operator is used to assign a value to a variable?",
        answers: [
           {text: "=", correct: true},
           {text: "==", correct: false},
           {text: "===", correct: false},
           {text: "=>", correct: false}
        ]
     },
     {
        question: "Which method is used to round a number to the nearest integer in JavaScript?",
        answers: [
           {text: "Math.round()", correct: true},
           {text: "Math.ceil()", correct: false},
           {text: "Math.floor()", correct: false},
           {text: "Math.truncate()", correct: false}
        ]
     },
     {
        question: "How do you create a function in JavaScript?",
        answers: [
           {text: "function myFunction() { }", correct: true},
           {text: "def myFunction() { }", correct: false},
           {text: "function: myFunction() { }", correct: false},
           {text: "create myFunction() { }", correct: false}
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