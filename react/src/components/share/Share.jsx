import React, { useContext, useRef, useState } from 'react';
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@mui/icons-material";
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

import './share.css';

export default function Share() {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        };
        if (file) {
            const data = new FormData();
            const fileName = file.name;
            data.append("file", file);
            data.append("name", fileName);
            newPost.img = fileName;
            try {
                await axios.post("/upload", data);
            } catch (err) {
                console.log(err);
            }
        }
        try {
            await axios.post("/posts", newPost);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="share" style={{ backgroundImage: `url('/assets/solar4.jpeg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img
                        className="shareProfileImg"
                        src={user.profilePicture ? PF + user.profilePicture : PF + "person/empty.jpeg"}
                        alt=""
                    />
                    <input
                        placeholder={`What's on your mind, ${user.username}?`}
                        className="shareInput"
                        ref={desc}
                    />
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                        <Cancel className='shareCancelImg' onClick={() => setFile(null)} />
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="#ca8a04" className="shareIcon" />
                            <span className="shareOptionText">Photo or Video</span>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                accept=".png, .jpeg, .jpg"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="#ca8a04" className="shareIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="#ca8a04" className="shareIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="#ca8a04" className="shareIcon" />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">
                        Share
                    </button>
                </form>
            </div>
        </div>
    );
}
