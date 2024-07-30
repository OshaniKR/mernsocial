import React, { useContext, useEffect, useState } from 'react';
import { format } from 'timeago.js';
import { MoreVert, Delete } from "@mui/icons-material";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import './post.css';

export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);
    const [showDeleteOption, setShowDeleteOption] = useState(false);

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`/users?userId=${post.userId}`);
                setUser(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUser();
    }, [post.userId]);

    const likeHandler = async () => {
        try {
            await axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
        } catch (err) {
            console.log(err);
        }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${post._id}`, { data: { userId: currentUser._id } });
            toast.success('Post deleted successfully!');
            window.location.reload();
        } catch (err) {
            console.log(err);
            if (err.response && err.response.status === 403) {
                toast.error("You can't delete others' posts");
            } else {
                toast.error('An error occurred while deleting the post');
            }
        }
    };

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                            <img className="postProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF + "Person/noProfile.jpeg"} alt="" />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert onClick={() => setShowDeleteOption(!showDeleteOption)} />
                        {showDeleteOption && (
                            <Delete className="deleteOption" onClick={handleDelete} />
                        )}
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src={PF + post.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src={`${PF}/Icons/love.png`} onClick={likeHandler} alt="" />
                        <img className="likeIcon" src={`${PF}/Icons/like.png`} onClick={likeHandler} alt="" />
                        <span className="postLikeCounter">{like}</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.commentCount} comments</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
