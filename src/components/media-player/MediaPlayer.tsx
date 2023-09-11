import { TrackContext } from '@context/TrackContext';
import styles from "@styles/media-player/MediaPlayer.module.scss";
import { useContext } from 'react';
import defaultAlbumArt from "@assets/album-art-default.png"
import next from "@assets/next.svg"
import prev from "@assets/prev.svg"
import play from "@assets/play.svg"

const MediaPlayer = () => {

    const { trackData, isLoading, nextTrack, prevTrack } = useContext(TrackContext);

    return (
        <div className={styles["media-player-container"]}>
            <div className={styles["track-info"]}>
                <p className={styles["track-title"]}>
                    {trackData?.name}
                </p>
                <p className={styles["artist-name"]}>
                    {trackData?.artist}
                </p>
            </div>
            <div className={styles["image-container"]}>
                {isLoading && <div className={styles["cover-image-masked"]} />}
                <img src={trackData?.cover || defaultAlbumArt} className={styles["cover-image"]} />
            </div>
            <audio controls>
                <source src={trackData?.songURL} type='audio/mpeg' />
            </audio>
            <div className={styles["media-controls-container"]}>
                <div className={styles["media-player-controls"]}>
                    <img className={styles["prev-btn"]} src={prev} onClick={() => { prevTrack(Number(trackData?.id)) }} />
                    <img src={play} />
                    <img className={styles["next-btn"]} src={next} onClick={() => { nextTrack(Number(trackData?.id)) }} />
                </div>
            </div>
        </div>
    );
}

export default MediaPlayer