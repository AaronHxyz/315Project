import "/src/assets/css/index.css";
import { useState } from 'react'
import { Link } from "react-router-dom";
import { GameGrid } from "/src/components/GameCard/GameGrid";


export default function HomePage(params){
    const [games] = useState([
        {
            id: 1,
            title: "Zelda",
            cover: "/dev/gameCovers/zelda.webp"
        },
        {
            id: 2,
            title: "Valheim",
            cover: "/dev/gameCovers/valheim.webp"
        },
        {
            id: 3,
            title: "Rob Run",
            cover: "/dev/gameCovers/rob_run.webp"
        },
        {
            id: 4,
            title: "Enshrouded",
            cover: "/dev/gameCovers/enshrouded.webp"
        },
        {
            id: 5,
            title: "Phantom Blade",
            cover: "/dev/gameCovers/phantomBlade.webp"
        },
        {
            id: 6,
            title: "Call of Duty",
            cover: "/dev/gameCovers/callOfDuty.webp"
        }
    ]);

    return (

        <div className="container">

            <div className="home-head">
                <h1>Explore <em>YOUR</em> game library</h1>
                <Link to="/add-game" className="btn btn-primary btn-sm">Add Game</Link>
            </div>

            <GameGrid games={games} title="NEW GAMES" filter='new' />

            <GameGrid games={games} title="TRENDING GAMES" filter='trending' />
        

        </div>
    )
}

