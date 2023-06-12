const controller = require("../controllers/history.controller")
const express = require('express')

const router = express.Router();

router.get('/:profileId', controller.getAll);
router.delete('/:profileId', controller.deleteAll);

module.exports = router;