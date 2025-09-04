import API from "./API.js";

export async function loadData() {
  const data = await API.getData();
  console.log(data);
  window.store.quizzes = data.quizzes;
}
