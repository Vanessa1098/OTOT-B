let mongoose = require('mongoose');
let Quote = require('../model/quote');

/*
 * GET /book route to retrieve all the books.
 */
function getQuotes(req, res) {
    //Query the DB and if no errors, send all the books
    let query = Quote.find({});
    query.exec((err, quotes) => {
        if(err) res.send(err);
        //If no errors, send them back to the client
        res.json(quotes);
    });
}

/*
 * POST /book to save a new book.
 */
function postQuote(req, res) {
    //Creates a new book
    var newQuote = new Quote(req.body);
    //Save it into the DB.
    newQuote.save((err,quote) => {
        if(err) {
            res.send(err);
        }
        else { //If no errors, send it back to the client
            res.json({message: "Quote successfully added!", quote });
        }
    });
}

/*
 * GET /book/:id route to retrieve a book given its id.
 */
function getQuote(req, res) {
    Quote.findById(req.params.id, (err, quote) => {
        if(err) res.send(err);
        //If no errors, send it back to the client
        res.json(quote);
    });
}

/*
 * DELETE /book/:id to delete a book given its id.
 */
function deleteQuote(req, res) {
    Quote.remove({_id : req.params.id}, (err, result) => {
        res.json({ message: "Quote successfully deleted!", result });
    });
}

/*
 * PUT /book/:id to updatea a book given its id
 */
function updateQuote(req, res) {
    Quote.findById({_id: req.params.id}, (err, quote) => {
        if(err) res.send(err);
        Object.assign(quote, req.body).save((err, quote) => {
            if(err) res.send(err);
            res.json({ message: 'Quote updated!', quote });
        });
    });
}

//export all the functions
module.exports = { getQuotes, postQuote, getQuote, deleteQuote, updateQuote };