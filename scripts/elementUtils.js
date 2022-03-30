export const findElement = (ele, all = false) => {
  return all ? document.querySelectorAll(ele) : document.querySelector(ele);
};

export const combineElement = (target, child) => {
  target.append(...child);
};

export const createElement = (tag, attr) => {
  const newEle = document.createElement(tag);

  for (const key in attr) {
    const value = attr[key];

    switch (key) {
      case "html":
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