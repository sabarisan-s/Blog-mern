import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../components/Editor";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState("");

    const navigate = useNavigate();

    const handleCreatePost = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.set("title", title);
        data.set("summary", summary);
        data.set("content", content);
        data.set("files", files[0]);

        const res = await fetch("http://localhost:8000/post", {
            method: "POST",
            body: data,
            credentials: "include",
        });

        if (res.ok) {
            navigate("/");
        }
    };

    return (
        <form onSubmit={handleCreatePost}>
            <input
                type="text"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
            />
            <input type="file" onChange={(e) => setFiles(e.target.files)} />
            <Editor value={content} onChange={setContent} />
            <button type="submit" style={{ marginTop: "5px" }}>
                Create post
            </button>
        </form>
    );
};

export default CreatePost;
