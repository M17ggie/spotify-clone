import spotifyLogo from '@assets/spotify-logo.svg'
import profileImage from "@assets/profile.svg"
import styles from "@styles/profile/Profile.module.scss"

const Profile = () => {
    return (
        <div className={styles["profile-container"]}>
            <img className={styles["logo"]} src={spotifyLogo} />
            <img className={styles["profile-image"]} src={profileImage} />
        </div>
    )
}

export default Profile