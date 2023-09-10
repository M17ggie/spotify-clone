import { ITrackInfo, ITracksComponent } from "@interfaces/track-list/track-list.interface"
import Loader from "../loader/Loader"
import ListItem from "./ListItem"

const Tracks = ({ searchQuery, handleSelect, selectedItem, trackList, isLoading }: ITracksComponent) => {

    // const { fetchTrackListHandler, isLoading } = useContext(TrackContext);
    // const [trackList, setTrackList] = useState<ITrackInfo[]>([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetchTrackListHandler();
    //             if (Array.isArray(response)) {
    //                 setTrackList(response);
    //             }
    //         } catch (err) {
    //             toast.error('Something went wrong!');
    //         }
    //     };

    //     fetchData();
    // }, [])

    const filteredTrackList = trackList?.filter((track: ITrackInfo) => track?.name.toLowerCase().includes(searchQuery) || track?.artist.toLowerCase().includes(searchQuery))

    return (
        isLoading ? <Loader /> :
            <div>
                {filteredTrackList?.map((trackInfo: ITrackInfo, index: number) => (
                    <ListItem key={index} data={trackInfo} isSelected={index === selectedItem} onSelect={() => handleSelect(index)} />
                ))}
            </div>
    )
}

export default Tracks