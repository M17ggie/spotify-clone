
export interface ITrackData {
    id: number | null,
    artist: string,
    name: string,
    cover: string,
    songURL: string,
}

export interface ITrackContext {
    trackData: ITrackData,
    isLoading: boolean,
    nextTrack: (trackIndex: number) => void
    prevTrack: (trackIndex: number) => void
    fetchTrackListHandler: () => void
    fetchTrackHandler: (trackDetail: ITrackData) => void
}

export interface ITrackContextProvider {
    children: React.ReactNode
}