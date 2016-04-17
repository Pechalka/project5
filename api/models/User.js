var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
    identity: 'users',
    tableName : 'users',
    connection: 'mysql',

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: 'email',
            required: true,
            unique: true,
            index: true
        },
        password: {
            type: 'string',
            required: true
        },
        name: {
            type: 'string',
            required: true
        }
    }
});