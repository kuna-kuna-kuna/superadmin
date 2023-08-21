import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./redux/store";
import { Provider as ReduxProvider } from "react-redux";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>
);
