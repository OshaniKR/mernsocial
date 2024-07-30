import React from 'react';
import { Nav, Button, Container, Row, Col } from 'react-bootstrap';
import { 
  RssFeed, 
  Chat, 
  PlayCircleFilledOutlined, 
  Group, 
  Bookmark, 
  HelpOutline, 
  WorkOutline, 
  Event, 
  School 
} from '@mui/icons-material';
import { Users } from '../../dummyData';
import CloseFriend from '../closeFriend/CloseFriend';

import './sidebar.css'; // Import your CSS file

// NavItem component
const NavItem = ({ icon, text, style }) => {
  return (
    <div className="nav-item" style={style}>
      <div className="icon">{icon}</div>
      <span className="text">{text}</span>
    </div>
  );
};

// Sidebar component
const Sidebar = () => {
  return (
    <div className="sidebar">
      <Container fluid>
        <Row>
          <Col className="sidebar-wrapper">
            <div className="sidebar-scroll">
              <Nav className="flex-column">
                <NavItem
                  icon={<RssFeed />}
                  text="Feed"
                  style={{
                    background: 'linear-gradient(to right, #422006, #ca8a04, #422006)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                />
                <NavItem
                  icon={<Chat style={{ color: '#422006' }} />}
                  text="Chats"
                />
                <NavItem
                  icon={<PlayCircleFilledOutlined style={{ color: '#422006' }} />}
                  text="Videos"
                />
                <NavItem
                  icon={<Group style={{ color: '#422006' }} />}
                  text="Groups"
                />
                <NavItem
                  icon={<Bookmark style={{ color: '#422006' }} />}
                  text="Bookmarks"
                />
                <NavItem
                  icon={<HelpOutline style={{ color: '#422006' }} />}
                  text="Questions"
                />
                <NavItem
                  icon={<WorkOutline style={{ color: '#422006' }} />}
                  text="Jobs"
                />
                <NavItem
                  icon={<Event style={{ color: '#422006' }} />}
                  text="Events"
                />
                <NavItem
                  icon={<School style={{ color: '#422006' }} />}
                  text="Courses"
                />
              </Nav>
              <Button className="sidebar-button">Show More</Button>
              <hr className="sidebar-hr" />
              <ul className="sidebar-friend-list">
                {Users.map((u) => (
                  <CloseFriend key={u.id} user={u} />
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Sidebar;
