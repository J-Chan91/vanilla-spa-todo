import { uuidv4 } from "./commonUtils.js";
import { combineElement, createElement, findElement } from "./elementUtils.js";

const fetchData = async (url) => {
  return await (await fetch(url)).json();
};

export const LandingPage = async () => {
  const result = await fetchData("../data/all.json");

  const todoList = findElement("#todo-list-section");
  const docFrag = document.createDocumentFragment();

  for (let i = 0; i < result.length; i++) {
    const uuid = uuidv4();

    const todoItemContainer = createElement("span", {
      class: "todo-item",
      id: `todo-${uuid}`,
    });

    const todoItemCheckbox = result[i].complete
      ? createElement("input", {
          type: "checkbox",
          class: "todo-checkbox",
          checked: "",
          id: `${uuid}`,
        })
      : createElement("input", {
          type: "checkbox",
          class: "todo-checkbox",
          id: `${uuid}`,
        });

    const todoItemLabel = createElement("label", {
      for: `${uuid}`,
    });

    const todoContent = createElement("span", {
      class: "todo-item-content",
      html: result[i].content,
    });

    combineElement(todoItemContainer, [
      todoItemCheckbox,
      todoItemLabel,
      todoContent,
    ]);
    docFrag.append(todoItemContainer);
  }

  todoList.replaceChildren(docFrag);
};
