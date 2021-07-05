goog.provide("closuretoolsdevtools.inject");
goog.require("goog.ui.Component");
goog.require("goog.events.EventTarget");

closuretoolsdevtools.inject = () => {
  if (!window.__CLOSURE_TOOLS_DEVTOOLS__) return;
  window.__CLOSURE_TOOLS_DEVTOOLS__.inject();
};
