goog.require("demo.components.App");

goog.require("closuretoolsdevtools.setup");
closuretoolsdevtools.setup();

document.addEventListener("DOMContentLoaded", () => {
  const app = new demo.components.App();
  app.render(document.getElementById("app"));
});
