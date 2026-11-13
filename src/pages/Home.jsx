import "/src/assets/css/index.css";
import { useState } from 'react'
import { Link } from "react-router-dom";


export default function HomePage(params){
    return (

        <div className="container">

            <div className="home-head">
                <h1>Explore <em>YOUR</em> game library</h1>
                <Link to="/add-game" className="btn btn-primary btn-sm">Add Game</Link>
            </div>

        </div>
    )
}

