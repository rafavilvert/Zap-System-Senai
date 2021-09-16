import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css'

const Navbar = (props) => {
    return (
        <nav className={`navbar ${props.class}`}>
            <div className="topnav">
                <Link className="active" to="/">ZAP - System</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/messages">Mensagens</Link>
            </div>
        </nav>
    );
}

export default Navbar;