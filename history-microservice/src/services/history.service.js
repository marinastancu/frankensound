const Record = require("../entities/history.entity")

// Create a record in the history
module.exports = {
    Create: async function (record) {
        const r = await Record.create({ profileId: record["profileId"], songId: record["songId"] });
        return r;
    },

// Find all recorded history for a profile
    GetAll: async function (profileId) {
        const r = await Record.findAll({ raw: true,where: { profileId: profileId }});
        console.log(r);
        return r;
    },

// Delete all recorded history for a profile
    DeleteAll: async function (profileId) {
        const r = await Record.destroy({ where: { profileId: profileId }});
        return r;
    }
}