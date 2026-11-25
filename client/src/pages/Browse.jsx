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

    function updateSortForm(sort){
        // Update the URL with the new sort order
        let params = new URLSearchParams(window.location.search);
        params.set('sort', sort);
        window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
        setSort(sort);
    }

    const [searchParams] = useSearchParams();
    const [filter, setFilter] = useState(filterToFlags(searchParams.get('filter') || ''));
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
        document.getElementById('serverFilter').value = searchParams.get('filter') || '';
        document.getElementById('serverSort').value = searchParams.get('sort') || 'newest';
    }, [searchParams]);

    return (

        <div className="container">

            <h1>Browse All Games</h1>
            <div className="browse-filters">
                <div className="filter">
                    <p>Filter by:</p>
                    <select className="browse-filter" id="serverFilter" onChange={(event)=>updateFilterForm(event.target.value)}>
                        <option value="">All</option>
                        <option value="new">New</option>
                        <option value="trending">Trending</option>
                        <option value="new,trending">New & Trending</option>
                    </select>
                </div>

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

            <GameGrid games={sortedGames} hasLimit={false} flags={filter}/>

        </div>
    )
}

