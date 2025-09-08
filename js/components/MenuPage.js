import { loadData } from "../services/Quiz.js";

export default class MenuPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("menu-page");
    const content = template.content.cloneNode(true);
    this.appendChild(content);
    loadData();
    app.store.correctAnswers = 0;
    app.store.questionIndex = 1;

    window.addEventListener("appQuizzesChange", () => {
      this.render();
    });

    this.addEventListener("click", function (ev) {
      const link = ev.target.closest("a.navlink");
      if (link) {
        ev.preventDefault();
        app.router.go(link.getAttribute("href"), false);
        app.store.quizIndex = link.dataset.quizindex;
      }
    });
  }

  render() {
    document.querySelector(".section-logo").innerHTML = "";

    if (app.store.quizzes) {
      const list = this.querySelector(".quiz-selection ul");
      list.innerHTML = "";
      app.store.quizzes.forEach((quiz, index) => {
        list.insertAdjacentHTML(
          "beforeend",
          `<li>
            <a href="/quiz" class="navlink"
            data-quizindex="${index}"
              ><img
                src="${quiz.icon}"
                alt=""
                class="bg-${quiz.color}"
              />${quiz.title}</a
            >
          </li>`
        );
      });
    }
  }
}

customElements.define("menu-page", MenuPage);
