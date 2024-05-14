import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";

const EditPost = () => {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState("");

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:8000/post/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setTitle(data.postDetail.title);
                setSummary(data.postDetail.summary);
                setContent(data.postDetail.content);
            })
            .catch((e) => console.log(e.message));
    }, []);

    console.log(title);

    const handleEditPost = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.set("title", title);
        data.set("summary", summary);
        data.set("content", content);
        data.set("id", id);
        if (files?.[0]) {
            data.set("files", files?.[0]);
        }

        const res = await fetch(`http://localhost:8000/post`, {
            method: "PUT",
            body: data,
            credentials: "include",
        });

        if (res.ok) {
            navigate(`/post/${id}`);
        }
    };

    return (
        <form onSubmit={handleEditPost}>
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
                Update post
            </button>
        </form>
    );
};

export default EditPost;
