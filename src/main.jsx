import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import {BillProvider} from "./context/BillVoter";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BillProvider>
      <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>

  </BillProvider>,
  document.getElementById("root")
);
