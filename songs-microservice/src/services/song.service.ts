import {SongEntity} from "../entities/song.entity.js"
import {myDataSource} from "../../data-source.js";

export function GetSongByTitle(title: any) {
    myDataSource.getRepository(SongEntity).findOneBy({
        title: title,
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
    myDataSource.getRepository(SongEntity).find()
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
