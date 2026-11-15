// All Admin pages
import "/src/assets/css/index.css";
import { useState, useEffect } from 'react'
import { GameGrid } from "/src/components/GameCard/GameGrid";
import { useSearchParams, Link } from 'react-router-dom';

const games = [
    {
        id: 1,
        title: "Zelda",
        cover: "/dev/gameCovers/zelda.webp",
        publishedAt: 1510876800,
        flags: 2
    },
    {
        id: 2,
        title: "Valheim",
        cover: "/dev/gameCovers/valheim.webp",
        publishedAt: 1613088000,
        flags: 0
    },
    {
        id: 3,
        title: "Rob Run",
        cover: "/dev/gameCovers/rob_run.webp",
        publishedAt: 1683504000,
        flags: 1
    },
    {
        id: 4,
        title: "Enshrouded",
        cover: "/dev/gameCovers/enshrouded.webp",
        publishedAt: 1705968000,
        flags: 3
    },
    {
        id: 5,
        title: "Phantom Blade",
        cover: "/dev/gameCovers/phantomBlade.webp",
        publishedAt: 1707177600,
        flags: 1
    },
    {
        id: 6,
        title: "Call of Duty",
        cover: "/dev/gameCovers/callOfDuty.webp",
        publishedAt: 1099872000,
        flags: 2
    },
    {
        id: 7,
        title: "Nomad Drive",
        cover: "/dev/gameCovers/NomadDrive.webp",
        publishedAt: 1672531200,
        flags: 0
    },
    {
        id: 8,
        title: "TCG Card Shop",
        cover: "/dev/gameCovers/TcgCardShop.webp",
        publishedAt: 1636416000,
        flags: 3
    },
    {
        id: 9,
        title: "War Dogs",
        cover: "/dev/gameCovers/WarDogs.webp",
        publishedAt: 1654041600,
        flags: 2
    },
    {
        id: 10,
        title: "Wolverine",
        cover: "/dev/gameCovers/Wolverine.webp",
        publishedAt: 1741737600,
        flags: 3
    },
    {
        id: 11,
        title: "Control Resonant",
        cover: "/dev/gameCovers/ControlResonant.webp",
        publishedAt: 1724976000,
        flags: 0
    },
    {
        id: 12,
        title: "Dawn Walker",
        cover: "/dev/gameCovers/DawnWalker.webp",
        publishedAt: 1742947200,
        flags: 1
    },
];

export function AdminHome(){
    return (
        <div className="container">
            <h1>Welcome Admin!</h1>
            <p>There are <strong>{games.length}</strong> published games.</p>
            <p><strong>{games.length}</strong> games need to be reviewed.</p>
            <p>The platform has <strong>1</strong> registered users.</p>

            <h1>Game Management</h1>
            <Link className="btn btn-secondary" to="/admin/manage">Manage Games</Link>
            <h1>User Management</h1>
            <Link className="btn btn-secondary" to="#">Manage Users</Link>
        </div>
    )
}

export function AdminManage(){

    // TOOD: Filter from DB to only pending games
    

    function updateSortForm(sort){
        // Update the URL with the new sort order
        let params = new URLSearchParams(window.location.search);
        params.set('sort', sort);
        window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
        setSort(sort);
    }

    const [searchParams] = useSearchParams();
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

    useEffect(() => {
        // Update the filter state when the URL changes
        document.getElementById('serverSort').value = searchParams.get('sort') || 'newest';

        // For now, set an admin flag just to trigger admin controls on other page
        sessionStorage.setItem('admin', 'true');
    }, [searchParams]);

    return (

        <div className="container">

            <h1>Pending Review Games</h1>
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

            <GameGrid games={sortedGames} hasLimit={false}/>

        </div>
    )
}

export function AdminGameManage({ game }){
    return (
        <div className="admin-controls">
            <div className="admin-controls">
                <span className="tag tag-secondary">IN REVIEW</span>
                <Link className="btn btn-sm btn-primary" to={`/game/${game.id}/edit`}>EDIT</Link>
            </div>
            <div className="admin-controls">
                <button onClick={()=>alert("Approved game! (not really)")} className="btn btn-sm btn-success">APPROVE</button>
                <button onClick={()=>alert("Game has been rejected.")} className="btn btn-sm btn-danger">REJECT</button>
            </div>
        </div>
    )
}

export default { AdminHome, AdminManage, AdminGameManage };