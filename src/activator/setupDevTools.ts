import { generateID } from "../lib/generateID";
import {
  EventDispatchedEventName,
  EventDispatchEventObject,
  GetComponentDataRequestEventName,
  GetComponentDataRequestEventObject,
  GetComponentDataResponseEventName,
  GetComponentDataResponseEventObject,
  ID_ATRRIBUTE_NAME,
  MODULE_NAME_ATTRIBUTE_NAME,
} from "../types";
// @ts-ignore
import stringify from "json-stringify-safe";

const getCurrentModuleName = function (this: any) {
  try {
    this.____dummyErrorFunction____ = () => {
      return new Error();
    };

    const stack = this.____dummyErrorFunction____().stack;

    delete this["____dummyErrorFunction____"];

    const [_, line] = stack!.split("\n");

    return line.replace(/^.* at /, "").replace(/\.[^\.]* .*$/, "");
  } catch (e) {
    return "(Unknown)";
  }
};

const IGNORE_CLOSURE_FIELDS = [
  "actualEventTarget_",
  "children_",
  "creationStack",
  "eventTargetListeners_",
  "googUiComponentHandler_",
  "inDocument_",
  "onDisposeCallbacks_",
  "parentEventTarget_",
  "parent_",
  "__devtools__",
  "__proto__",
];

const stringifyComponent = (component: any) => {
  try {
    return stringify(component, (k: string, v: unknown) => {
      if (IGNORE_CLOSURE_FIELDS.includes(k)) {
        return undefined;
      }

      if (component !== v && typeof v === "object" && v && "id_" in v) {
        return "[Component]";
      }

      if (v instanceof Element || v instanceof HTMLDocument) {
        return "[DOMElement]";
      }

      if (v === window) {
        return "[Window]";
      }

      if (goog.abstractMethod && typeof v === "object" && v && (v as any).toJSON === goog.abstractMethod) {
        return "[unimplemented toJSON method]";
      }

      return v;
    });
  } catch (e) {
    return '"invalid"';
  }
};

const componentMap: { [key: string]: any } = {};

const getComponentData = (id: string): string => {
  if (!componentMap[id]) {
    return '"unknown"';
  }
  return stringifyComponent(componentMap[id]);
};

const setupEnterDocumentHook = () => {
  const org: Function = goog.ui.Component.prototype.enterDocument;

  goog.ui.Component.prototype.enterDocument = function () {
    if (!this.element_) {
      return org.apply(this, arguments);
    }

    const id = generateID();

    this.__devtools__ = {
      id,
      name: getCurrentModuleName.call(this),
    };

    componentMap[id] = this;

    this.element_.setAttribute(MODULE_NAME_ATTRIBUTE_NAME, this.__devtools__.name);
    this.element_.setAttribute(ID_ATRRIBUTE_NAME, this.__devtools__.id);

    return org.apply(this, arguments);
  };

  document.addEventListener(GetComponentDataRequestEventName, (event) => {
    const e = event as CustomEvent<GetComponentDataRequestEventObject>;

    document.dispatchEvent(
      new CustomEvent<GetComponentDataResponseEventObject>(GetComponentDataResponseEventName, {
        detail: {
          id: e.detail.id,
          data: getComponentData(e.detail.id),
        },
      })
    );
  });
};

const setupDisposeHook = () => {
  const org: Function = goog.ui.Component.prototype.dispose;

  goog.ui.Component.prototype.dispose = function () {
    if (this.__devtools__) {
      delete componentMap[this.__devtools__.id];
    }

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
          moduleName: getCurrentModuleName.call(this),
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
  setupDisposeHook();
  setupEventDispatchHook();
};

window.__CLOSURE_TOOLS_DEVTOOLS__ = { setup };
