const Sequelize = require('sequelize');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sequelize = require('../util/sequelize');

const Session = sequelize.define("sessions", {
    sid: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    isLoggedIn: Sequelize.BOOLEAN,
    expires: Sequelize.DATE,
    data: Sequelize.TEXT,
});

function extendDefaultFields(defaults, session)
{
    return {
        data: defaults.data,
        isLoggedIn: session.isLoggedIn,
        expires: defaults.expires,
        userUserId: session.userId,
    };
}

const store = new SequelizeStore({
    db: sequelize,
    table: "sessions",
    extendDefaultFields: extendDefaultFields,
});
module.exports = { Session, store };
