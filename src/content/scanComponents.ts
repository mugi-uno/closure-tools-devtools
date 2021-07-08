import { findAllModules, findClosestModule, getModuleAttributes } from "./util";
import { postMessage } from "../port";
import { ClosureComponentType } from "../types";

export const scan = (rootElement: Element): ClosureComponentType[] => {
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
  if (!document.body) return;

  const components = scan(document.body);
  postMessage({
    type: "SCANNED_COMPONENTS",
    payload: { components },
  });
};
