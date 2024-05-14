import React from "react";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import IndexHome from "./pages/IndexHome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";
import EditPost from "./pages/Editpost";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<IndexHome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create" element={<CreatePost />} />
                <Route path="/post/:id" element={<PostDetail />} />
                <Route path="/edit/:id" element={<EditPost />} />
            </Route>
        </Routes>
    );
};

export default App;
