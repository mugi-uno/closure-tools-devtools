goog.provide("demo.components.Task");
goog.require("goog.ui.Component");

demo.components.Task = function () {
  goog.ui.Component.call(this);
};

goog.inherits(demo.components.Task, goog.ui.Component);

demo.components.Task.prototype.createDom = function () {
  const task = this.getDomHelper().createDom(goog.dom.TagName.INPUT);

  task.setAttribute("type", "input");
  task.setAttribute("size", "30");

  this.setElementInternal(task);
};
