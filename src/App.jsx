import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/Home";
import BrowseGames from "./pages/Browse";
import SearchGames from "./pages/Search";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GameDetails from "./pages/GameDetails";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/browse" element={<BrowseGames />} />
        <Route path="/search" element={<SearchGames />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/game/:id" element={<GameDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App;