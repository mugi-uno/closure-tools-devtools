goog.provide("demo.components.Cell");
goog.require("goog.ui.Component");

demo.components.Cell = function () {
  goog.ui.Component.call(this);
};

goog.inherits(demo.components.Cell, goog.ui.Component);

demo.components.Cell.prototype.createDom = function () {
  const cell = this.getDomHelper().createDom(goog.dom.TagName.TD);
  cell.innerText = "cell";
  this.setElementInternal(cell);
};
