import ProfileHeader from "../components/ProfileHeader";


import "./Profile.css";

function Profile() {
    const user = {
        username: "Player123",
        email: "player@email.com",
        gamesPlayed: 12,
        reviews: 5,
        currentlyPlaying: 3,
        completed: 9
    };
 
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