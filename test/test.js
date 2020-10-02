process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Quote = require('../model/quote');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

describe('Quotes', () => {
    beforeEach((done) => {
        Quote.remove({}, (err) => {
            done();
        });
    });
    describe('/GET quote', () => {
        it('it should GET all the quotes', (done) => {
            chai.request(server)
                .get('/quote')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
    /*
    * Test the /POST route
    */
    describe('/POST quote', () => {
        it('it should not POST a quote without author field', (done) => {
            let quote = {
                title: "Take the risk or lose the chance",
                category: "motivational"
            }
            chai.request(server)
                .post('/quote')
                .send(quote)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('author');
                    res.body.errors.author.should.have.property('kind').eql('required');
                    done();
                });
        });

    });

    /*
  * Test the /PUT/:id route
  */
    describe('/PUT/:id quote', () => {
        it('it should UPDATE a quote given the id', (done) => {
            let quote = new Quote({quote: "Follow your dreams, they know the way", author: "Somebody", category: "encouragement"})
            quote.save((err, quote) => {
                chai.request(server)
                    .put('/quote/' + quote.id)
                    .send({quote: "Follow your dreams, they know the way", author: "Nobody", category: "encouragement"})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Quote updated!');
                        res.body.quote.should.have.property('author').eql("Nobody");
                        done();
                    });
            });
        });
    });

    /*
  * Test the /DELETE/:id route
  */
    describe('/DELETE/:id quote', () => {
        it('it should DELETE a quote given the id', (done) => {
            let quote = new Quote({quote: "Follow your dreams, they know the way", author: "Somebody", category: "encouragement"})
            quote.save((err, quote) => {
                chai.request(server)
                    .delete('/quote/' + quote.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Quote successfully deleted!');
                        res.body.result.should.have.property('ok').eql(1);
                        res.body.result.should.have.property('n').eql(1);
                        done();
                    });
            });
        });
    });
});