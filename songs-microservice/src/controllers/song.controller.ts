import {sendData} from "./middleware/messaging.middleware.js"
import * as service from "../services/song.service.js"
import {Request, Response} from "express"

export default {
    allSongs: (req: Request, res: Response) => {
        res.json(service.GetSongs());
    },
    playSong: (req: Request, res: Response) => {
        res.json(service.GetSongByTitle(req.params["id"]));
        const data = {
            profileId: "user",
            songId: req.params["id"],
        }
        sendData(data);
    }
}