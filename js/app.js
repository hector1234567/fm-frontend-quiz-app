import Store from "./services/Store.js";
import API from "./services/API.js";
import Router from "./services/Router.js";
import MenuPage from "./components/MenuPage.js";
import QuestionPage from "./components/QuestionPage.js";
import ScorePage from "./components/ScorePage.js";

window.app = {};
app.store = Store;
app.router = Router;

window.addEventListener("DOMContentLoaded", function () {
  app.router.init();
});
