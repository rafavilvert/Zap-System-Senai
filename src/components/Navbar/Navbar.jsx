import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css'

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-dark bg-primary d-flex justify-content-start mb-3">
            <Link to='/' className="navbar-brand" >Zap-System</Link>
            <Link to='/dashboard' className="navbar-brand">Dashboard</Link>
            <Link to='/messages' className="navbar-brand" >Menssagens</Link>
        </nav>
    );
}

export default Navbar;