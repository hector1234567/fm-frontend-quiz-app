import Store from "./services/Store.js";
import API from "./services/API.js";
import { loadData } from "./services/Quiz.js";
import Router from "./services/Router.js";

window.app = {};
window.store = Store;
window.router = Router;

window.addEventListener("DOMContentLoaded", function () {
  window.router.init();
  loadData();
});
