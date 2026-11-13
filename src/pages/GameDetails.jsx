import GameTrailer from "../components/GameTrailer/GameTrailer";
import GameInfo from "../components/GameInfo/GameInfo";
import Comment from "../components/Comments/UserComment";
import GameGallery from "../components/GameGallery/GameGallery";

import "./GameDetails.css";

function GameDetails() {

    const game = {
        title: "Minecraft",
        releaseDate: "November 18, 2011",
        developer: "Mojang Studios",
        genres: ["Sandbox", "Survival"],
        platforms: ["PC", "PlayStation", "Xbox"],
        description: "Minecraft is a sandbox game where players explore a procedurally generated world, gather resources, build structures, and survive against enemies.",
        trailerId: "MmB9b5njVbA",
    
        screenshots: [
            "../../images/minecraft1.jpg",
            "../../images/minecraft2.jpg",
            "../../images/minecraft3.jpg",
            "../../images/minecraft4.jpg",
            "../../images/minecraft5.jpg"
        ]
    };

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
                <p>{game.releaseDate} | {game.developer}</p>
            </div>

            <div className="game-main-background">
                <div className="game-main-content">
                    {/* Cover and trailer go here */}

                    <GameTrailer videoId={game.trailerId} />

                    <GameGallery images={game.screenshots} />
                    
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