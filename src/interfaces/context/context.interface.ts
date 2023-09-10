
export interface ITrackData {
    artist: string,
    name: string,
    cover: string,
    songURL: string,
}

export interface ITrackContext {
    trackData: ITrackData,
    isLoading: boolean,
    fetchTrackListHandler: () => void
    fetchTrackHandler: (trackDetail: ITrackData) => void
}

export interface ITrackContextProvider {
    children: React.ReactNode
}