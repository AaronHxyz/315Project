import ProfileHeader from "../components/ProfileHeader";

import "./Profile.css";

function Profile({ user }) {

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

        </div>
    );
}

export default Profile;