goog.provide("demo.components.Row");
goog.require("demo.components.Cell");
goog.require("goog.ui.Component");

demo.components.Row = function () {
  goog.ui.Component.call(this);
};

goog.inherits(demo.components.Row, goog.ui.Component);

demo.components.Row.prototype.createDom = function () {
  const row = this.getDomHelper().createDom(goog.dom.TagName.TR);

  for (let i = 0; i < 5; i++) {
    const cell = new demo.components.Cell();
    cell.render(row);
  }

  this.setElementInternal(row);
};
