// arranges multiple game card components into a grid layout

import { GameCard, GameCardList } from "./GameCard";
import "./GameGrid.css";
import { useState } from "react";
import { Link } from "react-router-dom";


export function GameGrid({ games, title = null, hasLimit = true, filter="", flags=0 }) {
    const [limit] = useState(hasLimit ? 5 : games.length);
    return (
        <div className="game-grid-container">
            <div className="game-grid-title">
                {title && <h2>{title}</h2>}
                {games.length > limit && (
                    <Link to={filter ? `/browse?filter=${filter}` : '/browse'} className="btn-link">View All</Link>
                )}
            </div>
            <div className="game-grid">
                {games.slice(0, limit).map((game) => (
                    (flags === 0 || (game.flags & flags) === flags) && (
                        <GameCard key={game.id} game={game} />
                    ))
                )}
            </div>
        </div>
    )
}

export function GameList({ games }) {
    return (
        <div className="game-list-container">
            <div className="game-list">
                {games.map((game) => (
                    <GameCardList key={game.id} game={game} />
                ))}
            </div>
        </div>
    )
}

export default GameGrid;
