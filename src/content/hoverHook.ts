import { findClosestModule, getModuleAttributes } from "./util";
import { postMessage } from "../port";
import { highlight, unhighlight } from "./highlight";

let currentHoveredElement: Element | null;

const hook = (event: MouseEvent) => {
  if (!event.target) return;

  const element = event.target as Element;
  const closureElement = findClosestModule(element);
  if (!closureElement) return;

  unhighlight();
  highlight(closureElement);
  currentHoveredElement = closureElement;
};

export const enableHoverHook = () => {
  document.addEventListener("mouseover", hook);
  document.addEventListener(
    "click",
    (event) => {
      event.preventDefault();

      if (currentHoveredElement) {
        postMessage({
          type: "SELECTED_ACTIVE_ELEMENT",
          payload: getModuleAttributes(currentHoveredElement),
        });
      }
    },
    { capture: true }
  );
};

export const disableHoverHook = () => {
  document.removeEventListener("mouseover", hook);
  unhighlight();
  currentHoveredElement = null;
};
