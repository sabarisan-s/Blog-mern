import React, { useState } from "react";
import toast from "react-hot-toast";

const Register = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:8000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userName, password }),
        });
        const data = await res.json();
        if (data.error) {
            toast.error(data.message);
        } else {
            toast.success(data.message);
            setPassword("");
            setUserName("");
        }
    };
    return (
        <form className="register" onSubmit={handleSubmit}>
            <h1>Register</h1>
            <input
                type="text"
                placeholder="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
