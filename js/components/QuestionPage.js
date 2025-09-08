import { escapeHtml } from "../utils.js";

export default class QuestionPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("question-page");
    const content = template.content.cloneNode(true);
    this.appendChild(content);

    window.addEventListener("appQuizIndexChange", () => {
      this.quiz = app.store.quizzes[app.store.quizIndex];
      this.question = this.quiz.questions[0];
      this.renderHeader();
      this.renderQuestion();
    });

    window.addEventListener("appQuestionIndexChange", () => {
      if (this.quiz) {
        this.question = this.quiz.questions[app.store.questionIndex - 1];
        this.renderQuestion();
      }
    });

    this.querySelector("form").addEventListener("submit", (ev) => {
      ev.preventDefault();

      if (this.answer) {
        this.answer = null;
        if (app.store.questionIndex === this.quiz.questions.length) {
          return app.router.go("/score");
        }
        return app.store.questionIndex++;
      }

      const formData = new FormData(this.querySelector("form.quiz-selection"));
      this.answer = formData.get("option");

      if (this.answer === this.question.answer) {
        app.store.correctAnswers++;
      }
      this.renderResult();
    });

    this.querySelector("form").addEventListener("change", (ev) => {
      this.querySelector('[type="submit"]').disabled = false;
    });
  }

  renderHeader() {
    if (this.quiz) {
      const logo = document.querySelector(".section-logo");
      logo.innerHTML = `<img
          src="${this.quiz.icon}"
          alt=""
          class="bg-${this.quiz.color}"
        />${this.quiz.title}`;
    }
  }

  renderQuestion() {
    if (this.question) {
      const { question, options } = this.question;

      this.querySelector('[type="submit"]').innerText = "Submit Answer";
      this.querySelector('[type="submit"]').disabled = true;

      this.querySelector(
        "header p"
      ).innerText = `Question ${app.store.questionIndex} of ${this.quiz.questions.length}`;
      this.querySelector("header h2").innerText = question;
      this.querySelector(".progress").style.setProperty(
        "--progress-percent",
        ((app.store.questionIndex - 1) * 100) / this.quiz.questions.length
      );

      const list = this.querySelector(".quiz-selection ul");
      list.innerHTML = "";
      options.forEach((option, index) => {
        list.insertAdjacentHTML(
          "beforeend",
          `<li>
            <input type="radio" name="option" id="option-${index}" value="${option}" hidden />
            <label for="option-${index}"
              ><div class="badge">${String.fromCharCode(65 + index)}</div>
              ${escapeHtml(option)}</label
            >
          </li>`
        );
      });
    }
  }

  renderResult() {
    if (this.question) {
      const { options } = this.question;

      this.querySelector('[type="submit"]').innerText = "Next Question";

      const list = this.querySelector(".quiz-selection ul");
      list.innerHTML = "";
      options.forEach((option, index) => {
        const isCorrectAnswer = option === this.question.answer;
        const isSelectedAnswer = option === this.answer;
        list.insertAdjacentHTML(
          "beforeend",
          `<li>
            <input type="radio" name="option" id="option-${index}" disabled hidden />
            <label for="option-${index}" 
            class="${isCorrectAnswer && "correctAnswer"} ${
            isSelectedAnswer && "selectedAnswer"
          }"
              ><div class="badge">${String.fromCharCode(65 + index)}</div>
              ${escapeHtml(option)}</label
            >
          </li>`
        );
      });
    }
  }
}

customElements.define("question-page", QuestionPage);
