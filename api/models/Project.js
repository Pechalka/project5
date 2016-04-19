var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
    identity: 'projects',
    tableName : 'projects',
    connection: 'mysql',

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: 'string',
            required: true
        },

        description: {
            type: 'text',
            required: true
        },

        language : {
            type: 'string'
        },

        budget : {
            type: 'integer',
            required: true
        },
        projectDuration : {
            type: 'integer',
           
        }
    }
});