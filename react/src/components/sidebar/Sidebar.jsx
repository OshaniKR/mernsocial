import React from 'react';
import { Nav, Button, Container, Row, Col } from 'react-bootstrap';
import { RssFeed, Chat, PlayCircleFilledOutlined, Group, Bookmark, HelpOutline, WorkOutline, Event, School } from '@mui/icons-material';
import { Users } from '../../dummyData';
import CloseFriend from '../closeFriend/CloseFriend';

import './sidebar.css'; // Make sure to import your CSS file

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Container fluid>
                <Row>
                    <Col className='sidebar-wrapper'>
                        <div className="sidebar-scroll">
                            <Nav className='flex-column'>
                                <NavItem icon={<RssFeed />} text='Feed' />
                                <NavItem icon={<Chat />} text='Chats' />
                                <NavItem icon={<PlayCircleFilledOutlined />} text='Videos' />
                                <NavItem icon={<Group />} text='Groups' />
                                <NavItem icon={<Bookmark />} text='Bookmarks' />
                                <NavItem icon={<HelpOutline />} text='Questions' />
                                <NavItem icon={<WorkOutline />} text='Jobs' />
                                <NavItem icon={<Event />} text='Events' />
                                <NavItem icon={<School />} text='Courses' />
                            </Nav>
                            <Button className='sidebar-button'>Show More</Button>
                            <hr className='sidebar-hr' />
                            <ul className='sidebar-friend-list'>
                                {Users.map(u => (
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

const NavItem = ({ icon, text }) => {
    return (
        <Nav.Item>
            <Nav.Link>
                {icon}
                <span className='sidebar-list-item-text'>{text}</span>
            </Nav.Link>
        </Nav.Item>
    );
};

export default Sidebar;
