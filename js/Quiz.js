import Question from './Question.js';

export default function Quiz(questions) {
  this.question = questions;
  this.score = 0;
  this.currentIndex = 0;
}
Quiz.prototype.getCurrentQuestion = function () {
  return this.question[this.currentIndex];
}
Quiz.prototype.nextIndex = function () {
  return this.currentIndex++;
}
Quiz.prototype.hasEnded = function () {
  return this.currentIndex === this.question.length;
}
Quiz.prototype.guess = function (userGuess) {
  const currentQuestion = this.question[this.currentIndex];

  if (this.currentQuestion.isCorrect(userGuess)) {
    this.score++;
  }
  this.nextIndex();
}