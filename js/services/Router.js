const Router = {
  init: () => {
    document.querySelectorAll("a.navlink").forEach((a) => {
      a.addEventListener("click", (event) => {
        event.preventDefault();

        const url = event.target.getAttribute("href");
        Router.go(url);
      });
    });

    Router.go(location.pathname);
  },
  go: (route, addToHistory = true) => {
    if (addToHistory) {
      history.pushState({ route }, "", route);
    }
    let pageElement = null;
    switch (route) {
      case "/":
        pageElement = document.createElement("menu-page");
        break;
      case "/html":
        pageElement = document.createElement("question-page");
        pageElement.dataset.section = "html";
        pageElement.dataset.questionId = "1";
        break;
      case "/css":
        pageElement = document.createElement("question-page");
        pageElement.dataset.section = "html";
        pageElement.dataset.questionId = "1";
        break;
      case "/javascript":
        pageElement = document.createElement("question-page");
        pageElement.dataset.section = "html";
        pageElement.dataset.questionId = "1";
        break;
      case "/accessibility":
        pageElement = document.createElement("question-page");
        pageElement.dataset.section = "html";
        pageElement.dataset.questionId = "1";
        break;
      default:
        if (route.startsWith("/score-")) {
          pageElement = document.createElement("score-page");
          pageElement.dataset.section = route.substring(
            route.lastIndexOf("-") + 1
          );
        }
        break;
    }
    if (pageElement) {
      document.querySelector("main").innerHTML = "";
      document.querySelector("main").appendChild(pageElement);
    }
  },
};

export default Router;
