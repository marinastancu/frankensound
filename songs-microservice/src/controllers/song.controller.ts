import {database} from "../models/song.model"
import fs from "fs"
import {sendData} from "./middleware/messaging.middleware"

export default {
    allSongs: (req: any, res: any) => {
        //TODO: Get a list of all the songs
    },
    playSong: (req: any, res: any) => {
        const fileName = req.params.id;
        const filePath = database[fileName];
        if (!filePath) {
            return res.status(404).send(`File with name ${fileName} and ${filePath} not found`)
        }

        const stat = fs.statSync(filePath);
        const fileSize = stat.size;
        const range = req.headers.range;

        const data = {
            song: fileName,
            filePath: filePath,
        }
        sendData(data);

        if (range) {
            const parts = range.replace(/bytes=/, '').split('-')
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

            const chunkSize = end - start + 1;
            const file = fs.createReadStream(filePath, {start, end});
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': 'audio/mp3'
            };
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'audio/mp3'
            };
            res.writeHead(200, head);
            fs.createReadStream(filePath).pipe(res)
        }
    }
}