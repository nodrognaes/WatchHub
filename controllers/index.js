const router = require('express').Router();

const apiRoutes = require('./api/movie-routes');
const htmlRoutes = require('./html');

router.use('/', htmlRoutes);
router.use('/api', apiRoutes);

module.exports = router;
