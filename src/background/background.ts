import { CONTENT_PORT_NAME } from "./../port";
import { PANEL_PORT_NAME } from "../port";

const twoWayBridge = () => {
  const portMap = new Map<number, { panel: chrome.runtime.Port | null; content: chrome.runtime.Port | null }>();

  const getPortPair = (tabId: number) => {
    if (!portMap.has(tabId)) {
      portMap.set(tabId, { panel: null, content: null });
    }
    return portMap.get(tabId)!;
  };

  chrome.runtime.onConnect.addListener((port) => {
    if (!port.name.startsWith(PANEL_PORT_NAME)) return;

    const tabId = +port.name.replace(PANEL_PORT_NAME, "");

    console.log(`[${tabId}] 🔌 background <--> panel connected.`);
    getPortPair(tabId)["panel"] = port;

    port.onDisconnect.addListener(() => {
      getPortPair(tabId)["panel"] = null;
      console.log(`[${tabId}] 👋 background <--> panel disconnected.`);
    });

    port.onMessage.addListener((msg) => {
      // relay panel → background → content
      getPortPair(tabId).content?.postMessage(msg);
      console.log(`[${tabId}] 📦 panel ---> background ---> content : ${msg.type}`, msg);
      return false;
    });
  });

  chrome.runtime.onConnect.addListener((port) => {
    if (port.name !== CONTENT_PORT_NAME) return;
    if (!port.sender?.tab) return;
    if (port.sender.tab.id === undefined) return;

    const tabId = port.sender.tab.id;

    console.log(`[${tabId}] 🔌 background <--> content connected.`);
    getPortPair(tabId)["content"] = port;

    port.onDisconnect.addListener(() => {
      getPortPair(tabId)["content"] = null;
      console.log(`[${tabId}] 👋 background <--> panel disconnected.`);
    });

    port.onMessage.addListener((msg) => {
      // relay content → background → panel
      getPortPair(tabId).panel?.postMessage(msg);
      console.log(`[${tabId}] 📦 content ---> background ---> panel : ${msg.type}`, msg);
      return false;
    });
  });
};

twoWayBridge();
