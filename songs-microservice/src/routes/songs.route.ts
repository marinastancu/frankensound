import express = require("express")
import controller from "../controllers/song.controller.js"

const router = express.Router();

router.get('/', controller.allSongs);
router.get('/:id', controller.playSong);
export default router;