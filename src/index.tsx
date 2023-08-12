import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App";
import "./styles/main.scss";

const domContainer = document.querySelector("#app");

if (domContainer) {
    console.debug("Root element found");
    const root = ReactDOM.createRoot(domContainer);
    root.render(<App />);
} else {
    console.error("Root element not found");
}