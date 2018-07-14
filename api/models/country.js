const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/over9000f');

const countrySchema = mongoose.Schema({
    cc: String,
    land: Number,
    water: Number
});

module.exports = mongoose.model('Country', countrySchema);

