import {
  EventDispatchEventObject,
  GetComponentDataRequestEventName,
  GetComponentDataRequestEventObject,
  GetComponentDataResponseEventName,
  GetComponentDataResponseEventObject,
} from "./../types";
import { MatchMessage, PanelMessages, postMessage } from "./../port";
import { connect } from "../port";
import { disableHoverHook, enableHoverHook } from "./hoverHook";
import { scanComponents } from "./scanComponents";
import { highlight, unhighlight } from "./highlight";
import { EventDispatchedEventName } from "../types";

const handlerMap: {
  [key in PanelMessages["type"]]?: (msg: MatchMessage<PanelMessages, key>) => void;
} = {
  ENABLE_HIGHLIGHT: () => {
    enableHoverHook();
  },
  DISABLE_HIGHLIGHT: () => {
    disableHoverHook();
  },
  SCAN_COMPONENTS: () => {
    scanComponents();
  },
  GET_COMPONENT_DATA: (msg) => {
    document.dispatchEvent(
      new CustomEvent<GetComponentDataRequestEventObject>(GetComponentDataRequestEventName, {
        detail: {
          id: msg.payload.id,
        },
      })
    );
  },
  HIGHLIGHT_ELEMENT: (msg) => {
    unhighlight();
    highlight(msg.payload.id);
  },
  UNHIGHLIGHT_ELEMENT: () => {
    unhighlight();
  },
};

connect("content").onMessage.addListener((msg: PanelMessages) => {
  const handler = handlerMap[msg.type];
  if (handler) {
    handler(msg as any);
  }
  return false;
});

const script = document.constructor.prototype.createElement.call(document, "script");
script.src = chrome.runtime.getURL("setupDevTools.js");
document.documentElement.appendChild(script);
script.parentNode.removeChild(script);

document.addEventListener(EventDispatchedEventName, (e) => {
  const event = e as CustomEvent<EventDispatchEventObject>;
  postMessage({ type: "EVENT_DISPATCHED", payload: { event: event.detail } });
});

document.addEventListener(GetComponentDataResponseEventName, (e) => {
  const event = e as CustomEvent<GetComponentDataResponseEventObject>;
  postMessage({ type: "GET_COMPONENT_DATA", payload: { id: event.detail.id, dataJsonString: event.detail.data } });
});

document.addEventListener(
  "DOMContentLoaded",
  () => {
    setTimeout(() => {
      scanComponents();
    }, 100);
  },
  { once: true }
);
