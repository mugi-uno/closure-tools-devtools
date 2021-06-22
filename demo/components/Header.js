goog.provide("demo.components.Header");
goog.require("goog.ui.Component");

demo.components.Header = function () {
  goog.ui.Component.call(this);
};

goog.inherits(demo.components.Header, goog.ui.Component);

demo.components.Header.prototype.createDom = function () {
  const element = this.getDomHelper().createDom(goog.dom.TagName.HEADER);
  element.innerText = "header";
  this.setElementInternal(element);
};
