import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Todo } from "./pages/todo";
import Weather from "./pages/weather";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Todo />
    <Weather />
    <ToastContainer
      position="top-right"
      autoClose={2000}
      limit={1}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Flip}
    />
  </React.StrictMode>
);
