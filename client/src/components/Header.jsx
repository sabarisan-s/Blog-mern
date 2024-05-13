import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Header = () => {

    const { userInfo, setUserInfo } = useContext(UserContext);

    useEffect(() => {
        fetch("http://localhost:8000/profile", {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                setUserInfo(data.user);
                return data;
            })
            .catch((e) => console.log(e));
    }, []);

    const handleLogout = async () => {
        const res = await fetch("http://localhost:8000/logout", {
            credentials: "include",
            method: "POST",
        });
        setUserInfo(null);
    };


    return (
        <header>
            <Link to={"/"} className="logo">
                MyBlog
            </Link>
            <nav>
                {userInfo ? (
                    <>
                        <Link to="/create">Create new post</Link>
                        <a onClick={handleLogout}>Logout</a>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
