export default function Question(question, choices, answerKey) {
  this.question = question;
  this.choices = choices;
  this.answerKey = answerKey;
}
//Adding methods to prototype
Question.prototype.isCorrect = function (guessKey) {
  return guessKey === this.answerKey;
}
