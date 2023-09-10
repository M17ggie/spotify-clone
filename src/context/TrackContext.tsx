import { ITrackContext, ITrackContextProvider, ITrackData } from "@interfaces/context/context.interface";
import { createContext, useState } from "react";
import { toast } from 'react-toastify';
import baseApiInstance from "../utils/axios";
import { BASE_URL } from "../utils/constants";

export const TrackContext = createContext<ITrackContext>({
    trackData: {
        artist: "",
        name: "",
        cover: "",
        songURL: ""
    },
    isLoading: false,
    fetchTrackListHandler: () => { },
    fetchTrackHandler: () => { }
});

export const TrackContextProvider = ({ children }: ITrackContextProvider) => {
    const [isLoading, setIsLoading] = useState(false);
    const [trackData, setTrackData] = useState({
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
        setTrackData({ name: trackDetail?.name, artist: trackDetail?.artist, cover: `${BASE_URL}/assets/${trackDetail?.cover}`, songURL: trackDetail?.songURL });
    }

    const fetchTrackListHandler = async () => {
        setIsLoading(true);
        try {
            const response = await baseApiInstance(`/items/songs`);
            return response.data.data
        } finally {
            setIsLoading(false)
        }
    }

    return <TrackContext.Provider value={{ isLoading, fetchTrackListHandler, fetchTrackHandler, trackData }}>
        {children}
    </TrackContext.Provider>
}