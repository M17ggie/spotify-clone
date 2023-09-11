import TrackList from '@components/track-list/TrackList'
import { ToastContainer } from 'react-toastify'
import MediaPlayer from './components/media-player/MediaPlayer'
import Profile from '@components/profile/Profile'
import styles from "@styles/App.module.scss"

function App() {

  return (
    <div className={styles["main-container"]}>

      <Profile />

      <TrackList />

      <MediaPlayer />


      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="colored"
      />
    </div>
  )
}

export default App
