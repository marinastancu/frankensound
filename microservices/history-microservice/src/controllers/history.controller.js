const service = require("../services/history.service")

module.exports = {
    getAll: async (req, res) => {
        let records = await service.GetAll(req.params["profileId"]);
        res.json(JSON.stringify(records));
    },
    deleteAll: (req, res) => {
        res.send(service.DeleteAll(req.params["profileId"]));
    }
}