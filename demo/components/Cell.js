goog.provide("demo.components.Cell");
goog.require("goog.ui.Component");

demo.components.Cell = function ({ innerElement, childComponent }) {
  goog.ui.Component.call(this);

  this.innerElement = innerElement;
  this.childComponent = childComponent;
};

goog.inherits(demo.components.Cell, goog.ui.Component);

demo.components.Cell.prototype.createDom = function () {
  const cell = this.getDomHelper().createDom(goog.dom.TagName.TD);

  cell.setAttribute(
    "style",
    `
    padding: 8px;
    `
  );

  if (this.innerElement) {
    cell.appendChild(this.innerElement);
  }
  if (this.childComponent) {
    this.addChild(this.childComponent);
    this.childComponent.render(cell);
  }

  this.setElementInternal(cell);
};
