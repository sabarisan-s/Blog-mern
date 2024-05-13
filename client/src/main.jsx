import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import UserContextProvider from "./context/userContext.jsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <UserContextProvider>
            <BrowserRouter>
                <Toaster
                    toastOptions={{ duration: 1000 }}
                    position="top-left"
                />
                <App />
            </BrowserRouter>
        </UserContextProvider>
    </React.StrictMode>
);
