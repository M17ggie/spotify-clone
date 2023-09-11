import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css';
import '@styles/index.scss'
import 'react-toastify/dist/ReactToastify.css';
import { TrackContextProvider } from './context/TrackContext.tsx';
import { ApolloProvider } from "@apollo/client";
import { client } from '@utils/graphql.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <TrackContextProvider>
        <App />
      </TrackContextProvider>
    </ApolloProvider>
  </React.StrictMode>,
)
