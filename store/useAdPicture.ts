import { StoreApi, UseBoundStore, create } from "zustand"
import { v4 as uuidv4 } from 'uuid';


type UseAdPicture = {
    pictures: {blob: Blob, file: File, id: string}[];
    addPicture: (blob: Blob, file: File) => void;
    removePicture: (id: string) => void;
    clearPictures: () => void;
}
const useAdPicture: UseBoundStore<StoreApi<UseAdPicture>>  = create<UseAdPicture>((set) => ({
    pictures: [],
    addPicture: (blob: Blob, file: File) => {
        set(state => ({
            pictures: [...state.pictures, {blob, file, id: uuidv4()}]
        }))
    },
    removePicture: (id: string) => {
        set(state => ({
            pictures: state.pictures.filter(picture => picture.id !== id)
        }))
    },
    clearPictures: () => {
        set(state => ({
            pictures: []
        }))
    }

}))
export default useAdPicture