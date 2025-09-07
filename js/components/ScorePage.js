export default class ScorePage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("score-page");
    const content = template.content.cloneNode(true);
    this.appendChild(content);
  }
}

customElements.define("score-page", ScorePage);
