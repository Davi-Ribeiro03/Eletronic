import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import Router from "./routes/Router";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import AppRoutes from "./routes/Router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </Provider>
);
