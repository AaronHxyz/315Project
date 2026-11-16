import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./EditGame.css";

function AddGame() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [company, setCompany] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [platforms, setPlatforms] = useState("");

    const [coverImage, setCoverImage] = useState(null);
    const [coverPreview, setCoverPreview] = useState(null);
    const [gameImagePreviews, setGameImagePreviews] = useState([]);

    useEffect(() => {
        if (!coverImage) {
            setCoverPreview(null);
            return;
        }

        const imageUrl = URL.createObjectURL(coverImage);
        setCoverPreview(imageUrl);

        return () => URL.revokeObjectURL(imageUrl);
    }, [coverImage]);

    const [gameImages, setGameImages] = useState([]);

    useEffect(() => {
        const imageUrls = gameImages.map(image =>
            URL.createObjectURL(image)
        );

        setGameImagePreviews(imageUrls);

        return () => {
            imageUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [gameImages]);

    return (
        <div className="edit-game-page">

            <h1>Add Game</h1>

            <div className="edit-game-main">

                {/* title, description, screenshots */}
                <div className="edit-game-left">

                    <div className="edit-game-field">
                        <label>Title:</label>

                        <input type="text" placeholder="Enter game title..." value={title} onChange={(event) => setTitle(event.target.value)} />
                    </div>

                    <div className="edit-game-field">
                        <label>Description:</label>

                        <textarea placeholder="Enter game description..." value={description} onChange={(event) => setDescription(event.target.value)} />
                    </div>

                    <div className="edit-game-field">
                        <label>Game Images:</label>

                        <div className="edit-game-images">

                            {/* show uploaded screenshots */}
                            {gameImagePreviews.map((imageUrl, index) => (
                                <div className="edit-game-image" key={index}>
                                    <img src={imageUrl} alt={`Game screenshot ${index + 1}`} />
                                </div>
                            ))}

                            {/* add screenshot button */}
                            {gameImages.length < 5 && (
                                <>
                                    <label htmlFor="game-images-input" className="add-game-image" > + <span>Add Image</span> </label>

                                    <input id="game-images-input" type="file" accept="image/*" multiple hidden onChange={(event) => {
                                            const selectedImages = Array.from(event.target.files);

                                            setGameImages(previousImages =>
                                                [...previousImages, ...selectedImages].slice(0, 5)
                                            );

                                            event.target.value = "";
                                        }}
                                    />
                                </>
                            )}

                        </div>
                    </div>

                </div>

                {/* cover photo */}
                <div className="edit-game-right">

                    <label>Cover Photo:</label>

                    <div className="edit-game-cover">

                        {coverPreview ? (
                            <img src={coverPreview} alt="Cover preview" />
                        ) : (
                            "Cover Preview"
                        )}

                    </div>

                    <div className="cover-upload">

                        <label htmlFor="cover-upload-input" className="browse-button" > Browse </label>

                        <input id="cover-upload-input" type="file" accept="image/*" hidden onChange={(event) => {setCoverImage(event.target.files[0] || null);}} />

                        <span>
                            {coverImage ? coverImage.name : "No photo selected"}
                        </span>

                    </div>

                </div>

            </div>

            {/* game information */}
            <div className="edit-game-extra">

                <div className="edit-game-field">
                    <label>Company:</label>

                    <input type="text" placeholder="Enter company name..." value={company} onChange={(event) => setCompany(event.target.value)} />
                </div>

                <div className="edit-game-field">
                    <label>Release Date:</label>

                    <input type="date" value={releaseDate} onChange={(event) => setReleaseDate(event.target.value)} />
                </div>

                <div className="edit-game-field">
                    <label>Platforms:</label>

                    <input type="text" placeholder="Enter platforms..." value={platforms} onChange={(event) => setPlatforms(event.target.value)}/>
                </div>

            </div>

            <button className="save-game-button" type="button" onClick={() => navigate("/")}> Add Game </button>

        </div>
    );


}

export default AddGame;