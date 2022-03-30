import { uuidv4 } from "./commonUtils.js";
import { LandingPage } from "./components.js";
import { combineElement, createElement, findElement } from "./elementUtils.js";

const routes = [{ path: "/", component: LandingPage }];

const todoMain = findElement("#todo-main");
const todoIpt = findElement(".todo-ipt");
const navigationBar = findElement("#navigation");
const addBtn = findElement("#add-todo-btn");
const todoList = findElement("#todo-list-section");

const addNavigationEvent = () => {
  navigationBar.addEventListener("click", (e) => {
    e.preventDefault();

    const path = e.target.getAttribute("href");

    history.pushState({}, null, path);
  });
};

const addTodoIptEvents = () => {
  addBtn.addEventListener("click", function (e) {
    if (todoIpt.value === "") {
      alert("내용을 적어주세요");
      todoIpt.focus();
      return;
    }

    const uuid = uuidv4();

    const todoItem = createElement("span", {
      class: "todo-item",
      id: `todo-${uuid}`,
    });

    const todoItemCheckbox = createElement("input", {
      type: "checkbox",
      class: "todo-checkbox",

      id: `${uuid}`,
    });

    const todoItemLabel = createElement("label", {
      for: `${uuid}`,
    });

    const todoContent = createElement("span", {
      class: "todo-item-content",
      html: todoIpt.value,
    });

    combineElement(todoItem, [todoItemCheckbox, todoItemLabel, todoContent]);

    todoList.prepend(todoItem);

    todoIpt.value = "";
  });
};

const render = async (path) => {
  const target = routes.find((route) => route.path === path);

  if (!target) {
    alert("잘못된 경로");
  } else {
    await target.component();
  }

  LandingPage();
  addTodoIptEvents();
  addNavigationEvent();
};

render(location.pathname);
