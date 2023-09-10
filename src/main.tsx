import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css';
import './index.scss'
import 'react-toastify/dist/ReactToastify.css';
import { TrackContextProvider } from './context/TrackContext.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TrackContextProvider>
      <App />
    </TrackContextProvider>
  </React.StrictMode>,
)
