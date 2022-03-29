function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const findElement = (ele, all = false) => {
  return all ? document.querySelectorAll(ele) : document.querySelector(ele);
};

const combineElement = (target, child) => {
  target.append(...child);
};

const createElement = (tag, attr) => {
  const newEle = document.createElement(tag);

  for (const key in attr) {
    const value = attr[key];

    switch (key) {
      case "html":
        console.log(value);
        newEle.innerText = value;
        break;
      case "event":
        // for (const e in value) ele.addEventListener(e, value[e]);
        break;
      case "class":
        newEle.className = value;
        break;
      case "id":
        newEle.id = value;
        break;
      default:
        newEle.setAttribute(key, value);
        break;
    }
  }

  return newEle;
};

const addEvents = () => {
  addBtn.addEventListener("click", function (e) {
    if (todoIpt.value === "") {
      alert("내용을 적어주세요");
      todoIpt.focus();
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

const todoIpt = findElement(".todo-ipt");
const addBtn = findElement("#add-todo-btn");
const todoList = findElement("#todo-list-section");

const render = () => {
  addEvents();
};

render();
