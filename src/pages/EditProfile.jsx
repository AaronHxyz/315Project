import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProfileStats from "../components/Profile/ProfileStats";
import "../components/Profile/ProfileHeader.css";
import "./EditProfile.css";

function EditProfile({ user, setUser }) {

    const navigate = useNavigate();

    const [username, setUsername] = useState(user.username);
    const [profilePicture, setProfilePicture] = useState(user.profilePicture);
    const [preview, setPreview] = useState(user.profilePicture);

    return (
        <div className="edit-profile-page">

             <h1 className="edit-profile-title">Edit Profile</h1>

            <div className="profile-header">

                {/* Profile picture */}
                <label htmlFor="profile-picture-input" className="edit-profile-picture">

                    {preview ? (
                        <img src={preview} alt="Profile preview" />
                    ) : (
                        "P"
                    )}

                    <input type="file" accept="image/*" id="profile-picture-input" hidden onChange={(event) => {
                            const image = event.target.files[0];

                            if (image) {
                                setProfilePicture(image);
                                setPreview(URL.createObjectURL(image));
                            }
                        }}
                    />

                </label>

                {/* Username and email */}
                <div className="profile-details">

                    <div className="profile-user-row">

                        <div className="profile-user-info">

                            <input
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />

                            <p>{user.email}</p>

                        </div>

                            <button className="save-profile-button" onClick={saveProfile}> Save Changes </button>

                    </div>

                    <ProfileStats
                        gamesPlayed={user.gamesPlayed}
                        reviews={user.reviews}
                        currentlyPlaying={user.currentlyPlaying}
                        completed={user.completed}
                    />

                </div>

            </div>

        </div>
    );

    function saveProfile() {

        setUser({
            ...user,
            username: username,
            profilePicture: profilePicture
        });

        navigate("/profile");
    }
}

export default EditProfile;