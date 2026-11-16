import ProfileHeader from "../components/Profile/ProfileHeader";
import { GameGrid } from "../components/GameCard/GameGrid";

import "./Profile.css";

function Profile({ user }) {

    const currentlyPlaying = [
        {
            id: 1,
            title: "Minecraft",
            cover: "/dev/gameCovers/minecraft.webp"
        },
        {
            id: 2,
            title: "Zelda",
            cover: "/dev/gameCovers/zelda.webp"
        },
        {
            id: 3,
            title: "Valheim",
            cover: "/dev/gameCovers/valheim.webp"
        }
    ];

    const wishlist = [
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
    ];

    return (
        <div className="profile-page">

            <ProfileHeader
                username={user.username}
                email={user.email}
                gamesPlayed={user.gamesPlayed}
                reviews={user.reviews}
                currentlyPlaying={user.currentlyPlaying}
                completed={user.completed}
            />


            <div className="profile-game-section">
                <GameGrid
                    games={currentlyPlaying}
                    title="Currently Playing"
                    hasLimit={false}
                />
            </div>

            <div className="profile-game-section">
                <GameGrid
                    games={wishlist}
                    title="Wishlist"
                    hasLimit={false}
                />
            </div>

        </div>

        
    );
}

export default Profile;