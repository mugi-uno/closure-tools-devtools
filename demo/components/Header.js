goog.provide("demo.components.Header");
goog.require("goog.ui.Component");

demo.components.Header = function () {
  goog.ui.Component.call(this);
};

goog.inherits(demo.components.Header, goog.ui.Component);

demo.components.Header.prototype.createDom = function () {
  const element = this.getDomHelper().createDom(goog.dom.TagName.HEADER);
  const h2 = this.getDomHelper().createDom(goog.dom.TagName.H2);

  h2.innerText = "My Application";
  element.setAttribute(
    "style",
    `
    border-bottom: 1px solid gray;
    margin-bottom: 16px;
    `
  );
  element.appendChild(h2);

  this.setElementInternal(element);
};
