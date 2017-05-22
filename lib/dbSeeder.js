// Module dependencies
const mongoose = require('mongoose'),
    Feature = require('../models/feature'),
    dbConfig = require('./configLoader').databaseConfig,
    connectionString = `mongodb://${dbConfig.host}/${dbConfig.database}`,
    connection = null;

class DBSeeder {

    init() {
        mongoose.connection.db.listCollections({ name: 'customers' })
            .next((err, collinfo) => {
                if (!collinfo) {
                    console.log('Starting dbSeeder...');
                    // this.seed();
                }
            });
    }

    seed() {
        console.log('Seeding data...');
        Feature.remove({});

        var feature = new Feature({
            type: 'Feature',
            geometry: {
                latitude: '1234',
                longitude: '5678',
                type: 'Point'
            },
            properties: { AGRAVO: 'DENGUE' }
        });

        feature.save((err, fea) => {
            if (err) {
                console.log(err);
            } else {
                console.log('inserted feature: ' + fea.type);
            }
        });

    }

}

module.exports = new DBSeeder();
