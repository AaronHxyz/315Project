import * as GameTrailerModule from "../components/GameTrailer/GameTrailer";
import * as GameInfoModule from "../components/GameInfo/GameInfo";
import * as CommentModule from "../components/Comments/UserComment";
import * as GameGalleryModule from "../components/GameGallery/GameGallery";
import * as AdminModule from "./Admin";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./GameDetails.css";

const GameTrailer = GameTrailerModule.GameTrailer || GameTrailerModule.default;
const GameInfo = GameInfoModule.GameInfo || GameInfoModule.default;
const Comment = CommentModule.UserComment || CommentModule.default;
const GameGallery = GameGalleryModule.GameGallery || GameGalleryModule.default;
const AdminGameManage = AdminModule.AdminGameManage || AdminModule.default;

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

                    {sessionStorage.getItem("admin") !== "true" && (
                        <button
                            className="edit-game-button"
                            type="button"
                            onClick={() => navigate("/edit-game")}
                        >
                            Edit Game
                        </button>
                    )}

                    {sessionStorage.getItem("admin") == "true" && (
                        <AdminGameManage game={game} />
                    )}
                </div>

            </div>

            <div className="game-main-background">
                <div className="game-main-content">

                    <div className="game-trailer-cover">

                        <div className="game-cover-container">
                            <img src={game.cover} alt={'${game.title} cover'} />
                        </div>
                        
                        <div className="game-trailer-container">
                            <GameTrailer videoId={game.trailerId} />
                        </div>

                    </div>

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