const Store = {
  quizzes: [],
  quizIndex: null,
  questionIndex: 1,
  correctAnswers: 0,
};

const proxiedStore = new Proxy(Store, {
  set(target, property, value) {
    target[property] = value;

    if (property == "quizzes") {
      window.dispatchEvent(new Event("appQuizzesChange"));
    }
    if (property == "quizIndex") {
      window.dispatchEvent(new Event("appQuizIndexChange"));
    }
    if (property == "questionIndex") {
      window.dispatchEvent(new Event("appQuestionIndexChange"));
    }
    if (property == "correctAnswers") {
      window.dispatchEvent(new Event("appCorrectAnswersChange"));
    }
    return true;
  },
});

export default proxiedStore;
