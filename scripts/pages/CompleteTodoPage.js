import { createElement, findElement } from "../elementUtils.js";

export const CompleteTodoPage = () => {
  handlePrintInitPage();
};

const handlePrintInitPage = () => {
  const todoMainEle = findElement("#todo-main");
  const completeMainEle = createElement("main", { id: "complete-main" });

  todoMainEle.replaceChildren(completeMainEle);
};
