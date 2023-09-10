import styles from "@styles/track-list/TrackList.module.scss";
import { useState, useContext, useEffect } from "react";
import Tracks from "./Tracks";
import { ITrackInfo } from "@interfaces/track-list/track-list.interface";
import { TrackContext } from "@context/TrackContext";
import { toast } from 'react-toastify';

const TrackList = () => {

    const [query, setQuery] = useState("");
    const [activeTab, setActiveTab] = useState<number>(0);
    const [selectedItem, setSelectedItem] = useState<number | null>(null);

    const { fetchTrackListHandler, isLoading } = useContext(TrackContext);
    const [trackList, setTrackList] = useState<ITrackInfo[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchTrackListHandler();
                if (Array.isArray(response)) {
                    switch (activeTab) {
                        case 0: setTrackList(response); break;
                        case 1: setTrackList(response.filter((tracks: ITrackInfo) => tracks.top_track === true)); break;
                        default: setTrackList([])
                    }
                }
            } catch (err) {
                toast.error('Something went wrong!');
            }
        };

        fetchData();
    }, [activeTab])


    const handleSelect = (index: number) => {
        setSelectedItem(index)
    }

    const handleTabChange = (tabIndex: number) => {
        setActiveTab(tabIndex);
    }

    return (
        <div className={styles["tracks-container"]}>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 0 ? 'active' : ''}`}
                        onClick={() => handleTabChange(0)}
                    >
                        For You
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 1 ? 'active' : ''}`}
                        onClick={() => handleTabChange(1)}
                    >
                        Top Tracks
                    </button>
                </li>
            </ul>

            {/* Search Input */}
            <div className={styles["search-container"]}>
                <span className={styles["search-icon"]}></span>
                <input
                    type="search"
                    placeholder="Search Song, Artist"
                    className={styles["search-input"]}
                    onChange={(e) => { setQuery(e.target.value) }}
                />
            </div>

            <Tracks
                isLoading={isLoading}
                trackList={trackList}
                searchQuery={query}
                selectedItem={selectedItem}
                handleSelect={handleSelect}
            />
        </div>
    )
}

export default TrackList