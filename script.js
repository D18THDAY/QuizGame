//Functions
function buildQuiz(){
  // variable to store the HTML output
  const output = [];

  // for each question...
  myQuestions.forEach(
    (currentQuestion, questionNumber) => {

      // variable to store the list of possible answers
      const answers = [];

      // and for each available answer...
      for(letter in currentQuestion.answers){

        // ...add an HTML radio button
        answers.push(
          `<label class="options">
            <input type="radio" name="question${questionNumber}" value="${letter}" class="option">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
		  `<div class="slide">
		    <div class="question"> ${currentQuestion.question} </div>
		    <div class="answers"> ${answers.join("")} </div>
		  </div>`
		);
    }
  );

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join('');
}

function showResults(){

  // gather answer containers from our quiz
  const answerContainers = quizContainer.querySelectorAll('.answers');

  // keep track of user's answers
  let numCorrect = 0;

  // for each question...
  myQuestions.forEach( (currentQuestion, questionNumber) => {

    // find selected answer
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    // if answer is correct
    if(userAnswer === currentQuestion.correctAnswer){
      // add to the number of correct answers
      numCorrect++;

      // color the answers green
      answerContainers[questionNumber].style.color = 'lightgreen';
    }
    // if answer is wrong or blank
    else{
      // color the answers red
      answerContainers[questionNumber].style.color = 'red';
    }
  });

  // show number of correct answers out of total
  resultsContainer.innerHTML = `<h2>You scored ${numCorrect} out of ${myQuestions.length}</h2>`;
}


function showSlide(n) {
  slides[currentSlide].classList.remove('active-slide');
  slides[n].classList.add('active-slide');
  currentSlide = n;
  if(currentSlide === 0){
    previousButton.style.display = 'none';
  }
  else{
    previousButton.style.display = 'inline-block';
  }
  if(currentSlide === slides.length-1){
    nextButton.style.display = 'none';
    submitButton.style.display = 'inline-block';
  }
  else{
    nextButton.style.display = 'inline-block';
    submitButton.style.display = 'none';
  }
}


//Variables
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');


const myQuestions = [
  {
    question: "<h2>What is the full meaning of HTML?</h2>",
    answers: {
      a: "Hypertext Motun Language",
      b: "HyperXyluz Markup language",
      c: "Hypertext Markup Language"
    },
    correctAnswer: "c"
  },
  {
    question: "<h2>Which of these is a track under startNG?</h2>",
    answers: {
      a: "Random",
      b: "Jeff",
      c: "Mobile"
    },
    correctAnswer: "c"
  },
  {
    question: "<h2>Which of this is a Javascript framework</h2>",
    answers: {
      a: "Tomisin",
      b: "jQuery",
      c: "Khris"
    },
    correctAnswer: "b"
  },
  {
    question: "<h2>What is the full meaning of CSS</h2>",
    answers: {
      a: "Cascading Style Sheet",
      b: "Cascading Seun Shit",
      c: "Covid Sick Show"
    },
    correctAnswer: "a"
  },
  {
    question: "<h2>Which of this is a version control system?</h2>",
    answers: {
      a: "Github",
      b: "Git",
      c: "Geet"
    },
    correctAnswer: "b"
  }
];

buildQuiz();


//Pagination
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
let options = document.getElementsByClassName('option');


//Show first slide
showSlide(currentSlide);

function showNextSlide() {
  showSlide(currentSlide + 1);
}

function showPreviousSlide() {
  showSlide(currentSlide - 1);
}


// Event listeners
submitButton.addEventListener('click', showResults);

previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);
  

