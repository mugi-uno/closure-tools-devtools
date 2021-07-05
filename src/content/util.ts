import { ID_ATRRIBUTE_NAME, MODULE_NAME_ATTRIBUTE_NAME } from "./../types";

const MODULE_SELECTOR = `[${MODULE_NAME_ATTRIBUTE_NAME}]`;

export const findAllModules = (element: Element) => [...element.querySelectorAll(MODULE_SELECTOR)];

export const findClosestModule = (element: Element) => element.closest(MODULE_SELECTOR);

export const findByModuleId = (id: string) => document.querySelector(`[${ID_ATRRIBUTE_NAME}=${id}]`);

export const getModuleName = (element: Element) => element.getAttribute(MODULE_NAME_ATTRIBUTE_NAME);

export const getModuleId = (element: Element) => element.getAttribute(ID_ATRRIBUTE_NAME);

export const getModuleAttributes = (element: Element) => ({
  name: getModuleName(element)!,
  id: getModuleId(element)!,
});
