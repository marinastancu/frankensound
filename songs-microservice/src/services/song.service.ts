import {Song} from "../entities/song.entity.js"
import {myDataSource} from "../../data-source.js";

export function GetSongById(id: any) {
    myDataSource.getRepository(Song).findOneBy({
        id: id,
    })
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            console.log(error);
            return {
                message: 'Unable to fetch the record!'
            };
        });
}

export function GetSongs() {
    myDataSource.getRepository(Song).find()
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            console.log(error);
            return {
                message: 'Unable to fetch records!'
            };
        });
}
