// src/main.tsx
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import reduxStore from "./store/reduxStore";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
