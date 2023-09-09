import { ITrackContext, ITrackContextProvider, ITrackData } from "@interfaces/context/context.interface";
import { createContext, useState } from "react";
import baseApiInstance from "../utils/axios";
import { toast } from 'react-toastify'
import { BASE_URL } from "../utils/constants";

export const TrackContext = createContext<ITrackContext>({
    trackData: {
        artist: "",
        name: "",
        cover: "",
    },
    track: {},
    isLoading: false,
    fetchTrackHandler: () => { }
});

export const TrackContextProvider = ({ children }: ITrackContextProvider) => {
    const [track, setTrack] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [trackData, setTrackData] = useState({
        artist: "",
        name: "",
        cover: "",
    });

    const fetchTrackHandler = async (trackURL: string, trackDetail: ITrackData) => {
        setIsLoading(true);
        baseApiInstance(trackURL).then((res) => {
            console.log(res.data);
            setTrack(res.data);
        }).catch(() => {
            toast.error("Something went wrong!")
        }).finally(() => {
            setIsLoading(false);
            setTrackData({ name: trackDetail?.name, artist: trackDetail?.artist, cover: `${BASE_URL}/assets/${trackDetail?.cover}` });
        })
    }

    return <TrackContext.Provider value={{ track, isLoading, fetchTrackHandler, trackData }}>
        {children}
    </TrackContext.Provider>
}