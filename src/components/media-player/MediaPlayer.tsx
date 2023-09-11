import { TrackContext } from '@context/TrackContext';
import styles from "@styles/media-player/MediaPlayer.module.scss";
import { useContext, useState, useRef, RefObject, useEffect } from 'react';
import defaultAlbumArt from "@assets/album-art-default.png"
import next from "@assets/next.svg"
import prev from "@assets/prev.svg"
import play from "@assets/play.svg"
import pause from "@assets/pause.png"
import { toast } from 'react-toastify'

const MediaPlayer = () => {

    const { trackData, isLoading, nextTrack, prevTrack } = useContext(TrackContext);

    const audioElement: RefObject<HTMLAudioElement> = useRef(null);
    const seekerFillRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songProgress, setSongProgress] = useState(0);

    const handlePlayPause = () => {
        if (audioElement.current) {
            if (!isPlaying) {
                audioElement.current.play().then(() => {
                    setIsPlaying(true);
                }).catch(() => {
                    toast.error('Failed to play audio');
                });
            } else {
                audioElement.current.pause();
                setIsPlaying(false);
            }
        }
    }

    const handleSeek = (progress: number) => {
        if (audioElement.current) {
            const duration = audioElement.current.duration;
            const seekTime = (progress / 100) * duration;
            audioElement.current.currentTime = seekTime;
        }
    };

    const updateSongProgress = () => {
        if (audioElement.current) {
            const currentTime = audioElement.current.currentTime;
            const duration = audioElement.current.duration;
            const progressPercentage = (currentTime / duration) * 100;
            setSongProgress(progressPercentage);
        }
    };

    useEffect(() => {
        if (audioElement.current) {
            audioElement.current.addEventListener('timeupdate', updateSongProgress);
        }

        // Clean up the event listener when the component unmounts
        return () => {
            if (audioElement.current) {
                audioElement.current.removeEventListener('timeupdate', updateSongProgress);
            }
        };
    }, []);

    useEffect(() => {
        if (audioElement.current) {
            audioElement.current.addEventListener('ended', () => {
                // Automatically play the next song when the current song ends
                nextTrack(Number(trackData?.id));
                setIsPlaying(true);
            });
        }

        // Clean up the event listener when the component unmounts
        return () => {
            if (audioElement.current) {
                audioElement.current.removeEventListener('ended', () => {
                    nextTrack(Number(trackData?.id));
                    setIsPlaying(true);
                });
            }
        };
    }, [trackData]);

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

            <div className={styles["seeker-container"]}>
                <div className={styles["slidecontainer"]}>
                    <input type="range" min="1" max="100" value={songProgress} onChange={(e) => handleSeek(+e.target.value)} className={styles["slider"]} id="range" />
                    <div ref={seekerFillRef} className={styles["completion-bar"]} style={{ width: `${songProgress}%` }}></div>
                </div>
            </div>


            <audio src={trackData?.songURL} ref={audioElement} autoPlay>
                Your browser doesn't support audio files
            </audio>
            <div className={styles["media-controls-container"]}>
                <div className={styles["media-player-controls"]}>
                    <img className={styles["prev-btn"]} src={prev} onClick={() => { prevTrack(Number(trackData?.id)); setIsPlaying(true) }} />
                    <img src={isPlaying ? pause : play} className={styles["play-pause"]} onClick={handlePlayPause} />
                    <img className={styles["next-btn"]} src={next} onClick={() => { nextTrack(Number(trackData?.id)); setIsPlaying(true) }} />
                </div>
            </div>
        </div>
    );
}

export default MediaPlayer