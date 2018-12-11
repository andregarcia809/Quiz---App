export default function Question(question, choices, answerKey) {
  this.question = question;
  this.choices = question;
  this.answerKey = answerKey;
}
//Adding methods to prototype
Question.prototype.isCorrect = function (guessKey) {
  return guessKey === this.answerKey;
}
