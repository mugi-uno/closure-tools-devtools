goog.provide("closuretoolsdevtools.setup");
goog.require("goog.ui.Component");
goog.require("goog.events.EventTarget");

closuretoolsdevtools.setup = function () {
  if (!window["__CLOSURE_TOOLS_DEVTOOLS__"]) {
    return;
  }
  window["__CLOSURE_TOOLS_DEVTOOLS__"].setup();
};
