const questions= [
    {
       question: "What does HTML stand for?",
       answers:[
          {text: "Home Tool Markup Language", correct:false},
          {text: "Hyper Text Markup Language", correct:true},
          {text: "Hyperlinks and Text Markup Language", correct:false},
          {text: "Hyper Tool Markup Language", correct:false},
       ]
    },
    {
       question: "What is the correct HTML element for the largest heading?",
       answers: [
          {text: "h1", correct: true},
          {text: "heading", correct: false},
          {text: "h6", correct: false},
          {text: "head", correct: false}
       ]
    },
    {
       question: "Which HTML tag is used to define a hyperlink?",
       answers: [
          {text: "link", correct: false},
          {text: "a", correct: true},
          {text: "href", correct: false},
          {text: "hyperlink", correct: false}
       ]
    },
    {
       question: "How do you add a comment in HTML?",
       answers: [
          {text: "!-- This is a comment --", correct: true},
          {text: "// This is a comment", correct: false},
          {text: "/* This is a comment */", correct: false},
          {text: "comment This is a comment /comment", correct: false}
       ]
    },
    {
       question: "Which attribute is used to specify the URL of an image in an <img> tag?",
       answers: [
          {text: "alt", correct: false},
          {text: "src", correct: true},
          {text: "href", correct: false},
          {text: "url", correct: false}
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