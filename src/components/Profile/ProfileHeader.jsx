// shows a users profile info things like pfp, username, email, and edit profile button
import { useNavigate } from "react-router-dom";

import ProfileStats from "./ProfileStats";
import "./ProfileHeader.css";

function ProfileHeader({ username, email, gamesPlayed, reviews, currentlyPlaying, completed}) {

    const navigate = useNavigate();

    return (
        <div className="profile-header">

            <div className="profile-picture">
                P
            </div>

            <div className="profile-details">

                <div className="profile-user-row">

                    <div className="profile-user-info">
                        <h1>{username}</h1>
                        <p>{email}</p>
                    </div>

                    <button
                        className="edit-profile-button"
                        onClick={() => navigate("/edit-profile")}
                    >
                        Edit Profile
                    </button>

                </div>

                <ProfileStats gamesPlayed={gamesPlayed} reviews={reviews} currentlyPlaying={currentlyPlaying} completed={completed} />

            </div>
        </div>
    );
}

export default ProfileHeader;
