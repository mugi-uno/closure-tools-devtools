import { findByModuleId, getModuleName } from "./util";

let highlightElements: Element[] = [];

export const highlight = (elementOrId: Element | string) => {
  let element: Element;

  if (typeof elementOrId === "string") {
    element = findByModuleId(elementOrId)!;
  } else {
    element = elementOrId;
  }

  unhighlight();

  if (!element) return;

  const rect = element.getBoundingClientRect();

  const highlightElement = document.createElement("div");
  highlightElement.setAttribute(
    "style",
    `
    position: absolute;
    left: ${rect.x + window.pageXOffset}px;
    top: ${rect.y + window.pageYOffset}px;
    width: ${rect.width}px;
    height: ${rect.height}px;
    border: 2px solid red;
    background: rgb(255 255 120 / 30%);
    box-sizing: border-box;
    opacity: 0.6;
    pointer-events: none;
    z-index: 2147483647;
  `
  );

  highlightElement.addEventListener("click", () => {
    console.log(name);
  });

  const name = getModuleName(element);
  const nameElement = document.createElement("div");
  nameElement.innerText = name!;

  const horizontalPositionStyle =
    rect.x > document.body.offsetWidth * 0.75
      ? `
      text-align: right;
      right: ${document.body.offsetWidth - rect.x - rect.width}px;
    `
      : `
      text-align: left;
      left: ${rect.x + window.pageXOffset}px;
    `;

  const verticalPositonStyle =
    rect.y > document.body.offsetHeight * 0.75
      ? `top: ${rect.y + window.pageYOffset + -18}px;`
      : `top: ${rect.y + window.pageYOffset + rect.height}px;`;

  nameElement.setAttribute(
    "style",
    `
      position: absolute;
      ${horizontalPositionStyle}
      ${verticalPositonStyle}
      padding: 2px;
      background: rgb(0 0 0 / 70%);
      color: white;
      font-size: 12px;
      font-weight: bold;
      overflow: visible;
      z-index: 2147483647;
      font-family: monospace;
    `
  );

  document.body.appendChild(highlightElement);
  document.body.appendChild(nameElement);

  highlightElements = [highlightElement, nameElement];
};

export const unhighlight = () => {
  highlightElements.forEach((element) => element.remove());
  highlightElements = [];
};
