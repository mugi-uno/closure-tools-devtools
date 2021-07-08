goog.provide("demo.components.Cell");
goog.require("goog.ui.Component");

demo.components.Cell = function ({ innerElement, task }) {
  goog.ui.Component.call(this);

  this.innerElement = innerElement;
  this.task = task;
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
  if (this.task) {
    this.addChild(this.task);
    this.task.render(cell);
  }

  this.setElementInternal(cell);
};
