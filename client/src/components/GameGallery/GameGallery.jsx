// displays a games screenshots and lets users click to enlarge an image
import { useState } from "react";
import "./GameGallery.css";

function GameGallery({ images }) {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div className="game-gallery">

            {/* thumbnails */}
            <div className="gallery-images">
                {images.map((image, index) => (<img key={index} src={image} alt={`Game screenshot ${index + 1}`} onClick={() => setSelectedImage(image)} />))}
            </div>

            {/* enlarging image */}
            {selectedImage && (
                <div className="image-overlay">
                    <button className="close-button" onClick={() => setSelectedImage(null)}> &times; </button>
                    <img src={selectedImage} alt="Enlarged game screenshot" />
                </div>
            )}
        </div>
    );
}

export default GameGallery;