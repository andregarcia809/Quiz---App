import Question from './Question.js';
import Quiz from './Quiz.js';

// IIFE (Immediately Invoked Function Expression)
const App = (() => {
  // Cache the DOM
  const quizEl = document.querySelector('.jabQuiz');
  const quizQuestionEL = quizEl.querySelector('.jabQuiz__question');
  const trackerEL = quizEl.querySelector('.jabQuiz__tracker');
  const tagLineEl = quizEl.querySelector('.jabQuiz__tagline');
  const choicesEl = quizEl.querySelector('.jabQuiz__choices');
  const progressBarEl = quizEl.querySelector('.progress__bar');
  const nextBtnEL = quizEl.querySelector('.next');
  const restartBtnEl = quizEl.querySelector('.restart');

  // Initialize Questions
  const q1 = new Question(
    'Who is the first president of the US?',
    ['Barrack Obama', 'Donald Trump', 'George Washington', 'George Lopez', 'Richard Nixon'],
    2
  )
  const q2 = new Question(
    'when was JavaScript created?',
    ['june 1995', 'May 1995', 'Sept 1996', 'July 1985'],
    1
  )
  const q3 = new Question(
    'What does Css stand for?',
    ['County Sheriff Services', 'Center Social Science', 'Cascading Sexy Sheets', 'Cascading Style Sheets'],
    3
  )
  const q4 = new Question(
    'The full form of HTML is...',
    ['Hyper Text Markup  Language', 'Hey This Make Laptop', 'How The Mom Looks', 'All of the above'],
    0
  )
  const q5 = new Question(
    'console.log(type of []), would return what?',
    ['Array', 'NULL', 'String', 'Number', 'Object'],
    4
  )

  const quiz = new Quiz([q1, q2, q3, q4, q5]);

  // Events Handlers
  const listeners = _ => {
    nextBtnEL.addEventListener('click', ( )=> {
      const selectRadioEl = quizEl.querySelector('input[name="choice"]:checked');
      if(selectRadioEl) { // Implement a feature that does something when users has not clicked on a choice
        const key = Number(selectRadioEl.getAttribute('data-order'));
        quiz.guess(key);
        renderAll();
      }
    })

    restartBtnEl.addEventListener('click', () => {
      quiz.reset();
      renderAll();
      nextBtnEL.style.opacity = 1;
      tagLineEl.innerHTML = 'Pick your option below';
    })
  }




  //sets inner value of elements
  const changeInnerText = (elem, text) => {
    elem.innerHTML = text;
  }

  //Render the question
  const renderQuestion = _ => {
    const question = quiz.getCurrentQuestion().question;
    changeInnerText(quizQuestionEL, question);
  };

  // Render the choices elements
  const renderChoicesElements = _ => {
    let markup = '';
    const currentChoices = quiz.getCurrentQuestion().choices;
    currentChoices.forEach((element, index) => {
      markup += `
        <li class="jabQuiz__choice">
          <input type="radio" name="choice" class="jabQuiz__input" data-order="${index}"id="choice${index}">
          <label for="choice${index}" class="jabQuiz__label">
            <i></i>
            <span>${element}</span
          </label>
        </li>
     `
    });
    changeInnerText(choicesEl, markup);
  }

  // Render question Tracker
  const renderTracker = _ => {
    const index = quiz.currentIndex;
    changeInnerText(trackerEL, `${index +1} of ${quiz.question.length}`);
  }

  // Render Progress Bar
  const getPercentage = (num1, num2) => {
    return Math.round((num1 / num2 * 100))
  }

  const lauch = (width, maxPercent) => {
    let loadingBar = setInterval(_ => {
      if (width > maxPercent) {
        clearInterval(loadingBar);
      } else {
        width++;
        progressBarEl.style.width = width + '%';
      }
    }, 3)
  }

  //render EndScreen
  const rederEndScreend = _ => {
    changeInnerText(quizQuestionEL, 'Great Job');
    console.log(quizQuestionEL)
    changeInnerText(trackerEL, 'Complete');
    console.log(trackerEL)
    changeInnerText(tagLineEl, `Your score is: ${getPercentage(quiz.score, quiz.question.length)}%`);
    console.log(tagLineEl)
    nextBtnEL.style.opacity = 0;
    renderProgressBAr();
  }

  const renderProgressBAr = _ => {
    // width
    const currentWidth = getPercentage(quiz.currentIndex, quiz.question.length)
    // launch
    lauch(0, currentWidth);
  }

  const renderAll = _ => {
    if (quiz.hasEnded()) {
      rederEndScreend();
    } else {
      renderQuestion();
      renderChoicesElements();
      renderTracker();
      renderProgressBAr();
    }
  }

  //Global Scope only(Acces has been given)
  return {
    renderAll: renderAll,
    listeners: listeners
  }
})();

App.renderAll();
App.listeners();