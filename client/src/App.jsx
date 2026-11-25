import { Routes, Route } from "react-router-dom";
import { useEffect, useState, useSyncExternalStore } from "react";

import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/Home";
import BrowseGames from "./pages/Browse";
import SearchGames from "./pages/Search";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GameDetails from "./pages/GameDetails";
import Profile from "./pages/Profile";

import EditGame from "./pages/EditGame";
import AddGame from "./pages/AddGame";
import EditProfile from "./pages/EditProfile";

import {AdminHome, AdminManage} from "./pages/Admin";
import { getMe } from "./api";

export let user = null;
const userListeners = new Set();

export function setUser(newUser) {
  user = newUser ?? null;
  userListeners.forEach((listener) => listener());
}

function subscribeToUser(listener) {
  userListeners.add(listener);
  return () => userListeners.delete(listener);
}

function getUserSnapshot() {
  return user;
}

function App() {
  const currentUser = useSyncExternalStore(subscribeToUser, getUserSnapshot);

  const [game, setGame] = useState({
    title: "Minecraft",
    releaseDate: "2011-11-18",
    developer: "Mojang Studios",
    genres: ["Sandbox", "Survival"],
    platforms: ["PC", "PlayStation", "Xbox"],
    description: "Minecraft is a sandbox game where players explore a procedurally generated world, gather resources, build structures, and survive against enemies.",
    cover: "/dev/gameCovers/minecraft.webp",
    trailerId: "MmB9b5njVbA",
    screenshots: [
        "../images/minecraft1.jpg",
        "../images/minecraft2.jpg",
        "../images/minecraft3.jpg"
        //"../images/minecraft4.jpg"
        //"../images/minecraft5.jpg"
    ]
  });

  useEffect(() => {
    let active = true;

    getMe()
      .then((userData) => {
        if (active) setUser(userData);
      })
      .catch(() => {
        if (active) setUser(null);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <Navbar user={currentUser} />

      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/browse" element={<BrowseGames />} />
        <Route path="/search" element={<SearchGames />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/game/:id" element={<GameDetails game={game} />} />
        <Route path="/profile" element={<Profile user={currentUser} />} />
        <Route path="/edit-profile" element={<EditProfile user={currentUser} setUser={setUser} />} />
        <Route path="/edit-game" element={<EditGame game={game} setGame={setGame} />} />
        <Route path="/add-game" element={<AddGame />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/manage" element={<AdminManage />} />

      </Routes>
    </>
  )
}

export default App;