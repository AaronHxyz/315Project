// displays an games cover image and title, with navigation to its details page\
import { useNavigate } from "react-router-dom";

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
export default GameCard;
