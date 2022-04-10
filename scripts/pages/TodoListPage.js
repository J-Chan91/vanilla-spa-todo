import { uuidv4 } from "../commonUtils.js";
import todoDatas from "../../data/all.js";
import { combineElement, createElement, findElement } from "../elementUtils.js";

export const TodoListPage = () => {
  handlePrintInitPage();
  handlePrintTodoList();
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
    event: {
      evtType: "change",
      listener: function (e) {
        sole.log(e.target.value);
      },
    },
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

const handleAddTodoEvent = () => {
  const uuid = uuidv4();
  const todoIpt = findElement(".todo-ipt");

  if (todoIpt.value === "") {
    alert("내용을 적어주세요");
    todoIpt.focus();
    return;
  }

  todoDatas.unshift({ todoId: uuid, content: todoIpt.value, complete: false });
  handlePrintTodoList();

  todoIpt.value = "";
};

const handlePrintTodoList = () => {
  const todoList = findElement("#todo-list-section");
  const docFrag = document.createDocumentFragment();

  todoDatas.map((item) => {
    if (!item.complete) {
      const todoItemContainer = createElement("span", {
        class: "todo-item",
        // id: item.todoId,
      });

      const todoItemCheckbox = createElement("input", {
        type: "checkbox",
        class: "todo-checkbox",
        event: { evtType: "change", listener: handleCheckTodo },
        id: item.todoId,
      });

      const todoItemLabel = createElement("label", {
        for: item.todoId,
      });

      const todoContent = createElement("span", {
        class: "todo-item-content",
        html: item.content,
      });

      combineElement(todoItemContainer, [
        todoItemCheckbox,
        todoItemLabel,
        todoContent,
      ]);

      docFrag.append(todoItemContainer);
    }
  });

  todoList.replaceChildren(docFrag);
};

// 할 일 클릭 토글 함수
const handleCheckTodo = (e) => {
  const targetIdx = todoDatas.findIndex((item) => item.todoId === e.target.id);

  todoDatas.splice(targetIdx, 1);

  handlePrintTodoList();
};
