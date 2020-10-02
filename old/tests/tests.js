//process.env.NODE_ENV = 'test';
//let mongoose = require("mongoose");
let Quote = require('../quotesModel.js');

// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
chai.should();

// Configure chai
chai.use(chaiHttp);

describe("Quotes", () => {
    beforeEach((done) => { //Before each test we empty the database
        Quote.remove({}, (err) => {
            done();
        });
    });

    describe("GET /", () => {
        // Test to get all quotes record
        it("should get all quotes record", (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.should.be.a('array');
                    //res.body.length.should.be.eql(0);
                    done();
                });
        });
        // Test to get single quote record
        it("should get a single quote record", (done) => {
            let quote = new Quote({quote: "Smile more", author: "random", category: "encouragement"});
            quote.save((err, quote) => {
                chai.request(app)
                    .get('/' + quote.id)
                    .send(quote)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        });

        // Test to get single quote record
        it("should not get a single quote record", (done) => {
            const id = 5;
            chai.request(app)
                .get(`/${id}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
});