goog.provide("demo.components.Row");
goog.require("demo.components.Cell");
goog.require("demo.components.Task");
goog.require("goog.ui.Component");

demo.components.Row = function (index) {
  goog.ui.Component.call(this);

  this.index = index;
};

goog.inherits(demo.components.Row, goog.ui.Component);

demo.components.Row.prototype.createDom = function () {
  const row = this.getDomHelper().createDom(goog.dom.TagName.TR);

  row.setAttribute(
    "style",
    `
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    `
  );

  const indexText = this.getDomHelper().createDom(goog.dom.TagName.SPAN);
  indexText.innerText = `${this.index}`;
  const indexCell = new demo.components.Cell({ innerElement: indexText });
  this.addChild(indexCell);
  indexCell.render(row);

  const task = new demo.components.Task();
  const taskCell = new demo.components.Cell({ task });
  this.addChild(taskCell);
  taskCell.render(row);

  this.setElementInternal(row);
};
