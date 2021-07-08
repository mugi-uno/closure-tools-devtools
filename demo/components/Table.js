goog.provide("demo.components.Table");
goog.require("demo.components.Row");
goog.require("goog.ui.Component");

demo.components.Table = function () {
  goog.ui.Component.call(this);

  this.tasks = 2;
  this.rows = [];
};

goog.inherits(demo.components.Table, goog.ui.Component);

demo.components.Table.prototype.createDom = function () {
  const element = this.getDomHelper().createDom(goog.dom.TagName.TABLE);

  element.setAttribute(
    "style",
    `
      margin-top: 16px;
      margin-bottom: 16px;
      border-collapse: collapse;
    `
  );

  for (let i = 0; i < this.tasks; i++) {
    const row = new demo.components.Row(i + 1);
    this.addChild(row);
    row.render(element);
    this.rows.push(row);
  }

  this.setElementInternal(element);
};

demo.components.Table.prototype.addRow = function () {
  this.tasks += 1;
  const row = new demo.components.Row(this.tasks);
  this.addChild(row);
  row.render(this.getElement());
  this.rows.push(row);
};

demo.components.Table.prototype.removeRow = function (index) {
  this.rows[index].dispose();
  this.rows.splice(index, 1);
};
