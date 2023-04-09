import express = require("express")
import controller from "../controllers/history.controller"

const router = express.Router();

router.get('/:profile', controller.getAll);
router.delete('/:profile', controller.deleteAll);
export default router;