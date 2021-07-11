goog.provide("demo.components.Table");
goog.require("demo.components.Row");
goog.require("goog.ui.Component");

demo.components.Table = function () {
  goog.ui.Component.call(this);

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

  this.setElementInternal(element);

  for (let i = 0; i < 2; i++) {
    this.addRow();
  }
};

demo.components.Table.prototype.addRow = function () {
  const row = new demo.components.Row(this.rows.length);
  this.addChild(row);
  row.render(this.getElement());
  this.rows.push(row);
};

demo.components.Table.prototype.removeRow = function (index) {
  this.rows[index].dispose();
  this.rows.splice(index, 1);

  this.refreshIndex();
};

demo.components.Table.prototype.refreshIndex = function () {
  // refresh index
  this.rows.forEach((row, index) => {
    row.updateIndex(index);
  });
};
