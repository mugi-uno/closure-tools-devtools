goog.provide("demo.components.AddButton");
goog.require("goog.ui.Component");

demo.components.AddButton = function () {
  goog.ui.Component.call(this);
};

goog.inherits(demo.components.AddButton, goog.ui.Component);

demo.components.AddButton.prototype.createDom = function () {
  const button = this.getDomHelper().createDom(goog.dom.TagName.BUTTON);
  button.innerText = "Add new task";
  this.setElementInternal(button);
};

demo.components.AddButton.prototype.enterDocument = function () {
  demo.components.Cell.base(this, "enterDocument");
  this.getHandler().listen(this.getElement(), goog.events.EventType.CLICK, () => {
    this.dispatchEvent({ type: "AddTask" });
  });
};
