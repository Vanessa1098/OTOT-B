let mongoose = require('mongoose');
let Quote = require('../model/quote');

/*
 * GET /quote route to retrieve all the quotes.
 */
function getQuotes(req, res) {
    //Query the DB and if no errors, send all the quotes
    let query = Quote.find({});
    query.exec((err, quotes) => {
        if(err) res.send(err);
        //If no errors, send them back to the client
        res.json(quotes);
    });
}

/*
 * POST /quote to save a new quote.
 */
function postQuote(req, res) {
    //Creates a new quote
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
 * GET /quote/:id route to retrieve a quote given its id.
 */
function getQuote(req, res) {
    Quote.findById(req.params.id, (err, quote) => {
        if(err) res.send(err);
        //If no errors, send it back to the client
        res.json(quote);
    });
}

/*
 * DELETE /quote/:id to delete a quote given its id.
 */
function deleteQuote(req, res) {
    Quote.remove({_id : req.params.id}, (err, result) => {
        res.json({ message: "Quote successfully deleted!", result });
    });
}

/*
 * PUT /quote/:id to update a a quote given its id
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