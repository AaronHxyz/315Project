// arranges multiple game card components into a grid layout

import { GameCard } from "./GameCard";
import "./GameGrid.css";
import { useState } from "react";
import { Link } from "react-router-dom";


export function GameGrid({ games, title }){
    const [limit] = useState(5);
    return (
        <div className="game-grid-container">
            <div className="game-grid-title">
                <h2>{title}</h2>
                {games.length > limit ? (
                    <Link to="/browse" className="btn-link">View All</Link>
                ) : null}
            </div>
            <div className="game-grid">
                {games.slice(0, limit).map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>
        </div>
    )
}

export default GameGrid;
