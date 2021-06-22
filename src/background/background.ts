import { PORT_NAME } from "../port";

const twoWayBridge = () => {
  let portOfPanel: chrome.runtime.Port | null = null;
  let portOfContent: chrome.runtime.Port | null = null;

  chrome.runtime.onConnect.addListener((port) => {
    if ((port.name as PORT_NAME) !== "panel") return;

    console.log("background <--> panel connected.");
    portOfPanel = port;

    port.onDisconnect.addListener(() => {
      portOfPanel = null;
    });

    port.onMessage.addListener((msg) => {
      // relay panel → background → content
      portOfContent?.postMessage(msg);
      return false;
    });
  });

  chrome.runtime.onConnect.addListener((port) => {
    if ((port.name as PORT_NAME) !== "content") return;

    console.log("background <--> content connected.");
    portOfContent = port;

    port.onDisconnect.addListener(() => {
      portOfContent = null;
    });

    port.onMessage.addListener((msg) => {
      // relay content → background → panel
      portOfPanel?.postMessage(msg);
      return false;
    });
  });
};

twoWayBridge();
