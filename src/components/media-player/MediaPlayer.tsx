import { TrackContext } from '@context/TrackContext';
import styles from "@styles/media-player/MediaPlayer.module.scss";
import { useContext } from 'react';

const MediaPlayer = () => {

    const { track, isLoading, trackData } = useContext(TrackContext);

    return (
        <div className={styles["media-player-container"]}>
            <div>
                <p className={styles["track-title"]}>
                    {trackData?.name}
                </p>
                <p className={styles["artist-name"]}>
                    {trackData?.artist}
                </p>
            </div>
            <img src={trackData?.cover} className={styles["cover-image"]} />
            <audio controls>
                <source src={track} type='audio/mpeg' />
            </audio>
        </div>
    );
}

export default MediaPlayer