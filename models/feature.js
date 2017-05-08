const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const GeometrySchema = new Schema({
    coordinates: { type: Array, required: true },
    type: { type: String, required: true }
});

const PropertiesSchema = new Schema({
    AGRAVO: { type: String, required: true }

});

const FeatureSchema = new Schema({
    type: { type: String, required: true },
    geometry: [GeometrySchema],
    properties: [PropertiesSchema]
});

module.exports = mongoose.model('Feature', FeatureSchema, 'features');