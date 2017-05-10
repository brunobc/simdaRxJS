// Module dependencies
const mongoose = require('mongoose'),
    dbConfig = require('./configLoader').databaseConfig,
    connectionString = `mongodb://${dbConfig.host}/${dbConfig.database}`,
    connection = null;

class DBSeeder {

    init() {
        mongoose.connection.db.listCollections({ name: 'customers' })
            .next((err, collinfo) => {
                if (!collinfo) {
                    console.log('Starting dbSeeder...');
                    //this.seed();
                }
            });
    }

}

module.exports = new DBSeeder();
