import { useEffect, useState } from "react"
import ListItem from "./ListItem"
import baseApiInstance from "@utils/axios";
import { ITrackInfo } from "@interfaces/track-list/track-list.interface";
import Loader from "../loader/Loader";
import styles from "@styles/track-list/TrackList.module.scss";
import { toast } from "react-toastify";

const TrackList = () => {

    const [trackList, setTrackList] = useState<ITrackInfo[]>([]);
    const [filteredTrackList, setFilteredTrackList] = useState<ITrackInfo[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState<number | null>(null);

    useEffect(() => {
        setIsLoading(true);
        baseApiInstance(`/items/songs`).then((res) => {
            setTrackList(res.data.data)
            setFilteredTrackList(res.data.data)
        }).catch(() => {
            toast.error('Something went wrong!')
        }).finally(() => {
            setIsLoading(false)
        })
    }, []);

    const handleSelect = (index: number) => {
        setSelectedItem(index)
    }

    const searchTrackHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilteredTrackList(trackList.filter((track: ITrackInfo) => track.artist.toLowerCase().includes(e.target.value) || track.name.toLowerCase().includes(e.target.value)));
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Search Song, Artist"
                className={styles["search-input"]}
                onChange={searchTrackHandler}
            />
            {
                isLoading ? <Loader /> :
                    <div>
                        {filteredTrackList?.map((trackInfo: ITrackInfo, index: number) => (
                            <ListItem key={index} data={trackInfo} isSelected={index === selectedItem} onSelect={() => handleSelect(index)} />
                        ))}
                    </div>
            }
        </div>
    )
}

export default TrackList