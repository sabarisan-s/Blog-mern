import React, { useEffect, useState } from "react";
import Post from "../components/Post";

const IndexHome = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8000/post")
            .then((res) => res.json())
            .then((data) => setPosts(data.posts))
            .catch((e) => console.log(e));
    }, []);
    console.log(posts);
    return (
        <>
            {posts.length > 0 ? (
                posts.map((item) => <Post {...item} key={item._id} />)
            ) : (
                <p>No posts</p>
            )}
        </>
    );
};

export default IndexHome;
