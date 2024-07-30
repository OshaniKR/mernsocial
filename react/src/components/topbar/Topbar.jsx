import React, { useContext } from 'react';
import './Topbar.css';
import { Search, Person, Chat, Notifications, Logout } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Topbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <div className='topbarContainer'>
      <div className="topbarLeft">
        <Link to="/" className='logo'>
          ChatterBox
        </Link>
      </div>

      <div className="topbarCenter">
        <div className="searchbar">
          <Search className='searchIcon' />
          <input placeholder="Search for friends, posts, or videos" className="searchInput" />
        </div>
      </div>

      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" className="topbarLink">Homepage</Link>
          <Link to="/timeline" className="topbarLink">Timeline</Link>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem signoutIcon" onClick={handleSignOut}>
            <Logout />
          </div>
        </div>
        <Link to={`/profile/${user.username}`} className="profileLink">
          <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noProfile.jpeg"} alt="" className="topbarImg" />
        </Link>
      </div>
    </div>
  );
}
