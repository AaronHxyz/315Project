import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/navBar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GameDetails from "./pages/GameDetails";
import Profile from "./pages/Profile";
import EditGame from "./pages/EditGame";
import AddGame from "./pages/AddGame";
import EditProfile from "./pages/EditProfile";

function App() {

  const [game, setGame] = useState({
    title: "Minecraft",
    releaseDate: "2011-11-18",
    developer: "Mojang Studios",
    genres: ["Sandbox", "Survival"],
    platforms: ["PC", "PlayStation", "Xbox"],
    description: "Minecraft is a sandbox game where players explore a procedurally generated world, gather resources, build structures, and survive against enemies.",
    trailerId: "MmB9b5njVbA",
    screenshots: [
        "../images/minecraft1.jpg",
        "../images/minecraft2.jpg",
        "../images/minecraft3.jpg"
        //"../images/minecraft4.jpg"
        //"../images/minecraft5.jpg"
    ]
  });

  const [user, setUser] = useState({
    username: "Player123",
    email: "player@email.com",
    gamesPlayed: 12,
    reviews: 5,
    currentlyPlaying: 3,
    completed: 9,
    profilePicture: null
    
  });

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/game/:id" element={<GameDetails game={game} />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/edit-profile" element={<EditProfile user={user} setUser={setUser} />} />
        <Route path="/edit-game" element={<EditGame game={game} setGame={setGame} />} />
        <Route path="/add-game" element={<AddGame />} />
      </Routes>
    </>
  )
}

export default App;