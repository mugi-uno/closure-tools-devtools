goog.require("demo.components.App");

goog.require("closuretoolsdevtools.inject");
closuretoolsdevtools.inject();

document.addEventListener("DOMContentLoaded", () => {
  const app = new demo.components.App();
  app.render(document.getElementById("app"));
});
