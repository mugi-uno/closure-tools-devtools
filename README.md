Closure Tools DevTools
=========

GoogleChrome DevTools extension for [Closure Tools](https://developers.google.com/closure) applications.

![](/media/image.gif)


Usage
====

### Installation

- from Chrome Web Store

### Setup

Add the following code to your application

```js
goog.require("goog.ui.Component");
goog.require("goog.events.EventTarget");

if (goog.DEBUG && window["__CLOSURE_TOOLS_DEVTOOLS__"]) {
  window["__CLOSURE_TOOLS_DEVTOOLS__"].setup();
}
```

If you are using Closure Compiler, you can also add `src/activator/setup.js` to dependencies.

Licence
=====

MIT
