goog.provide("demo.components.Body");
goog.require("demo.components.Table");
goog.require("demo.components.AddButton");
goog.require("goog.ui.Component");

demo.components.Body = function () {
  goog.ui.Component.call(this);

  this.table = new demo.components.Table();
  this.addButton = new demo.components.AddButton();

  this.addChild(this.table);
  this.addChild(this.addButton);
};

goog.inherits(demo.components.Body, goog.ui.Component);

demo.components.Body.prototype.createDom = function () {
  const element = this.getDomHelper().createDom(goog.dom.TagName.DIV);

  element.innerText = "Task List";

  this.table.render(element);
  this.addButton.render(element);

  this.setElementInternal(element);
};

demo.components.Body.prototype.enterDocument = function () {
  demo.components.Body.base(this, "enterDocument");
  this.listen("AddTask", () => {
    this.table.addRow();
  });

  this.listen("RemoveRow", (msg) => {
    this.table.removeRow(msg.payload.index);
  });
};
