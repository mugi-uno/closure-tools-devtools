import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { connect } from "../port";
import { Panel } from "./components/Panel";
import { listener } from "./listener";
import { store } from "./modules/store";

connect("panel");
listener(store.dispatch);

ReactDOM.render(
  <Provider store={store}>
    <Panel />
  </Provider>,
  document.getElementById("app")
);
