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
      const formData = new FormData(this.querySelector("form.quiz-selection"));
      const answer = formData.get("option");

      if (answer === this.question.answer) {
        alert("Correcto");
      } else {
        alert("False");
      }
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

      this.querySelector(
        "header p"
      ).innerText = `Question ${app.store.questionIndex} of ${this.quiz.questions.length}`;
      this.querySelector("header h2").innerText = question;
      this.querySelector(".progress").style.setProperty(
        "--progress-percent",
        (app.store.questionIndex * 100) / this.quiz.questions.length
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
              ${option}</label
            >
          </li>`
        );
      });
    }
  }
}

customElements.define("question-page", QuestionPage);
