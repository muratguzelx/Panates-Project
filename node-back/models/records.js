const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  _id: String,
  name: String,
  host: Object,
  accommodates: Number,
  bedrooms: Number,
  beds: Number,
  bathrooms: Number,
  amenities: Array
});

const recordSchema2 = new mongoose.Schema({}, { strict: false })

module.exports = mongoose.model('listingsAndReviews', recordSchema, 'listingsAndReviews');  // schama of the defined records table in the provided db.

