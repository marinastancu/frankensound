import * as service from "../services/history.service"
import {Request, Response} from "express"

export default {
    getAll: (req: Request, res: Response) => {
        res.json(service.GetAll(req.params["profileId"]));
    },
    deleteAll: (req: Request, res: Response) => {
        res.json(service.DeleteAll(req.params["profileId"]));
    }
}