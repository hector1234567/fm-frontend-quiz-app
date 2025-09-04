import Store from "./services/Store.js";
import API from "./services/API.js";
import { loadData } from "./services/Quiz.js";

window.app = {};
window.store = Store;

window.addEventListener("DOMContentLoaded", function () {
  loadData();
});
