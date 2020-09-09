// quotesModel.js
var mongoose = require('mongoose');
// Setup schema
var quoteSchema = mongoose.Schema({
    quote: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Contact model
var Quote = module.exports = mongoose.model('quote', quoteSchema);
module.exports.get = function (callback, limit) {
    Quote.find(callback).limit(limit);
}