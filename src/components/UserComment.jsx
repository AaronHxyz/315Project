// an individual user comment with username, comment text, and like/dislike buttons
import "./UserComment.css";

function Comment({ username, text }) {
    return (
        <div className="comment">
            <strong>{username}</strong>

            <p>{text}</p>

            <div className="comment-action">
                <button type="button">Like</button>
                <button type="button">Dislike</button>
            </div>
        </div>
    );
}

export default Comment;