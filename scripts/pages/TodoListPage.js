import { uuidv4 } from "../commonUtils.js";
import todoDatas from "../../data/all.js";
import { combineElement, createElement, findElement } from "../elementUtils.js";

export const TodoListPage = () => {
  handlePrintInitPage();
  handlePrintTodoList();
};

const handleAddTodoEvent = () => {
  const addBtn = findElement("#add-todo-btn");
  const todoIpt = findElement(".todo-ipt");

  if (todoIpt.value === "") {
    alert("내용을 적어주세요");
    todoIpt.focus();
    return;
  }

  todoDatas.unshift({ content: todoIpt.value, complete: false });
  handlePrintTodoList();

  todoIpt.value = "";
};

const handlePrintInitPage = () => {
  const docFrag = document.createDocumentFragment();
  const todoMainEle = findElement("#todo-main");
  const todoIptWrapperEle = createElement("div", { id: "todo-ipt-wrapper" });
  const todoIptEle = createElement("input", {
    class: "todo-ipt",
    type: "text",
    placeholder: "할 일을 입력해주세요",
  });
  const todoDateEle = createElement("input", {
    class: "todo-date",
    type: "date",
  });
  const todoAddBtn = createElement("button", {
    id: "add-todo-btn",
    html: "등록",
    event: { evtType: "click", listener: handleAddTodoEvent },
  });
  const hrEle = createElement("hr");
  const todoListSectionEle = createElement("section", {
    id: "todo-list-section",
  });

  combineElement(todoIptWrapperEle, [todoIptEle, todoDateEle, todoAddBtn]);
  combineElement(docFrag, [todoIptWrapperEle, hrEle, todoListSectionEle]);

  todoMainEle.replaceChildren(docFrag);
};

const handlePrintTodoList = () => {
  const todoList = findElement("#todo-list-section");
  const docFrag = document.createDocumentFragment();

  for (let i = 0; i < todoDatas.length; i++) {
    const uuid = uuidv4();

    const todoItemContainer = createElement("span", {
      class: "todo-item",
      id: `todo-${uuid}`,
    });

    const todoItemCheckbox = todoDatas[i].complete
      ? createElement("input", {
          type: "checkbox",
          class: "todo-checkbox",
          checked: "",
          event: { evtType: "change", listener: handleCheckTodo },
          id: `${uuid}`,
        })
      : createElement("input", {
          type: "checkbox",
          class: "todo-checkbox",
          event: { evtType: "change", listener: handleCheckTodo },
          id: `${uuid}`,
        });

    const todoItemLabel = createElement("label", {
      for: `${uuid}`,
    });

    const todoContent = todoDatas[i].complete
      ? createElement("span", {
          class: "todo-item-content complete",
          html: todoDatas[i].content,
        })
      : createElement("span", {
          class: "todo-item-content",
          html: todoDatas[i].content,
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

// 할 일 클릭 토글 함수
const handleCheckTodo = (e) => {
  if (e !== undefined) {
    if (e.target.checked) {
      e.target.setAttribute("checked", "");
      e.path[1].children[2].classList.add("complete");
    } else {
      e.target.removeAttribute("checked");
      e.path[1].children[2].classList.remove("complete");
    }
  }
};
