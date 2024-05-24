import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import Cookies from "universal-cookie";
axios.defaults.baseURL = "http://localhost:3000/";

const cookies = new Cookies();

axios.interceptors.request.use(
  (config) => {
    const token = cookies.get("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster
      toastOptions={{
        duration: 3000,
        position: "bottom-left",
      }}
    />
    <NextUIProvider>
      <BrowserRouter>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>
);
