goog.provide("demo.components.Table");
goog.require("demo.components.Row");
goog.require("goog.ui.Component");

demo.components.Table = function () {
  goog.ui.Component.call(this);
};

goog.inherits(demo.components.Table, goog.ui.Component);

demo.components.Table.prototype.createDom = function () {
  const element = this.getDomHelper().createDom(goog.dom.TagName.TABLE);

  for (let i = 0; i < 5; i++) {
    const row = new demo.components.Row();
    row.render(element);
  }

  this.setElementInternal(element);
};
