import "/src/assets/css/index.css";
import { useState, useEffect } from 'react'
import { GameGrid } from "/src/components/GameCard/GameGrid";
import { useSearchParams } from 'react-router-dom';

// FLAGS: BITMAP OF BOOL FLAGS
//  0: no flags set
//  1<<0: new
//  1<<1: trending

export default function BrowseGames(){
    const [games] = useState([
        {
            id: 1,
            title: "Zelda",
            cover: "/dev/gameCovers/zelda.webp",
            flags: 2
        },
        {
            id: 2,
            title: "Valheim",
            cover: "/dev/gameCovers/valheim.webp",
            flags: 0
        },
        {
            id: 3,
            title: "Rob Run",
            cover: "/dev/gameCovers/rob_run.webp",
            flags: 1
        },
        {
            id: 4,
            title: "Enshrouded",
            cover: "/dev/gameCovers/enshrouded.webp",
            flags: 3
        },
        {
            id: 5,
            title: "Phantom Blade",
            cover: "/dev/gameCovers/phantomBlade.webp",
            flags: 1
        },
        {
            id: 6,
            title: "Call of Duty",
            cover: "/dev/gameCovers/callOfDuty.webp",
            flags: 2
        },
        {
            id: 7,
            title: "Nomad Drive",
            cover: "/dev/gameCovers/NomadDrive.webp",
            flags: 0
        },
        {
            id: 8,
            title: "TCG Card Shop",
            cover: "/dev/gameCovers/TcgCardShop.webp",
            flags: 3
        },
        {
            id: 9,
            title: "War Dogs",
            cover: "/dev/gameCovers/WarDogs.webp",
            flags: 2
        },
        {
            id: 10,
            title: "Wolverine",
            cover: "/dev/gameCovers/Wolverine.webp",
            flags: 3
        },
        {
            id: 11,
            title: "Control Resonant",
            cover: "/dev/gameCovers/ControlResonant.webp",
            flags: 0
        },
        {
            id: 12,
            title: "Dawn Walker",
            cover: "/dev/gameCovers/DawnWalker.webp",
            flags: 1
        },
    ]);

    function filterToFlags(filter){
        // Translate comma seperated filters in bitmap flags
        let flags = 0;
        let filters = new Set(filter.split(','));
        for (let f of filters){
            switch(f){
                case 'new':
                    flags |= 1<<0;
                    break;
                case 'trending':
                    flags |= 1<<1;
                    break;
            }
        }
        return flags;
    }
    function updateFilterForm(filter){
        // Update the URL with the new filter
        let params = new URLSearchParams(window.location.search);
        params.set('filter', filter);
        window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
        setFilter(filterToFlags(filter));
    }

    const [searchParams] = useSearchParams();
    const [filter, setFilter] = useState(filterToFlags(searchParams.get('filter') || ''));

    useEffect(() => {
        // Update the filter state when the URL changes
        document.getElementById('serverFilter').value = searchParams.get('filter') || '';
    }, [searchParams]);

    return (

        <div className="container">

            <h1>Browse All Games</h1>
            <p>Filter by:</p>
            <select className="browse-filter" id="serverFilter" onChange={(event)=>updateFilterForm(event.target.value)}>
                <option value="">All</option>
                <option value="new">New</option>
                <option value="trending">Trending</option>
                <option value="new,trending">New & Trending</option>
            </select>

            <GameGrid games={games} hasLimit={false} flags={filter}/>

        </div>
    )
}

