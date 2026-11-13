// shows a users profile info things like pfp, username, email, and edit profile button

import ProfileStats from "./ProfileStats";
import "./ProfileHeader.css";

function ProfileHeader({
    username,
    email,
    gamesPlayed,
    reviews,
    currentlyPlaying,
    completed
}) {
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

                    <button className="edit-profile-button">
                        Edit Profile
                    </button>
                </div>

                <ProfileStats
                    gamesPlayed={gamesPlayed}
                    reviews={reviews}
                    currentlyPlaying={currentlyPlaying}
                    completed={completed}
                />

            </div>
        </div>
    );
}

export default ProfileHeader;
