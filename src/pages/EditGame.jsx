import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./EditGame.css";

function EditGame({ game, setGame }) {

    const navigate = useNavigate();

    const [title, setTitle] = useState(game.title);
    const [description, setDescription] = useState(game.description);
    const [company, setCompany] = useState(game.developer);
    const [releaseDate, setReleaseDate] = useState(game.releaseDate);
    const [platforms, setPlatforms] = useState(game.platforms.join(", "));

    const [coverImage, setCoverImage] = useState(null);
    const [gameImages, setGameImages] = useState(game.screenshots);

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

    useEffect(() => {
        const objectUrls = [];

        const imageUrls = gameImages.map(image => {
            if (typeof image === "string") {
                return image;
            }

            const imageUrl = URL.createObjectURL(image);
            objectUrls.push(imageUrl);

            return imageUrl;
        });

        setGameImagePreviews(imageUrls);

        return () => {
            objectUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [gameImages]);

    return (
        <div className="edit-game-page">

            <h1>Edit Game</h1>

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
                                <div className="edit-game-image" key={index}> <img src={imageUrl} alt={`Game screenshot ${index + 1}`} /> </div>
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

                        <input id="cover-upload-input" type="file" accept="image/*" hidden onChange={(event) => { setCoverImage(event.target.files[0] || null); }} />

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

                    <input type="text" placeholder="Enter platforms..." value={platforms} onChange={(event) => setPlatforms(event.target.value)} />
                </div>

            </div>

            <button className="save-game-button" type="button" onClick={saveFunction} > Save Changes </button>

        </div>
    );

    function saveFunction() {

        const updatedGame = {
            ...game,
            title: title,
            description: description,
            developer: company,
            releaseDate: releaseDate,
            platforms: platforms.split(",").map(platform => platform.trim()),
            coverImage: coverImage,
            screenshots: gameImages
        };

        setGame(updatedGame);

        alert("Game changes saved!");

        navigate("/game/1");
    }
}

export default EditGame;
