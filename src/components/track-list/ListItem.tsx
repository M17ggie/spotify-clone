import { TrackContext } from "@context/TrackContext"
import { IListItem } from "@interfaces/track-list/track-list.interface"
import styles from "@styles/track-list/ListItem.module.scss"
import { BASE_URL } from "@utils/constants"
import { changeBackgroundColor } from "@utils/helper"
import { useContext } from "react"

const ListItem = ({ data, isSelected, onSelect }: IListItem) => {

    const { trackData, isLoading, fetchTrackHandler } = useContext(TrackContext);

    const handleFetchTrack = () => {
        fetchTrackHandler({ id: data?.id, name: data?.name, artist: data?.artist, cover: data?.cover, songURL: data?.url });
        onSelect();
        changeBackgroundColor(data?.accent)
    }

    if (trackData?.name) {
        document.title = isLoading ? "Loading..." : `${trackData?.name} | ${trackData?.artist}`
    }

    const containerClassName = isSelected
        ? `${styles["list-content-container"]} ${styles["track-selected"]}`
        : styles["list-content-container"];


    return (
        <div className={containerClassName} onClick={handleFetchTrack}>
            <div className={styles["artist-container"]}>
                <img src={`${BASE_URL}/assets/${data?.cover}`} className={styles["track-thumbnail"]} />
                <div>
                    <p className={styles["track-title"]}>
                        {data?.name}
                    </p>
                    <p className={styles["artist-name"]}>
                        {data?.artist}
                    </p>
                </div>
            </div>
            <div className={styles["track-time"]}>
                4:16
            </div>
        </div>
    )
}

export default ListItem