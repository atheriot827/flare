const Sequelize = require('sezuelize');
const database = require('../index.ts');
const { User, Venue, } = require('./index.ts');

const Event = database.define('Event', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: { type: Sequelize.STRING(60) },
    start_time: { type: Sequelize.DATE },
    end_time: { type: Sequelize.DATE },
    address: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    venue_id: { type: Sequelize.INTEGER },
    created_by: { type: Sequelize.INTEGER },
    chatroom_id: { type: Sequelize.INTEGER },

});

Event.belongsTo(User, { foreignKey: 'created_by', });
Event.belongsTo(Venue, { foreignKey: 'venue_id' });



