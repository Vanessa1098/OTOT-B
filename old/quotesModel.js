// quotesModel.js
let mongoose = require('mongoose');
// Setup schema
let quoteSchema = mongoose.Schema({
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
// Export Quote model
let Quote = module.exports = mongoose.model('quotes', quoteSchema);

module.exports.get = function (callback, limit) {
    Quote.find(callback).limit(limit);
}