import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";

const PostDetail = () => {
    const { id } = useParams();
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext);

    useEffect(() => {
        fetch(`http://localhost:8000/post/${id}`)
            .then((res) => res.json())
            .then((data) => setPostInfo(data))
            .catch((e) => console.log(e.message));
    }, []);

    return (
        <div>
            {postInfo ? (
                <div className="post-page">
                    <div className="">
                        <h1>{postInfo.postDetail.title}</h1>
                        <time>
                            {postInfo.postDetail.createdAt.split("T")[0]}
                        </time>
                        <div className="author">
                            by @{postInfo.postDetail.author.userName}
                        </div>
                        {userInfo._id === postInfo.postDetail.author._id && (
                            <div className="edit-row">
                                <Link
                                    className="edit-btn"
                                    to={`/edit/${postInfo.postDetail._id}`}
                                >
                                    Edit this post
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className="image">
                        <img
                            src={`http://localhost:8000/${postInfo.postDetail.cover}`}
                            alt=""
                            className=""
                        />
                    </div>
                    <div className="content">
                        <div
                            className=""
                            dangerouslySetInnerHTML={{
                                __html: postInfo.postDetail.content,
                            }}
                        ></div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default PostDetail;
