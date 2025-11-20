import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import store from "./store/store";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const container = document.getElementById("root");
if (container) {
  createRoot(container).render(
    <React.StrictMode>
      < BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={createTheme({ palette: { mode: "light" } })}>
            <App />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
}