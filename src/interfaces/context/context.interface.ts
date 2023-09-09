export interface ITrackData {
    artist: string,
    name: string,
    cover: string,
}

export interface ITrackContext {
    trackData: ITrackData,
    isLoading: boolean,
    track?: any,
    fetchTrackHandler: (trackURL: string, trackDetail: ITrackData) => void
}

export interface ITrackContextProvider {
    children: React.ReactNode
}