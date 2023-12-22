import React from "react";
import ReactDOM from "react-dom/client";
import App from "./main/Home.jsx";
import "./index.css";
import { ThemeProvider } from "@emotion/react";
import theme from "../theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
