import { useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="navbar">

            <div className="navbar-left">
                <a href="/" className="navbar-logo">GameHub</a>

                <div className="menu-container">
                    <button
                        className="menu-button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle navigation menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    {menuOpen && (
                        <div className="dropdown-menu">
                            <a href="/">Home</a>
                            <a href="/profile">Profile</a>
                            <a href="/browse">Browse</a>
                            <a href="/add-game">Add Game</a>
                        </div>
                    )}
                </div>
            </div>

            <form className="navbar-search">
                <span className="search-icon">⌕</span>
                <input type="text" placeholder="Search" aria-label="Search"/>
            </form>

            <div className="navbar-auth">
                <Link to="/login">Log In</Link>
                <Link to="/signup" className="signup-btn">Sign up</Link>
            </div>

        </header>
    );
}

export default Navbar;