# Closure Tools DevTools

GoogleChrome DevTools extension for [Closure Tools](https://developers.google.com/closure) applications.

![](/media/image.gif)

# Usage

### Installation

- from [Chrome Web Store](https://chrome.google.com/webstore/detail/closure-tools-devtools/ccppdkklnjdncedigaakkicpncehojbp)

### Setup

Add the following code to your application

```js
goog.require("goog.ui.Component");
goog.require("goog.events.EventTarget");

if (window["__CLOSURE_TOOLS_DEVTOOLS__"]) {
  window["__CLOSURE_TOOLS_DEVTOOLS__"].setup();
}
```

If you are using Closure Compiler, you can also add `src/activator/setup.js` to dependencies and add the following code to your application.

```js
goog.require("closuretoolsdevtools.setup");

if (goog.DEBUG) {
  closuretoolsdevtools.setup();
}
```

# Licence

MIT
