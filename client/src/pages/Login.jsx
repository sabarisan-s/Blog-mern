import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import toast from "react-hot-toast";

const Login = () => {
    const navigate = useNavigate();
    const { userInfo, setUserInfo } = useContext(UserContext);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userName, password }),
            credentials: "include",
        });

        const data = await res.json();
        
        if (data && data.user) {
            setUserInfo(data.user);
            navigate("/");
        }

        if (data.error) {
            toast.error(data.message);
        } else {
            toast.success(data.message);
        }
    };
    return (
        <form className="login" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
