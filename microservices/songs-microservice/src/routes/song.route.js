const controller = require("../controllers/song.controller")
const express = require('express')

const router = express.Router();

router.get('/:id', controller.playSong);
router.get('/', controller.allSongs);

module.exports = router;