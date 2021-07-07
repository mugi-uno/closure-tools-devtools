import {
  EventDispatchBindingCallback,
  EventDispatchedEventName,
  EventDispatchEventObject,
  ID_ATRRIBUTE_NAME,
  MODULE_NAME_ATTRIBUTE_NAME,
} from "../types";

const getCurrentModuleName = () => {
  const stack = new Error().stack;
  const line = stack!.split("\n")[2];
  return line
    .replace(/^.* at /, "")
    .replace(/ .*$/, "")
    .replace(/\.goog\.ui\.Component.*/, "")
    .replace(/\.goog\.events\.EventTarget.*/, "");
};

const generateId = (() => {
  let id = 1;
  return () => `id${id++}`;
})();

const setupEnterDocumentHook = () => {
  const org: Function = goog.ui.Component.prototype.enterDocument;

  goog.ui.Component.prototype.enterDocument = function () {
    if (!this.element_) {
      return org.apply(this, arguments);
    }

    this.element_.setAttribute(MODULE_NAME_ATTRIBUTE_NAME, getCurrentModuleName());
    this.element_.setAttribute(ID_ATRRIBUTE_NAME, generateId());

    return org.apply(this, arguments);
  };
};

const dispatchArgumentToString = (argumentsValue: IArguments) => {
  try {
    return JSON.stringify(argumentsValue[0]);
  } catch (e) {
    return "{}";
  }
};

const getDispacthedEventName = (arg: unknown) => {
  if (typeof arg === "string") return arg;
  if (typeof arg === "object" && "type" in arg! && typeof (arg as any).type === "string") return `type:${(arg as any).type}`;
  return "(unknown)";
};

const setupEventDispatchHook = () => {
  const org: Function = goog.events.EventTarget.prototype.dispatchEvent;

  goog.events.EventTarget.prototype.dispatchEvent = function () {
    const eventName = getDispacthedEventName(arguments[0]);

    document.dispatchEvent(
      new CustomEvent<EventDispatchEventObject>(EventDispatchedEventName, {
        detail: {
          eventName,
          moduleName: getCurrentModuleName(),
          eventDetail: dispatchArgumentToString(arguments),
          timestamp: new Date().getTime(),
        },
      })
    );
    return org.apply(this, arguments);
  };
};

const setup = () => {
  setupEnterDocumentHook();
  setupEventDispatchHook();
  window.__CLOSURE_TOOLS_DEVTOOLS__.activated = true;
};

window.__CLOSURE_TOOLS_DEVTOOLS__ = {
  setup: setup,
  activated: false,
};
