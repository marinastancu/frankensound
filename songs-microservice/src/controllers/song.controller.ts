import fs from "fs"
import {sendData} from "./middleware/messaging.middleware.js"
import * as service from "../services/song.service.js"
import {Request, Response} from "express"

export default {
    allSongs: (req: Request, res: Response) => {
        res.json(service.GetSongs());
    },
    playSong: (req: Request, res: Response) => {
        res.json(service.GetSongById(req.params["id"]));
        const data = {
            song: req.params["id"],
        }
        sendData(data);
    }
}