import React from "react";
import "./App.js";
import "./NavBar.css";
import { Link } from "react-router-dom";


const NavBar = () => {
    return(
        <nav className="nav-bar">
            <div id="logo-container">
                <img id="logo" src="/logo.png" alt="logo"></img>
                <div className="scorelens-name">ScoreLens</div>
            </div>
            <div className="navbar-links">
                <ul>
                    <li><Link to="/Login">Login</Link></li>
                    <li><a href="#analytics-page">Analytics</a></li>
                    <li><a href="#features-page">Features</a></li>
                    <li><a href="#about-page">About</a></li>
                    <li><a href="#contact-page">Contact</a></li>
                    {/* <li><a>Login</a></li> */}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
