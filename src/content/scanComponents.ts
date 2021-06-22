import { findAllModules, findClosestModule, getModuleAttributes } from "./util";
import { ClosureComponent } from "../types";
import { postMessage } from "../port";

export const scan = (rootElement: Element = document.body): ClosureComponent[] => {
  return findAllModules(rootElement)
    .filter((el) => {
      if (!el.parentElement) return true;

      const closest = findClosestModule(el.parentElement);
      if (!closest) return true;

      return findClosestModule(el.parentElement) === rootElement;
    })
    .map((moduleElement) => ({
      ...getModuleAttributes(moduleElement),
      childComponents: scan(moduleElement),
    }));
};

export const scanComponents = () => {
  const components = scan();
  postMessage({
    type: "SCANNED_COMPONENTS",
    payload: { components },
  });
};
