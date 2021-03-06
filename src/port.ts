import { ClosureComponentType, EventDispatchEventObject } from "./types";

export const CONTENT_PORT_NAME = "content";
export const PANEL_PORT_NAME = "panel";

let port: chrome.runtime.Port | null = null;

export const connect = (name: string) => {
  port?.disconnect();
  port = chrome.runtime.connect({ name });
  return port;
};

export const disconnect = () => {
  port?.disconnect();
  port = null;
};

export const currentPort = () => port;

// Messages from Panel
export type PanelMessages =
  | { type: "ENABLE_HIGHLIGHT" }
  | { type: "DISABLE_HIGHLIGHT" }
  | { type: "HIGHLIGHT_ELEMENT"; payload: { id: string } }
  | { type: "UNHIGHLIGHT_ELEMENT" }
  | { type: "GET_COMPONENT_DATA"; payload: { id: string } }
  | { type: "SCAN_COMPONENTS" };

// Messages from Content
export type ContentMessages =
  | { type: "SELECTED_ACTIVE_ELEMENT"; payload: { id: string; name: string } }
  | { type: "GET_COMPONENT_DATA"; payload: { id: string; dataJsonString: string } }
  | { type: "SCANNED_COMPONENTS"; payload: { components: ClosureComponentType[] } }
  | { type: "EVENT_DISPATCHED"; payload: { event: EventDispatchEventObject } };

export type Messages = PanelMessages | ContentMessages;
export type MatchMessage<M, K extends Messages["type"]> = M extends { type: K } ? M : never;

export const postMessage = (msg: Messages) => {
  currentPort()?.postMessage(msg);
};
