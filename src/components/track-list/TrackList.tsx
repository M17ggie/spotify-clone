import { useEffect, useState } from "react"
import ListItem from "./ListItem"
import baseApiInstance from "@utils/axios";
import { ITrackInfo } from "@interfaces/track-list/track-list.interface";
import Loader from "../loader/Loader";

const TrackList = () => {

    const [trackList, setTrackList] = useState<ITrackInfo[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState<number | null>(null);

    useEffect(() => {
        setIsLoading(true);
        baseApiInstance(`/items/songs`).then((res) => {
            setTrackList(res.data.data)
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setIsLoading(false)
        })
    }, []);

    const handleSelect = (index: number) => {
        setSelectedItem(index)
    }

    return (
        <>
            {
                isLoading ? <Loader /> :
                    <div>
                        {trackList?.map((trackInfo: ITrackInfo, index: number) => (
                            <ListItem key={index} data={trackInfo} isSelected={index === selectedItem} onSelect={() => handleSelect(index)} />
                        ))}
                    </div>
            }
        </>
    )
}

export default TrackList