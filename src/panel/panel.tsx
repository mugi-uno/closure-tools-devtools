import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { connect, currentPort, PANEL_PORT_NAME, postMessage } from "../port";
import { App } from "./components/App";
import { listener } from "./listener";
import { actions } from "./modules/slice";
import { store } from "./modules/store";

const connectApp = () => {
  connect(PANEL_PORT_NAME + chrome.devtools.inspectedWindow.tabId);
  listener(store.dispatch, currentPort()!);
  store.dispatch(actions.reset());
  postMessage({ type: "SCAN_COMPONENTS" });
};

connectApp();
chrome.devtools.network.onNavigated.addListener(connectApp);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
