// for embedded video trailers for games in the details page
import "./GameTrailer.css";

function GameTrailer( {videoId} ) {
    return (
        <div className="game-trailer">
            <iframe src={`https://www.youtube.com/embed/${videoId}`} title="Game Trailer" allowFullScreen></iframe>
        </div>
    );
}

export default GameTrailer;
