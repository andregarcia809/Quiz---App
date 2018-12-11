import Question from './Question.js';
import Quiz from './Quiz.js';

const q1 = new Question('what is the color of the sky', ['blue','red'], 0);
const q2 = new Question('whos is the ruler of the world', ['dre', 'wicked', 'pedro'], 1);
// const q3 = new Question();
// const q4 = new Question();
// const q5 = new Question();

const qArray = [q1, q2];

const myQuiz = new Quiz(qArray);
// console.log(myQuiz.getCurrentQuestion())
console.log(myQuiz.nextIndex())
console.log(myQuiz.nextIndex())
console.log(myQuiz.hasEnded())
