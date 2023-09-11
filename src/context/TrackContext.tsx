import { ITrackContext, ITrackContextProvider, ITrackData } from "@interfaces/context/context.interface";
import { createContext, useState } from "react";
import { toast } from 'react-toastify';
import { ITrackInfo } from "../interfaces/track-list/track-list.interface";
import baseApiInstance from "../utils/axios";
import { BASE_URL } from "../utils/constants";

export const TrackContext = createContext<ITrackContext>({
    trackData: {
        id: null,
        artist: "",
        name: "",
        cover: "",
        songURL: ""
    },
    isLoading: false,
    fetchTrackListHandler: () => { },
    nextTrack: () => { },
    prevTrack: () => { },
    fetchTrackHandler: () => { }
});

export const TrackContextProvider = ({ children }: ITrackContextProvider) => {
    const [isLoading, setIsLoading] = useState(false);
    const [trackList, setTrackList] = useState<ITrackInfo[]>([])
    const [trackData, setTrackData] = useState<ITrackData>({
        id: null,
        artist: "",
        name: "",
        cover: "",
        songURL: ""
    });

    const fetchTrackHandler = async (trackDetail: ITrackData) => {
        baseApiInstance(trackDetail?.songURL).then(() => {
        }).catch(() => {
            toast.error('Something went wrong!')
        })
        setTrackData({ id: trackDetail?.id, name: trackDetail?.name, artist: trackDetail?.artist, cover: `${BASE_URL}/assets/${trackDetail?.cover}`, songURL: trackDetail?.songURL });
    }

    // const query = `
    //   query {
    //     songs {
    //       id
    //       name
    //       artist
    //       cover
    //       url
    //     }
    //   }
    // `;

    // fetch(`${BASE_URL}/items/graphql?query=${encodeURIComponent(query)}`)
    const fetchTrackListHandler = async () => {
        setIsLoading(true);
        try {
            const response = await baseApiInstance(`/items/songs`);
            setTrackList(response.data.data);
            return response.data.data
        } finally {
            setIsLoading(false)
        }
    }

    const nextTrack = (trackIndex: number) => {
        if (trackList.length === 0) {
            return;
        }
        let nextIndex = trackIndex;

        if (nextIndex >= trackList.length) {
            nextIndex = 0;
        }
        console.log(nextIndex, trackIndex)
        const { id, name, artist, cover, url: songURL } = trackList[nextIndex];
        setTrackData({ id, name, artist, cover: `${BASE_URL}/assets/${cover}`, songURL });
    }

    const prevTrack = (trackIndex: number) => {
        if (trackList.length === 0) {
            return;
        }
        let prevIndex = trackIndex - 1;
        if ((prevIndex - 1) < 0) {
            prevIndex = trackList.length;
        }
        const { id, name, artist, cover, url: songURL } = trackList[prevIndex - 1];
        setTrackData({ id, name, artist, cover: `${BASE_URL}/assets/${cover}`, songURL });
    }

    return <TrackContext.Provider value={{
        isLoading,
        trackData,
        fetchTrackListHandler,
        fetchTrackHandler,
        nextTrack,
        prevTrack
    }}>
        {children}
    </TrackContext.Provider>
}