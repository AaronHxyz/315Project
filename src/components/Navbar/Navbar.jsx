import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const nav = useNavigate();

    return (
        <header className="navbar">

            <div className="navbar-left">
                <Link to="/" className="navbar-logo">GameHub</Link>

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
                        <div className="dropdown-menu" onClick={() => setMenuOpen(false)}>
                            <Link to="/">Home</Link>
                            <Link to="/profile">Profile</Link>
                            <Link to="/browse">Browse</Link>
                            <Link to="/add-game">Add Game</Link>
                        </div>
                    )}
                </div>
            </div>

            <form className="navbar-search" onSubmit={(e)=>{
                e.preventDefault();
                const inp = e.target.querySelector("input");
                if(inp.value.trim() !== ''){
                    nav(`/search?q=${encodeURIComponent(inp.value.trim())}`);
                }
            }}>
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