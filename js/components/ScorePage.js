export default class ScorePage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("score-page");
    const content = template.content.cloneNode(true);
    this.appendChild(content);
    this.render();

    this.querySelector(".button").addEventListener("click", (ev) => {
      app.router.go("/");
      app.store.correctAnswers = 0;
    });
  }

  render() {
    const quiz = app.store.quizzes[app.store.quizIndex];

    document.querySelector(".section-logo").innerHTML = `<img
          src="${quiz.icon}"
          alt=""
          class="bg-${quiz.color}"
        />${quiz.title}`;

    this.querySelector(".score__value").innerText = app.store.correctAnswers;
    this.querySelector(
      ".score__text"
    ).innerText = `out of ${quiz.questions.length}`;
  }
}

customElements.define("score-page", ScorePage);
