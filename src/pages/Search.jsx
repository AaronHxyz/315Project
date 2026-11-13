import "/src/assets/css/index.css";
import { useState, useEffect } from 'react'
import { GameList } from "/src/components/GameCard/GameGrid";
import { useSearchParams } from 'react-router-dom';


export default function SearchGames(){
    const [games] = useState([
        {
            id: 1,
            title: "Zelda",
            cover: "/dev/gameCovers/zelda.webp",
            publishedAt: 1510876800,
            flags: 2,
            genres: ["Action", "Adventure"],
            platforms: ["Nintendo Switch", "Wii U"],
            description: "Explore a vast world, solve ancient puzzles, and save the kingdom from evil."
        },
        {
            id: 2,
            title: "Valheim",
            cover: "/dev/gameCovers/valheim.webp",
            publishedAt: 1613088000,
            flags: 0,
            genres: ["Survival", "Action"],
            platforms: ["PC", "Xbox"],
            description: "A brutal survival adventure set in a procedurally generated Viking world."
        },
        {
            id: 3,
            title: "Rob Run",
            cover: "/dev/gameCovers/rob_run.webp",
            publishedAt: 1683504000,
            flags: 1,
            genres: ["Platformer", "Action"],
            platforms: ["PC"],
            description: "Run, jump, and overcome challenging obstacles in this fast-paced platformer."
        },
        {
            id: 4,
            title: "Enshrouded",
            cover: "/dev/gameCovers/enshrouded.webp",
            publishedAt: 1705968000,
            flags: 3,
            genres: ["Survival", "RPG"],
            platforms: ["PC"],
            description: "Build, craft, and battle through a fallen kingdom covered by a deadly shroud."
        },
        {
            id: 5,
            title: "Phantom Blade",
            cover: "/dev/gameCovers/phantomBlade.webp",
            publishedAt: 1707177600,
            flags: 1,
            genres: ["Action", "RPG"],
            platforms: ["PC", "PlayStation 5"],
            description: "Master lightning-fast combat and uncover a dark conspiracy in a martial arts world."
        },
        {
            id: 6,
            title: "Call of Duty",
            cover: "/dev/gameCovers/callOfDuty.webp",
            publishedAt: 1099872000,
            flags: 2,
            genres: ["First-Person Shooter", "Action"],
            platforms: ["PC", "PlayStation", "Xbox"],
            description: "Take part in intense military campaigns and competitive multiplayer battles."
        },
        {
            id: 7,
            title: "Nomad Drive",
            cover: "/dev/gameCovers/NomadDrive.webp",
            publishedAt: 1672531200,
            flags: 0,
            genres: ["Racing", "Adventure"],
            platforms: ["PC"],
            description: "Travel across open roads, discover new destinations, and define your own journey."
        },
        {
            id: 8,
            title: "TCG Card Shop",
            cover: "/dev/gameCovers/TcgCardShop.webp",
            publishedAt: 1636416000,
            flags: 3,
            genres: ["Simulation", "Management"],
            platforms: ["PC", "Nintendo Switch"],
            description: "Run your own trading card shop, serve customers, and build the ultimate collection."
        },
        {
            id: 9,
            title: "War Dogs",
            cover: "/dev/gameCovers/WarDogs.webp",
            publishedAt: 1654041600,
            flags: 2,
            genres: ["Action", "Strategy"],
            platforms: ["PC"],
            description: "Lead a squad of elite combatants through dangerous missions and tactical battles."
        },
        {
            id: 10,
            title: "Wolverine",
            cover: "/dev/gameCovers/Wolverine.webp",
            publishedAt: 1741737600,
            flags: 3,
            genres: ["Action", "Adventure"],
            platforms: ["PlayStation 5"],
            description: "Unleash ferocious abilities in a cinematic superhero adventure."
        },
        {
            id: 11,
            title: "Control Resonant",
            cover: "/dev/gameCovers/ControlResonant.webp",
            publishedAt: 1724976000,
            flags: 0,
            genres: ["Action", "Adventure", "Horror"],
            platforms: ["PC", "PlayStation 5", "Xbox Series X|S"],
            description: "Investigate strange phenomena and confront supernatural forces in a shifting world."
        },
        {
            id: 12,
            title: "Dawn Walker",
            cover: "/dev/gameCovers/DawnWalker.webp",
            publishedAt: 1742947200,
            flags: 1,
            genres: ["RPG", "Adventure"],
            platforms: ["PC", "PlayStation 5", "Xbox Series X|S"],
            description: "Embark on a story-driven journey through a world filled with danger and discovery."
        },
    ]);

    function updateSortForm(sort){
        // Update the URL with the new sort order
        let params = new URLSearchParams(window.location.search);
        params.set('sort', sort);
        window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
        setSort(sort);
    }

    const [searchParams] = useSearchParams();
    const [q, setQ] = useState(searchParams.get('q') || '');
    const [sort, setSort] = useState(searchParams.get('sort') || 'newest');

    const sortedGames = [...games].sort((a, b) => {
        switch (sort) {
            case 'oldest':
                return a.publishedAt - b.publishedAt;
            case 'az':
                return a.title.localeCompare(b.title);
            case 'za':
                return b.title.localeCompare(a.title);
            case 'newest':
            default:
                return b.publishedAt - a.publishedAt;
        }
    });
    const filteredGames = sortedGames.filter(game => game.title.toLowerCase().includes(q.toLowerCase()));

    useEffect(() => {
        // Update the filter state when the URL changes
        document.getElementById('serverSort').value = searchParams.get('sort') || 'newest';
        document.querySelector(".navbar-search input").value = searchParams.get('q') || '';
        setQ(searchParams.get('q') || '');
    }, [searchParams]);

    return (

        <div className="container">

            <h1>Search Games</h1>
            <div className="browse-filters">
                    <div className="filter">
                    <p>Sort by:</p>
                    <select className="browse-filter" id="serverSort" onChange={(event)=>updateSortForm(event.target.value)}>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="az">A-Z</option>
                        <option value="za">Z-A</option>
                    </select>
                </div>
            </div>
            <p>Listing Games for '{q}'</p>

            {filteredGames.length === 0 && (
                <p>No games found matching your search.</p>
            )}
            <GameList games={filteredGames}/>

        </div>
    )
}

