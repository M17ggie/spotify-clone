import { ITrackInfo, ITracksComponent } from "@interfaces/track-list/track-list.interface"
import Loader from "../loader/Loader"
import ListItem from "./ListItem"
import styles from "@styles/track-list/TrackList.module.scss"
import { TrackContext } from "@context/TrackContext"
import { useContext } from "react"

const Tracks = ({ searchQuery, handleSelect, selectedItem, trackList, isLoading }: ITracksComponent) => {

    const { currentTrackPlayingHandler } = useContext(TrackContext)
    const filteredTrackList = trackList?.filter((track: ITrackInfo) => track?.name.toLowerCase().includes(searchQuery) || track?.artist.toLowerCase().includes(searchQuery))

    return (
        isLoading ? <Loader /> :
            filteredTrackList.length === 0 ? (
                <p className={styles["empty-tracklist-text"]}>Couldn't find anything!</p>
            ) : (
                <>
                    {filteredTrackList.map((trackInfo: ITrackInfo, index: number) => (
                        <ListItem
                            key={index}
                            data={trackInfo}
                            isSelected={index === selectedItem}
                            onSelect={() => { handleSelect(index); currentTrackPlayingHandler(index) }}
                        />
                    ))}
                </>
            )
    )
}

export default Tracks