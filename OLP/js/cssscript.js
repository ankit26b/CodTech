const questions = [
  {
    question: "Which property is used to change the text color in CSS?",
    answers: [
      { text: "color", correct: true },
      { text: "font-color", correct: false },
      { text: "text-color", correct: false },
      { text: "foreground-color", correct: false },
    ],
  },
  {
    question: "How do you apply a CSS style to a specific element by its ID?",
    answers: [
      { text: "#idName", correct: true },
      { text: ".idName", correct: false },
      { text: "idName", correct: false },
      { text: "*idName", correct: false },
    ],
  },
  {
    question:
      "Which property is used to control the space between lines of text?",
    answers: [
      { text: "line-height", correct: true },
      { text: "spacing", correct: false },
      { text: "letter-spacing", correct: false },
      { text: "text-spacing", correct: false },
    ],
  },
  {
    question:
      "What is the correct way to make all <p> elements have a margin of 20 pixels?",
    answers: [
      { text: "p { margin: 20px; }", correct: true },
      { text: "p { padding: 20px; }", correct: false },
      { text: "p { margin-size: 20px; }", correct: false },
      { text: "p { margin-width: 20px; }", correct: false },
    ],
  },
  {
    question:
      "How do you select all elements with a class name 'example' in CSS?",
    answers: [
      { text: ".example", correct: true },
      { text: "#example", correct: false },
      { text: "example", correct: false },
      { text: "*example", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn2");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct == "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
  nextButton.innerHTML = "Start Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
