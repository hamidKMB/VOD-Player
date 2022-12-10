import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppV from "./App";
import PlayerByLink from "./PlayerByLink";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/*" element={<Navigate to="/" replace={true} />} /> */}
          <Route path="/v/:streamUrl" element={<AppV />} />
          <Route path="/hls" element={<PlayerByLink />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
