goog.provide("demo.components.Body");
goog.require("demo.components.Table");
goog.require("goog.ui.Component");

demo.components.Body = function () {
  goog.ui.Component.call(this);
  this.table = new demo.components.Table();
  this.addChild(this.table);
};

goog.inherits(demo.components.Body, goog.ui.Component);

demo.components.Body.prototype.createDom = function () {
  const element = this.getDomHelper().createDom(goog.dom.TagName.DIV);
  element.innerText = "body";

  this.table.render(element);

  this.setElementInternal(element);
};
