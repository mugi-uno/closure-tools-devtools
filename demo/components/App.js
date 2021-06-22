goog.provide("demo.components.App");
goog.require("demo.components.Header");
goog.require("demo.components.Body");
goog.require("goog.ui.Component");

demo.components.App = function () {
  goog.ui.Component.call(this);
  this.header = new demo.components.Header();
  this.body = new demo.components.Body();
  this.addChild(this.body);
  this.addChild(this.header);
};

goog.inherits(demo.components.App, goog.ui.Component);

demo.components.App.prototype.createDom = function () {
  const element = this.getDomHelper().createDom(goog.dom.TagName.DIV);
  const headerElement = this.getDomHelper().createDom(goog.dom.TagName.DIV);
  const bodyElement = this.getDomHelper().createDom(goog.dom.TagName.DIV);

  element.appendChild(headerElement);
  element.appendChild(bodyElement);

  this.header.render(headerElement);
  this.body.render(bodyElement);

  this.setElementInternal(element);
};
