import API from "./API.js";

export async function loadData() {
  const data = await API.getData();
  app.store.quizzes = data.quizzes;
}
