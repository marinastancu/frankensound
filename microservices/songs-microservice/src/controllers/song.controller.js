const {sendData} = require("./middleware/messaging.middleware")

const service = require("../services/song.service")

module.exports = {
    allSongs: (req, res) => {
        res.json(service.GetSongs());
    },
    playSong: (req, res) => {
        res.json(service.GetSongByTitle(req.params["id"]));
        const data = {
            profileId: "user",
            songId: req.params["id"],
        }
        sendData(data);
    }
}