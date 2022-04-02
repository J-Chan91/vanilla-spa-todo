import { uuidv4 } from "./commonUtils.js";
import { all } from "../data/all.js";
import { combineElement, createElement, findElement } from "./elementUtils.js";

export const LandingPage = () => {
  const todoList = findElement("#todo-list-section");
  const docFrag = document.createDocumentFragment();

  for (let i = 0; i < all.length; i++) {
    const uuid = uuidv4();

    const todoItemContainer = createElement("span", {
      class: "todo-item",
      id: `todo-${uuid}`,
    });

    const todoItemCheckbox = all[i].complete
      ? createElement("input", {
          type: "checkbox",
          class: "todo-checkbox",
          checked: "",
          event: handleCheckTodo,
          id: `${uuid}`,
        })
      : createElement("input", {
          type: "checkbox",
          class: "todo-checkbox",
          event: handleCheckTodo,
          id: `${uuid}`,
        });

    const todoItemLabel = createElement("label", {
      for: `${uuid}`,
    });

    const todoContent = all[i].complete
      ? createElement("span", {
          class: "todo-item-content complete",
          html: all[i].content,
        })
      : createElement("span", {
          class: "todo-item-content",
          html: all[i].content,
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

const handleCheckTodo = (e) => {
  if (e !== undefined) {
    console.log(e.path[1].children[2].classList);

    if (e.target.checked) {
      e.target.setAttribute("checked", "");
      e.path[1].children[2].classList.add("complete");
    } else {
      e.target.removeAttribute("checked");
      e.path[1].children[2].classList.remove("complete");
    }
  }
};
