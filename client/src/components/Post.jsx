import React from "react";
import { Link } from "react-router-dom";

const Post = ({_id, title, content, summary, cover, createdAt, author }) => {
    return (
        <div className="post">
            <div className="image">
                <Link to={`/post/${_id}`}>
                    <img
                        src={`http://localhost:8000/${cover}`}
                        alt=""
                        className=""
                    />
                </Link>
            </div>
            <div className="texts">
                <Link to={`/post/${_id}`}>
                    <h2 className=""> {title}</h2>
                </Link>
                <p className="info">
                    <a>{author.userName}</a>
                    <span>{createdAt?.split("T")[0]}</span>{" "}
                </p>
                <p className="summary">{summary}</p>
            </div>
        </div>
    );
};

export default Post;
