// shows a users profile stat (games played, reviews, currently playing, and completed games)
import "./ProfileStats.css";

function ProfileStats({ gamesPlayed, reviews, currentlyPlaying, completed }) {
    return (
        <div className="profile-stats">
            <div>
                <strong>{gamesPlayed}</strong>
                <span>Games Played</span>
            </div>

            <div>
                <strong>{reviews}</strong>
                <span>Reviews</span>
            </div>

            <div>
                <strong>{currentlyPlaying}</strong>
                <span>Currently Playing</span>
            </div>

            <div>
                <strong>{completed}</strong>
                <span>Completed</span>
            </div>
        </div>
    );
}

export default ProfileStats;