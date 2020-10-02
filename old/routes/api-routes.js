// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});
// Import quote controller
var quoteController = require('../controllers/quoteController');
// Quote routes
router.route('/quotes')
    .get(quoteController.index)
    .post(quoteController.new);
router.route('/quotes/:quote_id')
    .get(quoteController.view)
    .patch(quoteController.update)
    .put(quoteController.update)
    .delete(quoteController.delete);
// Export API routes
module.exports = router;