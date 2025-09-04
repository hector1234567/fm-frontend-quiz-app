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
    console.log(route);
  },
};

export default Router;
