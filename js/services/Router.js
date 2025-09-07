const Router = {
  init: () => {
    // document.querySelectorAll("a.navlink").forEach((a) => {
    //   a.addEventListener("click", (event) => {
    //     event.preventDefault();
    //     const url = event.target.getAttribute("href");
    //     Router.go(url);
    //   });
    // });

    window.addEventListener("popstate", (event) => {
      Router.go(event.state.route, false);
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
      case "/index.html":
        pageElement = document.createElement("menu-page");
        break;
      case "/quiz":
        pageElement = document.createElement("question-page");
        break;
      case "/score":
        pageElement = document.createElement("score-page");
        break;
    }
    if (pageElement) {
      document.querySelector("main").innerHTML = "";
      document.querySelector("main").appendChild(pageElement);
    }
  },
};

export default Router;
