import './App.scss'
import spotifyLogo from '@assets/spotify-logo.svg'
import TrackList from '@components/track-list/TrackList'
import { ToastContainer } from 'react-toastify'
import MediaPlayer from './components/media-player/MediaPlayer'

function App() {

  return (
    <div className='d-flex'>
      <img className='logo' src={spotifyLogo} />

      <MediaPlayer />
      <TrackList />


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
