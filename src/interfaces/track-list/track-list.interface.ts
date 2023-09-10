export interface ITrackInfo {
    id: number;
    status: string;
    sort?: number;
    user_created: string;
    date_created: string;
    user_updated: string;
    date_updated: string;
    name: string;
    artist: string;
    accent: string;
    cover: string;
    top_track: boolean;
    url: string;
}

export interface IListItem {
    data: ITrackInfo,
    isSelected: boolean,
    onSelect: () => void
}

export interface ITracksComponent {
    isLoading: boolean,
    trackList: ITrackInfo[],
    searchQuery: string,
    selectedItem: number | null,
    handleSelect: (index: number) => void
}