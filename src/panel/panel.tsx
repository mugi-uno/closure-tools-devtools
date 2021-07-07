import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { connect, PANEL_PORT_NAME } from "../port";
import { App } from "./components/App";
import { listener } from "./listener";
import { store } from "./modules/store";

const connectApp = () => {
  connect(PANEL_PORT_NAME + chrome.devtools.inspectedWindow.tabId);
};
connectApp();
chrome.devtools.network.onNavigated.addListener(connectApp);

listener(store.dispatch);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
