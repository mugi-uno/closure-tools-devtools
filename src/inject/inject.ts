import { ID_ATRRIBUTE_NAME, MODULE_NAME_ATTRIBUTE_NAME } from "./constants";
import { getModuleName } from "./getModuleName";

goog.provide("closuretoolsdevtools.inject");
goog.require("goog.ui.Component");
goog.require("goog.events.EventTarget");

const generateId = (() => {
  let id = 1;
  return () => `id${id++}`;
})();

const injectUIComponent = () => {
  const org: Function = goog.ui.Component.prototype.enterDocument;

  goog.ui.Component.prototype.enterDocument = function () {
    if (!this.element_) {
      return org.apply(this, arguments);
    }

    this.element_.setAttribute(MODULE_NAME_ATTRIBUTE_NAME, getModuleName());
    this.element_.setAttribute(ID_ATRRIBUTE_NAME, generateId());

    return org.apply(this, arguments);
  };
};

closuretoolsdevtools.inject = () => {
  injectUIComponent();
};
