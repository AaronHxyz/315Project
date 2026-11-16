import GameTrailer from "../components/GameTrailer";
import GameInfo from "../components/GameInfo";
import Comment from "../components/UserComment";
import GameGallery from "../components/GameGallery";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./GameDetails.css";

function GameDetails({ game }) {

    const navigate = useNavigate();

    const [screenshotPreviews, setScreenshotPreviews] = useState([]);

    useEffect(() => {
        const screenshots = game.screenshots ?? [];
        const objectUrls = [];

        const imageUrls = screenshots.map(image => {
            if (typeof image === "string") {
                return image;
            }

            const imageUrl = URL.createObjectURL(image);
            objectUrls.push(imageUrl);

            return imageUrl;
        });

        setScreenshotPreviews(imageUrls);

        return () => {
            objectUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [game.screenshots]);

    const comments = [
        {
            id: 1,
            username: "User1",
            text: "This is one of my favourite games!"
        },
        {
            id: 2,
            username: "User2",
            text: "I love the freedom this game gives you."
        }
    ];

    return (
        <div className="game-details">

            <div className="game-heading">
                <h1>{game.title}</h1>

                <div className="game-heading-bottom">
                    <p>{game.releaseDate} | {game.developer}</p>

                    <button
                        className="edit-game-button"
                        type="button"
                        onClick={() => navigate("/edit-game")}
                    >
                        Edit Game
                    </button>
                </div>
            </div>

            <div className="game-main-background">
                <div className="game-main-content">
                    {/* Cover and trailer go here */}

                    <GameTrailer videoId={game.trailerId} />

                    <GameGallery images={screenshotPreviews} />
                    
                    <GameInfo genres={game.genres} platforms={game.platforms} description={game.description}/>

                </div>
            </div>

            <div className="comment-section">
                <h2>Comments</h2>

                <div className="comment-input">
                    <textarea placeholder="Write a comment..." />
                    <button type="button">Add Comment</button>
                </div>

                {comments.map((comment) => (<Comment key={comment.id} username={comment.username} text={comment.text} />))}
            </div>
        </div>
    );
}

export default GameDetails;