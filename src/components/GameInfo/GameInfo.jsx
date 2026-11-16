// displays info for the game under the image gallery (platformns, genre and description)
import "./GameInfo.css";

export function GameInfo({ genres, platforms, description }) {
    return (
        <div className="game-info">
            <p><strong>Genre:</strong> {genres.join(", ")}</p>
            
            <p><strong>Platforms:</strong> {platforms.join(", ")}</p>

            <div className="game-description">
                <h3>Description</h3> 
                <p>{description}</p>
            </div>
        </div>
    );
}

export default GameInfo;