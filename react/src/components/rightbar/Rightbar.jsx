import React, { useContext, useEffect, useState } from 'react';
import "./rightbar.css";
import { Users } from '../../dummyData';
import Online from '../online/Online';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Add, Remove } from "@mui/icons-material";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));

  useEffect(() => {
    if (user && user._id && currentUser) {
      setFollowed(currentUser.followings.includes(user?._id));
    }
  }, [currentUser, user]);

  useEffect(() => {
    const getFriends = async () => {
      if (user && user._id) {
        try {
          const friendList = await axios.get(`/users/friends/${user._id}`);
          setFriends(friendList.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, { userId: currentUser._id });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, { userId: currentUser._id });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="noticeContainer">
          <h3 className='noticeHeading'>Special Notices</h3>
          <h5 className='noticeSubHeading'>Perseverance Rover</h5>
          <img className='noticeImg' src="assets/mars.jpeg" alt="" />
          <span className="noticeText">NASA's Perseverance Rover landed on Mars in February 2021, embarking on a mission to search for signs of past life and collect rock samples for a future return to Earth. Accompanying Perseverance, the Ingenuity Helicopter has successfully completed over 50 flights, demonstrating the feasibility of aerial mobility on another planet and providing valuable data for future Mars exploration.</span>
        </div>
       {/*  <img className="rightbarAdd" src="assets/Icons/add.jpeg" alt="" />*/}
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (<Online key={u.id} user={u} />))}
        </ul>
      </>
    )
  }

  const ProfileRightbar = () => {
    return (
      <>
        {user && user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        {user && (
          <>
            <div className="rightbarInfo">
              <div className="rightbarInfoItem"></div>
              <span className="rightbarInfoKey">City:</span>
              <span className="rightbarInfoValue">{user.city}</span>
            </div>
            <div className="rightbarInfo">
              <div className="rightbarInfoItem"></div>
              <span className="rightbarInfoKey">From:</span>
              <span className="rightbarInfoValue">{user.from}</span>
            </div>
            <div className="rightbarInfo">
              <div className="rightbarInfoItem"></div>
              <span className="rightbarInfoKey">Relationship:</span>
              <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "-"}</span>
            </div>
          </>
        )}
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link to={"/profile/" + friend.username} style={{ textDecoration: "none" }} key={friend._id}>
              <div className="rightbarFollowing">
                <img src={friend.profilePicture ? PF + friend.profilePicture : PF + "/person/empty.jpeg"} alt="" className="rightbarFollowingImg" />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    )
  }

  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}
