import { ClosureComponentType } from "./types";

export const CONTENT_PORT_NAME = "content";
export const PANEL_PORT_NAME = "panel";
export type PORT_NAME = typeof CONTENT_PORT_NAME | typeof PANEL_PORT_NAME;

let port: chrome.runtime.Port | null = null;

export const connect = (name: PORT_NAME) => {
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
  | { type: "SCAN_COMPONENTS" };

// Messages from Content
export type ContentMessages =
  | { type: "SELECTED_ACTIVE_ELEMENT"; payload: { id: string; name: string } }
  | { type: "SCANNED_COMPONENTS"; payload: { components: ClosureComponentType[] } };

export type Messages = PanelMessages | ContentMessages;
export type MatchMessage<M, K extends Messages["type"]> = M extends { type: K } ? M : never;

export const postMessage = (msg: Messages) => {
  currentPort()?.postMessage(msg);
};
