import { uuidv4 } from "./commonUtils.js";
import { findElement } from "./elementUtils.js";
import { TodoListPage } from "./pages/TodoListPage.js";
import { CompleteTodoPage } from "./pages/CompleteTodoPage.js";
import { ImportantTodoPage } from "./pages/ImportantTodoPage.js";

const routes = [
  { path: "/", component: TodoListPage },
  { path: "/complete", component: CompleteTodoPage },
  { path: "/important", component: ImportantTodoPage },
];
const navigationBar = findElement("#navigation");

navigationBar.addEventListener("click", (e) => {
  e.preventDefault();

  const path = e.target.getAttribute("href");

  console.log("???");

  history.pushState(null, null, path);

  render(path);
});

window.addEventListener("popstate", () => {
  console.log(location.pathname);

  render(location.pathname);
});

const render = (path) => {
  const target = routes.find((route) => route.path === path);

  if (!target) {
    alert("잘못된 경로");
  } else {
    target.component();
  }
};

render(location.pathname);
