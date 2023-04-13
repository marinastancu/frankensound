const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env["DB_NAME"], process.env["DB_USER"], process.env["DB_PASS"], {
    host: process.env["DB_HOST"],
    dialect: 'postgres'
});

let Record = sequelize.define('record', {
    profileId: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    songId: {
        type: Sequelize.TEXT,
        allowNull: false
    },

});

Record.sync().then(() => {
    console.log('New table created');
}).finally(() => {})

module.exports = Record