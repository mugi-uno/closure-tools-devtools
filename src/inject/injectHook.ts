import { ID_ATRRIBUTE_NAME, MODULE_NAME_ATTRIBUTE_NAME } from "../types";

const getCurrentModuleName = () => {
  const stack = new Error().stack;
  const line = stack!.split("\n")[2];
  return line
    .replace(/^.* at /, "")
    .replace(/ .*$/, "")
    .replace(/\.goog\.ui\.Component.*/, "");
};

const generateId = (() => {
  let id = 1;
  return () => `id${id++}`;
})();

const injectHook = () => {
  const org: Function = goog.ui.Component.prototype.enterDocument;

  goog.ui.Component.prototype.enterDocument = function () {
    if (!this.element_) {
      return org.apply(this, arguments);
    }

    this.element_.setAttribute(MODULE_NAME_ATTRIBUTE_NAME, getCurrentModuleName());
    this.element_.setAttribute(ID_ATRRIBUTE_NAME, generateId());

    return org.apply(this, arguments);
  };
};

window.__CLOSURE_TOOLS_DEVTOOLS__ = {
  inject: injectHook,
};
