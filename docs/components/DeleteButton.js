goog.provide("demo.components.DeleteButton");
goog.require("goog.ui.Component");

demo.components.DeleteButton = function () {
  goog.ui.Component.call(this);
};

goog.inherits(demo.components.DeleteButton, goog.ui.Component);

demo.components.DeleteButton.prototype.createDom = function () {
  const button = this.getDomHelper().createDom(goog.dom.TagName.BUTTON);
  button.innerText = "Delete";
  this.setElementInternal(button);
};

demo.components.DeleteButton.prototype.enterDocument = function () {
  demo.components.Cell.base(this, "enterDocument");
  this.getHandler().listen(this.getElement(), goog.events.EventType.CLICK, () => {
    this.dispatchEvent({ type: "DeleteClicked" });
  });
};
