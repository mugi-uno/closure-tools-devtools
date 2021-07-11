goog.provide("demo.components.Row");
goog.require("demo.components.Cell");
goog.require("demo.components.Task");
goog.require("demo.components.DeleteButton");
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
  indexText.innerText = `${this.index + 1}`;
  const indexCell = new demo.components.Cell({ innerElement: indexText });
  this.addChild(indexCell);
  indexCell.render(row);
  this.indexCell = indexCell;

  const task = new demo.components.Task();
  const taskCell = new demo.components.Cell({ childComponent: task });
  this.addChild(taskCell);
  taskCell.render(row);

  const deleteButton = new demo.components.DeleteButton();
  const deleteCell = new demo.components.Cell({ childComponent: deleteButton });
  this.addChild(deleteCell);
  deleteCell.render(row);

  this.setElementInternal(row);
};

demo.components.Row.prototype.enterDocument = function () {
  demo.components.Row.base(this, "enterDocument");
  this.listen("DeleteClicked", () => {
    this.dispatchEvent({ type: "RemoveRow", payload: { index: this.index } });
  });
};

demo.components.Row.prototype.updateIndex = function (index) {
  this.index = index;
  this.indexCell.getElement().innerText = index + 1;
};
