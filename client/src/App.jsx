import React from "react";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import IndexHome from "./pages/IndexHome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<IndexHome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create" element={<CreatePost />} />
            </Route>
        </Routes>
    );
};

export default App;
