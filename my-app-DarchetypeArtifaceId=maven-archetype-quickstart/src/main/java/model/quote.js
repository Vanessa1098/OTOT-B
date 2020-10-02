let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//book schema definition
let QuoteScheme = new Schema(
    {
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
    },
    {
        versionKey: false
    }
);

// Sets the createdAt parameter equal to the current time
QuoteScheme.pre('save', next => {
    now = new Date();
    if(!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

//Exports the BookSchema for use elsewhere.
module.exports = mongoose.model('quote', QuoteScheme);