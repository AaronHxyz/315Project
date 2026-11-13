// displays an games cover image and title, with navigation to its details page\
import { useNavigate } from "react-router-dom";
import { GameInfo } from "../GameInfo/GameInfo";

export function GameCard({ game }){
    const navigate = useNavigate();

    return (
        <div className="game-card" onClick={() => navigate(`/game/${game.id}`)}>
            <div className="game-card-cover">
                <img src={game.cover} alt={game.title} title="Game cover image from IGDB"/>
            </div>
            <h3>{game.title}</h3>
        </div>
    )
}

export function GameCardList({ game }){
    const navigate = useNavigate();

    return (
        <div className="game-list-item" onClick={() => navigate(`/game/${game.id}`)}>
            <div className="game-list-cover">
                <img src={game.cover} alt={game.title} title="Game cover image from IGDB"/>
            </div>
            <div className="game-list-details">
                <h3>{game.title}</h3>                
                <GameInfo genres={game.genres} platforms={game.platforms} description={game.description} />
            </div>
        </div>
    )
}

export default GameCard;
