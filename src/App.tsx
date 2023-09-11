import Profile from '@components/profile/Profile'
import TrackList from '@components/track-list/TrackList'
import styles from "@styles/App.module.scss"
import { ToastContainer } from 'react-toastify'
import MediaPlayer from './components/media-player/MediaPlayer'

function App() {

  // const [showTrackList, setShowTrackList] = useState(false);

  // const toggleTrackList = () => {
  //   setShowTrackList(!showTrackList);
  // };

  return (
    <div className={styles["main-container"]}>

      <Profile />

      {/* <div className='d-none d-md-block'> */}
      <TrackList />
      {/* </div> */}

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
    </div >
  )
}

export default App
